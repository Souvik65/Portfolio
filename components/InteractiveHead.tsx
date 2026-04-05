'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeadModel() {
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const { scene } = useGLTF('/skd.glb');

  const fittedScene = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 3.6;
    const fitScale = targetSize / maxAxis;

    cloned.position.sub(center);
    cloned.scale.setScalar(fitScale);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        // 🔥 Disable heavy shadow calculations
        child.castShadow = false;
        child.receiveShadow = false;

        // Minor optimization
        child.frustumCulled = true;
      }
    });

    return cloned;
  }, [scene]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current = { x, y };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = (pointerRef.current.x * Math.PI) / 5;
    const targetY = (pointerRef.current.y * Math.PI) / 6;

    const damping = 0.05; // 🔥 smoother + lighter

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * damping;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * damping;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <primitive object={fittedScene} />
    </group>
  );
}

export function InteractiveHead() {
  return (
    <div className="w-full h-full absolute inset-0 z-10">
      <Canvas
        dpr={[1, 1.5]} // 🔥 huge performance boost
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        {/* 🔥 simpler lighting (no shadows) */}
        <ambientLight intensity={0.8} />

        {/* 🔥 MAIN FRONT LIGHT */}
        <directionalLight position={[0, 0, 5]} intensity={2.2} />

        {/* SIDE FILL LIGHT */}
        <directionalLight position={[4, 2, 2]} intensity={1} />

        {/* BACK LIGHT (for glow/edge) */}
        <directionalLight position={[0, 5, -5]} intensity={0.8} />

        <Suspense fallback={null}>
          <HeadModel />

          {/* 🔥 optimized contact shadow */}
          <ContactShadows
            position={[0, -1.75, 0]}
            opacity={0.25}
            scale={6}
            blur={1}
            far={2}
            color="#c8ff00"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/skd.glb');