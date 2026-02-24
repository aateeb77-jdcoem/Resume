import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cubeFaces = [
    {
        title: 'Education',
        content: 'JD College of Engineering and Management',
        sub: '2024 – 2028',
        icon: '🎓',
    },
    {
        title: 'Academic Performance',
        content: 'CGPA: 7.91',
        sub: 'Consistent academic excellence',
        icon: '📊',
    },
    {
        title: 'Passion',
        content: 'AI & Machine Learning',
        sub: 'Exploring the frontiers of intelligent systems',
        icon: '🤖',
    },
    {
        title: 'Approach',
        content: 'Data-Driven Problem Solving',
        sub: 'Turning complex data into actionable insights',
        icon: '🔬',
    },
]

export default function About() {
    const sectionRef = useRef(null)
    const [activeFace, setActiveFace] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-title-el', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            gsap.from('.about-content', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Auto-rotate faces
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFace((prev) => (prev + 1) % cubeFaces.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const currentFace = cubeFaces[activeFace]

    return (
        <div ref={sectionRef} className="section-container">
            <div className="about-title-el" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title">About Me</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    A passionate engineer on a mission to build intelligent, data-powered solutions.
                </p>
            </div>

            <div className="about-content" style={{
                display: 'flex',
                gap: '48px',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {/* Animated Card Display */}
                <div className="about-card-display" style={{
                    width: '300px',
                    height: '300px',
                    flexShrink: 0,
                    position: 'relative',
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFace}
                            initial={{ opacity: 0, scale: 0.9, rotateY: 40 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotateY: -40 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="glass-card"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '32px',
                                textAlign: 'center',
                                boxShadow: '0 0 30px rgba(0,245,255,0.1), inset 0 0 30px rgba(0,245,255,0.02)',
                            }}
                        >
                            <span style={{ fontSize: '3rem', marginBottom: '16px' }}>{currentFace.icon}</span>
                            <h3 style={{
                                fontSize: '0.85rem',
                                color: 'var(--neon-blue)',
                                fontWeight: 600,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '12px',
                            }}>
                                {currentFace.title}
                            </h3>
                            <p style={{
                                fontSize: '1.15rem',
                                fontWeight: 600,
                                color: '#fff',
                                marginBottom: '8px',
                                lineHeight: 1.4,
                            }}>
                                {currentFace.content}
                            </p>
                            <p style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.5,
                            }}>
                                {currentFace.sub}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Face selector cards */}
                <div className="about-selector" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    maxWidth: '400px',
                }}>
                    {cubeFaces.map((face, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 4 }}
                            onClick={() => setActiveFace(i)}
                            style={{
                                padding: '20px 24px',
                                borderRadius: '16px',
                                background: activeFace === i ? 'rgba(0,245,255,0.08)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${activeFace === i ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                <span>{face.icon}</span>
                                <span style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: activeFace === i ? '#00F5FF' : '#fff',
                                }}>
                                    {face.content}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '36px' }}>
                                {face.sub}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
