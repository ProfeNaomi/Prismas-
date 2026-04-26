/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Cuboid, Layers, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';
import Tab1Definitions from './components/Tab1Definitions';
import Tab4Simulator from './components/Tab4Simulator';
import Tab5Nets from './components/Tab5Nets';
import Tab6Exercises from './components/Tab6Exercises';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Teoría', icon: BookOpen, component: Tab1Definitions },
    { id: 1, label: 'Simulador 3D', icon: Cuboid, component: Tab4Simulator },
    { id: 2, label: 'Mallas 3D', icon: Layers, component: Tab5Nets },
    { id: 3, label: 'Ejercicios', icon: PenTool, component: Tab6Exercises },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Cuboid className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Geometría 3D - Profesora Naomi
              </h1>
            </div>
            <nav className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap",
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </main>
    </div>
  );
}
