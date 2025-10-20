"use client"

import React from 'react'
import { motion } from 'framer-motion'

// Mock data - replace with actual data
const timelineData = [
 
  {
    id: 1,
    type: 'education',
    date: '2019 - 2023',
    title: 'High School Education',
    organization: 'Vardhman Public School, Mirzapur, Uttar Pradesh',
    description: 'Completed high school education with focus on science and mathematics. Developed strong foundation in core subjects that prepared me for engineering studies.',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Critical Thinking', 'Scientific Analysis']
  },
  {
    id: 2,
    type: 'education',
    date: '2023 - Present',
    title: 'Bachelor of Technology in Computer Science Engineering',
    organization: 'Lovely Professional University, Phagwara, Punjab',
    description: 'Currently pursuing B.Tech in Computer Science Engineering. Learning the core principles of computer engineering, including data structures, algorithms, operating systems, and software development methodologies. Actively participating in coding competitions and technical projects to enhance practical skills.',
    skills: ['Java', 'C/C++', 'HTML/CSS', 'Tailwind CSS','React', 'Javascript', 'Next.js', 'Express.js', 'Kotlin', 'System Design', 'PHP', 'Data Structures', 'Algorithms', 'Object-Oriented Programming']
  }
]

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const isEven = index % 2 === 0
  const isEducation = item.type === 'education'
  const borderColor = isEducation ? 'border-accent' : 'border-textLight'
  const iconBgColor = isEducation ? 'bg-accent/20 text-accent' : 'bg-textLight/20 text-textLight'
  
  return (
    <motion.div 
      className="mb-16 flex w-full items-center relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Left side content for desktop */}
      <div className={`hidden md:block md:w-1/2 pr-8 relative ${isEven ? 'opacity-0' : ''}`}>
        {!isEven && (
          <div className={`card w-full border-r-4 ${borderColor} p-6 shadow-md rounded-lg bg-primary/50 backdrop-blur-sm`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <span className="text-sm text-accent font-medium">{item.date}</span>
            </div>
            
            <p className="text-base text-textLight mb-2">{item.organization}</p>
            <p className="text-textLight mb-4">{item.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="text-xs bg-primary/80 px-3 py-1 rounded-full border border-accent/30 text-textLight hover:bg-accent/20 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Connector line for left side */}
        {!isEven && (
          <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-accent transform -translate-y-1/2"></div>
        )}
      </div>
      
      {/* Center column with timeline */}
      <div className="flex items-center justify-center relative z-10">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${iconBgColor} flex items-center justify-center shadow-lg border border-accent/30`}>
          {isEducation ? '🎓' : '💼'}
        </div>
      </div>
      
      {/* Right side content for desktop */}
      <div className={`hidden md:block md:w-1/2 pl-8 relative ${!isEven && 'md:opacity-0'}`}>
        {/* Connector line for right side */}
        {isEven && (
          <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-accent transform -translate-y-1/2"></div>
        )}
        {isEven && (
          <div className={`card w-full border-l-4 ${borderColor} p-6 shadow-md rounded-lg bg-primary/50 backdrop-blur-sm`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <span className="text-sm text-accent font-medium">{item.date}</span>
            </div>
            
            <p className="text-base text-textLight mb-2">{item.organization}</p>
            <p className="text-textLight mb-4">{item.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="text-xs bg-primary/80 px-3 py-1 rounded-full border border-accent/30 text-textLight hover:bg-accent/20 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile view - always show content */}
      <div className="block md:hidden w-full pl-4">
        <div className={`card w-full border-l-4 ${borderColor} p-4 shadow-md rounded-lg bg-primary/50 backdrop-blur-sm`}>
          <div className="flex flex-col mb-2">
            <h3 className="text-lg font-semibold text-text">{item.title}</h3>
            <span className="text-sm text-accent font-medium mt-1">{item.date}</span>
          </div>
          
          <p className="text-base text-textLight mb-2">{item.organization}</p>
          <p className="text-sm text-textLight mb-4">{item.description}</p>
          
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="text-xs bg-primary/80 px-2 py-0.5 rounded-full border border-accent/30 text-textLight">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 scroll-mt-20">
      <div className="section-heading-container">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education & Experience
        </motion.h2>
      </div>
      
      <motion.p 
        className="text-textLight mb-12 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        My professional journey and educational background that have shaped my skills and expertise.
      </motion.p>
      
      <div className="relative container mx-auto px-4">
        {/* Vertical timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent/10 via-accent/50 to-accent/10" />
        
        <div className="space-y-2">
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline