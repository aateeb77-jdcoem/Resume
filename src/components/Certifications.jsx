import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const certifications = [
    {
        title: 'Python Full Stack Development',
        issuer: 'AICTE & EduSkills Academy',
        type: 'Virtual Internship',
        duration: '10 Weeks',
        date: 'Jan – Mar 2026',
        description: 'Full stack development with Python, covering frontend, backend, and project-based learning under Ministry of Education & AICTE.',
        icon: '🐍',
        color: '#00F5FF',
    },
    {
        title: 'AI-ML Virtual Internship',
        issuer: 'Industry Certification',
        type: 'Virtual Internship',
        duration: '10 Weeks',
        date: '2025',
        description: 'Hands-on training in Artificial Intelligence and Machine Learning fundamentals with real-world project implementation.',
        icon: '🧠',
        color: '#7B61FF',
    },
    {
        title: 'Android Developer Internship',
        issuer: 'Mobile Development',
        type: 'Internship',
        duration: '8 Weeks',
        date: '2025',
        description: 'Built Android applications using modern development practices, UI/UX design, and API integration.',
        icon: '📱',
        color: '#FF6B9D',
    },
    {
        title: 'NPTEL Operating Systems',
        issuer: 'IIT Madras',
        type: 'Online Certification',
        duration: '12 Weeks',
        date: '2025',
        description: 'Comprehensive study of OS concepts including process management, memory management, and file systems.',
        icon: '⚙️',
        color: '#00d4ff',
    },
    {
        title: 'Advanced C++ Programming',
        issuer: 'IIT Bombay',
        type: 'Online Certification',
        duration: '8 Weeks',
        date: '2025',
        description: 'In-depth C++ covering OOP, STL, templates, memory management, and advanced programming paradigms.',
        icon: '💻',
        color: '#FFD93D',
    },
    {
        title: 'Machine Learning Fundamentals',
        issuer: 'L&T EduTech',
        type: 'Course Pathway',
        duration: '36 Hours',
        date: '2025',
        description: 'Completed 6 courses covering core machine learning concepts, algorithms, model training, and evaluation techniques.',
        icon: '🤖',
        color: '#4FC3F7',
    },
]

export default function Certifications() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cert-title-el', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="section-container">
            <div className="cert-title-el" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title">Certifications</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Verified credentials that validate my skills and knowledge.
                </p>
            </div>

            <div className="cert-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                maxWidth: '1000px',
                margin: '0 auto',
            }}>
                {certifications.map((cert, i) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.3 },
                        }}
                        className="glass-card"
                        style={{
                            padding: '28px 24px',
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Glow accent */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${cert.color}12, transparent 70%)`,
                            pointerEvents: 'none',
                        }} />

                        {/* Header row: icon + title */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px', position: 'relative' }}>
                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '16px',
                                background: `${cert.color}12`,
                                border: `1px solid ${cert.color}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                flexShrink: 0,
                            }}>
                                {cert.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: '#fff',
                                    lineHeight: 1.3,
                                    marginBottom: '4px',
                                }}>
                                    {cert.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.78rem',
                                    color: cert.color,
                                    fontWeight: 500,
                                }}>
                                    {cert.issuer}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.82rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                            marginBottom: '16px',
                        }}>
                            {cert.description}
                        </p>

                        {/* Meta tags row */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            alignItems: 'center',
                        }}>
                            <span style={{
                                padding: '3px 10px',
                                borderRadius: '6px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                fontSize: '0.68rem',
                                color: 'var(--text-secondary)',
                            }}>
                                📅 {cert.date}
                            </span>
                            <span style={{
                                padding: '3px 10px',
                                borderRadius: '6px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                fontSize: '0.68rem',
                                color: 'var(--text-secondary)',
                            }}>
                                ⏱ {cert.duration}
                            </span>
                            <span style={{
                                padding: '3px 10px',
                                borderRadius: '6px',
                                background: `${cert.color}10`,
                                border: `1px solid ${cert.color}25`,
                                fontSize: '0.68rem',
                                color: cert.color,
                            }}>
                                {cert.type}
                            </span>
                            <span style={{
                                padding: '3px 10px',
                                borderRadius: '6px',
                                background: 'rgba(34,197,94,0.1)',
                                border: '1px solid rgba(34,197,94,0.2)',
                                fontSize: '0.68rem',
                                color: '#22c55e',
                                marginLeft: 'auto',
                            }}>
                                ✓ Verified
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

