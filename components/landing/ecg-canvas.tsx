'use client';

import { useEffect, useRef, useState } from 'react';

export function ECGCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1.2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;
      const scrollPercent = scrolled / (scrollHeight - windowHeight);
      
      // Speed ranges from 1.2px/frame to 4px/frame based on scroll
      setScrollSpeed(1.2 + scrollPercent * 2.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;
    const waveWidth = 280;
    const amplitude = canvas.height / 2.5;
    const centerY = canvas.height / 2;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#8BA8F0');
    gradient.addColorStop(0.5, '#A87AC8');
    gradient.addColorStop(1, '#E0607A');

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves across the canvas
      for (let x = 0; x < canvas.width + waveWidth; x += waveWidth) {
        ctx.beginPath();
        for (let i = 0; i < waveWidth; i += 1) {
          const waveX = x + i - offset;
          const progress = (i / waveWidth) * Math.PI * 2;

          // ECG-like pattern: mostly flat with spikes and dips
          let y = centerY;
          if (i < 40) {
            // Flat line start
            y = centerY;
          } else if (i < 60) {
            // P wave
            y = centerY - Math.sin((progress - Math.PI) * 2) * amplitude * 0.3;
          } else if (i < 80) {
            // PR interval
            y = centerY;
          } else if (i < 100) {
            // QRS complex - sharp downward
            const qrsProgress = (i - 80) / 20;
            y = centerY + Math.sin(qrsProgress * Math.PI) * amplitude * 1.2;
          } else if (i < 120) {
            // S wave recovery
            y = centerY - Math.sin((i - 100) / 20 * Math.PI) * amplitude * 0.8;
          } else if (i < 160) {
            // ST segment
            y = centerY;
          } else if (i < 180) {
            // T wave
            y = centerY - Math.sin((i - 160) / 20 * Math.PI) * amplitude * 0.4;
          } else {
            // Baseline
            y = centerY;
          }

          if (waveX === x) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw glow shadow
      ctx.shadowColor = offset % 280 < 140 ? 'rgba(139, 168, 240, 0.4)' : 'rgba(224, 96, 122, 0.4)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      offset = (offset + scrollSpeed) % waveWidth;
    };

    const animate = () => {
      drawWave();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, scrollSpeed]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={48}
      className={`w-full max-w-2xl mx-auto transition-opacity duration-1000 delay-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: '48px' }}
    />
  );
}
