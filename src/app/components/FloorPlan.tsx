"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { Mesh } from 'three';

const Floorplan = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <Canvas camera={{ position: [8, 20, 12], fov: 80 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <HouseModel />
        <OrbitControls enableDamping />
        <gridHelper args={[34, 34, "#B4D330", "#B4D330"]} />
      </Canvas>
    </div>
  );
};

// Function to create walls with proper thickness
const Wall = ({ 
  start, 
  end, 
  height = 1.5,
  thickness = 0.5,
  color = "#fff" 
}: { 
  start: [number, number]; 
  end: [number, number];
  height?: number;
  thickness?: number;
  color?: string;
}) => {
  // Calculate wall properties
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2)
  );
  
  const position: [number, number, number] = [
    (start[0] + end[0]) / 2,
    height / 2,
    (start[1] + end[1]) / 2
  ];
  
  // Calculate rotation
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
  
  return (
    <mesh position={position} rotation={[0, -angle, 0]}>
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};


// Floor component with different colors for different areas
// const Floor = () => {
//   return (
//     <group>
//       {/* Main house floor */}
//       <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[11, 11]} />
//         <meshStandardMaterial color="#B4D330" side={THREE.DoubleSide} />
//       </mesh>
      
//       {/* Garage floor with different color */}
//       <mesh position={[8, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[5, 6]} />
//         <meshStandardMaterial color="#B4D330" side={THREE.DoubleSide} />
//       </mesh>
//     </group>
//   );
// };


const Floor: React.FC = () => {
  const mainFloorRef = useRef<Mesh>(null);
  const garageFloorRef = useRef<Mesh>(null);
  
  // Create a texture for wooden planks effect
  const createTiledTexture = (): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not get 2D context');
    }
    
    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create narrow rectangular tiles
    const tileWidth = 150;  // narrow width
    const tileHeight = 30; // shorter length (for horizontal planks)
    const gap = 4;
    
    context.fillStyle = '#f0f0f0';
    
    // Draw the tiles pattern (horizontal planks)
    for (let y = 0; y < canvas.height; y += tileHeight + gap) {
      for (let x = 0; x < canvas.width; x += tileWidth + gap) {
        context.fillRect(x, y, tileWidth, tileHeight);
        
        // Add subtle texture to each tile
        context.strokeStyle = '#e5e5e5';
        context.lineWidth = 1;
        context.strokeRect(x + 1, y + 1, tileWidth - 2, tileHeight - 2);
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3); // Adjust based on floor size
    
    return texture;
  };
  
  // Set up animation
  useEffect(() => {
    if (mainFloorRef.current && garageFloorRef.current) {
      // Ensure materials are properly typed
      const mainMaterial = mainFloorRef.current.material as THREE.MeshStandardMaterial;
      const garageMaterial = garageFloorRef.current.material as THREE.MeshStandardMaterial;
      
      // Apply tiled texture
      const texture = createTiledTexture();
      mainMaterial.map = texture;
      garageMaterial.map = texture;
      mainMaterial.needsUpdate = true;
      garageMaterial.needsUpdate = true;
      
      // Extract positions and dimensions for unified world space calculations
      const mainFloorObj = mainFloorRef.current;
      const garageFloorObj = garageFloorRef.current;
      
      // Get total scene width and leftmost point for continuous animation
      const mainFloorWidth = 11;
      const mainFloorPos = mainFloorObj.position.x - mainFloorWidth/2; // Left edge of main floor
      const garageFloorWidth = 5;
      const garageFloorPos = garageFloorObj.position.x - garageFloorWidth/2; // Left edge of garage floor
      
      // Find leftmost and rightmost points for our animation
      const leftmostPoint = Math.min(mainFloorPos, garageFloorPos);
      const rightmostPoint = Math.max(mainFloorPos + mainFloorWidth, garageFloorPos + garageFloorWidth);
      const totalWidth = rightmostPoint - leftmostPoint;
      
      // Create shader materials for the left-to-right transition
      const vertexShader = `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      
      const fragmentShader = `
        uniform sampler2D tileTexture;
        uniform vec3 startColor;
        uniform vec3 endColor;
        uniform float progress;
        uniform float edgeWidth;
        uniform vec3 objectPosition;
        uniform float totalWidth;
        uniform float leftmostPoint;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Sample the texture for tile pattern
          vec4 texColor = texture2D(tileTexture, vUv);
          
          // Calculate world X position (need to account for rotation of floor)
          float worldX = objectPosition.x + vPosition.x;
          
          // Normalize position within the total width for consistent animation
          float normalizedX = (worldX - leftmostPoint) / totalWidth;
          
          // Create a sharp left-to-right transition based on worldX
          float transition = smoothstep(progress - edgeWidth, progress + edgeWidth, normalizedX);
          
          // Mix colors - note we use 1.0-transition to flip the direction (now white to green)
          vec3 color = mix(startColor, endColor, 1.0 - transition);
          
          // Apply the color while preserving the tile texture
          gl_FragColor = vec4(color * texColor.rgb, 1.0);
        }
      `;
      
      // Create shader material for main floor
      const mainShaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tileTexture: { value: texture },
          startColor: { value: new THREE.Color('white') },
          endColor: { value: new THREE.Color('#B4D330') },
          progress: { value: -0.1 },
          edgeWidth: { value: 0.05 },
          objectPosition: { value: mainFloorObj.position.clone() },
          totalWidth: { value: totalWidth },
          leftmostPoint: { value: leftmostPoint }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide
      });
      
      // Create shader material for garage floor with the same animated parameters
      const garageShaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tileTexture: { value: texture },
          startColor: { value: new THREE.Color('white') },
          endColor: { value: new THREE.Color('#B4D330') },
          progress: { value: -0.1 },
          edgeWidth: { value: 0.05 },
          objectPosition: { value: garageFloorObj.position.clone() },
          totalWidth: { value: totalWidth },
          leftmostPoint: { value: leftmostPoint }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide
      });
      
      // Apply shader materials
      mainFloorObj.material = mainShaderMaterial;
      garageFloorObj.material = garageShaderMaterial;
      
      // Animation loop
      const startTime = Date.now();
      const duration = 2000; // 2 seconds
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Sweeping from left to right (from -0.1 to 1.1)
        const sweepPosition = -0.1 + progress * 1.2;
        
        // Update both materials with the same progress value
        mainShaderMaterial.uniforms.progress.value = sweepPosition;
        garageShaderMaterial.uniforms.progress.value = sweepPosition;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, []);
  
  return (
    <group>
      {/* Main house floor */}
      <mesh 
        ref={mainFloorRef} 
        position={[0, -0.01, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[11, 11]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      
      {/* Garage floor with different color */}
      <mesh 
        ref={garageFloorRef} 
        position={[8, -0.01, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};


// House model with rooms and connected garage
const HouseModel = () => {
  return (
    <group>
      <Floor />
      
      {/* Main House External Walls */}
      <Wall start={[-5.75, -5.5]} end={[5.75, -5.5]} /> {/* Back Wall */}
      <Wall start={[-5.75, 5.5]} end={[-1, 5.5]} /> Front Wall (partial)
      <Wall start={[1.5, 5.5]} end={[5.75, 5.5]} /> {/* Front Wall (continuation) */}
      <Wall start={[-5.5, -5.5]} end={[-5.5, 5.5]} /> {/* Left Wall */}
      <Wall start={[5.5, -5.5]} end={[5.5, 0]} /> {/* Right Wall (partial) */}
      <Wall start={[5.5, 2]} end={[5.5, 5.5]} /> Right Wall (continuation)
      <Wall start={[5.5, 0]} end={[5.5, .5]} /> Right Wall (continuation)
 
      {/* Garage Walls */}
      <Wall start={[5.5, 3]} end={[6.5, 3]}  /> {/* Garage-House Connection Top */}
      <Wall start={[9.75, 3]} end={[10.75, 3]}  /> {/* Garage-House Connection Top */}
      <Wall start={[5.5, -3]} end={[10.75, -3]}  /> {/* Garage-House Connection Bottom */}
      <Wall start={[10.5, 3]} end={[10.5, -3]}  /> {/* Garage Front Wall */}

      {/* Interior Walls */}
      <Wall start={[-2, -5.5]} end={[-2, -2.75]} /> Vertical Wall (left rooms)
      <Wall start={[2, -5.5]} end={[2, -2.75]} /> Vertical Wall (right rooms)
      <Wall start={[-2, -3]} end={[2, -3]} /> Horizontal wall between rooms
      <Wall start={[-5.5, 0]} end={[-1.5, 0]} /> Horizontal divider for entry/living
      <Wall start={[-0.5, 0]} end={[0.5, 0]} /> Horizontal divider for entry/living

      <Wall start={[1.5, 0]} end={[5.75, 0]} /> Horizontal divider for entry/living

      {/* <Wall start={[-1, 1]} end={[-1, -5.5]} /> Additional room divider */}
      <Wall start={[0, 1]} end={[0, -2.75]} /> {/* Additional room divider */}

    </group>
  );
};

export default Floorplan;