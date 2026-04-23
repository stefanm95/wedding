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

  // 🎀 ribbon texture (NO repeat)
  const ribbonTex = useMemo(() => {
    const tex = new THREE.TextureLoader().load(
      "/assets/ribbon/ribbon-vintage.png"
    );
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [gl]);

  // 🔴 crest texture
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

      // subtle tilt (premium feel)
      crestRef.current.rotation.y = Math.sin(rot * 0.5) * 0.2;

      // cinematic fade la final
      if (crestProgress > 0.92) {
        const fade = 1 - (crestProgress - 0.92) / 0.08;
        (crestRef.current.material as any).opacity = fade;
      }
    }

    // 🎀 RIBBON – intrare sub crest
    const eased = Math.pow(peelProgress, 1.3);
    const maxOffset = 3;

    if (leftRef.current && rightRef.current) {
      const xLeft = -maxOffset + eased * maxOffset;
      const xRight = maxOffset - eased * maxOffset;

      leftRef.current.position.x = xLeft;
      rightRef.current.position.x = xRight;

      // 🔥 intrare în adâncime (KEY AAA)
      const depth = Math.min(eased * 0.3, 0.3);

      leftRef.current.position.z = -depth;
      rightRef.current.position.z = -depth;

      // 🔥 subtle pressure (bend mic)
      leftRef.current.rotation.y = eased * 0.15;
      rightRef.current.rotation.y = -eased * 0.15;
    }
  });

  return (
    <>
      {/* 🎀 LEFT */}
      <mesh ref={leftRef} position={[-3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial
          map={ribbonTex}
          roughness={0.85}
          metalness={0.15}
          color="#c8b08a"
        />
      </mesh>

      {/* 🎀 RIGHT */}
      <mesh ref={rightRef} position={[3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial
          map={ribbonTex}
          roughness={0.85}
          metalness={0.15}
          color="#c8b08a"
        />
      </mesh>

      {/* 🔴 CREST (OCCLUSION MASTER) */}
      <mesh ref={crestRef} position={[0, 0, 0.25]}>
        <planeGeometry args={[1.4, 1.4]} />
        <meshStandardMaterial
          map={crestTex}
          transparent
          depthWrite={true} // 🔥 IMPORTANT
        />
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
      {/* 🎬 cinematic lighting */}
      <ambientLight intensity={0.45} />

      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 3]} intensity={0.6} />

      {/* rim light subtil */}
      <directionalLight position={[0, 0, 5]} intensity={0.4} />

      <Scene crestProgress={crestProgress} peelProgress={peelProgress} />
    </Canvas>
  );
}