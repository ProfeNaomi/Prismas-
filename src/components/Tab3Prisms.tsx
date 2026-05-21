import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Formula from './Formula';

export default function Tab3Prisms() {
  const prisms = [
    {
      name: 'Prisma Triangular',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="grad-tri3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Hidden back edges */}
          <polygon points="50,15 85,30 25,30" fill="none" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="25" y1="30" x2="25" y2="75" stroke="#a7f3d0" strokeWidth="1.2" strokeDasharray="3,3" />
          {/* 3D solid faces */}
          <polygon points="50,15 85,30 85,75 50,60" fill="url(#grad-tri3d)" stroke="#065f46" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="50,15 25,30 25,75 50,60" fill="url(#grad-tri3d)" stroke="#065f46" strokeWidth="2" opacity="0.6" strokeLinejoin="round" />
          {/* Visible outlines */}
          <polygon points="50,60 85,75 25,75" fill="#a7f3d0" fillOpacity="0.3" stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
          <line x1="50" y1="15" x2="50" y2="60" stroke="#047857" strokeWidth="2" />
          <line x1="85" y1="30" x2="85" y2="75" stroke="#047857" strokeWidth="2" />
          <line x1="50" y1="15" x2="85" y2="30" stroke="#047857" strokeWidth="2" />
          <line x1="50" y1="15" x2="25" y2="30" stroke="#047857" strokeWidth="2" />
        </svg>
      ),
      lateralArea: 'A_L = P_{base} * h',
      volume: 'V = A_{base} * h',
      baseArea: 'A_{base} = (b * h_{triángulo}) / 2'
    },
    {
      name: 'Prisma Rectangular',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="grad-rect3d-front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-rect3d-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-rect3d-side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Hidden back edges */}
          <line x1="35" y1="20" x2="85" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="35" y1="20" x2="35" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="35" y1="20" x2="20" y2="35" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          {/* Faces */}
          <rect x="20" y="35" width="50" height="40" fill="url(#grad-rect3d-front)" stroke="#1d4ed8" strokeWidth="2" rx="1" />
          <polygon points="20,35 70,35 85,20 35,20" fill="url(#grad-rect3d-top)" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="70,35 85,20 85,60 70,75" fill="url(#grad-rect3d-side)" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
      lateralArea: 'A_L = 2(a + b) * h',
      volume: 'V = a * b * h',
      baseArea: 'A_{base} = a * b'
    },
    {
      name: 'Prisma Circular (Cilindro)',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="grad-cyl3d" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#f472b6" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#be185d" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-cyl3d-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          {/* Bottom base dashed back curve */}
          <path d="M 20 75 A 30 10 0 0 0 80 75" fill="none" stroke="#fbcfe8" strokeWidth="1" strokeDasharray="3,3" />
          {/* Bottom base visible front curve */}
          <path d="M 20 75 A 30 10 0 0 1 80 75" fill="none" stroke="#db2777" strokeWidth="2" />
          {/* Cylinder curved body extrusion */}
          <path d="M 20 30 L 20 75 A 30 10 0 0 1 80 75 L 80 30 A 30 10 0 0 0 20 30" fill="url(#grad-cyl3d)" stroke="none" />
          {/* Left and right visible edges */}
          <line x1="20" y1="30" x2="20" y2="75" stroke="#db2777" strokeWidth="2" />
          <line x1="80" y1="30" x2="80" y2="75" stroke="#db2777" strokeWidth="2" />
          {/* Top base ellipse */}
          <ellipse cx="50" cy="30" rx="30" ry="10" fill="url(#grad-cyl3d-top)" stroke="#be185d" strokeWidth="2" />
        </svg>
      ),
      lateralArea: 'A_L = 2 * \\pi * r * h',
      volume: 'V = \\pi * r^2 * h',
      baseArea: 'A_{base} = \\pi * r^2'
    },
    {
      name: 'Prisma Trapezoidal',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="grad-trap3d-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grad-trap3d-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-trap3d-side" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Hidden back edges */}
          <polygon points="35,15 65,15 80,30 20,30" fill="none" stroke="#d8b4fe" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="35" y1="15" x2="35" y2="55" stroke="#d8b4fe" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="20" y1="30" x2="20" y2="70" stroke="#d8b4fe" strokeWidth="1" strokeDasharray="3,3" />
          {/* 3D solid faces */}
          <polygon points="35,55 65,55 80,70 20,70" fill="url(#grad-trap3d-front)" stroke="#6b21a8" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="35,15 65,15 65,55 35,55" fill="url(#grad-trap3d-top)" stroke="#6b21a8" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="65,15 80,30 80,70 65,55" fill="url(#grad-trap3d-side)" stroke="#6b21a8" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="35,15 20,30 20,70 35,55" fill="url(#grad-trap3d-side)" stroke="#6b21a8" strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
        </svg>
      ),
      lateralArea: 'A_L = P_{base} * h',
      volume: 'V = A_{base} * h',
      baseArea: 'A_{base} = ((B + b) * h_{trapecio}) / 2'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-10 border border-slate-200/60 shadow-sm">
        <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">¿Qué es un Prisma?</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Un prisma es un poliedro que tiene <strong>dos caras paralelas e iguales llamadas bases</strong>, 
          y sus caras laterales son paralelogramos (generalmente rectángulos). 
          El nombre del prisma depende de la forma de su base.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="bg-blue-100/60 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 px-6 py-3 rounded-xl text-lg font-semibold border border-blue-200/50 flex items-center gap-2 shadow-sm">
            <span>Volumen General:</span>
            <Formula tex="V = A_{base} \cdot h" />
          </div>
          <div className="bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 px-6 py-3 rounded-xl text-lg font-semibold border border-emerald-200/50 flex items-center gap-2 shadow-sm">
            <span>Área Lateral General:</span>
            <Formula tex="A_L = P_{base} \cdot h" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {prisms.map((prism, i) => (
          <Card key={i} className="hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col sm:flex-row">
            <div className="w-full sm:w-2/5 bg-slate-50/70 p-8 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100">
              <div className="w-52 h-52">
                {prism.image}
              </div>
            </div>
            <div className="w-full sm:w-3/5 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-6">{prism.name}</h3>
              <div className="space-y-4">
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Área de la Base</div>
                  <div className="text-slate-800"><Formula tex={prism.baseArea} className="text-base" /></div>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Área Lateral</div>
                  <div className="text-slate-800"><Formula tex={prism.lateralArea} className="text-base" /></div>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Volumen</div>
                  <div className="text-blue-900"><Formula tex={prism.volume} className="text-lg font-bold" /></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
