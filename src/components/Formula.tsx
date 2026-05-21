import React from 'react';

interface FormulaProps {
  tex: string;
  className?: string;
}

export default function Formula({ tex, className = '' }: FormulaProps) {
  // Normalize mathematical notation and symbols
  const tempStr = tex
    .replace(/\\cdot/g, ' · ')
    .replace(/\\times/g, ' × ')
    .replace(/\\pi/g, 'π')
    .replace(/\*/g, ' · ')
    .replace(/\\approx/g, ' ≈ ');

  const formattedParts: React.ReactNode[] = [];
  
  // Matches variables with subscripts e.g., A_base, A_{base}, h_p, a_p
  const regex = /([a-zA-Z])_(?:\{([^{}]+)\}|([a-zA-Z0-9]+))/g;
  
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(tempStr)) !== null) {
    const textBefore = tempStr.substring(lastIndex, match.index);
    if (textBefore) {
      formattedParts.push(<span key={`txt-${key++}`}>{formatMathSymbols(textBefore)}</span>);
    }
    
    const variable = match[1];
    const subscript = match[2] || match[3];
    
    formattedParts.push(
      <span key={`formula-${key++}`} className="inline-flex items-baseline font-normal">
        <span className="font-serif italic font-bold text-slate-800 dark:text-slate-100">{variable}</span>
        <sub className="font-sans text-[0.72em] font-medium not-italic text-slate-500 dark:text-slate-400 ml-[1px] relative -bottom-[0.05em]">{subscript}</sub>
      </span>
    );
    
    lastIndex = regex.lastIndex;
  }
  
  const textLeft = tempStr.substring(lastIndex);
  if (textLeft) {
    formattedParts.push(<span key={`txt-${key++}`}>{formatMathSymbols(textLeft)}</span>);
  }

  // Styles single-letter variables with mathematical serif italics
  function formatMathSymbols(str: string): React.ReactNode[] {
    const symbolRegex = /\b([a-zA-Z])\b/g;
    const parts: React.ReactNode[] = [];
    let lIdx = 0;
    let m;
    let sKey = 0;
    
    while ((m = symbolRegex.exec(str)) !== null) {
      const before = str.substring(lIdx, m.index);
      if (before) {
        parts.push(<span key={`b-${sKey++}`}>{before}</span>);
      }
      
      const char = m[1];
      parts.push(
        <span key={`c-${sKey++}`} className="font-serif italic font-bold text-slate-800 dark:text-slate-100 mx-[1px]">
          {char}
        </span>
      );
      
      lIdx = symbolRegex.lastIndex;
    }
    
    const left = str.substring(lIdx);
    if (left) {
      parts.push(<span key={`b-${sKey++}`}>{left}</span>);
    }
    
    return parts;
  }

  return (
    <span className={`inline-flex items-center gap-[2px] font-medium text-slate-700 dark:text-slate-300 ${className}`}>
      {formattedParts}
    </span>
  );
}
