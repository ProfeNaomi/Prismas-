import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { CheckCircle, XCircle, ArrowRight, Trophy, Sparkles, Brain, Lightbulb } from 'lucide-react';

type QuestionType = 'identification' | 'volume' | 'area' | 'word_problem';

interface Exercise {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string | number;
  explanation: string;
  unit?: string;
  isNumeric: boolean;
}

// Generate an exercise dynamically
function generateExercise(): Exercise {
  const types: QuestionType[] = ['identification', 'volume', 'area', 'word_problem'];
  const type = types[Math.floor(Math.random() * types.length)];
  const id = Math.random().toString(36).substring(7);

  if (type === 'identification') {
    const bodies = [
      { name: 'Cilindro', props: 'Tiene dos bases circulares y una superficie lateral curva.' },
      { name: 'Cono', props: 'Tiene una base circular y una superficie lateral curva que termina en un vértice (cúspide).' },
      { name: 'Prisma Rectangular', props: 'Tiene dos bases rectangulares paralelas y cuatro caras laterales rectangulares.' },
      { name: 'Pirámide Cuadrada', props: 'Tiene una base cuadrada y cuatro caras laterales triangulares que se unen en la cúspide.' },
      { name: 'Esfera', props: 'Es un cuerpo redondo sin caras planas, todos los puntos de su superficie equidistan del centro.' },
      { name: 'Prisma Triangular', props: 'Tiene dos bases triangulares y tres caras laterales rectangulares.' }
    ];
    const target = bodies[Math.floor(Math.random() * bodies.length)];
    
    // Generate options
    const options = [target.name];
    while(options.length < 4) {
      const option = bodies[Math.floor(Math.random() * bodies.length)].name;
      if (!options.includes(option)) options.push(option);
    }
    options.sort(() => Math.random() - 0.5);

    return {
      id,
      type,
      question: `¿Qué cuerpo geométrico se describe a continuación? \n\n"${target.props}"`,
      options,
      correctAnswer: target.name,
      explanation: `Efectivamente, la descripción corresponde a un(a) ${target.name}.`,
      isNumeric: false
    };
  } else if (type === 'volume') {
    const shapes = ['Cubo', 'Prisma Rectangular', 'Cilindro', 'Cono'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'Cubo') {
      const side = Math.floor(Math.random() * 10) + 2;
      const vol = Math.pow(side, 3);
      return {
        id, type,
        question: `Calcula el volumen de un cubo cuyo lado mide ${side} cm.`,
        correctAnswer: vol,
        unit: 'cm³',
        explanation: `El volumen de un cubo es Lado³. Por lo tanto, ${side} × ${side} × ${side} = ${vol} cm³.`,
        isNumeric: true
      };
    } else if (shape === 'Prisma Rectangular') {
      const l = Math.floor(Math.random() * 8) + 2;
      const w = Math.floor(Math.random() * 8) + 2;
      const h = Math.floor(Math.random() * 8) + 2;
      const vol = l * w * h;
      return {
        id, type,
        question: `Calcula el volumen de un prisma rectangular con base de ${l} cm por ${w} cm, y una altura de ${h} cm.`,
        correctAnswer: vol,
        unit: 'cm³',
        explanation: `El volumen de un prisma es Área basal × Altura. Área basal = ${l} × ${w} = ${l*w}. Volumen = ${l*w} × ${h} = ${vol} cm³.`,
        isNumeric: true
      };
    } else if (shape === 'Cilindro') {
      const r = Math.floor(Math.random() * 5) + 2;
      const h = Math.floor(Math.random() * 10) + 2;
      const vol = Math.round(Math.PI * r * r * h * 100) / 100; // 2 decimals
      return {
        id, type,
        question: `Calcula el volumen de un cilindro con radio basal de ${r} cm y altura de ${h} cm. (Usa π ≈ 3.1416 y redondea a 2 decimales)`,
        correctAnswer: vol,
        unit: 'cm³',
        explanation: `El volumen de un cilindro es Área basal × Altura = π × r² × h. \n V = π × ${r}² × ${h} ≈ ${vol} cm³.`,
        isNumeric: true
      };
    } else { // Cono
      const r = Math.floor(Math.random() * 5) + 2;
      const h = Math.floor(Math.random() * 9) + 3; // Ensure divisible by 3 makes it nicer, but decimal is fine
      const vol = Math.round((Math.PI * r * r * h) / 3 * 100) / 100;
      return {
        id, type,
        question: `Calcula el volumen de un cono con radio basal de ${r} cm y altura de ${h} cm. (Usa π ≈ 3.1416 y redondea a 2 decimales)`,
        correctAnswer: vol,
        unit: 'cm³',
        explanation: `El volumen de un cono es un tercio del cilindro correspondiente: V = (π × r² × h) / 3. \n V = (π × ${r}² × ${h}) / 3 ≈ ${vol} cm³.`,
        isNumeric: true
      };
    }
  } else if (type === 'area') {
    const shapes = ['Cubo', 'Prisma Rectangular'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'Cubo') {
      const side = Math.floor(Math.random() * 10) + 2;
      const area = 6 * (side * side);
      return {
        id, type,
        question: `Calcula el área total de la superficie de un cubo de lado ${side} cm.`,
        correctAnswer: area,
        unit: 'cm²',
        explanation: `Un cubo tiene 6 caras cuadradas idénticas. El área de una cara es ${side} × ${side} = ${side*side}. En total: 6 × ${side*side} = ${area} cm².`,
        isNumeric: true
      };
    } else {
      const l = Math.floor(Math.random() * 8) + 2;
      const w = Math.floor(Math.random() * 8) + 2;
      const h = Math.floor(Math.random() * 8) + 2;
      const area = 2 * (l * w + w * h + l * h);
      return {
        id, type,
        question: `Halla el área total de un prisma rectangular cuyas dimensiones son ${l} cm (largo), ${w} cm (ancho) y ${h} cm (alto).`,
        correctAnswer: area,
        unit: 'cm²',
        explanation: `Área total = 2 × (Largo×Ancho + Ancho×Alto + Largo×Alto) = 2 × (${l*w} + ${w*h} + ${l*h}) = 2 × ${l*w + w*h + l*h} = ${area} cm².`,
        isNumeric: true
      };
    }
  } else {
    // word_problem
    const problems = ['piscina', 'caja', 'tarro'];
    const prob = problems[Math.floor(Math.random() * problems.length)];
    
    if (prob === 'piscina') {
      const l = Math.floor(Math.random() * 5) + 5; // 5 to 9
      const w = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const h = Math.floor(Math.random() * 2) + 1; // 1 to 2
      const vol = l * w * h;
      return {
        id, type,
        question: `Una piscina tiene forma de prisma rectangular con ${l} m de largo, ${w} m de ancho y ${h} m de profundidad. ¿Cuántos metros cúbicos de agua se necesitan para llenarla?`,
        correctAnswer: vol,
        unit: 'm³',
        explanation: `La cantidad de agua necesaria es el volumen de la piscina. V = Largo × Ancho × Profundidad = ${l} × ${w} × ${h} = ${vol} m³.`,
        isNumeric: true
      };
    } else if (prob === 'caja') {
      const l = Math.floor(Math.random() * 10) + 10;
      const w = Math.floor(Math.random() * 10) + 10;
      const h = Math.floor(Math.random() * 10) + 10;
      const area = 2 * (l * w + w * h + l * h);
      return {
        id, type,
        question: `Sofía quiere envolver un regalo en una caja que mide ${l} cm de largo, ${w} cm de ancho y ${h} cm de alto. ¿Cuánto papel de regalo necesita como mínimo?`,
        correctAnswer: area,
        unit: 'cm²',
        explanation: `Necesita calcular el área total de las 6 caras de la caja. A = 2 × (${l}×${w} + ${w}×${h} + ${l}×${h}) = ${area} cm².`,
        isNumeric: true
      };
    } else {
      const r = Math.floor(Math.random() * 4) + 3;
      const h = Math.floor(Math.random() * 10) + 5;
      const vol = Math.round(Math.PI * r * r * h * 100) / 100;
      return {
        id, type,
        question: `Una fábrica de conservas produce latas (cilindros) de ${r} cm de radio basal y ${h} cm de altura. ¿Cuál es la capacidad (volumen) de cada lata? (Usa π ≈ 3.1416 y redondea a 2 decimales)`,
        correctAnswer: vol,
        unit: 'cm³',
        explanation: `Capacidad de la lata = Volumen del cilindro = π × r² × h = π × ${r}² × ${h} ≈ ${vol} cm³.`,
        isNumeric: true
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
  
  // Confetti effect
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setExercise(generateExercise());
  }, []);

  const handleSubmit = (e?: React.FormEvent, directAnswer?: string) => {
    if (e) e.preventDefault();
    if (!exercise) return;
    
    const submittedAnswer = directAnswer !== undefined ? directAnswer : userAnswer;
    if (!submittedAnswer.trim()) return;

    let isCorrect = false;
    if (exercise.isNumeric) {
      // Allow slight floating point discrepancies (0.05 margin)
      const numAns = parseFloat(submittedAnswer.replace(',', '.'));
      const target = exercise.correctAnswer as number;
      if (!isNaN(numAns) && Math.abs(numAns - target) <= 0.05) {
        isCorrect = true;
      }
    } else {
      isCorrect = submittedAnswer === exercise.correctAnswer;
    }

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
      case 'identification': return { label: 'Reconocimiento de Cuerpos', color: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'volume': return { label: 'Cálculo de Volumen', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'area': return { label: 'Cálculo de Área', color: 'bg-green-100 text-green-700 border-green-200' };
      case 'word_problem': return { label: 'Resolución de Problemas', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    }
  };

  const typeConfig = getTypeLabel(exercise.type);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header and Score */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Práctica Interactiva</h2>
            <p className="text-slate-500">Generador dinámico de ejercicios 3D</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
          <Trophy className="w-8 h-8 text-amber-500" />
          <div>
            <div className="text-sm font-medium text-slate-500">Tu Puntaje</div>
            <div className="text-3xl font-black text-slate-800 tracking-tight">
              {score} <span className="text-lg text-slate-400 font-medium">/ {totalAttempted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      <Card className="overflow-hidden border-0 shadow-xl bg-white relative">
        {/* Confetti overlay (simple CSS simulation for reward) */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-green-500/10 animate-pulse" />
          </div>
        )}

        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <CardContent className="p-8 md:p-10">
          
          <div className="flex items-center justify-between mb-8">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
            <span className="text-slate-400 font-mono text-sm">ID: {exercise.id}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-10 whitespace-pre-line">
            {exercise.question}
          </h3>

          {!feedback ? (
            <div className="max-w-2xl">
              {exercise.isNumeric ? (
                <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Ingresa tu respuesta..."
                      className="w-full text-xl py-4 px-6 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                      autoFocus
                    />
                    {exercise.unit && (
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">
                        {exercise.unit}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!userAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Responder <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exercise.options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserAnswer(option);
                        handleSubmit(undefined, option);
                      }}
                      className="p-6 text-left border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 text-lg group"
                    >
                      <span className="inline-block w-8 h-8 bg-slate-100 text-slate-500 rounded-lg text-center leading-8 mr-3 group-hover:bg-blue-200 group-hover:text-blue-700 font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className={`p-6 rounded-2xl border-2 flex items-start gap-4 mb-8 ${
                feedback === 'correct' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {feedback === 'correct' ? (
                  <CheckCircle className="w-8 h-8 text-green-600 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 shrink-0 mt-1" />
                )}
                
                <div>
                  <h4 className={`text-xl font-bold mb-2 ${feedback === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                    {feedback === 'correct' ? '¡Excelente trabajo!' : 'No es correcto. ¡Sigue intentando!'}
                  </h4>
                  
                  {feedback === 'incorrect' && (
                    <div className="text-red-700/80 mb-4 font-medium">
                      Tu respuesta: {userAnswer} {exercise.unit}
                      <br />
                      Respuesta correcta: {exercise.correctAnswer} {exercise.unit}
                    </div>
                  )}

                  <div className="bg-white/60 p-4 rounded-xl mt-4">
                    <div className="flex items-center gap-2 text-slate-700 font-bold mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" /> Explicación paso a paso
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {exercise.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 w-full sm:w-auto"
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
