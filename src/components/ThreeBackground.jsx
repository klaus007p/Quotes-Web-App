import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingOrbs() {
  const group = useRef()

  const orbs = useMemo(
    () =>
      [...Array(14)].map(() => ({
        position: [
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
        ],
        scale: 0.5 + Math.random() * 0.7,
        color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.55, 0.85, 0.64),
        speed: 0.001 + Math.random() * 0.003,
      })),
    []
  )

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06
      group.current.rotation.x = Math.sin(state.clock.elapsedTime / 7) * 0.09
    }
  })

  return (
    <group ref={group}>
      {orbs.map((orb, index) => (
        <mesh key={index} position={orb.position}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.92}
            roughness={0.15}
            metalness={0.35}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="background-canvas">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={['#020814']} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 6, 4]} intensity={1.1} />
        <Stars radius={120} depth={60} count={4500} factor={7} saturation={0} fade speed={0.9} />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
