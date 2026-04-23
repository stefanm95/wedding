import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

type PlaneProps = {
  progress: number;
  isTop: boolean;
};

function PeelPlane({ progress, isTop }: PlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    originalPositions.current =
      geo.attributes.position.array.slice() as Float32Array;
  }, []);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/assets/ribbon/ribbon-vintage.png",
    );
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1.2, 1); // 🔥 ajustează dacă e nevoie
    return tex;
  }, []);

  useFrame(() => {
    if (!meshRef.current || !originalPositions.current) return;

    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position;
    const base = originalPositions.current;

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];

      const nx = (x + 3) / 6;
      const ny = (y + 2) / 4;

      let dist;

      if (isTop) {
        dist = Math.sqrt((1 - nx) ** 2 + (1 - ny) ** 2);
      } else {
        dist = Math.sqrt(nx ** 2 + (1 - ny) ** 2);
      }

      const p = Math.pow(progress, 1.8);

      const peel = Math.max(0, p * 1.4 - dist);
      const z = peel * peel * 2.2;

      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const move = Math.pow(progress, 1.4);

    if (isTop) {
      meshRef.current.position.x = move * 1.6;
      meshRef.current.rotation.y = move * 0.5;
      meshRef.current.rotation.z = move * 0.08;
    } else {
      meshRef.current.position.x = -move * 1.6;
      meshRef.current.rotation.y = -move * 0.5;
      meshRef.current.rotation.z = -move * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3.8, 0.8, 80, 40]} />

      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
        transparent
      />
    </mesh>
  );
}

export default function PaperPeelCanvas({ progress }: { progress: number }) {
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
  );
}
