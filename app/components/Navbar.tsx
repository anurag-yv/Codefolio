"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [clickedSection, setClickedSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)

      if (!clickedSection) {
        const sections = ['about', 'projects', 'certificates', 'timeline', 'contact']

        const currentSection = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // ✅ FIX: better detection
            return rect.top <= 150 && rect.bottom >= 150
          }
          return false
        })

        if (currentSection) {
          setActiveSection(currentSection)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [clickedSection])

  const navItems = ['about', 'projects', 'certificates', 'timeline', 'contact']

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -90 // ✅ FIX: adjust for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleClick = (e: any, item: string) => {
    e.preventDefault()
    setActiveSection(item)
    setClickedSection(item)

    scrollToSection(item)

    setTimeout(() => {
      setClickedSection('')
    }, 800)
  }

  return (
    <div className="w-full flex justify-center">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        className={`${scrolled ? 'bg-primary/40' : 'bg-primary/25'} 
          backdrop-blur-xl fixed w-[95%] sm:w-[90%] lg:w-[85%] top-4 z-50 py-3 sm:py-4 px-4 sm:px-6 transition-all duration-500
          ${hovering ? 'shadow-[0_15px_40px_-10px_rgba(100,255,218,0.4)]' : 'shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]'} 
          border border-accent/20 max-w-6xl rounded-xl`}
      >
        <div className="flex justify-between items-center w-full">
          
          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.div key={item}>
                <Link 
                  href={`#${item}`} 
                  className={`nav-item relative group ${activeSection === item ? 'text-accent' : 'text-textLight'}`}
                  onClick={(e) => handleClick(e, item)}
                >
                  <span className="relative z-10 hover:text-accent transition">
                    {item === 'timeline' ? 'Education' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>

                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                    animate={{ width: activeSection === item ? '100%' : '0%' }}
                  ></motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Social + Mobile */}
          <div className="flex items-center space-x-4">
            <a href="https://github.com/anurag-yv" target="_blank"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/anurag-yv/" target="_blank"><FaLinkedin /></a>
            <a href="https://twitter.com/" target="_blank"><FaTwitter /></a>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[95%] z-40 bg-primary/70 backdrop-blur-xl md:hidden rounded-xl">
            <div className="py-4 px-6 flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className={`${activeSection === item ? 'text-accent' : 'text-textLight'}`}
                  onClick={(e) => {
                    handleClick(e, item)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item === 'timeline' ? 'Experience' : item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar