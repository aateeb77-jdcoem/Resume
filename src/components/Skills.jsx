import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
    {
        category: 'Programming',
        skills: ['C', 'C++', 'Python'],
        color: '#00F5FF',
    },
    {
        category: 'Data Science',
        skills: ['Pandas', 'NumPy', 'Scikit-learn'],
        color: '#7B61FF',
    },
    {
        category: 'Visualization',
        skills: ['Matplotlib', 'Seaborn', 'Power BI'],
        color: '#00d4ff',
    },
    {
        category: 'Database',
        skills: ['MySQL'],
        color: '#FF6B9D',
    },
    {
        category: 'Tools',
        skills: ['Git', 'Jupyter', 'Excel', 'Antigravity'],
        color: '#FFD93D',
    },
]

function SkillNode({ position, text, color, index }) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3
            meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.4 + index * 0.7) * 0.2
        }
    })

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <mesh scale={hovered ? 1.3 : 1}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 1.5 : 0.3}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Text
                    position={[0, 0.35, 0]}
                    fontSize={0.2}
                    color={hovered ? '#ffffff' : color}
                    anchorX="center"
                    anchorY="middle"
                    font={undefined}
                >
                    {text}
                </Text>
            </Billboard>
            {hovered && (
                <pointLight color={color} intensity={2} distance={3} />
            )}
        </group>
    )
}

function SkillSphere() {
    const allSkills = useMemo(() => {
        const skills = []
        skillCategories.forEach((cat) => {
            cat.skills.forEach((skill) => {
                skills.push({ name: skill, color: cat.color, category: cat.category })
            })
        })
        return skills
    }, [])

    const positions = useMemo(() => {
        return allSkills.map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / allSkills.length)
            const theta = Math.sqrt(allSkills.length * Math.PI) * phi
            const r = 3
            return [
                r * Math.cos(theta) * Math.sin(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(phi),
            ]
        })
    }, [allSkills])

    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {allSkills.map((skill, i) => (
                <SkillNode
                    key={skill.name}
                    position={positions[i]}
                    text={skill.name}
                    color={skill.color}
                    index={i}
                />
            ))}
        </group>
    )
}

export default function Skills() {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    // Only render canvas when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: '200px' }
        )
        if (canvasRef.current) observer.observe(canvasRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.skills-title-el', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            })
            gsap.from('.skills-canvas', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="section-container">
            <div className="skills-title-el" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 className="section-title">Skills & Expertise</h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Hover over the skill sphere to explore my technical toolkit.
                </p>
            </div>

            {/* 3D skill sphere */}
            <div ref={canvasRef} className="skills-canvas" style={{
                height: '500px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
            }}>
                {isVisible && (
                    <Canvas
                        camera={{ position: [0, 0, 8], fov: 50 }}
                        dpr={[1, 1]}
                        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
                        style={{ background: 'transparent' }}
                    >
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} intensity={0.5} />
                        <SkillSphere />
                    </Canvas>
                )}
            </div>

            {/* Category legend */}
            <div className="skills-legend" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginTop: '32px',
                flexWrap: 'wrap',
            }}>
                {skillCategories.map((cat) => (
                    <div
                        key={cat.category}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: cat.color,
                            boxShadow: `0 0 10px ${cat.color}40`,
                        }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {cat.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
