import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const roles = ['Data Science Engineer', 'AI Enthusiast']

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const heroRef = useRef(null)
    const cardRef = useRef(null)
    const profileRef = useRef(null)



    // Typing animation
    useEffect(() => {
        const current = roles[currentRole]
        const speed = isDeleting ? 40 : 80

        if (!isDeleting && displayText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
            return
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
            return
        }

        const timer = setTimeout(() => {
            setDisplayText(
                isDeleting
                    ? current.substring(0, displayText.length - 1)
                    : current.substring(0, displayText.length + 1)
            )
        }, speed)

        return () => clearTimeout(timer)
    }, [displayText, isDeleting, currentRole])

    // GSAP entry animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
            gsap.from('.hero-subtitle', { y: 40, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out' })
            gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 1, delay: 0.9, ease: 'power3.out' })
            gsap.from('.hero-profile', { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.4, ease: 'elastic.out(1, 0.5)' })
        }, heroRef)
        return () => ctx.revert()
    }, [])

    // 3D tilt based on cursor
    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 30
        const rotateY = (centerX - x) / 30

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
            cardRef.current.style.transition = 'transform 0.5s ease'
        }
    }, [])



    return (
        <div
            ref={heroRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '120px 24px 80px',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="glass"
                style={{
                    maxWidth: '1000px',
                    width: '100%',
                    padding: 'clamp(32px, 5vw, 60px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '48px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 120px rgba(0, 245, 255, 0.05)',
                    transition: 'transform 0.1s ease',
                }}
            >
                {/* Profile Picture */}
                <div className="hero-profile" style={{ flexShrink: 0 }}>
                    <div
                        ref={profileRef}
                        style={{
                            position: 'relative',
                            width: '220px',
                            height: '220px',
                        }}
                    >
                        {/* Outer pulsing aura */}
                        <div style={{
                            position: 'absolute',
                            inset: '-18px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, rgba(0,255,120,0.08) 40%, transparent 70%)',
                            animation: 'pulse-glow 4s ease-in-out infinite',
                            filter: 'blur(8px)',
                        }} />

                        {/* Spinning gradient ring */}
                        <div style={{
                            position: 'absolute',
                            inset: '-5px',
                            borderRadius: '50%',
                            background: 'conic-gradient(from 0deg, #00F5FF, #00FF78, #00F5FF, #00FF78, #00F5FF)',
                            animation: 'rotate-border 6s linear infinite',
                            filter: 'blur(0.5px)',
                        }} />

                        {/* Inner soft glow ring */}
                        <div style={{
                            position: 'absolute',
                            inset: '-2px',
                            borderRadius: '50%',
                            background: 'conic-gradient(from 180deg, rgba(0,245,255,0.6), rgba(0,255,120,0.6), rgba(0,245,255,0.6), rgba(0,255,120,0.6))',
                            animation: 'rotate-border 6s linear infinite reverse',
                            filter: 'blur(2px)',
                            opacity: 0.5,
                        }} />

                        {/* Inner circle */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: '3px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                background: 'rgba(11, 15, 25, 0.8)',
                                backdropFilter: 'blur(20px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.img
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                src="/profile.jpg"
                                alt="Ahsan Ateeb"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                            {/* Holographic overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(0,245,255,0.05) 0%, transparent 50%, rgba(123,97,255,0.05) 100%)',
                                pointerEvents: 'none',
                            }} />
                        </div>
                    </div>



                    {/* Status indicator */}
                    <div style={{
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            animation: 'status-pulse 2s ease-in-out infinite',
                        }} />
                        <span style={{
                            fontSize: '0.7rem',
                            color: '#22c55e',
                            letterSpacing: '0.5px',
                        }}>
                            Available for Opportunities
                        </span>
                    </div>
                </div>

                {/* Text content */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <motion.p
                        className="hero-subtitle"
                        style={{
                            color: 'var(--neon-blue)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '12px',
                        }}
                    >
                        Welcome to my portfolio
                    </motion.p>

                    <h1
                        className="hero-title"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '16px',
                            background: 'linear-gradient(135deg, #fff 30%, #00F5FF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Ahsan Ateeb
                    </h1>

                    <div
                        className="hero-subtitle"
                        style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                            fontWeight: 300,
                            color: 'var(--text-secondary)',
                            marginBottom: '8px',
                            minHeight: '40px',
                        }}
                    >
                        <span>{displayText}</span>
                        <span style={{
                            borderRight: '2px solid var(--neon-blue)',
                            marginLeft: '2px',
                            animation: 'typing-cursor 1s step-end infinite',
                        }}>&nbsp;</span>
                    </div>

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        marginBottom: '32px',
                        lineHeight: 1.6,
                    }}>
                        📍 Nagpur, India &nbsp;•&nbsp; Building intelligent solutions with data & AI
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                const el = document.getElementById('projects')
                                if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            View Projects
                        </button>
                        <a href="/Resume.pdf" download="Ahsan_Ateeb_Resume.pdf" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                            Download Resume
                        </a>
                    </div>

                    {/* Social links */}
                    <div style={{
                        marginTop: '32px',
                        display: 'flex',
                        gap: '16px',
                    }}>
                        <a href="https://www.linkedin.com/in/ahsan-ateeb" target="_blank" rel="noopener"
                            style={{
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#00F5FF'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            🔗 LinkedIn
                        </a>
                        <a href="https://github.com/aateeb77-jdcoem" target="_blank" rel="noopener"
                            style={{
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#00F5FF'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            💻 GitHub
                        </a>
                        <a href="mailto:aateeb77@gmail.com"
                            style={{
                                color: 'var(--text-muted)',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'color 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#00F5FF'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            ✉️ Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
