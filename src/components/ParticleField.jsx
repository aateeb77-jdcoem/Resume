import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
    const meshRef = useRef()
    const count = 150 // Reduced from 300

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const col = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50

            const t = Math.random()
            col[i * 3] = THREE.MathUtils.lerp(0, 0.48, t)
            col[i * 3 + 1] = THREE.MathUtils.lerp(0.96, 0.38, t)
            col[i * 3 + 2] = THREE.MathUtils.lerp(1, 1, t)
        }
        return [pos, col]
    }, [])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
        }
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

function NeuralConnections() {
    const lineRef = useRef()
    const nodeCount = 12 // Reduced from 20

    const linePositions = useMemo(() => {
        const nodes = []
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new THREE.Vector3(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            ))
        }

        const linePos = []
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].distanceTo(nodes[j]) < 8) {
                    linePos.push(nodes[i].x, nodes[i].y, nodes[i].z)
                    linePos.push(nodes[j].x, nodes[j].y, nodes[j].z)
                }
            }
        }

        return new Float32Array(linePos)
    }, [])

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.rotation.y = state.clock.elapsedTime * 0.015
        }
    })

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={linePositions.length / 3}
                    array={linePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color="#00F5FF"
                transparent
                opacity={0.06}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    )
}

export default function ParticleField() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                style={{ background: 'transparent' }}
                dpr={[1, 1]}
                frameloop="demand"
                gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
                performance={{ min: 0.5 }}
            >
                <Particles />
                <NeuralConnections />
                <ambientLight intensity={0.1} />
                <FrameInvalidator />
            </Canvas>
        </div>
    )
}

// Only re-render every 2nd frame (~30fps) instead of 60fps
function FrameInvalidator() {
    const frameCount = useRef(0)
    useFrame(({ invalidate }) => {
        frameCount.current++
        if (frameCount.current % 2 === 0) {
            invalidate()
        }
    })
    return null
}
