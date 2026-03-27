'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeadModel() {
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  
  // Load model and clone it so transforms don't mutate shared GLTF cache.
  const { scene } = useGLTF('/skd.glb');
  const fittedScene = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.6;
    const fitScale = targetSize / maxAxis;

    cloned.position.sub(center);
    cloned.scale.setScalar(fitScale);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
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
    
    // Track pointer even when it is outside the canvas bounds.
    const targetX = (pointerRef.current.x * Math.PI) / 5;
    const targetY = (pointerRef.current.y * Math.PI) / 6;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
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
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
        <hemisphereLight intensity={0.6} groundColor="#111111" />
        <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <HeadModel />
          </Float>
          <ContactShadows position={[0, -1.75, 0]} opacity={0.35} scale={8} blur={2.2} far={3.2} color="#c8ff00" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/skd.glb');
