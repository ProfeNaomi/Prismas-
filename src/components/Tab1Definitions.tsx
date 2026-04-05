import React from 'react';
import { Card, CardContent } from './ui/Card';

export default function Tab1Definitions() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-5xl mx-auto mb-16">
        <h2 className="text-5xl font-bold text-slate-900 mb-6">Conceptos Fundamentales</h2>
        <p className="text-2xl text-slate-600">
          Comprender las diferencias entre perímetro, área y volumen es el primer paso para dominar la geometría.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Perímetro */}
        <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="pt-10 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <polygon points="20,80 80,80 50,20" fill="#eff6ff" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6,6" className="animate-[dash_3s_linear_infinite]" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Perímetro</h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Es la <strong>longitud total del contorno</strong> de una figura geométrica plana. Se calcula sumando las longitudes de todos sus lados.
            </p>
            <div className="mt-8 bg-blue-50 text-blue-800 px-6 py-3 rounded-full text-lg font-medium">
              Unidades: m, cm, mm (1D)
            </div>
          </CardContent>
        </Card>

        {/* Área */}
        <Card className="border-t-4 border-t-emerald-500 hover:shadow-md transition-shadow">
          <CardContent className="pt-10 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="20" y="20" width="60" height="60" fill="#d1fae5" stroke="#10b981" strokeWidth="4" />
                <path d="M20,40 L80,40 M20,60 L80,60 M40,20 L40,80 M60,20 L60,80" stroke="#10b981" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Área</h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Es la <strong>medida de la superficie</strong> que abarca una figura plana. Representa el espacio bidimensional contenido dentro de su perímetro.
            </p>
            <div className="mt-8 bg-emerald-50 text-emerald-800 px-6 py-3 rounded-full text-lg font-medium">
              Unidades: m², cm², mm² (2D)
            </div>
          </CardContent>
        </Card>

        {/* Volumen */}
        <Card className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
          <CardContent className="pt-10 flex flex-col items-center text-center">
            <div className="w-56 h-56 mb-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Back faces */}
                <polygon points="40,30 80,30 80,70 40,70" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
                <polygon points="20,50 40,30 40,70 20,90" fill="#e9d5ff" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
                <polygon points="20,50 60,50 80,30 40,30" fill="#e9d5ff" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
                {/* Front faces */}
                <polygon points="20,50 60,50 60,90 20,90" fill="#d8b4fe" stroke="#9333ea" strokeWidth="3" />
                <polygon points="60,50 80,30 80,70 60,90" fill="#c084fc" stroke="#9333ea" strokeWidth="3" />
                <polygon points="20,50 40,30 80,30 60,50" fill="#e9d5ff" stroke="#9333ea" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">Volumen</h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Es la <strong>cantidad de espacio tridimensional</strong> que ocupa un cuerpo geométrico. Se puede entender como la capacidad de un recipiente.
            </p>
            <div className="mt-8 bg-purple-50 text-purple-800 px-6 py-3 rounded-full text-lg font-medium">
              Unidades: m³, cm³, litros (3D)
            </div>
          </CardContent>
        </Card>
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
      `}</style>
    </div>
  );
}
