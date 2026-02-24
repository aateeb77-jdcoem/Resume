import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const certifications = [
    {
        title: 'AI-ML Virtual Internship',
        issuer: 'Industry Certification',
        icon: '🧠',
        color: '#00F5FF',
    },
    {
        title: 'Android Developer Internship',
        issuer: 'Mobile Development',
        icon: '📱',
        color: '#7B61FF',
    },
    {
        title: 'NPTEL Operating Systems',
        issuer: 'IIT Madras',
        icon: '⚙️',
        color: '#00d4ff',
    },
    {
        title: 'Advanced C++ (IIT Bombay)',
        issuer: 'IIT Bombay',
        icon: '💻',
        color: '#FFD93D',
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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                maxWidth: '900px',
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
                            padding: '32px 24px',
                            textAlign: 'center',
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Glow accent */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '50%',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${cert.color}15, transparent 70%)`,
                            transform: 'translateX(-50%)',
                            pointerEvents: 'none',
                        }} />

                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: `${cert.color}12`,
                            border: `1px solid ${cert.color}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            fontSize: '1.8rem',
                            position: 'relative',
                        }}>
                            {cert.icon}
                        </div>

                        <h3 style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: '#fff',
                            marginBottom: '8px',
                            lineHeight: 1.3,
                        }}>
                            {cert.title}
                        </h3>

                        <p style={{
                            fontSize: '0.75rem',
                            color: cert.color,
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                        }}>
                            {cert.issuer}
                        </p>

                        {/* Verified badge */}
                        <div style={{
                            marginTop: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            background: 'rgba(34,197,94,0.1)',
                            border: '1px solid rgba(34,197,94,0.2)',
                            fontSize: '0.68rem',
                            color: '#22c55e',
                        }}>
                            ✓ Verified
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
