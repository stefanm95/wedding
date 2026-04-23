import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

type Props = {
  crestProgress: number;
  peelProgress: number;
};

function Scene({ crestProgress, peelProgress }: Props) {
  const crestRef = useRef<THREE.Mesh>(null!);
  const leftRef = useRef<THREE.Mesh>(null!);
  const rightRef = useRef<THREE.Mesh>(null!);

  const { gl } = useThree();

  // 🎀 NO REPEAT
  const ribbonTex = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/assets/ribbon/ribbon-vintage.png"
    );
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [gl]);

  const crestTex = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/assets/crest/logo-crest-vintage.png"
    );
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [gl]);

  useFrame(() => {
    const rot = crestProgress * Math.PI * 2;

    // 🔴 CREST ROTATION
    if (crestRef.current) {
      crestRef.current.rotation.z = -rot;

      // fade după final
      if (crestProgress > 0.92) {
        const fade = 1 - (crestProgress - 0.92) / 0.08;
        (crestRef.current.material as any).opacity = fade;
      }
    }

    // 🎀 RIBBON SYNC PERFECT
    const eased = Math.pow(peelProgress, 1.25);

    const maxOffset = 3;

    if (leftRef.current && rightRef.current) {
      const xLeft = -maxOffset + eased * maxOffset;
      const xRight = maxOffset - eased * maxOffset;

      leftRef.current.position.x = xLeft;
      rightRef.current.position.x = xRight;

      // 🔥 când ajung în crest → dispar
      const scale = 1 - eased;
      const opacity = 1 - eased;

      leftRef.current.scale.x = Math.max(scale, 0);
      rightRef.current.scale.x = Math.max(scale, 0);

      (leftRef.current.material as any).opacity = opacity;
      (rightRef.current.material as any).opacity = opacity;
    }
  });

  return (
    <>
      {/* 🎀 LEFT */}
      <mesh ref={leftRef} position={[-3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial
          map={ribbonTex}
          transparent
          roughness={0.85}
          metalness={0.1}
          color="#c8b08a"
        />
      </mesh>

      {/* 🎀 RIGHT */}
      <mesh ref={rightRef} position={[3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial
          map={ribbonTex}
          transparent
          roughness={0.85}
          metalness={0.1}
          color="#c8b08a"
        />
      </mesh>

      {/* 🔴 CREST */}
      <mesh ref={crestRef} position={[0, 0, 0.2]}>
        <planeGeometry args={[1.4, 1.4]} />
        <meshStandardMaterial map={crestTex} transparent />
      </mesh>
    </>
  );
}

export default function PaperPeelCanvas({
  crestProgress,
  peelProgress,
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 3]} intensity={0.6} />

      <Scene crestProgress={crestProgress} peelProgress={peelProgress} />
    </Canvas>
  );
}