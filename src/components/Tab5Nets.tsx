import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from './ui/Card';
import { Play, Pause, RotateCcw } from 'lucide-react';

type BaseType = 'square' | 'rectangle' | 'triangle' | 'cylinder' | 'cone' | 'pyramid_square';

export default function Tab5Nets() {
  const [baseType, setBaseType] = useState<BaseType>('cylinder');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  
  // Dimensions
  const [dimA, setDimA] = useState<number>(3); // Radius, Square side, Rect width, Tri base
  const [dimB, setDimB] = useState<number>(3); // Rect depth
  const [height, setHeight] = useState<number>(5);

  // Animation effect
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setProgress(prev => {
          const next = prev + delta * 0.5; // Complete in 2 seconds
          if (next >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return next;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Controls Panel */}
      <Card className="w-full lg:w-80 flex flex-col shrink-0 overflow-y-auto">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Configuración de la Malla</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Prisma</label>
                <select 
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={baseType}
                  onChange={(e) => {
                    setBaseType(e.target.value as BaseType);
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                >
                  <optgroup label="Prismas">
                    <option value="square">Prisma Cuadrado</option>
                    <option value="rectangle">Prisma Rectangular</option>
                    <option value="triangle">Prisma Triangular Equilátero</option>
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
                {(baseType === 'cylinder' || baseType === 'cone') && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Radio basal (r)</label>
                      <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                  </>
                )}
                {(baseType === 'square' || baseType === 'pyramid_square') && (
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Lado basal (m)</label>
                    <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                  </div>
                )}
                {baseType === 'rectangle' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Ancho basal (m)</label>
                      <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Largo basal (m)</label>
                      <input type="number" min="1" max="100" value={dimB} onChange={e => setDimB(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                  </>
                )}
                {baseType === 'triangle' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Lado del Triángulo (m)</label>
                      <input type="number" min="1" max="100" value={dimA} onChange={e => setDimA(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Altura del cuerpo (h)</label>
                  <input type="number" min="1" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
                </div>
              </div>

              {/* Animation Controls */}
              <div className="pt-4 border-t border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">Plegado de Malla</label>
                
                <div className="flex items-center gap-2 mb-4">
                  <button
                    className={`flex items-center justify-center gap-1 flex-1 py-2 px-3 rounded-md text-sm font-medium text-white transition-colors ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={() => {
                      if (progress >= 1 && !isPlaying) {
                        setProgress(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pausar' : (progress >= 1 ? 'Reiniciar' : 'Animar')}
                  </button>
                  <button
                    className="p-2 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
                    onClick={() => { setProgress(0); setIsPlaying(false); }}
                    title="Reiniciar a plano"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">2D (Plano)</span>
                  <span className="text-xs font-bold text-blue-600">{Math.round(progress * 100)}%</span>
                  <span className="text-xs text-slate-500">3D (Prisma)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01"
                  value={progress} 
                  onChange={e => {
                    setProgress(Number(e.target.value));
                    setIsPlaying(false);
                  }} 
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewport */}
      <Card className="flex-1 relative overflow-hidden bg-slate-900 border-none shadow-inner">
        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
          Arrastra para rotar • Scroll para zoom
        </div>
        <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          
          <Grid infiniteGrid fadeDistance={50} sectionColor="#334155" cellColor="#1e293b" position={[0, -0.01, 0]} />
          
          <group rotation={[-Math.PI/2, 0, 0]}>
            <AnimatedNet 
              baseType={baseType} 
              dimA={dimA} 
              dimB={dimB} 
              height={height} 
              progress={progress} 
            />
          </group>

          <OrbitControls makeDefault />
        </Canvas>
      </Card>
    </div>
  );
}

// Face components for easy pivots
function Face({ width, height, color, isBase = false, children }: { width: number, height: number, color: string, isBase?: boolean, children?: React.ReactNode }) {
  return (
    <group>
      <mesh receiveShadow castShadow position={[width/2, height/2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.9} />
        <Edges scale={1} threshold={1} color={isBase ? "#ffffff" : "#000000"} />
      </mesh>
      {children}
    </group>
  );
}

function TriangleFace({ side, color, isBase = false, children }: { side: number, color: string, isBase?: boolean, children?: React.ReactNode }) {
  const h = side * Math.sqrt(3) / 2;
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(side, 0);
    s.lineTo(side/2, h);
    s.lineTo(0, 0);
    return s;
  }, [side]);

  return (
    <group>
      <mesh receiveShadow castShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.9} />
        <Edges color={isBase ? "#ffffff" : "#000000"} />
      </mesh>
      {children}
    </group>
  );
}

function CircleFace({ radius, color, isBase = false, children }: { radius: number, color: string, isBase?: boolean, children?: React.ReactNode }) {
  return (
    <group>
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.9} />
        <Edges color={isBase ? "#ffffff" : "#000000"} />
      </mesh>
      {children}
    </group>
  );
}

function IsoscelesFace({ base, height, color, isBase = false, children }: { base: number, height: number, color: string, isBase?: boolean, children?: React.ReactNode }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(base, 0);
    s.lineTo(base/2, height);
    s.lineTo(0, 0);
    return s;
  }, [base, height]);

  return (
    <group>
      <mesh receiveShadow castShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.9} />
        <Edges color={isBase ? "#ffffff" : "#000000"} />
      </mesh>
      {children}
    </group>
  );
}

function PyramidFlap({ edgeIndex, width, foldAngle, children }: { edgeIndex: number, width: number, foldAngle: number, children: React.ReactNode }) {
  if (edgeIndex === 0) {
    return (
      <group position={[width, 0, 0]} rotation={[foldAngle, 0, 0]}>
        <group rotation={[0, 0, Math.PI]}>
          {children}
        </group>
      </group>
    );
  } else if (edgeIndex === 1) {
    return (
      <group position={[width, width, 0]} rotation={[0, -foldAngle, 0]}>
        <group rotation={[0, 0, -Math.PI/2]}>
          {children}
        </group>
      </group>
    );
  } else if (edgeIndex === 2) {
    return (
      <group position={[0, width, 0]} rotation={[-foldAngle, 0, 0]}>
        {children}
      </group>
    );
  } else if (edgeIndex === 3) {
    return (
      <group position={[0, 0, 0]} rotation={[0, foldAngle, 0]}>
        <group rotation={[0, 0, Math.PI/2]}>
          {children}
        </group>
      </group>
    );
  }
  return null;
}

function AnimatedNet({ baseType, dimA, dimB, height, progress }: { baseType: BaseType, dimA: number, dimB: number, height: number, progress: number }) {
  const lateralColor = "#3b82f6"; // Blue
  const baseColor = "#f59e0b"; // Amber

  const centerOffsetX = useMemo(() => {
    if (baseType === 'square') return -(dimA * 2); // 4 faces of dimA = centered at dimA*2
    if (baseType === 'rectangle') return -(dimA + dimB); 
    if (baseType === 'triangle') return -(dimA * 1.5);
    if (baseType === 'cylinder') return -Math.PI * dimA; // W/2
    if (baseType === 'pyramid_square') return -dimA / 2;
    if (baseType === 'cone') return 0;
    return 0;
  }, [baseType, dimA, dimB]);

  const centerOffsetY = useMemo(() => {
    if (baseType === 'pyramid_square') return -dimA / 2;
    if (baseType === 'cone') return 0;
    return -height / 2;
  }, [baseType, dimA, height]);

  if (baseType === 'square') {
    const w = dimA;
    const h = height;
    const foldAngle = progress * (Math.PI / 2);

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        {/* Face 1 (Middle/First) */}
        <Face width={w} height={h} color={lateralColor}>
          {/* Top Base */}
          <group position={[0, h, 0]} rotation={[progress * Math.PI/2, 0, 0]}>
            <Face width={w} height={w} color={baseColor} isBase />
          </group>
          {/* Bottom Base */}
          <group position={[0, 0, 0]} rotation={[-progress * Math.PI/2, 0, 0]}>
            <group position={[0, -w, 0]}>
              <Face width={w} height={w} color={baseColor} isBase />
            </group>
          </group>

          {/* Face 2 */}
          <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
            <Face width={w} height={h} color={lateralColor}>
              {/* Face 3 */}
              <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
                <Face width={w} height={h} color={lateralColor}>
                  {/* Face 4 */}
                  <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
                    <Face width={w} height={h} color={lateralColor} />
                  </group>
                </Face>
              </group>
            </Face>
          </group>
        </Face>
      </group>
    );
  }

  if (baseType === 'rectangle') {
    const h = height;
    const foldAngle = progress * (Math.PI / 2);

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        {/* Face 1 (dimA) */}
        <Face width={dimA} height={h} color={lateralColor}>
          {/* Top Base */}
          <group position={[0, h, 0]} rotation={[progress * Math.PI/2, 0, 0]}>
            <Face width={dimA} height={dimB} color={baseColor} isBase />
          </group>
          {/* Bottom Base */}
          <group position={[0, 0, 0]} rotation={[-progress * Math.PI/2, 0, 0]}>
            <group position={[0, -dimB, 0]}>
              <Face width={dimA} height={dimB} color={baseColor} isBase />
            </group>
          </group>

          {/* Face 2 (dimB) */}
          <group position={[dimA, 0, 0]} rotation={[0, -foldAngle, 0]}>
            <Face width={dimB} height={h} color={lateralColor}>
              {/* Face 3 (dimA) */}
              <group position={[dimB, 0, 0]} rotation={[0, -foldAngle, 0]}>
                <Face width={dimA} height={h} color={lateralColor}>
                  {/* Face 4 (dimB) */}
                  <group position={[dimA, 0, 0]} rotation={[0, -foldAngle, 0]}>
                    <Face width={dimB} height={h} color={lateralColor} />
                  </group>
                </Face>
              </group>
            </Face>
          </group>
        </Face>
      </group>
    );
  }

  if (baseType === 'triangle') {
    const w = dimA;
    const h = height;
    // For equilateral, dihedral angle is 60 deg, so fold angle is 180-60 = 120 (2PI/3)
    const foldAngle = progress * (Math.PI * 2 / 3);
    const triH = w * Math.sqrt(3) / 2;

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        <Face width={w} height={h} color={lateralColor}>
          {/* Top Base */}
          <group position={[0, h, 0]} rotation={[progress * Math.PI/2, 0, 0]}>
             <TriangleFace side={w} color={baseColor} isBase />
          </group>
          {/* Bottom Base - point downwards */}
          <group position={[w, 0, 0]} rotation={[-progress * Math.PI/2, 0, Math.PI]}>
             <TriangleFace side={w} color={baseColor} isBase />
          </group>

          {/* Face 2 */}
          <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
            <Face width={w} height={h} color={lateralColor}>
              {/* Face 3 */}
              <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
                <Face width={w} height={h} color={lateralColor} />
              </group>
            </Face>
          </group>
        </Face>
      </group>
    );
  }

  if (baseType === 'cylinder') {
    const N = 36;
    const W = 2 * Math.PI * dimA;
    const w = W / N;
    const h = height;
    const foldAngle = progress * (Math.PI * 2 / N);
    
    // We create a recursive chain of N strips
    const strips = [];
    
    // Middle strip index to attach bases
    const midIdx = Math.floor(N/2);
    
    let currentChild = <></>;
    for (let i = N - 1; i >= 0; i--) {
      // For the middle strip, add the circles
      const hasBase = i === midIdx;
      
      const content = (
        <Face width={w} height={h} color={lateralColor}>
          {hasBase && (
            <>
              {/* Top Base */}
              <group position={[w/2, h + dimA, 0]}>
                <group position={[0, -dimA, 0]} rotation={[progress * Math.PI/2, 0, 0]}>
                  <group position={[0, dimA, 0]}>
                    <CircleFace radius={dimA} color={baseColor} isBase />
                  </group>
                </group>
              </group>
              {/* Bottom Base */}
               <group position={[w/2, -dimA, 0]}>
                <group position={[0, dimA, 0]} rotation={[-progress * Math.PI/2, 0, 0]}>
                  <group position={[0, -dimA, 0]}>
                    <CircleFace radius={dimA} color={baseColor} isBase />
                  </group>
                </group>
              </group>
            </>
          )}
          {i < N - 1 && (
            <group position={[w, 0, 0]} rotation={[0, -foldAngle, 0]}>
              {currentChild}
            </group>
          )}
        </Face>
      );
      currentChild = content;
    }

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        {currentChild}
      </group>
    );
  }

  if (baseType === 'pyramid_square') {
    const w = dimA;
    const h = height;
    const sHeight = Math.sqrt(h * h + (w / 2) * (w / 2));
    const targetAngle = Math.atan2(h, w / 2);
    const foldAngle = progress * targetAngle;

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        <Face width={w} height={w} color={baseColor} isBase>
          <PyramidFlap edgeIndex={0} width={w} foldAngle={foldAngle}>
            <IsoscelesFace base={w} height={sHeight} color={lateralColor} />
          </PyramidFlap>
          <PyramidFlap edgeIndex={1} width={w} foldAngle={foldAngle}>
            <IsoscelesFace base={w} height={sHeight} color={lateralColor} />
          </PyramidFlap>
          <PyramidFlap edgeIndex={2} width={w} foldAngle={foldAngle}>
            <IsoscelesFace base={w} height={sHeight} color={lateralColor} />
          </PyramidFlap>
          <PyramidFlap edgeIndex={3} width={w} foldAngle={foldAngle}>
            <IsoscelesFace base={w} height={sHeight} color={lateralColor} />
          </PyramidFlap>
        </Face>
      </group>
    );
  }

  if (baseType === 'cone') {
    const r = dimA;
    const h = height;
    const sHeight = Math.sqrt(h * h + r * r);
    const targetAngle = Math.atan2(h, r);
    const foldAngle = progress * targetAngle;

    const N = 36;
    const angleStep = (Math.PI * 2) / N;
    const baseL = 2 * r * Math.sin(Math.PI / N);
    
    const triangles = [];
    for (let i = 0; i < N; i++) {
      const angle = i * angleStep;
      const d = r * Math.cos(Math.PI / N);
      
      triangles.push(
        <group key={i} rotation={[0, 0, angle]}>
          <group position={[0, d, 0]} rotation={[-foldAngle, 0, 0]}>
            <group position={[-baseL / 2, 0, 0]}>
              <IsoscelesFace base={baseL} height={sHeight} color={lateralColor} />
            </group>
          </group>
        </group>
      );
    }

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        <CircleFace radius={r} color={baseColor} isBase>
          {triangles}
        </CircleFace>
      </group>
    );
  }

  return null;
}
