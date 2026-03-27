"use client";

import { useEffect, useRef } from "react";

export function AnimatedHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.35;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      // Generate heart shape points using parametric equations
      // Heart curve: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
      const resolution = 0.08;
      for (let t = 0; t < Math.PI * 2; t += resolution) {
        // Calculate heart outline
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        
        // Add depth variation for 3D effect
        const depth = Math.sin(t) * 0.5 + 0.5;
        
        // Apply rotation
        const rotY = time * 0.3;
        const rotX = time * 0.2;
        
        let px = x * depth;
        let py = y * depth;
        let pz = Math.sin(t + time * 0.5) * 2;
        
        // Rotate around Y axis
        const newPx = px * Math.cos(rotY) - pz * Math.sin(rotY);
        const newPz = px * Math.sin(rotY) + pz * Math.cos(rotY);
        
        // Rotate around X axis
        const newPy = py * Math.cos(rotX) - newPz * Math.sin(rotX);
        const finalPz = py * Math.sin(rotX) + newPz * Math.cos(rotX);
        
        const normalizedZ = (finalPz + 3) / 6; // Normalize z to 0-1
        const charIndex = Math.floor(Math.max(0, Math.min(chars.length - 1, normalizedZ * (chars.length - 1))));
        
        points.push({
          x: centerX + newPx * scale,
          y: centerY - newPy * scale * 0.9, // Adjust vertical scaling
          z: finalPz,
          char: chars[charIndex],
        });
      }

      // Add interior fill points for a solid heart
      for (let t = 0; t < Math.PI * 2; t += resolution * 1.5) {
        for (let r = 0.3; r < 1; r += 0.2) {
          const x = 16 * Math.pow(Math.sin(t), 3) * r;
          const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
          
          const depth = Math.sin(t) * 0.3 + 0.7;
          
          const rotY = time * 0.3;
          const rotX = time * 0.2;
          
          let px = x * depth;
          let py = y * depth;
          let pz = Math.sin(t + time * 0.5) * 1.5 * r;
          
          const newPx = px * Math.cos(rotY) - pz * Math.sin(rotY);
          const newPz = px * Math.sin(rotY) + pz * Math.cos(rotY);
          
          const newPy = py * Math.cos(rotX) - newPz * Math.sin(rotX);
          const finalPz = py * Math.sin(rotX) + newPz * Math.cos(rotX);
          
          const normalizedZ = (finalPz + 3) / 6;
          const charIndex = Math.floor(Math.max(0, Math.min(chars.length - 1, normalizedZ * (chars.length - 1))));
          
          points.push({
            x: centerX + newPx * scale,
            y: centerY - newPy * scale * 0.9,
            z: finalPz,
            char: chars[charIndex],
          });
        }
      }

      // Sort by z for depth
      points.sort((a, b) => a.z - b.z);

      // Draw points
      points.forEach((point) => {
        const alpha = 0.3 + (point.z + 3) * 0.12;
        // Use HeartMetrics primary color: #0C2C55
        ctx.fillStyle = `rgba(12, 44, 85, ${Math.min(alpha, 1)})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
