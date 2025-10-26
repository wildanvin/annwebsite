'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from '@/components/Loader'
import Countdown from '@/components/Countdown'
import DaysTogether from '@/components/DaysTogether'
import PhotoGallery from '@/components/PhotoGallery'
import Message from '@/components/Message'
import FloatingElements from '@/components/FloatingElements'
import TapToReveal from '@/components/TapToReveal'
import MusicPlayer from '@/components/MusicPlayer'

// Change this to your anniversary date
const ANNIVERSARY_DATE = '2025-07-26T12:00:00'
// Change this to the date you got together
const TOGETHER_DATE = '2025-03-26T12:00:00'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showTapToReveal, setShowTapToReveal] = useState(false)
  const [playSong, setPlaySong] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if the anniversary date has passed
    const now = new Date()
    const anniversary = new Date(ANNIVERSARY_DATE)
    if (now >= anniversary) {
      setShowContent(true)
      setShowTapToReveal(true)
    }
  }, [])

  const handleCountdownComplete = () => {
    setShowContent(true)
    setShowTapToReveal(true)
  }

  const handleReveal = () => {
    setShowTapToReveal(false)
    setShowContent(true)

    // Start music after a delay
    setTimeout(() => {
      setPlaySong(true)
    }, 1000)
  }

  // Add your photos here
  const photos = [
    { src: '/image1.jpeg', alt: 'Tú + Yo 💑⏱️' },
    { src: '/image2.jpeg', alt: 'En Baños' },
    { src: '/image3.jpeg', alt: 'Chilleandooo 💑💞' },
    { src: '/image4.jpeg', alt: 'Con dinosaurios' },
    { src: '/image5.jpeg', alt: 'En Baños x2 ❤️' },
    { src: '/image6.jpeg', alt: 'Te amo' },
    { src: '/image7.jpeg', alt: '📸 El 26 de Abril de 2025 💖' },
  ]

  // Change this message according to you
  const message = `Estimada Pau,

Muchas gracias por compartir conmigo estos 6 meses.

En este tiempo me has enseñado muchas cosas y también a conocerme más a mí mismo.
Me inspiras a seguir esforzándome y a ser mejor persona y profesional. Estoy muy agradecido por habernos conocido, ser noviecitos y pasar este tiempo juntos.
De aquí nos faltan un millón de días más por estar juntos. Te prometo que me esforzaré al máximo y daré lo mejor de mí para ser un buen equipo y una bonita y millonaria ohana. 

Te amo mucho y estaremos juntos hasta viejitos. `

  return (
    <main className='min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100'>
      <FloatingElements />

      <AnimatePresence mode='wait'>
        {loading ? (
          <Loader key='loader' />
        ) : !showContent ? (
          <motion.div
            key='countdown-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center justify-center min-h-screen p-4 relative'
          >
            <motion.div
              className='absolute top-0 left-0 w-full h-full pointer-events-none'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className='absolute bottom-1/4 left-1/4 w-20 h-20 text-5xl animate-bounce'
                style={{ animationDelay: '1.5s' }}
              >
                💝
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                delay: 0.2,
              }}
              className='text-center mb-12 relative'
            >
              <div className='absolute -top-16 -left-16 w-32 h-32 text-5xl animate-float'>
                🌸
              </div>
              <div className='absolute -bottom-28 -right-14 w-32 h-32 text-5xl animate-float-delay'>
                🌺
              </div>

              <h1 className='text-4xl md:text-5xl py-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4 animate-gradient'>
                ¡Nuestro aniversario está cerca!
              </h1>
              <p className='text-xl text-purple-700 font-medium'>
                Cuenta regresiva para nuestro día especial ❤️
              </p>
            </motion.div>

            <Countdown
              targetDate={ANNIVERSARY_DATE}
              onComplete={handleCountdownComplete}
            />
          </motion.div>
        ) : showTapToReveal ? (
          <TapToReveal key='tap-to-reveal' onReveal={handleReveal} />
        ) : (
          <>
            <MusicPlayer playSong={playSong} />
            <motion.div
              key='content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='container mx-auto px-4 py-8'
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  delay: 0.3,
                }}
                className='text-center mb-12 relative'
              >
                <div className='absolute -top-2 -left-5 md:-left-10 text-5xl md:text-6xl animate-float'>
                  🎉
                </div>
                <div className='absolute -bottom-10 -right-5 md:-bottom-14 md:-right-10 text-5xl md:text-6xl animate-float-delay'>
                  🎊
                </div>

                <h1 className='text-4xl md:text-6xl py-1 md:py-2 px-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-3 animate-gradient'>
                  ¡Felices 6 meses!
                </h1>
                <p className='text-xl text-purple-700 font-medium'>
                  Eres mi suerte ❤️
                </p>
              </motion.div>

              <DaysTogether startDate={TOGETHER_DATE} animationDuration={3} />

              <PhotoGallery photos={photos} />

              <Message message={message} />

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className='text-center mt-16 mb-8 text-pink-600'
              >
                <p className='text-lg font-medium'>Hecho con ❤️ por Dani</p>
              </motion.footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
