import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export default function Tab3Prisms() {
  const prisms = [
    {
      name: 'Prisma Triangular',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Back triangle */}
          <polygon points="50,20 80,40 30,40" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="50" y1="20" x2="50" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="80" y1="40" x2="80" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="30" y1="40" x2="30" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Front triangle */}
          <polygon points="50,60 80,80 30,80" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Visible edges */}
          <line x1="50" y1="20" x2="50" y2="60" stroke="#2563eb" strokeWidth="2" />
          <line x1="80" y1="40" x2="80" y2="80" stroke="#2563eb" strokeWidth="2" />
          <line x1="50" y1="20" x2="80" y2="40" stroke="#2563eb" strokeWidth="2" />
          <line x1="30" y1="80" x2="30" y2="40" stroke="#2563eb" strokeWidth="2" />
          <line x1="50" y1="20" x2="30" y2="40" stroke="#2563eb" strokeWidth="2" />
        </svg>
      ),
      lateralArea: 'AL = P_base × h',
      volume: 'V = A_base × h',
      baseArea: 'A_base = (b × h_triángulo) / 2'
    },
    {
      name: 'Prisma Rectangular',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Back face */}
          <rect x="30" y="20" width="50" height="40" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Connecting lines */}
          <line x1="30" y1="20" x2="20" y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="30" y1="60" x2="20" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Front face */}
          <rect x="20" y="40" width="50" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Top face */}
          <polygon points="20,40 70,40 80,20 30,20" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Right face */}
          <polygon points="70,40 80,20 80,60 70,80" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
        </svg>
      ),
      lateralArea: 'AL = 2(a + b) × h',
      volume: 'V = a × b × h',
      baseArea: 'A_base = a × b'
    },
    {
      name: 'Prisma Circular (Cilindro)',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Back curve of bottom ellipse */}
          <path d="M 20 80 A 30 10 0 0 0 80 80" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Front curve of bottom ellipse */}
          <path d="M 20 80 A 30 10 0 0 1 80 80" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          {/* Sides */}
          <line x1="20" y1="30" x2="20" y2="80" stroke="#2563eb" strokeWidth="2" />
          <line x1="80" y1="30" x2="80" y2="80" stroke="#2563eb" strokeWidth="2" />
          {/* Top ellipse */}
          <ellipse cx="50" cy="30" rx="30" ry="10" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" opacity="0.9" />
          {/* Body fill */}
          <path d="M 20 30 L 20 80 A 30 10 0 0 1 80 80 L 80 30 A 30 10 0 0 0 20 30" fill="#dbeafe" opacity="0.5" />
        </svg>
      ),
      lateralArea: 'AL = 2 × π × r × h',
      volume: 'V = π × r² × h',
      baseArea: 'A_base = π × r²'
    },
    {
      name: 'Prisma Trapezoidal',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Back face (Trapezoid) */}
          <polygon points="35,20 65,20 80,40 20,40" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Connecting lines */}
          <line x1="35" y1="20" x2="35" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="20" y1="40" x2="20" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Front face (Trapezoid) */}
          <polygon points="35,60 65,60 80,80 20,80" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Top face */}
          <polygon points="35,20 65,20 65,60 35,60" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Right face */}
          <polygon points="65,20 80,40 80,80 65,60" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
          {/* Left face */}
          <polygon points="35,20 20,40 20,80 35,60" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
        </svg>
      ),
      lateralArea: 'AL = P_base × h',
      volume: 'V = A_base × h',
      baseArea: 'A_base = ((B + b) × h_trapecio) / 2'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
        <h2 className="text-5xl font-bold text-slate-900 mb-6">¿Qué es un Prisma?</h2>
        <p className="text-2xl text-slate-600 leading-relaxed">
          Un prisma es un poliedro que tiene <strong>dos caras paralelas e iguales llamadas bases</strong>, 
          y sus caras laterales son paralelogramos (generalmente rectángulos). 
          El nombre del prisma depende de la forma de su base.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="bg-blue-50 text-blue-800 px-6 py-3 rounded-xl text-xl font-medium border border-blue-100">
            <strong>Volumen General:</strong> V = Área de la base × altura
          </div>
          <div className="bg-emerald-50 text-emerald-800 px-6 py-3 rounded-xl text-xl font-medium border border-emerald-100">
            <strong>Área Lateral General:</strong> AL = Perímetro de la base × altura
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {prisms.map((prism, i) => (
          <Card key={i} className="hover:shadow-xl transition-shadow border-slate-200 flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-2/5 bg-slate-50 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-64 h-64">
                {prism.image}
              </div>
            </div>
            <div className="w-full lg:w-3/5 p-8 flex flex-col justify-center">
              <h3 className="text-4xl font-bold text-slate-800 mb-6">{prism.name}</h3>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-base text-slate-500 mb-2 font-medium">Área de la Base</div>
                  <div className="font-mono text-xl text-slate-800">{prism.baseArea}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-base text-slate-500 mb-2 font-medium">Área Lateral</div>
                  <div className="font-mono text-xl text-slate-800">{prism.lateralArea}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-base text-blue-600 mb-2 font-medium">Volumen</div>
                  <div className="font-mono text-2xl text-blue-900 font-bold">{prism.volume}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
