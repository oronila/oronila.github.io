'use client';

import { useState, useEffect, useRef } from 'react';

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

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isClosing, setIsClosing] = useState(false);
  const [isDonutActive, setIsDonutActive] = useState(false);
  const [donutFrame, setDonutFrame] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const donutTimerRef = useRef<number | null>(null);
  const donutARef = useRef(0);
  const donutBRef = useRef(0);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          'Web: HTML, CSS, React, Node.js, Next.js',
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
        setLines(INITIAL_LINES);
        setCurrentInput('');
        return;
        
      case 'exit':
        // This will be handled by parent component
        stopDonut();
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

      case 'stop':
        if (isDonutActive) {
          stopDonut();
          output = ['Stopped animation.'];
        } else {
          output = ['No animation to stop.'];
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
      <div
        ref={terminalRef}
        className="h-screen overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Sticky Terminal header */}
        <div className="sticky top-0 z-10 border-b border-green-800/60 bg-black/80 backdrop-blur">
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
        <div className="space-y-1 p-4">
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
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
