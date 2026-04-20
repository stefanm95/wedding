import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"

type PlaneProps = {
  progress: number
  isTop: boolean
}

function PeelPlane({ progress, isTop }: PlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const originalPositions = useRef<Float32Array | null>(null)

  useEffect(() => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry as THREE.PlaneGeometry
    originalPositions.current = geo.attributes.position.array.slice() as Float32Array
  }, [])

  useFrame(() => {
    if (!meshRef.current || !originalPositions.current) return

    const geo = meshRef.current.geometry as THREE.PlaneGeometry
    const pos = geo.attributes.position
    const base = originalPositions.current

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3
      const x = base[ix]
      const y = base[ix + 1]

      const nx = (x + 3) / 6
      const ny = (y + 2) / 4

      let dist

      if (isTop) {
        dist = Math.sqrt((1 - nx) ** 2 + (1 - ny) ** 2)
      } else {
        dist = Math.sqrt(nx ** 2 + (1 - ny) ** 2)
      }

      const p = Math.pow(progress, 1.6)
      const peel = Math.max(0, p * 1.4 - dist)
      const z = peel * peel * 2.2

      pos.setZ(i, z)
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()

    const move = Math.pow(progress, 1.3)

    if (isTop) {
      meshRef.current.position.x = move * 1.4
      meshRef.current.rotation.y = move * 0.35
      meshRef.current.rotation.z = move * 0.05
    } else {
      meshRef.current.position.x = -move * 1.4
      meshRef.current.rotation.y = -move * 0.35
      meshRef.current.rotation.z = -move * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, isTop ? 1 : -1, 0]}>
      <planeGeometry args={[6, 2, 80, 40]} />

      {/* 🔥 DOAR SHADING, fără textură */}
      <meshStandardMaterial
        color="#ffffff"
        roughness={1}
        metalness={0}
        transparent
        opacity={0.08} /* foarte subtil */
      />
    </mesh>
  )
}

export default function PaperPeelCanvas({
  progress,
}: {
  progress: number
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 5]} intensity={1.1} />

      <PeelPlane progress={progress} isTop />
      <PeelPlane progress={progress} isTop={false} />
    </Canvas>
  )
}