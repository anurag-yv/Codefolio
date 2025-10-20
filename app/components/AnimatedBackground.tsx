"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const stars: Star[] = []
    const clouds: Cloud[] = []

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Star class for twinkling effect
    class Star {
      x: number
      y: number
      radius: number
      opacity: number
      twinkleSpeed: number

      constructor() {
        const width = canvas?.width || 0
        const height = canvas?.height || 0
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = Math.random()
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
      }

      update(time: number) {
        this.opacity = Math.abs(Math.sin(time * this.twinkleSpeed)) * 0.8 + 0.2
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Cloud class for drifting, soft clouds
    class Cloud {
      x: number
      y: number
      size: number
      speed: number
      color: string

      constructor() {
        const width = canvas?.width || 0
        const height = canvas?.height || 0
        this.x = Math.random() * width
        this.y = Math.random() * height * 0.6
        this.size = Math.random() * 80 + 40
        this.speed = Math.random() * 0.3 + 0.1
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
      }

      update() {
        const width = canvas?.width || 0
        const height = canvas?.height || 0
        this.x += this.speed
        if (this.x > width + this.size) {
          this.x = -this.size
          this.y = Math.random() * height * 0.6
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2)
        ctx.arc(this.x + this.size * 0.4, this.y - this.size * 0.1, this.size * 0.4, 0, Math.PI * 2)
        ctx.arc(this.x + this.size * 0.8, this.y, this.size * 0.3, 0, Math.PI * 2)
        ctx.arc(this.x + this.size * 0.2, this.y + this.size * 0.1, this.size * 0.35, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize
    for (let i = 0; i < 100; i++) stars.push(new Star())
    for (let i = 0; i < 8; i++) clouds.push(new Cloud())

    const animate = (time: number) => {
      if (!ctx || !canvas) return

      const width = canvas?.width || 0
      const height = canvas?.height || 0

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#0f0f23')
      gradient.addColorStop(0.3, '#1a1a3a')
      gradient.addColorStop(0.7, '#2a1a4a')
      gradient.addColorStop(1, '#1a0f2a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      clouds.forEach(cloud => {
        cloud.update()
        cloud.draw()
      })

      stars.forEach(star => {
        star.update(time)
        star.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const auroraWaves = [
    { top: '10%', color: 'from-indigo-500 to-purple-600', delay: 0 },
    { top: '30%', color: 'from-purple-600 to-pink-500', delay: 5 },
    { top: '50%', color: 'from-pink-500 to-violet-600', delay: 10 },
  ]

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
      />

      {auroraWaves.map((wave, index) => (
       <motion.div
  key={index}
  className="fixed left-0 w-full h-1/2 bg-gradient-to-r"
  style={{
    top: wave.top,
    backgroundImage: `linear-gradient(to right, ${wave.color.replace('from-', '').replace('to-', ', ')})`,
  }}
  initial={{ x: '-100%' }}
  animate={{
    x: ['-100%', '100%', '-100%'],
    opacity: [0.1, 0.3, 0.1]
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    delay: wave.delay,
    ease: 'easeInOut'
  }}
/>

      ))}

      <div className="fixed inset-0 pointer-events-none -z-5">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none -z-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
    </>
  )
}

export default AnimatedBackground
