import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
    { icon: '📞', label: 'Phone', value: '+91-7620347337', href: 'tel:+917620347337' },
    { icon: '✉️', label: 'Email', value: 'aateeb77@gmail.com', href: 'mailto:aateeb77@gmail.com' },
    { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/ahsan-ateeb', href: 'https://www.linkedin.com/in/ahsan-ateeb' },
    { icon: '💻', label: 'GitHub', value: 'aateeb77-jdcoem', href: 'https://github.com/aateeb77-jdcoem' },
]

export default function Contact() {
    const sectionRef = useRef(null)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-title-el', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            gsap.from('.contact-content', {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setSending(true)
        // Simulate form submission (no backend connected)
        setTimeout(() => {
            setSending(false)
            setSent(true)
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSent(false), 3000)
        }, 1500)
    }

    const inputStyle = {
        width: '100%',
        padding: '14px 18px',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        color: '#fff',
        fontSize: '0.9rem',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
    }

    const inputFocusStyle = {
        borderColor: 'rgba(0, 245, 255, 0.4)',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
    }

    return (
        <div ref={sectionRef} style={{
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Animated gradient background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(123,97,255,0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
            }} />

            <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="contact-title-el" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Have a project in mind or want to collaborate? Let's connect.
                    </p>
                </div>

                <div className="contact-content" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
                    gap: '40px',
                    maxWidth: '900px',
                    margin: '0 auto',
                }}>
                    {/* Contact form */}
                    <div className="glass-card" style={{ padding: '36px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                                    Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={5}
                                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={sending}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                                style={{
                                    marginTop: '8px',
                                    width: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {sent ? '✓ Message Sent!' : sending ? 'Sending...' : 'Send Message →'}
                            </motion.button>
                        </form>
                    </div>

                    {/* Contact info */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        justifyContent: 'center',
                    }}>
                        {contactInfo.map((info) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener"
                                whileHover={{ x: 8 }}
                                className="glass-card"
                                style={{
                                    padding: '20px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: 'rgba(0,245,255,0.08)',
                                    border: '1px solid rgba(0,245,255,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.3rem',
                                    flexShrink: 0,
                                }}>
                                    {info.icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {info.label}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>
                                        {info.value}
                                    </p>
                                </div>
                            </motion.a>
                        ))}

                        {/* Location */}
                        <div className="glass-card" style={{
                            padding: '20px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(123,97,255,0.08)',
                                border: '1px solid rgba(123,97,255,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem',
                                flexShrink: 0,
                            }}>
                                📍
                            </div>
                            <div>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Location
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>
                                    Nagpur, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
