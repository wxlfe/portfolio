'use client';

import { useEffect, useRef } from 'react';

/** Grid cell size in CSS pixels. */
const CELL_SIZE = 20;
/** Simulation step cadence in milliseconds. */
const STEP_MS = 170;
/** Initial alive-cell density used to seed the simulation. */
const INITIAL_DENSITY = 0.12;

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

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrowViewport = window.matchMedia('(max-width: 52rem)').matches;
    const navAny = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    if (isReducedMotion || isNarrowViewport || navAny.connection?.saveData) {
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
    let tickId = 0;
    let startTimeoutId = 0;
    let idleId = 0;
    let current = new Uint8Array(0);
    let next = new Uint8Array(0);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeColor = '#d1ad54';
    const inactiveColor = isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(40, 40, 40, 0.12)';
    const activeRadius = 2.2;
    const inactiveRadius = 1;

    const seed = () => {
      for (let i = 0; i < current.length; i += 1) {
        current[i] = Math.random() < INITIAL_DENSITY ? 1 : 0;
      }
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

    const runTick = () => {
      if (document.hidden) {
        return;
      }
      step();
      draw();
    };

    const start = () => {
      resize();
      canvas.addEventListener('click', onClick);
      window.addEventListener('resize', resize);
      tickId = window.setInterval(runTick, STEP_MS);
    };

    const winWithIdle = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof winWithIdle.requestIdleCallback === 'function') {
      idleId = winWithIdle.requestIdleCallback(() => {
        startTimeoutId = window.setTimeout(start, 900);
      }, { timeout: 1500 });
    } else {
      startTimeoutId = window.setTimeout(start, 1200);
    }

    return () => {
      window.clearInterval(tickId);
      window.clearTimeout(startTimeoutId);
      winWithIdle.cancelIdleCallback?.(idleId);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="life_canvas" aria-hidden="true" />;
}
