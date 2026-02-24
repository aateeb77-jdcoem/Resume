import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
    {
        title: 'Build.exe Hackathon 2026',
        description: 'Competed and showcased innovative AI-powered solutions at one of the premier coding hackathons.',
        icon: '🏆',
        year: '2026',
    },
    {
        title: 'Techalfa Hackathon 2026',
        description: 'Demonstrated technical excellence with data-driven applications and real-time systems.',
        icon: '⚡',
        year: '2026',
    },
    {
        title: 'Joint Secretary — Departmental Forum',
        description: 'Led departmental initiatives, organized technical events, and fostered a culture of innovation.',
        icon: '🎯',
        year: 'Leadership',
    },
    {
        title: 'Publicity Co-Head — SRC',
        description: 'Drove publicity and outreach strategies for the Student Representative Council.',
        icon: '📢',
        year: 'Leadership',
    },
]

export default function Achievements() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.achievements-title-el', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })

            gsap.utils.toArray('.timeline-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                    },
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out',
                })
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="section-container">
            <div className="achievements-title-el" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title">Achievements</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Milestones and leadership roles that define my journey.
                </p>
            </div>

            {/* Timeline */}
            <div className="timeline-container" style={{
                position: 'relative',
                maxWidth: '700px',
                margin: '0 auto',
            }}>
                {/* Glowing connector beam */}
                <div className="timeline-line" style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(180deg, #00F5FF, #7B61FF, #00F5FF)',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 15px rgba(0,245,255,0.3), 0 0 30px rgba(123,97,255,0.2)',
                    borderRadius: '1px',
                }} />

                {achievements.map((item, i) => (
                    <div
                        key={i}
                        className="timeline-item"
                        style={{
                            display: 'flex',
                            justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                            position: 'relative',
                            marginBottom: '48px',
                            paddingLeft: i % 2 === 0 ? '0' : '0',
                            paddingRight: i % 2 === 0 ? '0' : '0',
                        }}
                    >
                        {/* Node dot */}
                        <div className="timeline-dot" style={{
                            position: 'absolute',
                            left: '50%',
                            top: '24px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'var(--bg-dark)',
                            border: '3px solid #00F5FF',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 0 15px rgba(0,245,255,0.5)',
                            zIndex: 2,
                        }} />

                        {/* Card */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="glass-card"
                            style={{
                                width: 'calc(50% - 40px)',
                                padding: '24px',
                                cursor: 'default',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                <span style={{
                                    fontSize: '0.72rem',
                                    color: 'var(--neon-blue)',
                                    fontWeight: 600,
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    padding: '2px 10px',
                                    borderRadius: '6px',
                                    background: 'rgba(0,245,255,0.1)',
                                    border: '1px solid rgba(0,245,255,0.2)',
                                }}>
                                    {item.year}
                                </span>
                            </div>
                            <h3 style={{
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                fontFamily: "'Space Grotesk', sans-serif",
                                color: '#fff',
                                marginBottom: '8px',
                            }}>
                                {item.title}
                            </h3>
                            <p style={{
                                fontSize: '0.82rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.5,
                            }}>
                                {item.description}
                            </p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}
