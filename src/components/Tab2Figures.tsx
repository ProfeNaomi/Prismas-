import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import Formula from './Formula';

export default function Tab2Figures() {
  const figures = [
    {
      name: 'Triángulo',
      category: 'Polígonos (3 lados)',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-tri" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <polygon points="50,15 90,75 10,75" fill="url(#grad-tri)" stroke="#047857" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="50" y1="15" x2="50" y2="75" stroke="#047857" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="50" y="87" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle" fill="#0f172a" fontWeight="bold">b</text>
          <text x="55" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">h</text>
          <text x="24" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">a</text>
          <text x="74" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">c</text>
        </svg>
      ),
      perimeter: 'P = a + b + c',
      area: 'A = (b * h) / 2',
    },
    {
      name: 'Cuadrado',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-sq" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <rect x="20" y="20" width="60" height="60" rx="4" fill="url(#grad-sq)" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="50" y="92" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle" fill="#0f172a" fontWeight="bold">a</text>
          <text x="10" y="54" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">a</text>
        </svg>
      ),
      perimeter: 'P = 4 * a',
      area: 'A = a^2',
    },
    {
      name: 'Rectángulo',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-rect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
          <rect x="10" y="30" width="80" height="40" rx="4" fill="url(#grad-rect)" stroke="#7e22ce" strokeWidth="2.5" />
          <text x="50" y="82" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle" fill="#0f172a" fontWeight="bold">b</text>
          <text x="4" y="54" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">h</text>
        </svg>
      ),
      perimeter: 'P = 2b + 2h',
      area: 'A = b * h',
    },
    {
      name: 'Rombo',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-romb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <polygon points="50,10 90,50 50,90 10,50" fill="url(#grad-romb)" stroke="#b45309" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3,3" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3,3" />
          <text x="54" y="30" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">D</text>
          <text x="70" y="47" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">d</text>
          <text x="23" y="30" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">a</text>
        </svg>
      ),
      perimeter: 'P = 4 * a',
      area: 'A = (D * d) / 2',
    },
    {
      name: 'Romboide',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-romboid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <polygon points="30,25 90,25 70,75 10,75" fill="url(#grad-romboid)" stroke="#3730a3" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="30" y1="25" x2="30" y2="75" stroke="#3730a3" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="22" y="54" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">h</text>
          <text x="45" y="87" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">b</text>
          <text x="14" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">a</text>
        </svg>
      ),
      perimeter: 'P = 2a + 2b',
      area: 'A = b * h',
    },
    {
      name: 'Trapecio',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="grad-trap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <polygon points="28,25 72,25 92,75 8,75" fill="url(#grad-trap)" stroke="#be185d" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="28" y1="25" x2="28" y2="75" stroke="#be185d" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="20" y="54" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">h</text>
          <text x="50" y="20" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle" fill="#0f172a" fontWeight="bold">b</text>
          <text x="50" y="87" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" textAnchor="middle" fill="#0f172a" fontWeight="bold">B</text>
          <text x="12" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">c</text>
          <text x="85" y="48" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">d</text>
        </svg>
      ),
      perimeter: 'P = B + b + c + d',
      area: 'A = ((B + b) * h) / 2',
    },
    {
      name: 'Círculo',
      category: 'Cónicas',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="grad-circ" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#7c3aed" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#grad-circ)" stroke="#6d28d9" strokeWidth="2.5" />
          <line x1="50" y1="50" x2="90" y2="50" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill="#4c1d95" />
          <text x="70" y="45" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic" fill="#0f172a" fontWeight="bold">r</text>
        </svg>
      ),
      perimeter: 'P = 2 * \\pi * r',
      area: 'A = \\pi * r^2',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Figuras Geométricas Comunes</h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          Clasificación, ilustraciones y fórmulas de las figuras bidimensionales que forman las bases de los cuerpos tridimensionales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {figures.map((fig, i) => (
          <Card key={i} className="hover:shadow-xl transition-all border-slate-200 duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 pb-4">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {fig.category}
                </div>
                <CardTitle className="text-2xl text-slate-800 font-bold">{fig.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 flex-grow flex flex-col items-center">
                <div className="w-44 h-44 mx-auto mb-6 bg-slate-50/50 rounded-2xl border border-slate-100/50 p-2 flex items-center justify-center">
                  {fig.image}
                </div>
              </CardContent>
            </div>
            <CardContent className="pt-0 pb-6">
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Perímetro</div>
                  <div className="text-slate-800 font-semibold"><Formula tex={fig.perimeter} className="text-sm" /></div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Área</div>
                  <div className="text-slate-800 font-semibold"><Formula tex={fig.area} className="text-sm" /></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
