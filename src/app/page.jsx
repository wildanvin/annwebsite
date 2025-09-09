"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "@/components/Loader"
import Countdown from "@/components/Countdown"
import DaysTogether from "@/components/DaysTogether"
import PhotoGallery from "@/components/PhotoGallery"
import Message from "@/components/Message"
import FloatingElements from "@/components/FloatingElements"
import TapToReveal from "@/components/TapToReveal"
import MusicPlayer from "@/components/MusicPlayer"

// Change this to your anniversary date
const ANNIVERSARY_DATE = "2025-08-02T12:00:00"
// Change this to the date you got together
const TOGETHER_DATE = "2019-08-02T12:00:00"

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
    { src: "/image1.jpg", alt: "Tú + Yo, para siempre 💑⏱️" },
    { src: "/image2.jpg", alt: "Instante especial" },
    { src: "/image3.jpg", alt: "Solo nosotros, en sintonía 💑💞" },
    { src: "/image4.jpg", alt: "Juntos" },
    { src: "/image5.jpg", alt: "Dos corazones, un mismo tiempo 🕰️❤️🤝" },
    { src: "/image6.jpg", alt: "Momentos felices" },
    { src: "/image7.jpg", alt: "📸 Cuando dijo 'yo también te amo' 💖" },
  ]

  // Change this message according to you
  const message = `Mi amor,
Cada paso a tu lado ha sido la mejor parte de mi historia. Contigo el tiempo se siente ligero y cada día trae una nueva razón para sonreír.
Desde aquel primer momento hasta hoy, llenas mi mundo de calma, risas y cariño sincero. Tu mirada levanta mis días grises y tu abrazo me hace sentir invencible.
Hoy celebramos otro año juntos y no puedo evitar amar más todo lo que somos. Gracias por ser mi compañera, mi confidente y mi destino favorito.
Feliz aniversario. Que sigamos creando recuerdos que hagan brillar el futuro.
Con todo mi corazón,
Yash Kewat`

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <FloatingElements />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : !showContent ? (
          <motion.div
            key="countdown-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 relative"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="absolute bottom-1/4 left-1/4 w-20 h-20 text-5xl animate-bounce"
                style={{ animationDelay: "1.5s" }}
              >
                💝
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className="text-center mb-12 relative"
            >
              <div className="absolute -top-16 -left-16 w-32 h-32 text-5xl animate-float">🌸</div>
              <div className="absolute -bottom-28 -right-14 w-32 h-32 text-5xl animate-float-delay">🌺</div>

                <h1 className="text-4xl md:text-5xl py-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4 animate-gradient">
                  ¡Nuestro aniversario está cerca!
                </h1>
                <p className="text-xl text-purple-700 font-medium">Cuenta regresiva para nuestro día especial ❤️</p>
            </motion.div>

            <Countdown targetDate={ANNIVERSARY_DATE} onComplete={handleCountdownComplete} />
          </motion.div>
        ) : showTapToReveal ? (
          <TapToReveal key="tap-to-reveal" onReveal={handleReveal} />
        ) : (
          <>
            <MusicPlayer playSong={playSong} />
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="container mx-auto px-4 py-8"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="text-center mb-12 relative"
              >
                <div className="absolute -top-2 -left-5 md:-left-10 text-5xl md:text-6xl animate-float">🎉</div>
                <div className="absolute -bottom-10 -right-5 md:-bottom-14 md:-right-10 text-5xl md:text-6xl animate-float-delay">
                  🎊
                </div>

                  <h1 className="text-4xl md:text-6xl py-1 md:py-2 px-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-3 animate-gradient">
                    ¡Feliz aniversario!
                  </h1>
                  <p className="text-xl text-purple-700 font-medium">Cada momento contigo es un regalo ❤️</p>
              </motion.div>

              <DaysTogether startDate={TOGETHER_DATE} animationDuration={3} />

              <PhotoGallery photos={photos} />

              <Message message={message} />

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mt-16 mb-8 text-pink-600"
              >
                <p className="text-lg font-medium">Hecho con ❤️ por YASH KEWAT</p>
              </motion.footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
