import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { CheckCircle, XCircle, ArrowRight, Trophy, Brain, Lightbulb } from 'lucide-react';
import Formula from './Formula';

const PI = 3.1;

type QuestionType = 'identification' | 'volume' | 'area' | 'word_problem';

interface Exercise {
  id: string;
  type: QuestionType;
  question: React.ReactNode;
  options: string[];
  correctAnswer: string;
  explanation: React.ReactNode;
  unit?: string;
  isNumeric: boolean;
}

// Helper to safely build options and distractors
function createChoices(correct: string, rawDistractors: string[], unit?: string): string[] {
  const set = new Set<string>();
  set.add(correct);
  
  for (const dist of rawDistractors) {
    if (dist && dist !== correct) {
      set.add(dist);
    }
  }
  
  if (set.size < 4) {
    // Attempt to parse number
    const numMatch = correct.match(/^([\d.]+)/);
    if (numMatch) {
      const correctVal = parseFloat(numMatch[1]);
      let offset = 1;
      while (set.size < 4) {
        const sign = Math.random() > 0.5 ? 1 : -1;
        // Percentage offset + integer offset
        const addVal = Math.round((correctVal + sign * (correctVal * 0.15 + offset)) * 10) / 10;
        if (addVal > 0) {
          set.add(unit ? `${addVal} ${unit}` : `${addVal}`);
        }
        offset += 2;
      }
    } else {
      // Fallbacks if not numeric
      const fallbacks = ['Prisma Hexagonal', 'Prisma Octogonal', 'Pirámide Heptagonal', 'Tronco de Pirámide'];
      for (const fb of fallbacks) {
        if (set.size >= 4) break;
        set.add(fb);
      }
    }
  }
  
  const options = Array.from(set);
  return options.sort(() => Math.random() - 0.5);
}

// Generate an exercise dynamically
function generateExercise(): Exercise {
  const types: QuestionType[] = ['identification', 'volume', 'area', 'word_problem'];
  const type = types[Math.floor(Math.random() * types.length)];
  const id = Math.random().toString(36).substring(7).toUpperCase();

  if (type === 'identification') {
    const bodies = [
      { name: 'Cilindro', props: 'Tiene dos bases circulares planas, paralelas y congruentes, unidas por una superficie lateral curva y continua.' },
      { name: 'Cono', props: 'Cuerpo redondo que posee una única base circular plana y una superficie lateral curva que se estrecha uniformemente hasta un vértice superior.' },
      { name: 'Prisma Rectangular', props: 'Cuerpo con dos bases rectangulares paralelas e idénticas, y cuatro caras laterales que también son rectángulos.' },
      { name: 'Pirámide Cuadrada', props: 'Poliedro que consta de una base de forma cuadrada y cuatro caras laterales triangulares que concurren en una cúspide.' },
      { name: 'Esfera', props: 'Cuerpo redondo tridimensional perfectamente simétrico sin caras planas, donde todos sus puntos están a la misma distancia del centro.' },
      { name: 'Prisma Triangular', props: 'Cuerpo geométrico con dos bases de forma triangular paralelas y tres caras laterales de forma rectangular.' },
      { name: 'Pirámide Triangular', props: 'Cuerpo geométrico cuya base es un triángulo y posee tres caras laterales triangulares que confluyen en un vértice.' },
      { name: 'Pirámide Pentagonal', props: 'Poliedro formado por una base pentagonal y cinco caras laterales de forma triangular que se unen en la cúspide.' },
      { name: 'Pirámide Hexagonal', props: 'Tiene por base un hexágono regular y sus caras laterales son seis triángulos que se unen en un vértice superior común.' }
    ];
    
    const target = bodies[Math.floor(Math.random() * bodies.length)];
    const correct = target.name;
    
    // Distractors
    const rawD = bodies.filter(b => b.name !== correct).map(b => b.name);
    const options = createChoices(correct, rawD);

    return {
      id,
      type,
      question: (
        <span>
          ¿Qué cuerpo geométrico se describe a continuación?
          <br />
          <span className="italic text-indigo-600 dark:text-indigo-400 block mt-4 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 font-medium">
            "{target.props}"
          </span>
        </span>
      ),
      options,
      correctAnswer: correct,
      explanation: (
        <div>
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">¡Correcto!</p>
          <p>
            La descripción dada corresponde a un(a) <strong className="text-slate-800 dark:text-slate-200">{target.name}</strong>, el cual cumple exactamente con todas las propiedades descritas de bases, caras y curvas.
          </p>
        </div>
      ),
      isNumeric: false
    };
  } else if (type === 'volume') {
    const shapes = ['Cubo', 'Prisma Rectangular', 'Cilindro', 'Cono', 'Esfera'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'Cubo') {
      const side = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const vol = side * side * side;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${side * 3} cm³`,
        `${6 * side * side} cm³`,
        `${side * side} cm³`,
        `${vol + 15} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el volumen de un cubo cuyo lado mide <Formula tex={`s = ${side}`} /> cm.
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El volumen de un cubo se calcula elevando la longitud de su lado al cubo:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex={`V = s^3 = {${side}}^3`} />
            </div>
            <p className="mb-2 font-medium">Sustituyendo el valor del lado:</p>
            <div className="my-2 font-bold text-center text-indigo-750 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/40 max-w-xs mx-auto text-lg">
              {side} × {side} × {side} = {vol} cm³
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (shape === 'Prisma Rectangular') {
      const l = Math.floor(Math.random() * 7) + 3; // 3 to 9
      const w = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const h = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const vol = l * w * h;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${l + w + h} cm³`,
        `${2 * (l * w + w * h + l * h)} cm³`,
        `${l * w} cm³`,
        `${vol * 2} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el volumen de un prisma rectangular con base de <Formula tex={`l = ${l}`} /> cm por <Formula tex={`w = ${w}`} /> cm, y una altura <Formula tex={`h = ${h}`} /> cm.
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El volumen de un prisma rectangular es igual al área de su base multiplicado por su altura:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = A_{base} \\cdot h = (l \\cdot w) \\cdot h" />
            </div>
            <p className="mb-2 font-medium">Sustituyendo los datos del prisma:</p>
            <div className="my-3 flex justify-center text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <Formula tex={`V = (${l} \\cdot ${w}) \\cdot ${h} = ${l * w} \\cdot ${h} = ${vol}\\text{ cm}^3`} />
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (shape === 'Cilindro') {
      const r = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const h = Math.floor(Math.random() * 7) + 4; // 4 to 10
      const vol = Math.round((PI * r * r * h) * 10) / 10;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${Math.round((3.14 * r * r * h) * 10) / 10} cm³`,
        `${Math.round((3.0 * r * r * h) * 10) / 10} cm³`,
        `${Math.round((PI * r * h) * 10) / 10} cm³`,
        `${Math.round(((PI * r * r * h) / 3) * 10) / 10} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el volumen de un cilindro con radio basal <Formula tex={`r = ${r}`} /> cm y altura <Formula tex={`h = ${h}`} /> cm. (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El volumen de un cilindro se calcula con el producto del área de su base circular por su altura:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = A_{base} \\cdot h = \\pi \\cdot r^2 \\cdot h" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Por indicación pedagógica de la Profesora Naomi, usamos exactamente <Formula tex="\\pi = 3.1" />.
            </p>
            <p className="mb-2 font-medium">Reemplazando los datos correspondientes:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`V = 3.1 \\cdot {${r}}^2 \\cdot ${h}`} /></div>
              <div><Formula tex={`V = 3.1 \\cdot ${r * r} \\cdot ${h}`} /></div>
              <div><Formula tex={`V = ${Math.round(3.1 * r * r * 10) / 10} \\cdot ${h} = ${vol}\\text{ cm}^3`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (shape === 'Cono') {
      const r = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const h = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const vol = Math.round(((PI * r * r * h) / 3) * 10) / 10;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${Math.round((PI * r * r * h) * 10) / 10} cm³`,
        `${Math.round(((3.14 * r * r * h) / 3) * 10) / 10} cm³`,
        `${Math.round(((3.0 * r * r * h) / 3) * 10) / 10} cm³`,
        `${Math.round(((PI * r * h) / 3) * 10) / 10} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el volumen de un cono con radio basal <Formula tex={`r = ${r}`} /> cm y altura <Formula tex={`h = ${h}`} /> cm. (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El volumen del cono equivale a un tercio del volumen del cilindro de mismas dimensiones:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = \\frac{1}{3} \\cdot A_{base} \\cdot h = \\frac{\\pi \\cdot r^2 \\cdot h}{3}" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Usamos exactamente <Formula tex="\\pi = 3.1" /> en lugar del valor completo de pi.
            </p>
            <p className="mb-2 font-medium">Efectuando las operaciones matemáticas:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`V = \\frac{3.1 \\cdot {${r}}^2 \\cdot ${h}}{3}`} /></div>
              <div><Formula tex={`V = \\frac{3.1 \\cdot ${r * r} \\cdot ${h}}{3}`} /></div>
              <div><Formula tex={`V = \\frac{${Math.round(3.1 * r * r * h * 10) / 10}}{3} \\approx ${vol}\\text{ cm}^3`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else { // Esfera
      const r = Math.floor(Math.random() * 3) + 3; // 3 to 5
      const vol = Math.round(((4 / 3) * PI * r * r * r) * 10) / 10;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${Math.round((PI * r * r * r) * 10) / 10} cm³`,
        `${Math.round(((4 / 3) * 3.14 * r * r * r) * 10) / 10} cm³`,
        `${Math.round((4 * PI * r * r) * 10) / 10} cm³`,
        `${Math.round(((4 / 3) * PI * r * r) * 10) / 10} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Determina el volumen de una esfera cuyo radio mide <Formula tex={`r = ${r}`} /> cm. (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">La fórmula matemática para hallar el volumen de una esfera es la siguiente:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = \\frac{4}{3} \\cdot \\pi \\cdot r^3" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Usamos exactamente el valor pedagógico <Formula tex="\\pi = 3.1" />.
            </p>
            <p className="mb-2 font-medium">Realizando las operaciones paso a paso:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`V = \\frac{4}{3} \\cdot 3.1 \\cdot {${r}}^3`} /></div>
              <div><Formula tex={`V = \\frac{4}{3} \\cdot 3.1 \\cdot ${r * r * r}`} /></div>
              <div><Formula tex={`V = \\frac{4 \\cdot 3.1 \\cdot ${r * r * r}}{3} = \\frac{${Math.round(4 * 3.1 * r * r * r * 10) / 10}}{3} \\approx ${vol}\\text{ cm}^3`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    }
  } else if (type === 'area') {
    const shapes = ['Cubo', 'Prisma Rectangular', 'Cilindro'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'Cubo') {
      const side = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const area = 6 * (side * side);
      const correct = `${area} cm²`;
      
      const rawD = [
        `${side * side * side} cm²`,
        `${4 * side * side} cm²`,
        `${side * side} cm²`,
        `${area + 24} cm²`
      ];
      
      const options = createChoices(correct, rawD, 'cm²');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el área total de la superficie de un cubo de lado <Formula tex={`s = ${side}`} /> cm.
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm²',
        explanation: (
          <div>
            <p className="mb-2 font-medium">Un cubo consta de 6 caras idénticas de forma cuadrada. El área total superficial es 6 veces el área de una sola cara:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="A_{total} = 6 \\cdot s^2" />
            </div>
            <p className="mb-2 font-medium">Sustituyendo el lado del cubo:</p>
            <div className="my-3 flex justify-center text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <Formula tex={`A_{total} = 6 \\cdot {${side}}^2 = 6 \\cdot ${side * side} = ${area}\\text{ cm}^2`} />
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (shape === 'Prisma Rectangular') {
      const l = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const w = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const h = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const area = 2 * (l * w + w * h + l * h);
      const correct = `${area} cm²`;
      
      const rawD = [
        `${l * w * h} cm²`,
        `${l * w + w * h + l * h} cm²`,
        `${l * w * 2} cm²`,
        `${area - 18} cm²`
      ];
      
      const options = createChoices(correct, rawD, 'cm²');
      
      return {
        id, type,
        question: (
          <span>
            Halla el área total de la superficie de un prisma rectangular con dimensiones <Formula tex={`l = ${l}`} /> cm (largo), <Formula tex={`w = ${w}`} /> cm (ancho) y <Formula tex={`h = ${h}`} /> cm (alto).
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm²',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El área total de un prisma rectangular es la suma de las áreas de sus 6 caras rectangulares:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="A_{total} = 2 \\cdot (l \\cdot w + w \\cdot h + l \\cdot h)" />
            </div>
            <p className="mb-2 font-medium">Reemplazando las tres dimensiones del cuerpo:</p>
            <div className="my-3 flex flex-col items-center gap-1 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`A_{total} = 2 \\cdot (${l} \\cdot ${w} + ${w} \\cdot ${h} + ${l} \\cdot ${h})`} /></div>
              <div><Formula tex={`A_{total} = 2 \\cdot (${l * w} + ${w * h} + ${l * h})`} /></div>
              <div><Formula tex={`A_{total} = 2 \\cdot (${l * w + w * h + l * h}) = ${area}\\text{ cm}^2`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else { // Cilindro (Área)
      const r = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const h = Math.floor(Math.random() * 4) + 4; // 4 to 7
      const area = Math.round((2 * PI * r * (r + h)) * 10) / 10;
      const correct = `${area} cm²`;
      
      const rawD = [
        `${Math.round((2 * 3.14 * r * (r + h)) * 10) / 10} cm²`,
        `${Math.round((PI * r * r + 2 * PI * r * h) * 10) / 10} cm²`,
        `${Math.round((2 * PI * r * h) * 10) / 10} cm²`,
        `${Math.round((PI * r * r * h) * 10) / 10} cm²`
      ];
      
      const options = createChoices(correct, rawD, 'cm²');
      
      return {
        id, type,
        question: (
          <span>
            Calcula el área total de la superficie de un cilindro con un radio basal <Formula tex={`r = ${r}`} /> cm y una altura <Formula tex={`h = ${h}`} /> cm. (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm²',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El área total de un cilindro se forma sumando las dos bases circulares más la superficie lateral:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="A_{total} = 2 \\cdot A_{base} + A_{lateral} = 2 \\cdot \\pi \\cdot r \\cdot (r + h)" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Recuerda que usamos exactamente el valor simplificado <Formula tex="\\pi = 3.1" />.
            </p>
            <p className="mb-2 font-medium">Procediendo con el reemplazo y cálculo:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`A_{total} = 2 \\cdot 3.1 \\cdot ${r} \\cdot (${r} + ${h})`} /></div>
              <div><Formula tex={`A_{total} = ${Math.round(2 * 3.1 * r * 10) / 10} \\cdot ${r + h}`} /></div>
              <div><Formula tex={`A_{total} = ${area}\\text{ cm}^2`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    }
  } else {
    // word_problem
    const problems = ['piscina', 'caja', 'tarro', 'helado'];
    const prob = problems[Math.floor(Math.random() * problems.length)];
    
    if (prob === 'piscina') {
      const l = Math.floor(Math.random() * 5) + 6; // 6 to 10
      const w = Math.floor(Math.random() * 2) + 3; // 3 to 4
      const h = Math.floor(Math.random() * 2) + 1; // 1 to 2
      const vol = l * w * h;
      const correct = `${vol} m³`;
      
      const rawD = [
        `${l + w + h} m³`,
        `${2 * (l * w + w * h + l * h)} m³`,
        `${l * w} m³`,
        `${vol + 10} m³`
      ];
      
      const options = createChoices(correct, rawD, 'm³');
      
      return {
        id, type,
        question: (
          <span>
            Una piscina tiene forma de prisma rectangular con {l} m de largo, {w} m de ancho y {h} m de profundidad. ¿Cuántos metros cúbicos de agua se necesitan para llenarla en su totalidad?
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">La cantidad de agua necesaria para llenarla es equivalente al volumen interior de la piscina (prisma rectangular):</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = l \\cdot w \\cdot h" />
            </div>
            <p className="mb-2 font-medium">Sustituyendo los datos reales de la piscina:</p>
            <div className="my-3 flex justify-center text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <Formula tex={`V = ${l} \\cdot ${w} \\cdot ${h} = ${l * w} \\cdot ${h} = ${vol}\\text{ m}^3`} />
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (prob === 'caja') {
      const l = Math.floor(Math.random() * 6) + 12; // 12 to 17
      const w = Math.floor(Math.random() * 5) + 10; // 10 to 14
      const h = Math.floor(Math.random() * 4) + 8;  // 8 to 11
      const area = 2 * (l * w + w * h + l * h);
      const correct = `${area} cm²`;
      
      const rawD = [
        `${l * w * h} cm²`,
        `${l * w + w * h + l * h} cm²`,
        `${area + 40} cm²`,
        `${area - 40} cm²`
      ];
      
      const options = createChoices(correct, rawD, 'cm²');
      
      return {
        id, type,
        question: (
          <span>
            Sofía quiere envolver un obsequio en una caja rectangular cuyas dimensiones son {l} cm de largo, {w} cm de ancho y {h} cm de alto. ¿Cuánto papel de regalo necesita como mínimo para forrarla completamente?
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm²',
        explanation: (
          <div>
            <p className="mb-2 font-medium">Para forrar la caja necesitamos cubrir todas sus caras, lo que corresponde al área de superficie total del prisma:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="A_{total} = 2 \\cdot (l \\cdot w + w \\cdot h + l \\cdot h)" />
            </div>
            <p className="mb-2 font-medium">Sustituyendo los valores de las aristas:</p>
            <div className="my-3 flex flex-col items-center gap-1 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`A_{total} = 2 \\cdot (${l} \\cdot ${w} + ${w} \\cdot ${h} + ${l} \\cdot ${h})`} /></div>
              <div><Formula tex={`A_{total} = 2 \\cdot (${l * w} + ${w * h} + ${l * h}) = 2 \\cdot (${l * w + w * h + l * h})`} /></div>
              <div><Formula tex={`A_{total} = ${area}\\text{ cm}^2`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else if (prob === 'tarro') {
      const r = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const h = Math.floor(Math.random() * 6) + 6; // 6 to 11
      const vol = Math.round((PI * r * r * h) * 10) / 10;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${Math.round((3.14 * r * r * h) * 10) / 10} cm³`,
        `${Math.round((3.0 * r * r * h) * 10) / 10} cm³`,
        `${Math.round((PI * r * h) * 10) / 10} cm³`,
        `${Math.round(((PI * r * r * h) / 3) * 10) / 10} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Una fábrica produce latas cilíndricas de conserva con {r} cm de radio basal y {h} cm de altura. ¿Cuál es la capacidad (volumen) máxima de contenido en cada lata? (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">La capacidad máxima es equivalente al volumen del cilindro:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = A_{base} \\cdot h = \\pi \\cdot r^2 \\cdot h" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Recuerda que por las pautas didácticas se usa exactamente <Formula tex="\\pi = 3.1" />.
            </p>
            <p className="mb-2 font-medium">Sustituyendo los datos en la ecuación:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`V = 3.1 \\cdot {${r}}^2 \\cdot ${h}`} /></div>
              <div><Formula tex={`V = 3.1 \\cdot ${r * r} \\cdot ${h}`} /></div>
              <div><Formula tex={`V = ${Math.round(3.1 * r * r * 10) / 10} \\cdot ${h} = ${vol}\\text{ cm}^3`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    } else { // helado (Cono)
      const r = Math.floor(Math.random() * 2) + 2; // 2 to 3
      const h = Math.floor(Math.random() * 5) + 8;  // 8 to 12
      const vol = Math.round(((PI * r * r * h) / 3) * 10) / 10;
      const correct = `${vol} cm³`;
      
      const rawD = [
        `${Math.round((PI * r * r * h) * 10) / 10} cm³`,
        `${Math.round(((3.14 * r * r * h) / 3) * 10) / 10} cm³`,
        `${Math.round(((3.0 * r * r * h) / 3) * 10) / 10} cm³`,
        `${Math.round(((PI * r * h) / 3) * 10) / 10} cm³`
      ];
      
      const options = createChoices(correct, rawD, 'cm³');
      
      return {
        id, type,
        question: (
          <span>
            Un barquillo cónico de helado tiene un radio basal de {r} cm y una profundidad (altura) de {h} cm. ¿Qué volumen de helado puede contener en su interior? (Usa exactamente <Formula tex="\\pi = 3.1" />)
          </span>
        ),
        options,
        correctAnswer: correct,
        unit: 'cm³',
        explanation: (
          <div>
            <p className="mb-2 font-medium">El volumen del espacio interior del cono es un tercio del cilindro correspondiente:</p>
            <div className="my-3 flex justify-center bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
              <Formula tex="V = \\frac{1}{3} \\cdot A_{base} \\cdot h = \\frac{\\pi \\cdot r^2 \\cdot h}{3}" />
            </div>
            <p className="mb-2 text-amber-700 dark:text-amber-400 font-semibold bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-150 dark:border-amber-900/30 text-base">
              ⚠️ ¡Atención! Por indicación escolar, calculamos usando exactamente <Formula tex="\\pi = 3.1" />.
            </p>
            <p className="mb-2 font-medium">Aplicando los datos dados en la fórmula:</p>
            <div className="my-3 flex flex-col items-center gap-1.5 text-lg bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-lg border border-indigo-100/30 max-w-sm mx-auto">
              <div><Formula tex={`V = \\frac{3.1 \\cdot {${r}}^2 \\cdot ${h}}{3}`} /></div>
              <div><Formula tex={`V = \\frac{3.1 \\cdot ${r * r} \\cdot ${h}}{3}`} /></div>
              <div><Formula tex={`V = \\frac{${Math.round(3.1 * r * r * h * 10) / 10}}{3} \\approx ${vol}\\text{ cm}^3`} /></div>
            </div>
          </div>
        ),
        isNumeric: false
      };
    }
  }
}

export default function Tab6Exercises() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setExercise(generateExercise());
  }, []);

  const handleSubmit = (e?: React.FormEvent, directAnswer?: string) => {
    if (e) e.preventDefault();
    if (!exercise) return;
    
    const submittedAnswer = directAnswer !== undefined ? directAnswer : userAnswer;
    if (!submittedAnswer.trim()) return;

    const isCorrect = submittedAnswer === exercise.correctAnswer;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setTotalAttempted(t => t + 1);
    
    if (isCorrect) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNext = () => {
    setExercise(generateExercise());
    setUserAnswer('');
    setFeedback(null);
  };

  if (!exercise) return null;

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'identification': return { label: 'Reconocimiento de Cuerpos', color: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50' };
      case 'volume': return { label: 'Cálculo de Volumen', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50' };
      case 'area': return { label: 'Cálculo de Área', color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900/50' };
      case 'word_problem': return { label: 'Resolución de Problemas', color: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900/50' };
    }
  };

  const typeConfig = getTypeLabel(exercise.type);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header and Score */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-950 dark:text-blue-400">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-sans">Práctica Interactiva</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Ejercicios didácticos y retos matemáticos 3D</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 dark:bg-slate-950 dark:border-slate-800">
          <Trophy className="w-8 h-8 text-amber-500 animate-bounce shrink-0" />
          <div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">Tu Puntaje</div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {score} <span className="text-lg text-slate-400 dark:text-slate-600 font-semibold">/ {totalAttempted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      <Card className="overflow-hidden border-0 shadow-xl bg-white dark:bg-slate-900 relative">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-green-500/10 dark:bg-green-500/5 animate-pulse" />
          </div>
        )}

        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <CardContent className="p-8 md:p-10">
          
          <div className="flex items-center justify-between mb-8">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
            <span className="text-slate-400 dark:text-slate-650 font-mono text-sm">CÓDIGO: {exercise.id}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-855 dark:text-slate-100 leading-snug mb-10">
            {exercise.question}
          </h3>

          {!feedback ? (
            <div className="max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exercise.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserAnswer(option);
                      handleSubmit(undefined, option);
                    }}
                    className="p-6 text-left border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-semibold text-slate-700 dark:text-slate-300 text-lg group flex items-center shrink-0 cursor-pointer"
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white font-bold transition-colors shrink-0 shadow-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-tight">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className={`p-6 rounded-2xl border-2 flex items-start gap-4 mb-8 ${
                feedback === 'correct' 
                  ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50' 
                  : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'
              }`}>
                {feedback === 'correct' ? (
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-500 shrink-0 mt-1" />
                )}
                
                <div className="w-full">
                  <h4 className={`text-xl font-bold mb-2 ${feedback === 'correct' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                    {feedback === 'correct' ? '¡Excelente trabajo!' : 'No es correcto. ¡Sigue practicando!'}
                  </h4>
                  
                  {feedback === 'incorrect' && (
                    <div className="text-red-700/90 dark:text-red-400/90 mb-4 font-medium">
                      Tu respuesta seleccionada: <strong className="text-red-900 dark:text-red-300">{userAnswer}</strong>
                      <br />
                      Respuesta correcta: <strong className="text-green-700 dark:text-green-400">{exercise.correctAnswer}</strong>
                    </div>
                  )}

                  <div className="bg-white/80 dark:bg-slate-950/60 p-5 rounded-xl border border-slate-200/50 dark:border-slate-800 mt-4">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold mb-3 border-b border-slate-100 dark:border-slate-900 pb-2">
                      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" /> Explicación paso a paso
                    </div>
                    <div className="text-slate-700 dark:text-slate-350 leading-relaxed text-base">
                      {exercise.explanation}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer w-full sm:w-auto"
              >
                Siguiente Ejercicio <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
