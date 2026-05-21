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
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\text\s*\{([^{}]+)\}/g, '$1')
    .replace(/\\text/g, '');

  let key = 0;

  function parseLaTeX(s: string): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    let i = 0;

    while (i < s.length) {
      // 1. Parse \frac{num}{den}
      if (s.startsWith('\\frac{', i)) {
        const numStart = i + 6;
        const numEnd = findMatchingBrace(s, numStart - 1);
        if (numEnd !== -1) {
          const denStart = numEnd + 1;
          if (s[denStart] === '{') {
            const denEnd = findMatchingBrace(s, denStart);
            if (denEnd !== -1) {
              const numContent = s.substring(numStart, numEnd);
              const denContent = s.substring(denStart + 1, denEnd);

              nodes.push(
                <span
                  key={`frac-${key++}`}
                  className="inline-flex flex-col items-center justify-center align-middle mx-1 leading-none text-center relative -top-[0.08em]"
                >
                  <span className="block border-b border-slate-400 dark:border-slate-500 pb-[1.5px] px-[3px] text-[0.88em] font-serif font-semibold text-slate-800 dark:text-slate-100">
                    {parseLaTeX(numContent)}
                  </span>
                  <span className="block pt-[1.5px] px-[3px] text-[0.88em] font-serif font-semibold text-slate-800 dark:text-slate-100">
                    {parseLaTeX(denContent)}
                  </span>
                </span>
              );
              i = denEnd + 1;
              continue;
            }
          }
        }
      }

      // 2. Parse curly braces that wrap whole terms e.g., {r}^2 or {side}^3
      if (s[i] === '{') {
        const braceEnd = findMatchingBrace(s, i);
        if (braceEnd !== -1) {
          const innerContent = s.substring(i + 1, braceEnd);
          // Check if there is an exponent or subscript immediately after the closing brace, e.g. {r}^2
          if (braceEnd + 1 < s.length && s[braceEnd + 1] === '^') {
            let expStart = braceEnd + 2;
            let expContent = '';
            let nextIdx = expStart;
            if (s[expStart] === '{') {
              const expEnd = findMatchingBrace(s, expStart);
              if (expEnd !== -1) {
                expContent = s.substring(expStart + 1, expEnd);
                nextIdx = expEnd + 1;
              } else {
                expContent = s[expStart];
                nextIdx = expStart + 1;
              }
            } else {
              while (nextIdx < s.length && /[a-zA-Z0-9\.\-]/.test(s[nextIdx])) {
                nextIdx++;
              }
              expContent = s.substring(expStart, nextIdx);
            }

            nodes.push(
              <span key={`sup-${key++}`} className="inline-flex items-baseline font-normal">
                <span>{parseLaTeX(innerContent)}</span>
                <sup className="font-sans text-[0.7em] font-bold text-slate-600 dark:text-slate-350 ml-[1px] relative -top-[0.25em]">
                  {parseLaTeX(expContent)}
                </sup>
              </span>
            );
            i = nextIdx;
            continue;
          } else if (braceEnd + 1 < s.length && s[braceEnd + 1] === '_') {
            let subStart = braceEnd + 2;
            let subContent = '';
            let nextIdx = subStart;
            if (s[subStart] === '{') {
              const subEnd = findMatchingBrace(s, subStart);
              if (subEnd !== -1) {
                subContent = s.substring(subStart + 1, subEnd);
                nextIdx = subEnd + 1;
              } else {
                subContent = s[subStart];
                nextIdx = subStart + 1;
              }
            } else {
              while (nextIdx < s.length && /[a-zA-Z0-9\.\-]/.test(s[nextIdx])) {
                nextIdx++;
              }
              subContent = s.substring(subStart, nextIdx);
            }

            nodes.push(
              <span key={`sub-${key++}`} className="inline-flex items-baseline font-normal">
                <span>{parseLaTeX(innerContent)}</span>
                <sub className="font-sans text-[0.7em] font-medium not-italic text-slate-500 dark:text-slate-400 ml-[1px] relative -bottom-[0.08em]">
                  {parseLaTeX(subContent)}
                </sub>
              </span>
            );
            i = nextIdx;
            continue;
          } else {
            nodes.push(...parseLaTeX(innerContent));
            i = braceEnd + 1;
            continue;
          }
        }
      }

      // 3. Scan for variables/words followed by exponent or subscript
      let nextSpecial = i;
      while (
        nextSpecial < s.length &&
        s[nextSpecial] !== '_' &&
        s[nextSpecial] !== '^' &&
        !s.startsWith('\\frac{', nextSpecial) &&
        s[nextSpecial] !== '{' &&
        s[nextSpecial] !== '}'
      ) {
        nextSpecial++;
      }

      if (nextSpecial > i) {
        const textSegment = s.substring(i, nextSpecial);

        if (nextSpecial < s.length && (s[nextSpecial] === '^' || s[nextSpecial] === '_')) {
          const baseMatch = textSegment.match(/([a-zA-Z0-9\)]+)$/);
          if (baseMatch) {
            const baseStr = baseMatch[1];
            const beforeBase = textSegment.substring(0, textSegment.length - baseStr.length);
            if (beforeBase) {
              nodes.push(...formatMathSymbols(beforeBase));
            }

            const operator = s[nextSpecial];
            let optStart = nextSpecial + 1;
            let optContent = '';
            let nextIdx = optStart;

            if (s[optStart] === '{') {
              const optEnd = findMatchingBrace(s, optStart);
              if (optEnd !== -1) {
                optContent = s.substring(optStart + 1, optEnd);
                nextIdx = optEnd + 1;
              } else {
                optContent = s[optStart];
                nextIdx = optStart + 1;
              }
            } else {
              while (nextIdx < s.length && /[a-zA-Z0-9\.\-]/.test(s[nextIdx])) {
                nextIdx++;
              }
              optContent = s.substring(optStart, nextIdx);
            }

            const isSingleLetterVar = baseStr.length === 1 && /[a-zA-Z]/.test(baseStr);

            if (operator === '^') {
              nodes.push(
                <span key={`sup-${key++}`} className="inline-flex items-baseline font-normal">
                  <span
                    className={
                      isSingleLetterVar
                        ? 'font-serif italic font-bold text-slate-800 dark:text-slate-100 mx-[1px]'
                        : 'font-sans font-bold text-slate-800 dark:text-slate-100'
                    }
                  >
                    {baseStr}
                  </span>
                  <sup className="font-sans text-[0.7em] font-bold text-slate-600 dark:text-slate-350 ml-[1px] relative -top-[0.25em]">
                    {parseLaTeX(optContent)}
                  </sup>
                </span>
              );
            } else {
              nodes.push(
                <span key={`sub-${key++}`} className="inline-flex items-baseline font-normal">
                  <span
                    className={
                      isSingleLetterVar
                        ? 'font-serif italic font-bold text-slate-800 dark:text-slate-100 mx-[1px]'
                        : 'font-sans font-bold text-slate-800 dark:text-slate-100'
                    }
                  >
                    {baseStr}
                  </span>
                  <sub className="font-sans text-[0.7em] font-medium not-italic text-slate-500 dark:text-slate-400 ml-[1px] relative -bottom-[0.08em]">
                    {parseLaTeX(optContent)}
                  </sub>
                </span>
              );
            }
            i = nextIdx;
            continue;
          }
        }

        nodes.push(...formatMathSymbols(textSegment));
        i = nextSpecial;
        continue;
      }

      nodes.push(<span key={`char-${key++}`}>{s[i]}</span>);
      i++;
    }

    return nodes;
  }

  function findMatchingBrace(str: string, startIndex: number): number {
    let depth = 0;
    for (let i = startIndex; i < str.length; i++) {
      if (str[i] === '{') {
        depth++;
      } else if (str[i] === '}') {
        depth--;
        if (depth === 0) {
          return i;
        }
      }
    }
    return -1;
  }

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
        <span key={`c-${sKey++}`} className="font-serif italic font-bold text-slate-800 dark:text-slate-100 mx-[2px]">
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
    <span
      className={`inline-flex items-center gap-[2px] font-medium text-slate-800 dark:text-slate-200 text-lg md:text-xl font-serif select-none ${className}`}
    >
      {parseLaTeX(tempStr)}
    </span>
  );
}
