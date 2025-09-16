'use client';

import { useState, useEffect, useRef } from 'react';
import SlopeGame from './SlopeGame';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp?: string;
}

const INITIAL_LINES: TerminalLine[] = [
  { type: 'output', content: 'Welcome to Noor Ali\'s Personal Terminal' },
  { type: 'output', content: 'University of Texas at Austin - Computer Science' },
  { type: 'output', content: '=================================' },
  { type: 'output', content: '' },
  { type: 'output', content: 'Type "help" to see available commands' },
  { type: 'output', content: '' },
];

// Boot animation spacing controls:
// Each entry adjusts the gap before that line index (0-based).
// Positive = more space before this line; Negative = less.
// Update these values to tune spacing from the top down to the desired line.
const BOOT_GAP_OFFSETS_PX: number[] = [
  3,  // before line 0 (Welcome ...)
  0,  // before line 1
  0,  // before line 2
  0,  // before line 3 (empty)
  0, // before line 4 (Type "help" ...)
  0, // before line 5 (empty after Type "help")
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isClosing, setIsClosing] = useState(false);
  const [isDonutActive, setIsDonutActive] = useState(false);
  const [donutFrame, setDonutFrame] = useState('');
  const [miniApp, setMiniApp] = useState<null | 'slope'>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const donutTimerRef = useRef<number | null>(null);
  const donutARef = useRef(0);
  const donutBRef = useRef(0);
  const [isBooting, setIsBooting] = useState(true);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixAnimRef = useRef<number | null>(null);
  const [showBootOverlay, setShowBootOverlay] = useState(true);
  const [isBootFading, setIsBootFading] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Startup "matrix rain" overlay with reveal
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match terminal's font size and family
    const getComputed = () => {
      const el = (terminalRef.current as Element) ?? document.documentElement;
      const styles = window.getComputedStyle(el);
      const sizeNum = parseFloat(styles.fontSize);
      const fam = styles.fontFamily || 'monospace';
      return { size: Number.isFinite(sizeNum) ? Math.round(sizeNum) : 14, fam };
    };
    const { size: initialFontSize, fam: initialFontFamily } = getComputed();
    let fontSize = initialFontSize;
    let fontFamily = initialFontFamily;
    const getLineMetrics = () => {
      let lineHeightPx = fontSize * 1.5;
      try {
        const el = (linesRef.current as Element) ?? (terminalRef.current as Element) ?? document.documentElement;
        const styles = window.getComputedStyle(el);
        const lhStr = styles.lineHeight;
        const parsed = parseFloat(lhStr);
        if (Number.isFinite(parsed)) lineHeightPx = parsed;
      } catch { /* noop */ }
      const gapPx = 4; // Tailwind space-y-1 gap
      return { lineHeightPx, gapPx };
    };
    let { lineHeightPx, gapPx } = getLineMetrics();
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charArray = characters.split('');

    let columns = 0;
    let drops: number[] = [];
    const startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recompute font settings on resize to keep parity with terminal text
      try {
        const { size, fam } = getComputed();
        fontSize = size;
        fontFamily = fam;
      } catch { /* noop */ }
      ctx.font = `${fontSize}px ${fontFamily}`;
      const charWidth = Math.max(6, ctx.measureText('M').width);
      ({ lineHeightPx, gapPx } = getLineMetrics());
      columns = Math.floor(canvas.width / Math.max(6, charWidth));
      drops = new Array(columns).fill(1);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const elapsed = performance.now() - startTime;
      const phase1 = 450; // ms of full rain
      const phase2 = 700; // ms of dwindling + reveal
      const total = phase1 + phase2;

      // fade trail faster in phase 2
      const t = Math.min(Math.max(elapsed - phase1, 0), phase2);
      const decay = t / phase2; // 0 -> 1
      const trailAlpha = 0.08 + decay * 0.22; // 0.08 -> 0.30
      ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha.toFixed(3)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e'; // Tailwind green-500
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = 'alphabetic';
      const charWidth = Math.max(6, ctx.measureText('M').width);

      // Determine rain density
      let drawProbability = 1;
      if (elapsed > phase1) {
        const dwindling = 1 - decay; // 1 -> 0
        drawProbability = Math.max(0, Math.pow(dwindling, 1.8));
      }

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > drawProbability) continue;
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * charWidth;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Reveal preloaded lines during phase 2
      if (elapsed > phase1) {
        // Measure left padding from actual container for pixel-perfect X
        const paddingLeft = (() => {
          try {
            const styles = window.getComputedStyle(linesRef.current as Element);
            const n = parseFloat(styles.paddingLeft);
            return Number.isFinite(n) ? n : 16;
          } catch { return 16; }
        })();

        // Compute baseline offset using container line-height and font metrics
        const innerLeading = Math.max(0, (lineHeightPx - fontSize) / 2);
        const ascent = (ctx.measureText('Hg').actualBoundingBoxAscent || fontSize * 0.8);
        const baselineOffset = innerLeading + ascent;

        const revealProgress = Math.min(decay, 1); // 0 -> 1 across phase 2
        const glitchProb = Math.max(0, 0.6 - revealProgress * 0.6); // 0.6 -> 0

        ctx.fillStyle = '#34d399'; // Tailwind green-400-ish for readability

        const lineEls: HTMLElement[] = Array.from((linesRef.current?.children ?? [])) as HTMLElement[];
        const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;

        const firstLineExtraPx = 2; // subtle bump for visual match during reveal
        const extraGapPx = 2; // base +2px between gaps during reveal
        for (let i = 0; i < INITIAL_LINES.length; i++) {
          const text = INITIAL_LINES[i].content;
          const lineTop = lineEls[i]?.getBoundingClientRect().top ?? (headerBottom + 16 + i * (lineHeightPx + gapPx));
          // Start with default cumulative +2px gaps
          let extraOffset = (i === 0 ? firstLineExtraPx : 0) + (i * extraGapPx);
          // Apply per-line overrides from BOOT_GAP_OFFSETS_PX if provided
          if (BOOT_GAP_OFFSETS_PX[i] !== undefined) {
            // Replace the cumulative gap with explicit configured value relative to baseline
            // i.e., gap before this line is (configured px)
            extraOffset = (i === 0 ? 0 : 0) + BOOT_GAP_OFFSETS_PX.slice(0, i + 1).reduce((sum, val) => sum + val, 0);
          }
          const y = lineTop + baselineOffset + extraOffset;
          for (let j = 0; j < text.length; j++) {
            const targetChar = text[j];
            const x = paddingLeft + j * charWidth;
            const charToDraw = targetChar === ' ' && Math.random() < 0.2
              ? ' '
              : (Math.random() < glitchProb ? charArray[Math.floor(Math.random() * charArray.length)] : targetChar);
            ctx.fillText(charToDraw, x, y);
          }
        }
      }

      if (elapsed >= total) {
        // End animation: fade overlay then unmount
        setIsBootFading(true);
        matrixAnimRef.current = null;
        return;
      }

      matrixAnimRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (matrixAnimRef.current) cancelAnimationFrame(matrixAnimRef.current);
    };
  }, []);

  // When fade starts, remove overlay after transition
  useEffect(() => {
    if (!isBootFading) return;
    const t = window.setTimeout(() => {
      setShowBootOverlay(false);
      setIsBooting(false);
    }, 220);
    return () => window.clearTimeout(t);
  }, [isBootFading]);

  // Scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Cleanup any running animations on unmount
  useEffect(() => {
    return () => {
      if (donutTimerRef.current) window.clearInterval(donutTimerRef.current);
    };
  }, []);

  const computeDonutFrame = (A: number, B: number) => {
    const width = 100; // columns
    const height = 40; // rows
    const output: string[] = new Array(width * height).fill(' ');
    const zBuffer: number[] = new Array(width * height).fill(0);
    const R1 = 1;
    const R2 = 2;
    const K2 = 5;
    const K1 = width * K2 * 3 / (8 * (R1 + R2));
    const cosA = Math.cos(A), sinA = Math.sin(A);
    const cosB = Math.cos(B), sinB = Math.sin(B);
    const luminanceChars = '.,-~:;=!*#$@';

    for (let theta = 0; theta < 6.28; theta += 0.07) {
      const costheta = Math.cos(theta), sintheta = Math.sin(theta);
      for (let phi = 0; phi < 6.28; phi += 0.02) {
        const cosphi = Math.cos(phi), sinphi = Math.sin(phi);
        const circleX = R2 + R1 * costheta;
        const circleY = R1 * sintheta;

        // 3D coordinate after rotation
        const x = circleX * (cosB * cosphi + sinA * sinB * sinphi) - circleY * cosA * sinB;
        const y = circleX * (sinB * cosphi - sinA * cosB * sinphi) + circleY * cosA * cosB;
        const z = K2 + cosA * circleX * sinphi + circleY * sinA;
        const ooz = 1 / z; // "one over z"

        const xp = Math.floor(width / 2 + K1 * ooz * x);
        const yp = Math.floor(height / 2 - K1 * ooz * y);

        const L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi);
        const luminanceIndex = Math.floor((L + 1) * 5.5);

        const idx = xp + yp * width;
        if (idx >= 0 && idx < width * height && ooz > zBuffer[idx]) {
          zBuffer[idx] = ooz;
          output[idx] = luminanceChars[Math.max(0, Math.min(luminanceChars.length - 1, luminanceIndex))];
        }
      }
    }

    // Convert to string with line breaks
    const rows: string[] = [];
    for (let r = 0; r < height; r++) {
      rows.push(output.slice(r * width, (r + 1) * width).join(''));
    }
    return rows.join('\n');
  };

  const startDonut = () => {
    if (isDonutActive) return;
    setIsDonutActive(true);
    donutARef.current = 0;
    donutBRef.current = 0;
    // warm first frame
    setDonutFrame(computeDonutFrame(donutARef.current, donutBRef.current));
    donutTimerRef.current = window.setInterval(() => {
      donutARef.current += 0.07;
      donutBRef.current += 0.03;
      setDonutFrame(computeDonutFrame(donutARef.current, donutBRef.current));
    }, 50);
  };

  const stopDonut = () => {
    if (donutTimerRef.current) {
      window.clearInterval(donutTimerRef.current);
      donutTimerRef.current = null;
    }
    setIsDonutActive(false);
  };

  const closeMiniApp = () => {
    if (miniApp) {
      setMiniApp(null);
      setLines(prev => [...prev, { type: 'output', content: 'Closed app.' }]);
    }
  };

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    
    // Add input to history
    setLines(prev => [...prev, { type: 'input', content: `$ ${command}` }]);
    
    // Add to command history
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command.trim()]);
    }
    
    let output: string[] = [];
    
    switch (cmd) {
      case 'help':
        output = [
          'Available commands:',
          '  help          - Show this help message',
          '  about         - Learn about me',
          // '  projects      - View my projects',
          '  experiences  - View my work experience',
          '  contact       - Get my contact information',
          '  startups      - Links to fynopsis.ai and trynebula.ai',
          '  slope         - Play a Slope mini-game',
          '  donut         - Spin an ASCII donut',
          '  stop          - Stop current animation',
          '  skills        - View my technical skills',
          '  education     - My educational background',
          '  clear         - Clear the terminal',
          '  exit          - Return to normal view',
          '',
          'Use arrow keys to navigate command history'
        ];
        break;
        
      case 'about':
        output = [
          'hi! i\'m Noor Ali',
        ];
        break;
        
      // case 'projects':
      //   output = ['WIP'];
      //   break;
        
      case 'contact':
        output = [
          'Get in touch:',
          '',
          'Email: noorali05@utexas.edu',
          'GitHub: github.com/oronila',
          'LinkedIn: linkedin.com/in/noor-ali05',
          'Twitter/X: x.com/oronila_',
          '',
          'Always happy to chat!'
        ];
        break;

      case 'startups':
      case 'companies':
      case 'links':
        output = [
          'Previous startups:',
          '',
          'fynopsis.ai  - https://fynopsis.ai',
          'trynebula.ai - https://trynebula.ai',
        ];
        break;

      case 'education':
        output = [
          'Education:',
          '',
          'University of Texas at Austin',
          'Bachelor of Science in Computer Science',
          'Expected Graduation: May 2027',
          '',
        ];
        break;

      case 'skills':
        output = [
          'Technical Skills:',
          '',
          'Languages: Python, Java, C, C++, JavaScript, TypeScript',
          'Web: HTML, CSS, React, Node.js',
          'Cloud: AWS, Azure, GCP',
          'DevOps: Docker',
          'AI/Agents: LangGraph, OpenAI Agents SDK',
          'Tools: Cursor, Git'
        ];
        break;

      case 'experiences':
      case 'experience':
      case 'exp':
        output = [
          'Experience:',
          '',
          'Coalition Inc. - Backend Engineer Intern (Remote) | May 2025 - Aug 2025',
          '- 5m -> 2.5m response time; 5k+ req/mo; +32% accuracy; Zendesk, Python, Docker, Sentry, Datadog',
          '',
          'Fynopsis - Co-Founder, CTO | Aug 2024 - May 2025',
          '- Saved 20+ hrs/deal; accelerators; AWS full-stack + AI (Graph-RAG, Next.js, LangGraph)',
          '',
          'UT Austin - Undergraduate Researcher | Mar 2024 - Mar 2025',
          '- ROS multi-agent LLMs (+23% engagement); 3D mapping (82% acc, 229 ms); CUDA, C++',
          '',
          'Trend Micro - Software R&D Intern | Jun 2024 - Aug 2024',
          '- AWS CDK resource tracker; automated cleanup; up to $300k/mo savings; +280% efficiency'
        ];
        break;
        
      case 'clear':
        stopDonut();
        if (miniApp) setMiniApp(null);
        setLines(INITIAL_LINES);
        setCurrentInput('');
        return;
        
      case 'exit':
        // This will be handled by parent component
        stopDonut();
        if (miniApp) setMiniApp(null);
        window.dispatchEvent(new CustomEvent('terminal-exit'));
        return;

      case 'donut':
        output = [
          'Starting ASCII donut... Type "stop" to end.',
          ''
        ];
        // Start without waiting for next tick so the user sees it immediately
        startDonut();
        break;

      case 'slope':
        output = [
          'Opening Slope mini app... (Esc or close button to exit)'
        ];
        setMiniApp('slope');
        break;

      case 'stop':
        if (isDonutActive) {
          stopDonut();
          output = ['Stopped animation.'];
        } else if (miniApp) {
          setMiniApp(null);
          output = ['Closed app.'];
        } else {
          output = ['Nothing to stop.'];
        }
        break;
        
      case '':
        // Empty command, just show prompt
        break;
        
      default:
        output = [
          `Command not found: ${command}`,
          'Type "help" to see available commands'
        ];
        break;
    }
    
    // Add output lines
    output.forEach(line => {
      setLines(prev => [...prev, { type: 'output', content: line }]);
    });
    
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleClose = () => {
    // Play a mac-like minimize animation to the bottom
    setIsClosing(true);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('terminal-exit'));
    }, 200);
  };

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono ${
      isClosing ? 'minimize-to-dock' : ''
    }`}>
      {showBootOverlay && (
        <div className={`fixed inset-0 z-0 bg-black pointer-events-none transition-opacity duration-200 ${isBootFading ? 'opacity-0' : 'opacity-100'}`}>
          <canvas ref={matrixCanvasRef} className="w-full h-full block" />
        </div>
      )}
      <div
        ref={terminalRef}
        className="h-screen overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Sticky Terminal header */}
        <div ref={headerRef} className="sticky top-0 z-10 border-b border-green-800/60 bg-black/80 backdrop-blur">
          <div className="flex items-center px-4 py-2 text-sm">
            <div className="group flex items-center gap-2 mr-3 px-1 py-1">
              {/* Close */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="grid h-3 w-3 place-items-center rounded-full bg-red-500 hover:brightness-110"
              >
                <svg viewBox="0 0 8 8" className="h-2 w-2 text-black/70 opacity-0 transition-opacity group-hover:opacity-100 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M1 1 L7 7" />
                  <path d="M7 1 L1 7" />
                </svg>
              </button>
              {/* Minimize */}
              <button
                onClick={handleClose}
                aria-label="Minimize"
                className="grid h-3 w-3 place-items-center rounded-full bg-yellow-500 hover:brightness-110"
              >
                <svg viewBox="0 0 8 8" className="h-2 w-2 text-black/70 opacity-0 transition-opacity group-hover:opacity-100 group-hover:opacity-100" fill="currentColor">
                  <rect x="1.2" y="3.4" width="5.6" height="1.2" rx="0.6" />
                </svg>
              </button>
              {/* Maximize */}
              <button
                onClick={handleClose}
                aria-label="Maximize"
                className="grid h-3 w-3 place-items-center rounded-full bg-green-500 hover:brightness-110"
              >
                <svg viewBox="0 0 8 8" className="h-2 w-2 text-black/70 opacity-0 transition-opacity group-hover:opacity-100 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6 L2 2 L6 2" />
                  <path d="M6 2 L4.6 3.4" />
                </svg>
              </button>
            </div>
            <span className="text-green-300">noorali05@utexas.edu:~$</span>
          </div>
        </div>

        {/* Terminal lines */}
        <div ref={linesRef} className="space-y-1 p-4">
          {lines.map((line, index) => (
            <div key={index} className={`${
              line.type === 'input' ? 'text-green-300' : 
              line.type === 'error' ? 'text-red-400' : 
              'text-green-400'
            }`}>
              {line.content}
            </div>
          ))}

          {isDonutActive && (
            <div className="mt-2">
              <pre className="text-green-300 leading-4 whitespace-pre font-mono text-[10px] sm:text-[11px] md:text-[12px]">
{donutFrame}
              </pre>
            </div>
          )}
          
          {/* Current input line */}
          <div className="flex items-center text-green-300">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-green-400"
              disabled={isBooting}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Mini-app overlay (centered window) */}
        {miniApp && (
          <div className="fixed inset-0 z-50 grid place-items-center">
            <div className="bg-black/95 border border-green-800/60 rounded-md shadow-2xl w-[760px] max-w-[92vw]">
              {/* Mini window header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-green-800/60">
                <div className="group flex items-center gap-2">
                  <button
                    onClick={() => setMiniApp(null)}
                    aria-label="Close"
                    className="h-3 w-3 rounded-full bg-red-500 hover:brightness-110"
                  />
                  <button
                    onClick={() => setMiniApp(null)}
                    aria-label="Minimize"
                    className="h-3 w-3 rounded-full bg-yellow-500 hover:brightness-110"
                  />
                  <button
                    onClick={() => setMiniApp(null)}
                    aria-label="Maximize"
                    className="h-3 w-3 rounded-full bg-green-500 hover:brightness-110"
                  />
                </div>
                <div className="text-green-300 text-sm font-medium">
                  {miniApp === 'slope' ? 'Slope' : 'App'}
                </div>
                <div className="w-12" />
              </div>

              <div className="p-3 flex items-center justify-center">
                {miniApp === 'slope' && (
                  <SlopeGame width={700} height={430} onClose={closeMiniApp} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
