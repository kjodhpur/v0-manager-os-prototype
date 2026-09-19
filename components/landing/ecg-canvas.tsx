'use client';

import { useEffect, useRef, useState } from 'react';

const WAVE_WIDTH = 280;
const CSS_HEIGHT = 48;

export function ECGCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // Scroll speed lives in a ref so changing it doesn't tear down the animation
  // loop — reading it from state restarted the wave on every scroll frame.
  const speedRef = useRef(1.2);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? window.scrollY / scrollable : 0;
      speedRef.current = 1.2 + percent * 2.8;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = CSS_HEIGHT;
    let gradient: CanvasGradient;

    // Size the backing store to the element's real CSS width and the device
    // pixel ratio, so the trace isn't squashed or blurry on phones.
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00B8A0');
      gradient.addColorStop(0.5, '#5DD67A');
      gradient.addColorStop(1, '#FFB347');
    };

    resize();
    window.addEventListener('resize', resize);

    let offset = 0;
    const amplitude = height / 2.5;
    const centerY = height / 2;

    const traceY = (i: number) => {
      if (i < 40) return centerY;
      if (i < 60) return centerY - Math.sin(((i / WAVE_WIDTH) * Math.PI * 2 - Math.PI) * 2) * amplitude * 0.3;
      if (i < 80) return centerY;
      if (i < 100) return centerY + Math.sin(((i - 80) / 20) * Math.PI) * amplitude * 1.2;
      if (i < 120) return centerY - Math.sin(((i - 100) / 20) * Math.PI) * amplitude * 0.8;
      if (i < 160) return centerY;
      if (i < 180) return centerY - Math.sin(((i - 160) / 20) * Math.PI) * amplitude * 0.4;
      return centerY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Shadow must be set before stroking or the glow never renders.
      ctx.shadowColor = offset % WAVE_WIDTH < WAVE_WIDTH / 2
        ? 'rgba(0, 184, 160, 0.4)'
        : 'rgba(255, 179, 71, 0.4)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 1;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let x = 0; x < width + WAVE_WIDTH; x += WAVE_WIDTH) {
        ctx.beginPath();
        for (let i = 0; i < WAVE_WIDTH; i += 1) {
          const waveX = x + i - offset;
          const y = traceY(i);
          if (i === 0) ctx.moveTo(waveX, y);
          else ctx.lineTo(waveX, y);
        }
        ctx.stroke();
      }

      offset = (offset + speedRef.current) % WAVE_WIDTH;
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      const animate = () => {
        draw();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`mx-auto block w-full max-w-2xl transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: `${CSS_HEIGHT}px` }}
    />
  );
}
