import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from './ui/Card';
import Formula from './Formula';

type BaseType = 
  | 'square' 
  | 'rectangle' 
  | 'triangle' 
  | 'trapezoid' 
  | 'cylinder' 
  | 'cone' 
  | 'pyramid_triangular'
  | 'pyramid_square'
  | 'pyramid_pentagonal'
  | 'pyramid_hexagonal';

type Mode = 'discrete' | 'continuous';

export default function Tab4Simulator() {
  const [baseType, setBaseType] = useState<BaseType>('square');
  const [mode, setMode] = useState<Mode>('discrete');
  const [height, setHeight] = useState<number>(5);
  
  // Dimensions inputs (allow typing numbers, we sanitize them for math and WebGL)
  const [dimA, setDimA] = useState<string>('4'); // Square side, Rect width, Tri base, Trap B, Cylinder/Cone Radius, Pyramid side
  const [dimB, setDimB] = useState<string>('4'); // Rect depth, Tri height, Trap b
  const [dimC, setDimC] = useState<string>('4'); // Trap height

  // Strict Sanitization to protect WebGL from NaN crashes
  const safeA = useMemo(() => Math.max(0.1, parseFloat(dimA) || 1), [dimA]);
  const safeB = useMemo(() => Math.max(0.1, parseFloat(dimB) || 1), [dimB]);
  const safeC = useMemo(() => Math.max(0.1, parseFloat(dimC) || 1), [dimC]);
  const safeH = useMemo(() => Math.max(0.01, height || 0.1), [height]);

  // Calculate Base Area based on sanitized inputs
  const baseArea = useMemo(() => {
    switch (baseType) {
      case 'square': return safeA * safeA;
      case 'rectangle': return safeA * safeB;
      case 'triangle': return (safeA * safeB) / 2;
      case 'trapezoid': return ((safeA + safeB) * safeC) / 2;
      case 'cylinder': return Math.PI * safeA * safeA;
      case 'cone': return Math.PI * safeA * safeA;
      case 'pyramid_triangular': return (3 * safeA * safeA) / (4 * Math.tan(Math.PI / 3));
      case 'pyramid_square': return safeA * safeA;
      case 'pyramid_pentagonal': return (5 * safeA * safeA) / (4 * Math.tan(Math.PI / 5));
      case 'pyramid_hexagonal': return (6 * safeA * safeA) / (4 * Math.tan(Math.PI / 6));
      default: return 0;
    }
  }, [baseType, safeA, safeB, safeC]);

  // Calculate Volume
  const currentHeight = mode === 'discrete' ? Math.floor(safeH) : safeH;
  const volume = useMemo(() => {
    const isPyramidOrCone = baseType === 'cone' || baseType.startsWith('pyramid_');
    if (isPyramidOrCone) {
      return (baseArea * currentHeight) / 3;
    }
    return baseArea * currentHeight;
  }, [baseType, baseArea, currentHeight]);

  // Dynamic LaTeX formulas for the active geometry
  const dynamicFormulas = useMemo(() => {
    switch (baseType) {
      case 'square':
        return { base: 'A_{base} = a^2', vol: 'V = A_{base} \\cdot h' };
      case 'rectangle':
        return { base: 'A_{base} = a \\cdot b', vol: 'V = A_{base} \\cdot h' };
      case 'triangle':
        return { base: 'A_{base} = \\frac{b \\cdot h_t}{2}', vol: 'V = A_{base} \\cdot h' };
      case 'trapezoid':
        return { base: 'A_{base} = \\frac{(B + b) \\cdot h_p}{2}', vol: 'V = A_{base} \\cdot h' };
      case 'cylinder':
        return { base: 'A_{base} = \\pi \\cdot r^2', vol: 'V = A_{base} \\cdot h' };
      case 'cone':
        return { base: 'A_{base} = \\pi \\cdot r^2', vol: 'V = \\frac{A_{base} \\cdot h}{3}' };
      case 'pyramid_triangular':
        return { base: 'A_{base} = \\frac{3 \\cdot s^2}{4 \\cdot \\tan(60°)}', vol: 'V = \\frac{A_{base} \\cdot h}{3}' };
      case 'pyramid_square':
        return { base: 'A_{base} = s^2', vol: 'V = \\frac{A_{base} \\cdot h}{3}' };
      case 'pyramid_pentagonal':
        return { base: 'A_{base} = \\frac{5 \\cdot s^2}{4 \\cdot \\tan(36°)}', vol: 'V = \\frac{A_{base} \\cdot h}{3}' };
      case 'pyramid_hexagonal':
        return { base: 'A_{base} = \\frac{6 \\cdot s^2}{4 \\cdot \\tan(30°)}', vol: 'V = \\frac{A_{base} \\cdot h}{3}' };
      default:
        return { base: '', vol: '' };
    }
  }, [baseType]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
      {/* Controls Panel */}
      <Card className="w-full lg:w-80 flex flex-col shrink-0 overflow-y-auto border-slate-200 shadow-lg">
        <CardContent className="p-6 space-y-6 flex flex-col h-full justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Configuración</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Cuerpo Geométrico</label>
                  <select 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-700 bg-white"
                    value={baseType}
                    onChange={(e) => {
                      const newType = e.target.value as BaseType;
                      setBaseType(newType);
                      // Pyramids and cones should only grow continuously
                      if (newType !== 'square' && newType !== 'rectangle') {
                        setMode('continuous');
                      }
                    }}
                  >
                    <optgroup label="Prismas">
                      <option value="square">Prisma Cuadrado</option>
                      <option value="rectangle">Prisma Rectangular</option>
                      <option value="triangle">Prisma Triangular</option>
                      <option value="trapezoid">Prisma Trapezoidal</option>
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
                  {baseType.startsWith('pyramid_') && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Lado basal s (m)</label>
                      <input 
                        type="number" 
                        min="0.5" 
                        max="15" 
                        step="0.1"
                        value={dimA} 
                        onChange={e => setDimA(e.target.value)} 
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  )}
                  {(baseType === 'square') && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Lado basal a (m)</label>
                      <input 
                        type="number" 
                        min="0.5" 
                        max="15" 
                        step="0.1"
                        value={dimA} 
                        onChange={e => setDimA(e.target.value)} 
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  )}
                  {(baseType === 'cylinder' || baseType === 'cone') && (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Radio basal r (m)</label>
                      <input 
                        type="number" 
                        min="0.5" 
                        max="15" 
                        step="0.1"
                        value={dimA} 
                        onChange={e => setDimA(e.target.value)} 
                        className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  )}
                  {baseType === 'rectangle' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Ancho a (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimA} 
                          onChange={e => setDimA(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Largo b (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimB} 
                          onChange={e => setDimB(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                    </>
                  )}
                  {baseType === 'triangle' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Base b (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimA} 
                          onChange={e => setDimA(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Altura del triángulo h_t (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimB} 
                          onChange={e => setDimB(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                    </>
                  )}
                  {baseType === 'trapezoid' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Base Mayor B (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimA} 
                          onChange={e => setDimA(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Base Menor b (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimB} 
                          onChange={e => setDimB(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Altura del trapecio h_p (m)</label>
                        <input 
                          type="number" 
                          min="0.5" 
                          max="15" 
                          step="0.1"
                          value={dimC} 
                          onChange={e => setDimC(e.target.value)} 
                          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold" 
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Mode Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Crecimiento</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      disabled={baseType !== 'square' && baseType !== 'rectangle'}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        mode === 'discrete' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700 disabled:opacity-30'
                      }`}
                      onClick={() => { setMode('discrete'); setHeight(Math.floor(height)); }}
                    >
                      Pisos (Cubes)
                    </button>
                    <button
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        mode === 'continuous' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                      onClick={() => setMode('continuous')}
                    >
                      Fluido (Water)
                    </button>
                  </div>
                  {baseType !== 'square' && baseType !== 'rectangle' && (
                    <p className="text-[10px] text-slate-400 mt-1">El crecimiento por capas discretas solo aplica para prismas rectos.</p>
                  )}
                </div>

                {/* Height Slider */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {mode === 'discrete' ? 'Pisos' : 'Altura h (m)'}
                    </label>
                    <span className="text-sm font-bold text-blue-600">{currentHeight.toFixed(mode === 'continuous' ? 1 : 0)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="15" 
                    step={mode === 'discrete' ? 1 : 0.1}
                    value={height} 
                    onChange={e => setHeight(Number(e.target.value))} 
                    className="w-full accent-blue-600 cursor-ew-resize"
                  />
                </div>
              </div>
            </div>

            {/* Pedagogy Formulations */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mt-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guía de Fórmulas</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Base:</span>
                <Formula tex={dynamicFormulas.base} className="text-sm" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Volumen:</span>
                <Formula tex={dynamicFormulas.vol} className="text-sm" />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="pt-4 border-t border-slate-100 space-y-4 bg-white">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Área Basal (A_base)</div>
              <div className="text-2xl font-bold text-slate-800">{baseArea.toFixed(2)} <span className="text-sm font-semibold text-slate-400">m²</span></div>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200/50">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">Volumen del Sólido (V)</div>
              <div className="text-3xl font-bold text-blue-700">{volume.toFixed(2)} <span className="text-base font-semibold text-blue-400">m³</span></div>
              {mode === 'discrete' && currentHeight > 0 && (baseType === 'square' || baseType === 'rectangle') && (
                <div className="text-xs text-blue-500/80 font-medium mt-1">({Math.round(volume)} cubos unidad de 1x1x1m)</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Canvas Viewport */}
      <Card className="flex-1 relative overflow-hidden bg-slate-900 border-none shadow-inner flex flex-col justify-end">
        <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold border border-slate-700/50 shadow-md">
          Rotar: Arrastrar Clic Izq • Zoom: Rueda • Desplazar: Clic Der + Arrastrar
        </div>
        <div className="absolute top-4 right-4 z-10 bg-blue-900/60 backdrop-blur-md text-blue-200 px-4 py-2 rounded-full text-xs font-bold border border-blue-800/50 uppercase tracking-wider shadow-md">
          {baseType.startsWith('pyramid_') ? 'Pirámide Regular' : baseType === 'cone' ? 'Cono Circular' : baseType === 'cylinder' ? 'Cilindro Recto' : 'Prisma Recto'}
        </div>
        <div className="w-full h-full">
          <Canvas camera={{ position: [15, 12, 15], fov: 42 }}>
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.65} />
            <directionalLight position={[15, 30, 15]} intensity={1.2} castShadow />
            <directionalLight position={[-15, 20, -15]} intensity={0.4} />
            
            <Grid infiniteGrid fadeDistance={40} sectionColor="#334155" cellColor="#1e293b" cellThickness={1.5} />
            
            <PrismMesh 
              baseType={baseType} 
              safeA={safeA} 
              safeB={safeB} 
              safeC={safeC} 
              height={currentHeight} 
              mode={mode} 
            />
            
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>
        </div>
      </Card>
    </div>
  );
}

// Helper to construct regular N-gon shapes for consistent top/bottom faces
function getRegularPolygonShape(sides: number, radius: number) {
  const shape = new THREE.Shape();
  // Rotate so that base rests horizontal
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

// 3D Geometry Renderer
function PrismMesh({ 
  baseType, 
  safeA, 
  safeB, 
  safeC, 
  height, 
  mode 
}: { 
  baseType: BaseType; 
  safeA: number; 
  safeB: number; 
  safeC: number; 
  height: number; 
  mode: Mode; 
}) {
  const isFloorZero = height <= 0.05;
  
  const material = mode === 'continuous' 
    ? <meshStandardMaterial color="#0ea5e9" transparent opacity={0.6} roughness={0.1} metalness={0.1} side={THREE.DoubleSide} />
    : <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />;

  // Texture mapping for discrete layers on curved cylinder bases
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#3b82f6';
      context.fillRect(0, 0, 128, 128);
      context.strokeStyle = '#1d4ed8';
      context.lineWidth = 4;
      context.strokeRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useMemo(() => {
    gridTexture.repeat.set(Math.round(2 * Math.PI * safeA), Math.max(1, Math.round(height)));
    gridTexture.needsUpdate = true;
  }, [gridTexture, safeA, height]);

  const discreteMaterial = <meshStandardMaterial map={gridTexture} roughness={0.2} metalness={0.1} />;

  // Render general regular pyramids (N-gonal)
  if (baseType.startsWith('pyramid_')) {
    let sides = 4;
    if (baseType === 'pyramid_triangular') sides = 3;
    else if (baseType === 'pyramid_square') sides = 4;
    else if (baseType === 'pyramid_pentagonal') sides = 5;
    else if (baseType === 'pyramid_hexagonal') sides = 6;

    // Circumradius of regular N-gon: R = s / (2 * sin(PI / N))
    const circumRadius = safeA / (2 * Math.sin(Math.PI / sides));
    
    // Construct regular polygon shape for solid flat base
    const baseShape = useMemo(() => getRegularPolygonShape(sides, circumRadius), [sides, circumRadius]);

    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height / 2, 0]} rotation={[0, sides % 2 === 0 ? Math.PI / sides : 0, 0]}>
            <cylinderGeometry args={[0, circumRadius, height, sides]} />
            {material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1d4ed8"} />
          </mesh>
        )}
        {/* Solid bottom base */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <shapeGeometry args={[baseShape]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.85 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // Render Cylinder
  if (baseType === 'cylinder') {
    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[safeA, safeA, height, 32]} />
            {mode === 'discrete' ? discreteMaterial : material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[safeA, 32]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.85 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // Render Cone
  if (baseType === 'cone') {
    return (
      <group>
        {!isFloorZero && (
          <mesh position={[0, height / 2, 0]}>
            <coneGeometry args={[safeA, height, 32]} />
            {material}
            <Edges threshold={15} color={mode === 'continuous' ? "#0284c7" : "#1e3a8a"} />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[safeA, 32]} />
          <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.85 : 0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // Render Discrete layers (made of singular 1x1x1 cubes) for Square/Rectangle prisms
  if (mode === 'discrete' && !isFloorZero && (baseType === 'square' || baseType === 'rectangle')) {
    const width = Math.round(safeA);
    const depth = baseType === 'square' ? Math.round(safeA) : Math.round(safeB);
    const intHeight = Math.round(height);
    const cubes = [];
    
    // Prevent browser freezing for extremely massive sizes by capping rendering
    if (width * depth * intHeight < 3000) {
      for (let y = 0; y < intHeight; y++) {
        for (let x = 0; x < width; x++) {
          for (let z = 0; z < depth; z++) {
            cubes.push(
              <mesh key={`${x}-${y}-${z}`} position={[x - width / 2 + 0.5, y + 0.5, z - depth / 2 + 0.5]}>
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
          <mesh position={[0, height / 2, 0]}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
            <Edges scale={1.0} threshold={15} color="#1d4ed8" />
          </mesh>
        )}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
          <meshBasicMaterial color="#1e3a8a" transparent opacity={0.3} side={THREE.DoubleSide} />
          <Edges color="#60a5fa" />
        </mesh>
      </group>
    );
  }

  // ExtrudeGeometry for fluid continuous Prisms
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (baseType === 'square') {
      const w = safeA / 2;
      s.moveTo(-w, -w);
      s.lineTo(w, -w);
      s.lineTo(w, w);
      s.lineTo(-w, w);
      s.lineTo(-w, -w);
    } else if (baseType === 'rectangle') {
      const w = safeA / 2;
      const d = safeB / 2;
      s.moveTo(-w, -d);
      s.lineTo(w, -d);
      s.lineTo(w, d);
      s.lineTo(-w, d);
      s.lineTo(-w, -d);
    } else if (baseType === 'triangle') {
      const w = safeA / 2;
      const h = safeB;
      s.moveTo(-w, -h / 3);
      s.lineTo(w, -h / 3);
      s.lineTo(0, h * 2 / 3);
      s.lineTo(-w, -h / 3);
    } else if (baseType === 'trapezoid') {
      const B = safeA;
      const b = safeB;
      const h = safeC;
      s.moveTo(-B / 2, -h / 2);
      s.lineTo(B / 2, -h / 2);
      s.lineTo(b / 2, h / 2);
      s.lineTo(-b / 2, h / 2);
      s.lineTo(-B / 2, -h / 2);
    }
    return s;
  }, [baseType, safeA, safeB, safeC]);

  const extrudeSettings = useMemo(() => ({
    depth: Math.max(height, 0.01),
    bevelEnabled: false,
  }), [height]);

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
        <meshBasicMaterial color={isFloorZero ? "#3b82f6" : "#1e3a8a"} transparent opacity={isFloorZero ? 0.85 : 0.3} side={THREE.DoubleSide} />
        <Edges color="#60a5fa" />
      </mesh>
    </group>
  );
}
