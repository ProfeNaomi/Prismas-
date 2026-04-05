import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export default function Tab2Figures() {
  const figures = [
    {
      name: 'Triángulo',
      category: 'Polígonos (3 lados)',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,20 90,80 10,80" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <text x="50" y="88" fontSize="10" textAnchor="middle" fill="#475569">b</text>
          <line x1="50" y1="20" x2="50" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <text x="53" y="55" fontSize="10" fill="#475569">h</text>
          <text x="25" y="50" fontSize="10" fill="#475569">a</text>
          <text x="75" y="50" fontSize="10" fill="#475569">c</text>
        </svg>
      ),
      perimeter: 'P = a + b + c',
      area: 'A = (b × h) / 2',
    },
    {
      name: 'Cuadrado',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="20" width="60" height="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <text x="50" y="90" fontSize="10" textAnchor="middle" fill="#475569">a</text>
          <text x="10" y="53" fontSize="10" fill="#475569">a</text>
        </svg>
      ),
      perimeter: 'P = 4 × a',
      area: 'A = a²',
    },
    {
      name: 'Rectángulo',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="30" width="80" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <text x="50" y="80" fontSize="10" textAnchor="middle" fill="#475569">b</text>
          <text x="2" y="53" fontSize="10" fill="#475569">h</text>
        </svg>
      ),
      perimeter: 'P = 2b + 2h',
      area: 'A = b × h',
    },
    {
      name: 'Rombo',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,10 90,50 50,90 10,50" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <text x="53" y="30" fontSize="10" fill="#475569">D</text>
          <text x="70" y="48" fontSize="10" fill="#475569">d</text>
          <text x="25" y="30" fontSize="10" fill="#475569">a</text>
        </svg>
      ),
      perimeter: 'P = 4 × a',
      area: 'A = (D × d) / 2',
    },
    {
      name: 'Romboide',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="30,30 90,30 70,70 10,70" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <line x1="30" y1="30" x2="30" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <text x="22" y="53" fontSize="10" fill="#475569">h</text>
          <text x="40" y="80" fontSize="10" fill="#475569">b</text>
          <text x="15" y="45" fontSize="10" fill="#475569">a</text>
        </svg>
      ),
      perimeter: 'P = 2a + 2b',
      area: 'A = b × h',
    },
    {
      name: 'Trapecio',
      category: 'Cuadriláteros',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="30,30 70,30 90,70 10,70" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <line x1="30" y1="30" x2="30" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <text x="22" y="53" fontSize="10" fill="#475569">h</text>
          <text x="50" y="25" fontSize="10" textAnchor="middle" fill="#475569">b</text>
          <text x="50" y="80" fontSize="10" textAnchor="middle" fill="#475569">B</text>
          <text x="15" y="45" fontSize="10" fill="#475569">c</text>
          <text x="80" y="45" fontSize="10" fill="#475569">d</text>
        </svg>
      ),
      perimeter: 'P = B + b + c + d',
      area: 'A = ((B + b) × h) / 2',
    },
    {
      name: 'Circunferencia',
      category: 'Cónicas',
      image: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
          <line x1="50" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="50" cy="50" r="2" fill="#475569" />
          <text x="70" y="45" fontSize="10" fill="#475569">r</text>
        </svg>
      ),
      perimeter: 'P = 2 × π × r',
      area: 'A = π × r²',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-5xl mx-auto mb-12">
        <h2 className="text-5xl font-bold text-slate-900 mb-6">Figuras Geométricas Comunes</h2>
        <p className="text-2xl text-slate-600">
          Clasificación y fórmulas de las figuras bidimensionales más utilizadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {figures.map((fig, i) => (
          <Card key={i} className="hover:shadow-xl transition-shadow border-slate-200">
            <CardHeader className="bg-slate-50 pb-6">
              <div className="text-base font-bold text-blue-600 uppercase tracking-wider mb-2">
                {fig.category}
              </div>
              <CardTitle className="text-3xl">{fig.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="w-56 h-56 mx-auto mb-8">
                {fig.image}
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-base text-slate-500 mb-2 font-medium">Perímetro</div>
                  <div className="font-mono text-xl text-slate-800">{fig.perimeter}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-base text-slate-500 mb-2 font-medium">Área</div>
                  <div className="font-mono text-xl text-slate-800">{fig.area}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
