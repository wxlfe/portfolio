'use client';

import { useEffect, useRef } from 'react';

const CELL_SIZE = 16;
const STEP_MS = 120;
const INITIAL_DENSITY = 0.18;

/**
 * Converts a grid coordinate into the linear array index used by the automaton state.
 */
function indexFor(col: number, row: number, cols: number): number {
  return row * cols + col;
}

/**
 * Renders a canvas-based Conway's Game of Life background.
 */
export function LifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let lastTime = performance.now();
    let accumulator = 0;
    let current = new Uint8Array(0);
    let next = new Uint8Array(0);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeColor = '#d1ad54';
    const inactiveColor = isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(40, 40, 40, 0.14)';
    const activeRadius = 2.35;
    const inactiveRadius = 1.05;

    const seed = () => {
      for (let i = 0; i < current.length; i += 1) {
        current[i] = Math.random() < INITIAL_DENSITY ? 1 : 0;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(1, Math.floor(width / CELL_SIZE));
      rows = Math.max(1, Math.floor(height / CELL_SIZE));
      current = new Uint8Array(cols * rows);
      next = new Uint8Array(cols * rows);
      seed();
      draw();
    };

    const step = () => {
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          let neighbors = 0;

          for (let y = -1; y <= 1; y += 1) {
            for (let x = -1; x <= 1; x += 1) {
              if (x === 0 && y === 0) {
                continue;
              }
              const nCol = (col + x + cols) % cols;
              const nRow = (row + y + rows) % rows;
              neighbors += current[indexFor(nCol, nRow, cols)];
            }
          }

          const idx = indexFor(col, row, cols);
          const alive = current[idx] === 1;
          next[idx] = alive ? (neighbors === 2 || neighbors === 3 ? 1 : 0) : neighbors === 3 ? 1 : 0;
        }
      }

      const temp = current;
      current = next;
      next = temp;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const idx = indexFor(col, row, cols);
          const alive = current[idx] === 1;
          const x = col * CELL_SIZE + CELL_SIZE / 2;
          const y = row * CELL_SIZE + CELL_SIZE / 2;

          ctx.beginPath();
          ctx.fillStyle = alive ? activeColor : inactiveColor;
          ctx.arc(x, y, alive ? activeRadius : inactiveRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / CELL_SIZE);
      const row = Math.floor(y / CELL_SIZE);

      if (col < 0 || row < 0 || col >= cols || row >= rows) {
        return;
      }

      const idx = indexFor(col, row, cols);
      current[idx] = 1;
      draw();
    };

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      accumulator += delta;

      while (accumulator >= STEP_MS) {
        step();
        accumulator -= STEP_MS;
      }

      draw();
      rafId = window.requestAnimationFrame(tick);
    };

    resize();
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="life_canvas" aria-hidden="true" />;
}
