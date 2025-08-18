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
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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
          '  projects      - View my projects',
          '  contact       - Get my contact information',
          '  education     - My educational background',
          '  clear         - Clear the terminal',
          '  exit          - Return to normal view',
          '',
          'Use arrow keys to navigate command history'
        ];
        break;
        
      case 'about':
        output = [
          'Hi! I\'m Noor Ali',
          '',
          'I\'m a Computer Science student at UT Austin.',
          'I love building things because I am chronically bored.',
          '',
          'Currently exploring full-stack development, AI/ML,',
          'and always looking for interesting problems to solve.',
          '',
          'When I\'m not coding, you can find me contributing to',
          'open source projects or learning new technologies.'
        ];
        break;
        
      case 'projects':
        output = [
          'Recent Projects:',
          '',
          '1. Personal Website Terminal - This interactive terminal!',
          '   Tech: Next.js, TypeScript, Tailwind CSS',
          '',
          '2. Chat with Noor - AI-powered chat interface',
          '   Tech: Next.js, API Routes, AI integration',
          '',
          'View more projects at: github.com/oronila',
          '',
          'Type "resume" to see my full project portfolio'
        ];
        break;
        
      case 'contact':
        output = [
          'Get in touch:',
          '',
          'Email: noorali05@utexas.edu',
          'GitHub: github.com/oronila',
          'LinkedIn: linkedin.com/in/noor-ali05',
          'Twitter/X: x.com/oronila_',
          '',
          'Always happy to chat about tech, projects, or opportunities!'
        ];
        break;

      case 'education':
        output = [
          'Education:',
          '',
          'University of Texas at Austin',
          'Bachelor of Science in Computer Science',
          'Expected Graduation: 2026',
          '',
          'Relevant Coursework:',
          '- Data Structures and Algorithms',
          '- Software Engineering',
          '- Database Systems',
          '- Computer Networks',
          '- Machine Learning'
        ];
        break;
        
      case 'clear':
        setLines(INITIAL_LINES);
        setCurrentInput('');
        return;
        
      case 'exit':
        // This will be handled by parent component
        window.dispatchEvent(new CustomEvent('terminal-exit'));
        return;
        
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
            <span className="text-green-300">noor@utexas:~$</span>
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
