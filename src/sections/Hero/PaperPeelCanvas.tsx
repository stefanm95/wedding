import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { getImpact } from "@utils/animation";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  crestProgress: number;
  peelProgress: number;
};

function LightProbe({ progress }: { progress: number }) {
  const lightPos = new THREE.Vector3(2.5, 1.5, 2);

  useFrame(() => {
    const normal = new THREE.Vector3(0, 0, 1);
    const dir = lightPos.clone().normalize();

    const base = Math.max(normal.dot(dir), 0);

    // 🔥 SAME SIGNAL AS UI
    const impact = getImpact(progress);

    const intensity = base + impact * 0.8;

    window.__heroLight = intensity;
  });

  return null;
}

function Scene({ crestProgress, peelProgress }: Props) {
  const crestRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null!);
  const leftRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null!);
  const rightRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null!);
  const shadowRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null!);

  const { gl } = useThree();

  // 🎀 ribbon texture (NO repeat)
  const ribbonTex = useMemo<THREE.Texture>(() => {
    const tex = new THREE.TextureLoader().load(
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777957283/ribbon-vintage_bsicor.png",
    );
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [gl]);

  // 🔴 crest texture
  const crestTex = useMemo<THREE.Texture>(() => {
    const tex = new THREE.TextureLoader().load(
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777957229/logo-crest-vintage_jh1nyq.png",
    );
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return tex;
  }, [gl]);

  useFrame(() => {
    const rot = crestProgress * Math.PI * 2;

    // 🔴 CREST ROTATION
    if (crestRef.current) {
      crestRef.current.rotation.z = -rot;

      // subtle tilt
      crestRef.current.rotation.y = Math.sin(rot * 0.5) * 0.2;
    }

    // 🎀 RIBBON
    const eased = Math.pow(peelProgress, 1.3);
    const maxOffset = 3;

    if (leftRef.current && rightRef.current) {
      const xLeft = -maxOffset + eased * maxOffset;
      const xRight = maxOffset - eased * maxOffset;

      leftRef.current.position.x = xLeft;
      rightRef.current.position.x = xRight;

      // intrare sub crest
      const depth = Math.min(eased * 0.3, 0.3);
      leftRef.current.position.z = -depth;
      rightRef.current.position.z = -depth;

      // pressure subtle (bend)
      leftRef.current.rotation.y = eased * 0.12;
      rightRef.current.rotation.y = -eased * 0.12;
    }

    // 🔥 MICRO PRESS (LOCK MOMENT)
    const pressStart = 0.98;
    const pressEnd = 1.05;

    if (crestProgress > pressStart && crestProgress < pressEnd) {
      const p = (crestProgress - pressStart) / (pressEnd - pressStart);

      // smooth pulse
      const press = Math.sin(p * Math.PI);

      if (crestRef.current) {
        crestRef.current.position.z = 0.25 - press * 0.08; // 🔥 apasă în ribbon
        crestRef.current.scale.y = 1 - press * 0.05; // 🔥 ușor "flatten"
      }

      if (leftRef.current && rightRef.current) {
        // ribbon reacționează la presiune
        leftRef.current.rotation.x = press * 0.05;
        rightRef.current.rotation.x = press * 0.05;
      }
    } else {
      // reset
      if (crestRef.current) {
        crestRef.current.position.z = 0.25;
        crestRef.current.scale.y = 1;
      }

      if (leftRef.current && rightRef.current) {
        leftRef.current.rotation.x = 0;
        rightRef.current.rotation.x = 0;
      }
    }
    // 🌑 SHADOW REACTION
    if (shadowRef.current) {
      if (crestProgress > pressStart && crestProgress < pressEnd) {
        const p = (crestProgress - pressStart) / (pressEnd - pressStart);
        const press = Math.sin(p * Math.PI);

        shadowRef.current.scale.set(1 + press * 0.2, 1 + press * 0.1, 1);
        shadowRef.current.material.opacity = 0.15 + press * 0.25;
      } else {
        shadowRef.current.scale.set(1, 1, 1);
        shadowRef.current.material.opacity = 0.15;
      }
    }
  });

  return (
    <>
      {/* 🎀 LEFT */}
      <mesh ref={leftRef} position={[-3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial map={ribbonTex} roughness={0.85} metalness={0.15} color="#c8b08a" />
      </mesh>

      {/* 🎀 RIGHT */}
      <mesh ref={rightRef} position={[3, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshStandardMaterial map={ribbonTex} roughness={0.85} metalness={0.15} color="#c8b08a" />
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

      {/* 🌑 CONTACT SHADOW */}
      <mesh ref={shadowRef} position={[0, 0, 0.15]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial transparent opacity={0.15} depthWrite={false}>
          <canvasTexture
            attach="map"
            image={(() => {
              const size = 256;
              const canvas = document.createElement("canvas");
              canvas.width = canvas.height = size;

              const ctx = canvas.getContext("2d")!;
              const gradient = ctx.createRadialGradient(
                size / 2,
                size / 2,
                10,
                size / 2,
                size / 2,
                size / 2,
              );

              gradient.addColorStop(0, "rgba(0,0,0,0.4)");
              gradient.addColorStop(1, "rgba(0,0,0,0)");

              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, size, size);

              return canvas;
            })()}
          />
        </meshBasicMaterial>
      </mesh>
    </>
  );
}

export default function PaperPeelCanvas({ crestProgress, peelProgress }: Props) {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 5] as [number, number, number], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // 🔥 transparent real
      }}
    >
      {/* 🎬 cinematic lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 3]} intensity={0.6} />
      {/* rim light subtil */}
      <directionalLight position={[0, 0, 5]} intensity={0.4} />
      <LightProbe progress={crestProgress} />
      <Scene crestProgress={crestProgress} peelProgress={peelProgress} />
    </Canvas>
  );
}
