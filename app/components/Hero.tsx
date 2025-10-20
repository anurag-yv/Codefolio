"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'
import { FaFileAlt } from 'react-icons/fa'
import { track } from '@vercel/analytics'

const Hero = () => {
  // Track resume download function
  const trackResumeDownload = () => {
    track('Resume Downloaded');
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-16 md:py-24 lg:py-32 relative">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-2 md:px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
              <span className="text-text">Hi, I'm </span>
              <span className="gradient-text animate-gradient">Anurag Yadav</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-textLight mb-6">
              Software Developer & Problem Solver
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-textLight mb-8 text-base lg:text-lg max-w-lg leading-relaxed">
             I develop fast and reliable applications with clean, scalable code.
             Solving complex challenges through smart and efficient solutions drives me.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.a 
              href="#projects" 
              className="btn-primary border-2 px-6 py-3 font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </motion.a>
            <motion.a 
              href="/files/resumea.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary border-2 border-accent/20 text-accent px-6 py-3 rounded font-medium flex items-center gap-2 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={trackResumeDownload}
            >
              <FaFileAlt className="text-sm" />
              <span>Resume</span>
            </motion.a>
            <motion.a 
              href="#contact" 
              className="bg-accent text-primary px-6 py-3 rounded font-medium transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex justify-center md:justify-end lg:justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Decorative elements */}
            <motion.div 
              className="absolute -inset-4 rounded-full border-2 border-accent/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            
            <motion.div 
              className="absolute -inset-10 rounded-full border border-accent/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            
            <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-accent/80 shadow-2xl shadow-accent/20">
              {/* Check if profile image exists and display it, otherwise show a placeholder */}
              <div className="relative w-full h-full">
                <Image 
                  src="/images/profile.jpg" 
                  alt="Anurag Yadav - Profile Picture"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110 filter saturate-[1.15]"
                  priority
                  onError={(e) => {
                    // Fall back to placeholder on error
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center text-accent">
                  <span className="text-xl font-bold">Profile Photo</span>
                </div>
              </div>
            </div>
            
            {/* Accent dots */}
            <motion.div 
              className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-accent/80"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-accent/60"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-purple-400/60"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Centered Scroll down button */}
      <motion.a 
        href="#projects"  // Or whatever ID you want to scroll to (e.g., #about)
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3 flex items-center gap-2 text-accent font-medium shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/20"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-sm">Scroll Down</span>
          <FaArrowDown className="text-sm" />
        </motion.div>
      </motion.a>
    </section>
  )
}

export default Hero