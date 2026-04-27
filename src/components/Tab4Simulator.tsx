import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from './ui/Card';

type BaseType = 'square' | 'rectangle' | 'triangle' | 'trapezoid' | 'cylinder' | 'cone' | 'pyramid_square';
type Mode = 'discrete' | 'continuous';

export default function Tab4Simulator() {
  const [baseType, setBaseType] = useState<BaseType>('square');
  const [mode, setMode] = useState<Mode>('discrete');
  const [height, setHeight] = useState<number>(0);
  
  // Dimensions
  const [dimA, setDimA] = useState<number>(4); // Square side, Rect width, Tri base, Trap base1, Cylinder/Cone Radius
  const [dimB, setDimB] = useState<number>(4); // Rect depth, Tri height, Trap base2
  const [dimC, setDimC] = useState<number>(4); // Trap height

  // Calculate Base Area
  const baseArea = useMemo(() => {
    switch (baseType) {
      case 'square': return dimA * dimA;
      case 'rectangle': return dimA * dimB;
      case 'triangle': return (dimA * dimB) / 2;
      case 'trapezoid': return ((dimA + dimB) * dimC) / 2;
      case 'cylinder': return Math.PI * dimA * dimA;
      case 'cone': return Math.PI * dimA * dimA;
      case 'pyramid_square': return dimA * dimA;
      default: return 0;
    }
  }, [baseType, dimA, dimB, dimC]);

  // Calculate Volume
  const currentHeight = mode === 'discrete' ? Math.floor(height) : height;
  const volume = useMemo(() => {
    if (baseType === 'cone' || baseType === 'pyramid_square') {
      return (baseArea * currentHeight) / 3;
    }
    return baseArea * currentHeight;
  }, [baseType, baseArea, currentHeight]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Controls Panel */}
      <Card className="w-full lg:w-80 flex flex-col shrink-0 overflow-y-auto">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Configuración</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cuerpo Geométrico</label>
                <select 
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={baseType}
                  onChange={(e) => setBaseType(e.target.value as BaseType)}
                >
                  <optgroup label="Prismas">
                    <option value="square">Prisma Cuadrado</option>
                    <option value="rectangle">Prisma Rectangular</option>
                    <option value="triangle">Prisma Triangular</option>
                  </optgroup>
                  <optgroup label="Cuerpos Redondos">
                    <option value="cylinder">Cilindro</option>
                    <option value="cone">Cono</option>
                  </optgroup>
                  <optgroup label="Pirámides">
                    <option value="pyramid_square">Pirámide Cuadrada</option>
                  </optgroup>
                </select>
              </div>

              {/* Dimensions Inputs */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                {(baseType === 'square' || baseType === 'pyramid_square') && (
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Lado basal (m)</label>
                    <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  </div>
                )}
                {(baseType === 'cylinder' || baseType === 'cone') && (
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Radio basal (r)</label>
                    <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  </div>
                )}
                {baseType === 'rectangle' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Ancho (m)</label>
                      <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Largo (m)</label>
                      <input type="number" min="1" max="100" value={dimB} onChange={e => setDimB(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                  </>
                )}
                {baseType === 'triangle' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Base (m)</label>
                      <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Altura del triángulo (m)</label>
                      <input type="number" min="1" max="100" value={dimB} onChange={e => setDimB(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                  </>
                )}
              </div>

              {/* Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Modo de Crecimiento</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${mode === 'discrete' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => { setMode('discrete'); setHeight(Math.floor(height)); }}
                  >
                    Discreto (Pisos)
                  </button>
                  <button
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${mode === 'continuous' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setMode('continuous')}
                  >
                    Continuo (Agua)
                  </button>
                </div>
              </div>

              {/* Height Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">
                    {mode === 'discrete' ? 'Pisos' : 'Altura del Cuerpo (h)'}
                  </label>
                  <span className="text-sm font-bold text-blue-600">{currentHeight.toFixed(mode === 'continuous' ? 1 : 0)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step={mode === 'discrete' ? 1 : 0.1}
                  value={height} 
                  onChange={e => setHeight(Number(e.target.value))} 
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-auto pt-6 border-t border-slate-200 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Área de la Base</div>
              <div className="text-2xl font-bold text-slate-800">{baseArea.toFixed(2)} <span className="text-base font-normal text-slate-500">m²</span></div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="text-sm text-blue-600 mb-1">Volumen Total</div>
              <div className="text-3xl font-bold text-blue-700">{volume.toFixed(2)} <span className="text-lg font-normal text-blue-500">m³</span></div>
              {mode === 'discrete' && currentHeight > 0 && (baseType === 'square' || baseType === 'rectangle') && (
                <div className="text-xs text-blue-500 mt-1">({Math.round(volume)} cubos de 1x1x1)</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewport */}
      <Card className="flex-1 relative overflow-hidden bg-slate-900">
        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
          Arrastra para rotar • Scroll para zoom
        </div>
        <Canvas camera={{ position: [20, 20, 20], fov: 45 }}>
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[20, 40, 20]} intensity={1} castShadow />
          <directionalLight position={[-20, 20, -20]} intensity={0.5} />
          
          <Grid infiniteGrid fadeDistance={200} sectionColor="#334155" cellColor="#1e293b" />
          
          <PrismMesh 
            baseType={baseType} 
            dimA={dimA} 
            dimB={dimB} 
            dimC={dimC} 
            height={currentHeight} 
            mode={mode} 
          />
          
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
        </Canvas>
      </Card>
    </div>
  );
}

// 3D Component for the Shapes
function PrismMesh({ baseType, dimA, dimB, dimC, height, mode }: { baseType: BaseType, dimA: number, dimB: number, dimC: number, height: number, mode: Mode }) {
  const isFloorZero = height === 0;
  
  const material = mode === 'continuous' 
    ? <meshStandardMaterial color="#00BFFF" transparent opacity={0.65} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} />
    : <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />;

  // Create a grid texture for the discrete cylinder's base to show "cuadraditos"
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#3b82f6';
      context.fillRect(0, 0, 128, 128);
      context.strokeStyle = '#1e3a8a';
      context.lineWidth = 4;
      context.strokeRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useMemo(() => {
    gridTexture.repeat.set(dimA * 2, dimA * 2);
    gridTexture.needsUpdate = true;
  }, [gridTexture, dimA]);

  const discreteMaterial = <meshStandardMaterial map={gridTexture} roughness={0.2} metalness={0.1} />;


  // Cylinders, Cones, Pyramids using standard Geometries
  if (baseType === 'cylinder') {
    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height/2 + 0.01, 0]}>
            <cylinderGeometry args={[dimA, dimA, height, 32]} />
            {mode === 'discrete' ? discreteMaterial : material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[dimA, 32]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.8 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  if (baseType === 'cone') {
    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height/2 + 0.01, 0]}>
            <coneGeometry args={[dimA, height, 32]} />
            {material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[dimA, 32]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.8 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  if (baseType === 'pyramid_square') {
    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height/2 + 0.01, 0]} rotation={[0, Math.PI/4, 0]}>
            <cylinderGeometry args={[0, dimA * Math.SQRT1_2, height, 4]} />
            {material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[dimA, dimA]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.8 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // Discrete Cubes for Square and Rectangle Prisms
  if (mode === 'discrete' && !isFloorZero && (baseType === 'square' || baseType === 'rectangle')) {
    const width = dimA;
    const depth = baseType === 'square' ? dimA : dimB;
    const cubes = [];
    
    // To prevent overwhelming rendering if sizes are huge, we cap cubes
    if (width * depth * height < 5000) {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            for (let z = 0; z < depth; z++) {
              cubes.push(
                <mesh key={`${x}-${y}-${z}`} position={[x - width/2 + 0.5, y + 0.5, z - depth/2 + 0.5]}>
                  <boxGeometry args={[0.95, 0.95, 0.95]} />
                  <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
                  <Edges scale={1.05} threshold={15} color="#1d4ed8" />
                </mesh>
              );
            }
          }
        }
    }
    
    return (
      <group>
        {cubes.length > 0 ? cubes : (
            // Fallback to solid if too many cubes
            <mesh position={[0, height/2, 0]}>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
              <Edges scale={1.0} threshold={15} color="#1d4ed8" />
            </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshBasicMaterial color="#1e3a8a" transparent opacity={0.5} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // For continuous mode Prisms, use ExtrudeGeometry
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (baseType === 'square') {
      const w = dimA / 2;
      s.moveTo(-w, -w);
      s.lineTo(w, -w);
      s.lineTo(w, w);
      s.lineTo(-w, w);
      s.lineTo(-w, -w);
    } else if (baseType === 'rectangle') {
      const w = dimA / 2;
      const d = dimB / 2;
      s.moveTo(-w, -d);
      s.lineTo(w, -d);
      s.lineTo(w, d);
      s.lineTo(-w, d);
      s.lineTo(-w, -d);
    } else if (baseType === 'triangle') {
      const w = dimA / 2;
      const h = dimB;
      s.moveTo(-w, -h/3);
      s.lineTo(w, -h/3);
      s.lineTo(0, h * 2/3);
      s.lineTo(-w, -h/3);
    }
    return s;
  }, [baseType, dimA, dimB, dimC]);

  const extrudeSettings = {
    depth: Math.max(height, 0.001),
    bevelEnabled: false,
  };

  return (
    <group>
      {!isFloorZero && (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          {material}
          <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
        </mesh>
      )}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.8 : 0.3} side={THREE.DoubleSide} />
        <Edges color="#60a5fa" />
      </mesh>
    </group>
  );
}
