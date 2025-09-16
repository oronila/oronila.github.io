'use client';

import { useEffect, useRef } from 'react';

interface SlopeGameProps {
  width?: number;
  height?: number;
  onClose?: () => void;
}

/*
  Minimal "Slope"-like canvas game:
  - Player is a ball at the bottom; move left/right with Arrow keys or A/D.
  - Obstacles spawn at the top and scroll downward; avoid collisions.
  - Score increases over time; shows Game Over and press R to restart.
*/
export default function SlopeGame({ width = 640, height = 420, onClose }: SlopeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});

  const devicePixelRatioRef = useRef<number>(1);

  const gameStateRef = useRef({
    playerX: 0,
    playerY: 0,
    playerRadius: 12,
    laneWidth: 20,
    speed: 3,
    obstacles: [] as { x: number; y: number; w: number; h: number }[],
    spawnTimer: 0,
    score: 0,
    isGameOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high-DPI rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    devicePixelRatioRef.current = dpr;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Initialize player
    gameStateRef.current.playerX = width / 2;
    gameStateRef.current.playerY = height - 60;
    gameStateRef.current.obstacles = [];
    gameStateRef.current.spawnTimer = 0;
    gameStateRef.current.score = 0;
    gameStateRef.current.isGameOver = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (gameStateRef.current.isGameOver && (e.key === 'r' || e.key === 'R')) {
        // Restart
        gameStateRef.current.obstacles = [];
        gameStateRef.current.spawnTimer = 0;
        gameStateRef.current.score = 0;
        gameStateRef.current.isGameOver = false;
      }
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const spawnObstacle = () => {
      const minWidth = 40;
      const maxWidth = 160;
      const w = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
      const x = Math.floor(Math.random() * Math.max(1, width - w));
      const h = Math.floor(14 + Math.random() * 26);
      gameStateRef.current.obstacles.push({ x, y: -h, w, h });
    };

    const circleRectCollision = (
      cx: number,
      cy: number,
      radius: number,
      rx: number,
      ry: number,
      rw: number,
      rh: number,
    ) => {
      const closestX = Math.max(rx, Math.min(cx, rx + rw));
      const closestY = Math.max(ry, Math.min(cy, ry + rh));
      const dx = cx - closestX;
      const dy = cy - closestY;
      return dx * dx + dy * dy < radius * radius;
    };

    const update = () => {
      const state = gameStateRef.current;

      if (!state.isGameOver) {
        // Movement
        const moveLeft = keysRef.current['arrowleft'] || keysRef.current['a'];
        const moveRight = keysRef.current['arrowright'] || keysRef.current['d'];
        const moveSpeed = 5;

        if (moveLeft) state.playerX -= moveSpeed;
        if (moveRight) state.playerX += moveSpeed;
        state.playerX = Math.max(state.playerRadius + 2, Math.min(width - state.playerRadius - 2, state.playerX));

        // Spawn obstacles
        state.spawnTimer -= 1;
        if (state.spawnTimer <= 0) {
          spawnObstacle();
          state.spawnTimer = Math.max(12, Math.floor(50 - Math.min(30, state.score / 200))); // faster spawns over time
        }

        // Update obstacles
        const dy = state.speed + Math.min(4, state.score / 800); // speed up a bit over time
        for (let i = 0; i < state.obstacles.length; i++) {
          state.obstacles[i].y += dy;
        }
        // Remove off-screen
        state.obstacles = state.obstacles.filter(o => o.y < height + 60);

        // Collision detection
        for (const o of state.obstacles) {
          if (circleRectCollision(state.playerX, state.playerY, state.playerRadius, o.x, o.y, o.w, o.h)) {
            state.isGameOver = true;
            break;
          }
        }

        // Score
        state.score += 1;
      }

      // Draw
      ctx.clearRect(0, 0, width, height);

      // Background grid-esque slope lines
      ctx.fillStyle = '#001a00';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#0a3';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        const y = ((i * 24) + (gameStateRef.current.score % 24)) % (height + 24);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Obstacles
      ctx.fillStyle = '#0f5';
      for (const o of gameStateRef.current.obstacles) {
        ctx.fillRect(o.x, o.y, o.w, o.h);
      }

      // Player
      ctx.fillStyle = '#3f3';
      ctx.beginPath();
      ctx.arc(gameStateRef.current.playerX, gameStateRef.current.playerY, gameStateRef.current.playerRadius, 0, Math.PI * 2);
      ctx.fill();

      // HUD
      ctx.fillStyle = '#aaffaa';
      ctx.font = '14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
      ctx.fillText(`Score: ${Math.floor(gameStateRef.current.score)}`, 12, 22);
      ctx.fillText('Move: ←/→ or A/D | Close: Esc | Restart: R', 12, 40);

      if (gameStateRef.current.isGameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ccffcc';
        ctx.font = 'bold 22px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
        ctx.fillText('Game Over', width / 2 - 70, height / 2 - 10);
        ctx.font = '14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
        ctx.fillText('Press R to restart or Esc to close', width / 2 - 140, height / 2 + 20);
      }

      animationRef.current = window.requestAnimationFrame(update);
    };

    animationRef.current = window.requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [width, height, onClose]);

  return (
    <canvas ref={canvasRef} className="bg-black rounded-md border border-green-800/60" />
  );
}

