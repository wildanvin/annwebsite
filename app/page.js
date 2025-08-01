'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Set your anniversary date here
const ANNIVERSARY_DATE = new Date('2024-12-31T00:00:00')

export default function Home() {
  const [currentSection, setCurrentSection] = useState('loader')
  const [timeLeft, setTimeLeft] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Loader timer
    const loaderTimer = setTimeout(() => {
      setCurrentSection('countdown')
    }, 3000)

    return () => clearTimeout(loaderTimer)
  }, [])

  useEffect(() => {
    if (currentSection === 'countdown') {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = ANNIVERSARY_DATE.getTime() - now

        if (distance < 0) {
          setTimeLeft(null)
          setCurrentSection('reveal')
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentSection])

  const handleReveal = () => {
    setCurrentSection('message')
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
    // Add music logic here when you add the audio file
  }

  if (currentSection === 'loader') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            💖 Loading Something Special...
          </motion.h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto"
          />
        </motion.div>
      </div>
    )
  }

  if (currentSection === 'countdown' && timeLeft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-center"
        >
          <h1 className="text-5xl font-bold mb-8">🎉 Countdown to Our Special Day</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-lg p-6">
              <div className="text-4xl font-bold">{timeLeft.days}</div>
              <div className="text-lg">Days</div>
            </div>
            <div className="bg-white/20 rounded-lg p-6">
              <div className="text-4xl font-bold">{timeLeft.hours}</div>
              <div className="text-lg">Hours</div>
            </div>
            <div className="bg-white/20 rounded-lg p-6">
              <div className="text-4xl font-bold">{timeLeft.minutes}</div>
              <div className="text-lg">Minutes</div>
            </div>
            <div className="bg-white/20 rounded-lg p-6">
              <div className="text-4xl font-bold">{timeLeft.seconds}</div>
              <div className="text-lg">Seconds</div>
            </div>
          </div>
          <button
            onClick={() => setCurrentSection('reveal')}
            className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
          >
            Skip to Surprise 💕
          </button>
        </motion.div>
      </div>
    )
  }

  if (currentSection === 'reveal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-center"
        >
          <h1 className="text-6xl font-bold mb-8">💝</h1>
          <h2 className="text-4xl font-bold mb-8">Ready for Your Surprise?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReveal}
            className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-purple-50 transition-colors"
          >
            Tap to Reveal ✨
          </motion.button>
        </motion.div>
      </div>
    )
  }

  if (currentSection === 'message') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 p-8">
        {/* Music Control */}
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              💖 Happy Anniversary, My Love! 💖
            </h1>
            <p className="text-xl text-white/90">
              A special message just for you...
            </p>
          </motion.div>

          {/* Letter Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 rounded-lg p-8 mb-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              💌 My Dearest Love
            </h2>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              <p>
                Every day with you feels like a celebration, but today is extra special because it marks another year of our beautiful journey together.
              </p>
              <p>
                From the moment you came into my life, everything changed for the better. Your smile lights up my darkest days, your laughter is my favorite melody, and your love is my greatest treasure.
              </p>
              <p>
                Thank you for being my partner, my best friend, and my greatest love. Here&apos;s to many more years of adventures, inside jokes, and endless love.
              </p>
              <p className="text-center font-semibold text-pink-600">
                I love you more than words can express! 💕
              </p>
            </div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
              <p className="text-center mt-2 text-gray-700">Our First Date</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">💑</span>
              </div>
              <p className="text-center mt-2 text-gray-700">Together Forever</p>
            </div>
            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">❤️</span>
              </div>
              <p className="text-center mt-2 text-gray-700">My Heart is Yours</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-12"
          >
            <p className="text-white text-xl font-semibold">
              Happy Anniversary, Beautiful! 🎉💖
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}
