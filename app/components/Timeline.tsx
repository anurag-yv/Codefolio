"use client"

import React from 'react'
import { motion } from 'framer-motion'

const timelineData = [
  {
    id: 1,
    type: 'education',
    date: '2023 - Present',
    title: 'B.Tech Computer Science Engineering',
    organization: 'Lovely Professional University, Punjab',
    result: '9.00 CGPA',
    resultType: 'cgpa',
    description: 'Currently pursuing B.Tech in Computer Science Engineering with a focus on software development, data structures, and system design. Actively building projects and improving coding skills through practical implementation.',
    skills: ['Java', 'React', 'DSA', 'System Design']
  },
  {
    id: 2,
    type: 'education',
    date: '2022-2023',
    title: 'Class 12 (Senior Secondary)',
    organization: 'Vardhman Public School, Mirzapur, Uttar Pradesh',
    result: '93.40%',
    resultType: 'percentage',
    description: 'Completed senior secondary education with a focus on Physics, Chemistry, and Mathematics. Strengthened problem-solving skills and logical reasoning abilities.',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Hindi']
  },
  
  {
    id: 3,
    type: 'education',
    date: '2020-2021',
    title: 'Class 10 (Secondary Education)',
    organization: 'Vardhman Public School, Mirzapur, Uttar Pradesh',
    result: '95.60%',
    resultType: 'percentage',
    description: 'Completed secondary education with a strong academic foundation in core subjects. Developed discipline, consistency, and analytical thinking during this phase.',
    skills: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer']
  }
]

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const isEven = index % 2 === 0
  const borderColor = 'border-accent'

  return (
    <motion.div
      className="mb-16 flex w-full items-center relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* LEFT SIDE */}
      <div className={`hidden md:block md:w-1/2 pr-10 ${isEven ? 'opacity-0' : ''}`}>
        {!isEven && (
          <div className={`p-6 border-r-4 ${borderColor} rounded-lg bg-primary/50`}>
            
            {/* TOP ROW */}
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-text leading-snug">
                {item.title}
              </h3>

              {/* RESULT */}
              <span className="text-sm text-accent font-medium whitespace-nowrap">
                {item.result}
              </span>
            </div>

            <p className="text-sm text-accent mt-1">{item.date}</p>

            <p className="text-textLight mt-3">
              {item.organization}
            </p>

            <p className="text-textLight mt-4 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1 border border-accent/30 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CENTER DOT */}
      <div className="flex items-center justify-center z-10">
        <div className="w-3 h-3 rounded-full bg-accent"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className={`hidden md:block md:w-1/2 pl-10 ${!isEven ? 'opacity-0' : ''}`}>
        {isEven && (
          <div className={`p-6 border-l-4 ${borderColor} rounded-lg bg-primary/50`}>
            
            {/* TOP ROW */}
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-text leading-snug">
                {item.title}
              </h3>

              {/* RESULT */}
              <span className="text-sm text-accent font-medium whitespace-nowrap">
                {item.result}
              </span>
            </div>

            <p className="text-sm text-accent mt-1">{item.date}</p>

            <p className="text-textLight mt-3">
              {item.organization}
            </p>

            <p className="text-textLight mt-4 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1 border border-accent/30 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE VIEW */}
      <div className="block md:hidden w-full pl-4">
        <div className={`p-5 border-l-4 ${borderColor} rounded-lg bg-primary/50`}>
          
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-text">
              {item.title}
            </h3>

            <span className="text-sm text-accent font-medium">
              {item.result}
            </span>
          </div>

          <p className="text-sm text-accent mt-1">{item.date}</p>

          <p className="text-textLight mt-3">
            {item.organization}
          </p>

          <p className="text-textLight mt-4 leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.skills.map((skill, i) => (
              <span key={i} className="text-xs px-3 py-1 border border-accent/30 rounded">
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

      <h2 className="text-2xl font-semibold text-center text-text mb-4">
        Education
      </h2>

      <p className="text-textLight mb-12 max-w-2xl mx-auto text-center">
        My academic journey reflects consistent growth, strong fundamentals, and a continuous effort to improve both technically and analytically.
      </p>

      <div className="relative container mx-auto px-4">
        
        {/* VERTICAL LINE */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-accent/40" />

        {timelineData.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Timeline