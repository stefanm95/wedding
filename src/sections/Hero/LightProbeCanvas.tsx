import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LightProbe() {
  const lightPos = new THREE.Vector3(2.5, 1.5, 2); // 🔥 poziția soarelui

  useFrame(() => {
    // direcție lumină spre cameră
    const normal = new THREE.Vector3(0, 0, 1);
    const dir = lightPos.clone().normalize();

    const intensity = Math.max(normal.dot(dir), 0);

    // expunem global (simplu & eficient)
    // @ts-ignore
    window.__heroLight = intensity;
  });

  return null;
}

export default function LightProbeCanvas() {
  return (
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 5] }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // 🔥 IMPORTANT
      }}
    >
      <LightProbe />
    </Canvas>
  );
}
