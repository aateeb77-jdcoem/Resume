import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const mainRef = useRef(null)
  const cursorRef = useRef(null)

  // Lenis hyper-smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.075,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 0.8,
    })

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Cursor light — GPU-accelerated via transform
  useEffect(() => {
    let rafId = null
    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`
        }
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setLoading(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          ref={mainRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Cursor following light */}
          <div ref={cursorRef} className="cursor-light" />

          {/* Background particle field */}
          <ParticleField />

          {/* Navigation */}
          <Navbar />

          {/* Main sections */}
          <main>
            <section id="hero">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="achievements">
              <Achievements />
            </section>
            <section id="certifications">
              <Certifications />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </main>

          {/* Footer */}
          <footer style={{
            textAlign: 'center',
            padding: '40px 24px',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p>© 2026 Ahsan Ateeb. Crafted with passion & code.</p>
          </footer>
        </motion.div>
      )}
    </>
  )
}

export default App
