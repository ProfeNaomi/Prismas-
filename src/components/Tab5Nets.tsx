import React, { useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from './ui/Card';
import { Play, Pause, RotateCcw } from 'lucide-react';

type BaseType = 
  | 'square' 
  | 'rectangle' 
  | 'triangle' 
  | 'cylinder' 
  | 'cone' 
  | 'pyramid_triangular'
  | 'pyramid_square'
  | 'pyramid_pentagonal'
  | 'pyramid_hexagonal';

export default function Tab5Nets() {
  const [baseType, setBaseType] = useState<BaseType>('cylinder');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  
  // Dimensions inputs (stored as string to avoid typing blockages, sanitized before rendering/calculating)
  const [dimA, setDimA] = useState<string>('3'); // Radius, Square side, Rect width, Tri side, Pyramid side
  const [dimB, setDimB] = useState<string>('3'); // Rect depth
  const [height, setHeight] = useState<string>('5'); // Body height

  // Helper to determine if shape is a continuous/fluid round body
  const isRoundBody = (type: BaseType) => type === 'cylinder' || type === 'cone';

  // Strict Sanitization to protect WebGL
  const safeA = useMemo(() => {
    const val = parseFloat(dimA) || 1;
    return !isRoundBody(baseType) ? Math.max(1, Math.round(val)) : Math.max(0.5, val);
  }, [dimA, baseType]);

  const safeB = useMemo(() => {
    const val = parseFloat(dimB) || 1;
    return !isRoundBody(baseType) ? Math.max(1, Math.round(val)) : Math.max(0.5, val);
  }, [dimB, baseType]);

  const safeH = useMemo(() => {
    const val = parseFloat(height) || 1;
    return !isRoundBody(baseType) ? Math.max(1, Math.round(val)) : Math.max(0.5, val);
  }, [height, baseType]);

  // Dimension Change Handlers that enforce integers for non-round bases
  const handleDimAChange = (val: string) => {
    if (!isRoundBody(baseType)) {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setDimA('');
      } else {
        setDimA(Math.round(parsed).toString());
      }
    } else {
      setDimA(val);
    }
  };

  const handleDimBChange = (val: string) => {
    if (!isRoundBody(baseType)) {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setDimB('');
      } else {
        setDimB(Math.round(parsed).toString());
      }
    } else {
      setDimB(val);
    }
  };

  const handleHeightChange = (val: string) => {
    if (!isRoundBody(baseType)) {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setHeight('');
      } else {
        setHeight(Math.round(parsed).toString());
      }
    } else {
      setHeight(val);
    }
  };

  // Animation logic
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setProgress(prev => {
          const next = prev + delta * 0.5; // Complete animation in 2 seconds
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
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
      {/* Controls Panel */}
      <Card className="w-full lg:w-80 flex flex-col shrink-0 overflow-y-auto border-slate-200 shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Configuración de Mallas</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Cuerpo Geométrico</label>
                <select 
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 bg-white"
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
                  <optgroup label="Pirámides Regulares">
                    <option value="pyramid_triangular">Pirámide Triangular</option>
                    <option value="pyramid_square">Pirámide Cuadrada</option>
                    <option value="pyramid_pentagonal">Pirámide Pentagonal</option>
                    <option value="pyramid_hexagonal">Pirámide Hexagonal</option>
                  </optgroup>
                </select>
              </div>

              {/* Dimensions Inputs */}
              <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/50">
                {(baseType === 'cylinder' || baseType === 'cone') && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Radio basal r (m)</label>
                    <input 
                      type="number" 
                      min="0.5" 
                      max="15" 
                      step="0.1" 
                      value={dimA} 
                      onChange={e => handleDimAChange(e.target.value)} 
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    />
                  </div>
                )}
                {(baseType === 'square' || baseType.startsWith('pyramid_')) && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Lado basal s (m)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="15" 
                      step="1" 
                      value={dimA} 
                      onChange={e => handleDimAChange(e.target.value)} 
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    />
                  </div>
                )}
                {baseType === 'rectangle' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Ancho basal a (m)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="15" 
                        step="1" 
                        value={dimA} 
                        onChange={e => handleDimAChange(e.target.value)} 
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Largo basal b (m)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="15" 
                        step="1" 
                        value={dimB} 
                        onChange={e => handleDimBChange(e.target.value)} 
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                      />
                    </div>
                  </>
                )}
                {baseType === 'triangle' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Lado del Triángulo s (m)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="15" 
                      step="1" 
                      value={dimA} 
                      onChange={e => handleDimAChange(e.target.value)} 
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Altura del cuerpo h (m)</label>
                  <input 
                    type="number" 
                    min="0.5" 
                    max="15" 
                    step={isRoundBody(baseType) ? "0.1" : "1"} 
                    value={height} 
                    onChange={e => handleHeightChange(e.target.value)} 
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
              </div>

              {/* Animation Controls */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Plegado interactivo</label>
                
                <div className="flex items-center gap-2 mb-4">
                  <button
                    className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg text-sm font-bold text-white transition-all shadow-md ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={() => {
                      if (progress >= 1 && !isPlaying) {
                        setProgress(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pausar' : (progress >= 1 ? 'Reiniciar' : 'Animar Malla')}
                  </button>
                  <button
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                    onClick={() => { setProgress(0); setIsPlaying(false); }}
                    title="Reiniciar a plano"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400 font-semibold">2D (Plano)</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(progress * 100)}%</span>
                  <span className="text-xs text-slate-400 font-semibold">3D (Cuerpo)</span>
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
                  className="w-full accent-blue-600 cursor-ew-resize"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Viewport */}
      <Card className="flex-1 relative overflow-hidden bg-slate-900 border-none shadow-inner">
        <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold border border-slate-700/50 shadow-md">
          Rotar: Arrastrar Clic Izq • Zoom: Rueda
        </div>
        <div className="absolute top-4 right-4 z-10 bg-blue-900/60 backdrop-blur-md text-blue-200 px-4 py-2 rounded-full text-xs font-bold border border-blue-800/50 uppercase tracking-wider shadow-md">
          Desarrollo Plano del Sólido
        </div>
        <div className="w-full h-full">
          <Canvas camera={{ position: [0, 8, 12], fov: 42 }}>
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.65} />
            <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
            <directionalLight position={[-10, 10, -10]} intensity={0.4} />
            
            <Grid infiniteGrid fadeDistance={45} sectionColor="#334155" cellColor="#1e293b" cellThickness={1.5} position={[0, -0.01, 0]} />
            
            <group rotation={[-Math.PI/2, 0, 0]}>
              <AnimatedNet 
                baseType={baseType} 
                dimA={safeA} 
                dimB={safeB} 
                height={safeH} 
                progress={progress} 
              />
            </group>

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>
        </div>
      </Card>
    </div>
  );
}

// Reusable custom polygonal Face shapes
function Face({ width, height, color, isBase = false, children }: { width: number, height: number, color: string, isBase?: boolean, children?: React.ReactNode }) {
  return (
    <group>
      <mesh receiveShadow castShadow position={[width/2, height/2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.88} />
        <Edges scale={1} threshold={1} color={isBase ? "#ffffff" : "#1e3a8a"} />
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
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.88} />
        <Edges color={isBase ? "#ffffff" : "#1e3a8a"} />
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
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.88} />
        <Edges color={isBase ? "#ffffff" : "#1e3a8a"} />
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
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.88} />
        <Edges color={isBase ? "#ffffff" : "#1e3a8a"} />
      </mesh>
      {children}
    </group>
  );
}

// Aligned Regular polygon coordinates generator for base shapes
function getRegularPolygonShape(sides: number, radius: number) {
  const shape = new THREE.Shape();
  const angleOffset = sides % 2 === 0 ? Math.PI / sides : 0;
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides + angleOffset;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

// Computes 3D net structures
function AnimatedNet({ 
  baseType, 
  dimA, 
  dimB, 
  height, 
  progress 
}: { 
  baseType: BaseType; 
  dimA: number; 
  dimB: number; 
  height: number; 
  progress: number; 
}) {
  const lateralColor = "#0284c7"; // Premium Blue (Sky)
  const baseColor = "#d97706"; // Premium Amber

  // 1. offset X useMemo (unconditional at top)
  const centerOffsetX = useMemo(() => {
    if (baseType === 'square') return -(dimA * 2); 
    if (baseType === 'rectangle') return -(dimA + dimB); 
    if (baseType === 'triangle') return -(dimA * 1.5);
    if (baseType === 'cylinder') return -Math.PI * dimA; 
    if (baseType.startsWith('pyramid_')) return 0;
    if (baseType === 'cone') return 0;
    return 0;
  }, [baseType, dimA, dimB]);

  // 2. offset Y useMemo (unconditional at top)
  const centerOffsetY = useMemo(() => {
    if (baseType.startsWith('pyramid_')) return 0;
    if (baseType === 'cone') return 0;
    return -height / 2;
  }, [baseType, height]);

  // 3. Regular polygon baseShape useMemo (declared unconditionally at top)
  const pyramidBaseShape = useMemo(() => {
    let sides = 4;
    if (baseType === 'pyramid_triangular') sides = 3;
    else if (baseType === 'pyramid_square') sides = 4;
    else if (baseType === 'pyramid_pentagonal') sides = 5;
    else if (baseType === 'pyramid_hexagonal') sides = 6;

    const s = dimA;
    const circumRadius = s / (2 * Math.sin(Math.PI / sides));
    return getRegularPolygonShape(sides, circumRadius);
  }, [baseType, dimA]);

  // General N-gonal Pyramid Net Folding
  if (baseType.startsWith('pyramid_')) {
    let sides = 4;
    if (baseType === 'pyramid_triangular') sides = 3;
    else if (baseType === 'pyramid_square') sides = 4;
    else if (baseType === 'pyramid_pentagonal') sides = 5;
    else if (baseType === 'pyramid_hexagonal') sides = 6;

    const s = dimA;
    const h = height;

    const apothem = s / (2 * Math.tan(Math.PI / sides));
    const circumRadius = s / (2 * Math.sin(Math.PI / sides));
    const slantHeight = Math.sqrt(h * h + apothem * apothem);
    const targetAngle = Math.atan2(h, apothem);
    const foldAngle = progress * targetAngle;
    
    const flaps = [];
    const angleOffset = sides % 2 === 0 ? Math.PI / sides : 0;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides + angleOffset;
      const x = apothem * Math.cos(angle);
      const y = apothem * Math.sin(angle);
      
      flaps.push(
        <group key={i} position={[x, y, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
          <group rotation={[-foldAngle, 0, 0]}>
            <group position={[-s / 2, 0, 0]}>
              <IsoscelesFace base={s} height={slantHeight} color={lateralColor} />
            </group>
          </group>
        </group>
      );
    }

    return (
      <group position={[0, 0, 0]}>
        <mesh receiveShadow castShadow>
          <shapeGeometry args={[pyramidBaseShape]} />
          <meshStandardMaterial color={baseColor} side={THREE.DoubleSide} roughness={0.3} metalness={0.1} transparent opacity={0.9} />
          <Edges color="#ffffff" />
        </mesh>
        {flaps}
      </group>
    );
  }

  // Square Prism Net
  if (baseType === 'square') {
    const w = dimA;
    const h = height;
    const foldAngle = progress * (Math.PI / 2);

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
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

  // Rectangle Prism Net
  if (baseType === 'rectangle') {
    const h = height;
    const foldAngle = progress * (Math.PI / 2);

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
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

  // Equilateral Triangular Prism Net
  if (baseType === 'triangle') {
    const w = dimA;
    const h = height;
    const foldAngle = progress * (Math.PI * 2 / 3);

    return (
      <group position={[centerOffsetX, centerOffsetY, 0]}>
        <Face width={w} height={h} color={lateralColor}>
          {/* Top Base */}
          <group position={[0, h, 0]} rotation={[progress * Math.PI/2, 0, 0]}>
             <TriangleFace side={w} color={baseColor} isBase />
          </group>
          {/* Bottom Base */}
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

  // Cylinder Net
  if (baseType === 'cylinder') {
    const N = 36;
    const W = 2 * Math.PI * dimA;
    const w = W / N;
    const h = height;
    const foldAngle = progress * (Math.PI * 2 / N);
    
    const midIdx = Math.floor(N/2);
    
    let currentChild = <></>;
    for (let i = N - 1; i >= 0; i--) {
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

  // Cone Net with Negative folding angle correction to fold upward!
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
