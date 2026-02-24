import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
    const logoRef = useRef(null)
    const barRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onComplete
                })
            }
        })

        tl.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .to(barRef.current, {
                width: '100%',
                duration: 1.5,
                ease: 'power2.inOut'
            }, '-=0.3')
    }, [])

    return (
        <motion.div
            ref={containerRef}
            className="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div ref={logoRef} className="preloader-logo">
                AA
            </div>
            <div className="preloader-bar">
                <div ref={barRef} className="preloader-bar-fill" />
            </div>
            <p style={{
                marginTop: '20px',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '3px',
                textTransform: 'uppercase'
            }}>
                Loading Experience
            </p>
        </motion.div>
    )
}
