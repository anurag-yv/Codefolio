import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Function to create transporter (with env checks)
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Missing EMAIL_USER or EMAIL_PASSWORD in environment variables');
    throw new Error('Email configuration missing. Check your .env.local file.');
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}


async function sendEmail(data: { name: string; email: string; subject: string; message: string }) {
  const transporter = createTransporter();  // Create inside function to avoid module-level errors

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Use your verified email as sender
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,  // Recipient (your email)
    replyTo: data.email,  // Allows replying to user
    subject: data.subject || `New contact from portfolio: ${data.name}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Subject: ${data.subject}
      Message: ${data.message}
    `,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);  // Log for debugging
    return true;
  } catch (error) {
    console.error('Error sending email:', error);  // This will show in server logs
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation (added subject check)
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Name, email, subject, and message are required' 
      }, { status: 400 });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please enter a valid email address' 
      }, { status: 400 });
    }

    // Send email
    const emailSent = await sendEmail({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });

    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    }, { status: 500 });
  }
}