import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Campus Chaos Coordinator',
        description: 'Real-time campus coordination platform with role-based dashboards and AI-powered management.',
        tech: ['Firebase', 'Google Gemini AI', 'Firestore', 'Real-time Sync'],
        highlights: [
            'Real-time campus coordination using Firebase',
            'Role-based dashboards for admins, faculty & students',
            'Google Gemini AI integration for smart assistance',
            'Centralized Firestore architecture',
        ],
        gradient: 'linear-gradient(135deg, #00F5FF20, #7B61FF20)',
        accent: '#00F5FF',
    },
    {
        title: 'Event Booking Management System',
        description: 'Intelligent event recommendations using content-based filtering and data analysis.',
        tech: ['Cosine Similarity', 'NumPy', 'Pandas', 'Python'],
        highlights: [
            'Content-based recommendation engine',
            'Cosine Similarity matching algorithm',
            'Comprehensive data analysis with NumPy + Pandas',
            'Optimized booking flow',
        ],
        gradient: 'linear-gradient(135deg, #7B61FF20, #FF6B9D20)',
        accent: '#7B61FF',
    },
    {
        title: 'AI-Powered Hyper-Local Campus Marketplace',
        description: 'Full-stack marketplace with AI scam detection and trust scoring for campus transactions.',
        tech: ['Next.js', 'Supabase', 'Google OAuth', 'Vercel', 'AI'],
        highlights: [
            'Next.js + Supabase full-stack architecture',
            'Google OAuth secure authentication',
            'AI-powered scam detection system',
            'Brownie Point Trust Score for user reputation',
        ],
        gradient: 'linear-gradient(135deg, #00d4ff20, #00F5FF20)',
        accent: '#00d4ff',
    },
    {
        title: 'SmartCart AI',
        description: 'AI-powered product comparison platform with price trend analysis and intelligent chatbot.',
        tech: ['Gemini AI', 'Real-time Data', 'Analytics', 'Chatbot'],
        highlights: [
            'AI-powered product comparison engine',
            '3-month price trend analysis & forecasting',
            'Gemini AI conversational chatbot',
            'Real-time pricing dashboard',
        ],
        gradient: 'linear-gradient(135deg, #FFD93D20, #FF6B9D20)',
        accent: '#FFD93D',
    },
]

function ProjectCard({ project, index }) {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 40
        const rotateY = (centerX - x) / 40

        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
        }
        setIsHovered(false)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <div
                ref={cardRef}
                className="glass-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    padding: '32px',
                    background: project.gradient,
                    transition: 'transform 0.1s ease, box-shadow 0.4s ease',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Accent light */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${project.accent}10, transparent 70%)`,
                    transform: 'translate(30%, -30%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: project.accent,
                            boxShadow: `0 0 12px ${project.accent}60`,
                        }} />
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: '#fff',
                        }}>
                            {project.title}
                        </h3>
                    </div>

                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                    }}>
                        {project.description}
                    </p>

                    {/* Highlights */}
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        marginBottom: '20px',
                        display: 'grid',
                        gap: '8px',
                    }}>
                        {project.highlights.map((h, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: '0.82rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.4,
                            }}>
                                <span style={{ color: project.accent, flexShrink: 0 }}>▸</span>
                                {h}
                            </li>
                        ))}
                    </ul>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    fontSize: '0.72rem',
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.3px',
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.projects-title-el', {
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
            <div className="projects-title-el" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    A collection of projects that showcase my passion for building intelligent, impactful solutions.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
                gap: '28px',
            }}>
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </div>
        </div>
    )
}
