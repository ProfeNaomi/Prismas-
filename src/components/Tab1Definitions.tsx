import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Box, Cylinder, Triangle, Circle, Hexagon, Component } from 'lucide-react';

export default function Tab1Definitions() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Teoría: Cuerpos Geométricos 3D</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Los cuerpos geométricos o sólidos tridimensionales son figuras que tienen tres dimensiones: <strong>largo, ancho y alto</strong>. Ocupan un lugar en el espacio y, por tanto, tienen volumen.
        </p>
      </div>

      {/* Conceptos de Área y Volumen */}
      <section>
        <h3 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-200 pb-4">Conceptos Clave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Component className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">Área (Superficie)</h4>
              </div>
              <p className="text-lg text-slate-600 mb-4">
                Es la suma de las áreas de todas las caras que limitan al cuerpo. Imagina que es la cantidad de papel de regalo necesaria para envolver la figura por completo.
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li><strong>Área Lateral:</strong> Suma de las áreas de las caras laterales (los "lados").</li>
                <li><strong>Área Basal:</strong> Suma de las áreas de las bases.</li>
                <li><strong>Área Total:</strong> Área Lateral + Área Basal.</li>
              </ul>
              <div className="mt-6 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-md inline-block">Unidades: cm², m²</div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Box className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">Volumen (Capacidad)</h4>
              </div>
              <p className="text-lg text-slate-600 mb-4">
                Es la medida del espacio tridimensional que ocupa el cuerpo. Imagina que es la cantidad de agua o arena que necesitas para llenar el cuerpo por completo.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg my-4 text-purple-900 border border-purple-100">
                El principio de Cavalieri nos dice que el volumen de muchos cuerpos rectos se puede calcular como:<br/>
                <strong>Volumen = Área de la Base × Altura</strong>
              </div>
              <div className="mt-2 text-sm font-semibold text-purple-700 bg-purple-50 py-2 px-4 rounded-md inline-block">Unidades: cm³, m³, Litros</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Clasificación */}
      <section>
        <h3 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-200 pb-4">Clasificación de los Cuerpos 3D</h3>
        
        <div className="space-y-12">
          {/* Poliedros */}
          <div>
            <h4 className="text-2xl font-bold text-blue-700 mb-6">1. Poliedros</h4>
            <p className="text-lg text-slate-700 mb-6">
              Son cuerpos geométricos cerrados cuyas caras son <strong>todas figuras planas</strong> (polígonos). No tienen curvas.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h5 className="text-xl font-bold text-slate-800 mb-3">Prismas</h5>
                  <p className="text-slate-600 mb-4">
                    Tienen dos bases poligonales iguales y paralelas, unidas por caras laterales que son paralelogramos (generalmente rectángulos).
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Volumen: V = Área base × h</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <Box className="w-10 h-10" />
                    <span className="text-sm">Ejemplos: Cubo, Prisma rectangular, Prisma triangular.</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <h5 className="text-xl font-bold text-slate-800 mb-3">Pirámides</h5>
                  <p className="text-slate-600 mb-4">
                    Tienen una sola base poligonal y caras laterales que son triángulos que se unen en un punto común llamado <strong>cúspide</strong> o vértice superior.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Volumen: V = (Área base × h) / 3</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <Triangle className="w-10 h-10" />
                    <span className="text-sm">Ejemplos: Pirámide cuadrada, Tetraedro (base triangular).</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Teorema de Euler */}
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
              <h5 className="text-lg font-bold text-indigo-900 mb-2">Teorema de Euler para Poliedros</h5>
              <p className="text-indigo-800 mb-3">
                Para cualquier poliedro convexo, existe una relación constante entre el número de caras (C), vértices (V) y aristas (A):
              </p>
              <div className="text-2xl font-mono text-center font-bold text-indigo-700 bg-white py-3 rounded-lg border border-indigo-200">
                C + V = A + 2
              </div>
            </div>
          </div>

          {/* Cuerpos Redondos */}
          <div>
            <h4 className="text-2xl font-bold text-rose-700 mb-6">2. Cuerpos Redondos (De Revolución)</h4>
            <p className="text-lg text-slate-700 mb-6">
              Son cuerpos geométricos que tienen al menos <strong>una superficie curva</strong>. Se generan al girar una figura plana alrededor de un eje.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <h5 className="text-xl font-bold text-slate-800 mb-3">Cilindro</h5>
                  <p className="text-slate-600 mb-4 flex-grow">
                    Generado al girar un rectángulo. Tiene dos bases circulares iguales y paralelas y una superficie lateral curva.
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium text-center">V = π · r² · h</div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium text-center">Área = 2·π·r·h + 2·π·r²</div>
                    <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium text-center">Generatriz = Altura</div>
                  </div>
                  <Cylinder className="w-12 h-12 text-slate-300 mx-auto mt-4" />
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <h5 className="text-xl font-bold text-slate-800 mb-3">Cono</h5>
                  <p className="text-slate-600 mb-4 flex-grow">
                    Generado al girar un triángulo rectángulo. Tiene una base circular y una superficie lateral curva que termina en una cúspide.
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium text-center">V = (π · r² · h) / 3</div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium text-center">Área = π·r·g + π·r²</div>
                    <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium text-center">g² = r² + h² (Pitágoras)</div>
                  </div>
                  <Triangle className="w-12 h-12 text-slate-300 mx-auto mt-4" />
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <h5 className="text-xl font-bold text-slate-800 mb-3">Esfera</h5>
                  <p className="text-slate-600 mb-4 flex-grow">
                    Generada al girar un semicírculo. Todos los puntos de su superficie están a la misma distancia del centro (radio).
                  </p>
                  <div className="space-y-2 mt-auto">
                    <div className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium text-center">V = (4/3) · π · r³</div>
                    <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium text-center">Área = 4 · π · r²</div>
                  </div>
                  <Circle className="w-12 h-12 text-slate-300 mx-auto mt-4" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
