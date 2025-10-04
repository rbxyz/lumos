"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Componente interno para cena do globo (evita recriar Canvas desnecessariamente)
function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Gera nós aleatórios na superfície da esfera
  const nodes = useMemo(() => {
    const count = 60; // quantidade de pontos (nós)
    const radius = 1.4;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      // Distribuição pseudo-uniforme por amostragem esférica
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  // Converte nós em um buffer de posições para Points do drei
  const nodePositions = useMemo(() => {
    const array = new Float32Array(nodes.length * 3);
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      array[i * 3 + 0] = p.x;
      array[i * 3 + 1] = p.y;
      array[i * 3 + 2] = p.z;
    }
    return array;
  }, [nodes]);

  // Cria pares de conexões entre nós com curvas suaves
  const connections = useMemo(() => {
    const pairs: { points: THREE.Vector3[] }[] = [];
    const radius = 1.4;
    const lift = 0.25; // elevação para criar um arco bonito
    for (let i = 0; i < nodes.length; i += 2) {
      const a = nodes[i];
      const b = nodes[(i + 1) % nodes.length];
      // ponto médio elevado para simular grande-círculo aproximado
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(radius + lift);
      const curve = new THREE.CatmullRomCurve3([a, mid, b]);
      const sampled = curve.getPoints(32);
      pairs.push({ points: sampled });
    }
    return pairs;
  }, [nodes]);

  // Rotação lenta do globo e das conexões
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22; // mais rápido
    }
  });

  return (
    <group ref={groupRef} scale={1.6}>
      {/* Esfera base com leve emissivo verde */}
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial color={new THREE.Color("#0f2f0f")} emissive={new THREE.Color("#00ff7f")} emissiveIntensity={0.15} metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Wireframe sutil para aparência "técnica" */}
      <mesh>
        <sphereGeometry args={[1.405, 24, 24]} />
        <meshBasicMaterial color={new THREE.Color("#00ff7f")} wireframe opacity={0.25} transparent />
      </mesh>

      {/* Nós (pontos) */}
      <Points positions={nodePositions} stride={3}>
        <PointMaterial color="#00ff7f" size={0.03} sizeAttenuation depthWrite={false} transparent opacity={0.9} />
      </Points>

      {/* Conexões (linhas) */}
      {connections.map((c, idx) => (
        <Line key={idx} points={c.points} color="#00ff7f" lineWidth={1} transparent opacity={0.6} />
      ))}
    </group>
  );
}

export function Globe() {
  // Canvas isolado para ser reusado na Home
  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 45 }}>
      {/* Luz suave verde para reforçar o tema */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.6} color={new THREE.Color("#7CFFB2")} />
      <GlobeScene />
      {/* OrbitControls só para UX (limitado para não permitir zoom extremo) */}
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
    </Canvas>
  );
}


