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

    // Heart parametric function (classic heart curve)
    const heartX = (t: number) => 16 * Math.pow(Math.sin(t), 3);
    const heartY = (t: number) => 
      -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const baseScale = Math.min(rect.width, rect.height) * 0.018;
      
      // Gentle pulsing heartbeat
      const pulse = 1 + Math.sin(time * 2) * 0.03;
      const scale = baseScale * pulse;

      // Collect all points for rendering
      const points: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      // 3D rotation angles (gentle sway)
      const rotY = Math.sin(time * 0.3) * 0.4;
      const rotX = Math.sin(time * 0.2) * 0.15;
      const rotZ = Math.sin(time * 0.25) * 0.1;

      // Create filled heart with particles
      const layers = 12;
      for (let layer = 0; layer < layers; layer++) {
        const zOffset = (layer / layers - 0.5) * 4; // z from -2 to 2
        const layerScale = 1 - Math.abs(zOffset) * 0.08; // Slightly smaller at edges

        const particlesPerLayer = Math.floor(80 - Math.abs(zOffset) * 10);
        
        for (let i = 0; i < particlesPerLayer; i++) {
          const t = (i / particlesPerLayer) * Math.PI * 2;
          
          // Get heart outline point
          let hx = heartX(t) * layerScale;
          let hy = heartY(t) * layerScale;
          let hz = zOffset;

          // Add some interior fill
          const fillRadius = Math.random();
          if (fillRadius < 0.7) {
            const innerScale = 0.1 + fillRadius * 0.9;
            hx *= innerScale;
            hy *= innerScale;
            hz += (Math.random() - 0.5) * 1.5;
          }

          // Apply 3D rotations
          // Rotate around Z
          let x1 = hx * Math.cos(rotZ) - hy * Math.sin(rotZ);
          let y1 = hx * Math.sin(rotZ) + hy * Math.cos(rotZ);
          let z1 = hz;

          // Rotate around Y
          let x2 = x1 * Math.cos(rotY) - z1 * Math.sin(rotY);
          let z2 = x1 * Math.sin(rotY) + z1 * Math.cos(rotY);
          let y2 = y1;

          // Rotate around X
          let y3 = y2 * Math.cos(rotX) - z2 * Math.sin(rotX);
          let z3 = y2 * Math.sin(rotX) + z2 * Math.cos(rotX);
          let x3 = x2;

          // Perspective projection
          const perspective = 1000;
          const projScale = perspective / (perspective + z3 * 20);

          const screenX = centerX + x3 * scale * projScale;
          const screenY = centerY + y3 * scale * projScale;

          // Calculate alpha based on depth and position
          const normalizedZ = (z3 + 3) / 6;
          const alpha = 0.15 + normalizedZ * 0.6;
          const size = 2 + normalizedZ * 3;

          points.push({
            x: screenX,
            y: screenY,
            z: z3,
            size,
            alpha: Math.min(alpha, 0.85),
          });
        }
      }

      // Add flowing particle streams around the heart
      const numStreams = 60;
      for (let i = 0; i < numStreams; i++) {
        const streamTime = time * 1.5 + (i / numStreams) * Math.PI * 2;
        const t = streamTime % (Math.PI * 2);
        
        let hx = heartX(t) * 1.15;
        let hy = heartY(t) * 1.15;
        let hz = Math.sin(streamTime * 2) * 3;

        // Apply rotations
        let x1 = hx * Math.cos(rotZ) - hy * Math.sin(rotZ);
        let y1 = hx * Math.sin(rotZ) + hy * Math.cos(rotZ);
        let z1 = hz;

        let x2 = x1 * Math.cos(rotY) - z1 * Math.sin(rotY);
        let z2 = x1 * Math.sin(rotY) + z1 * Math.cos(rotY);
        let y2 = y1;

        let y3 = y2 * Math.cos(rotX) - z2 * Math.sin(rotX);
        let z3 = y2 * Math.sin(rotX) + z2 * Math.cos(rotX);
        let x3 = x2;

        const perspective = 1000;
        const projScale = perspective / (perspective + z3 * 20);

        const screenX = centerX + x3 * scale * projScale;
        const screenY = centerY + y3 * scale * projScale;

        const alpha = 0.2 + Math.sin(streamTime * 3) * 0.15;

        points.push({
          x: screenX,
          y: screenY,
          z: z3,
          size: 1.5 + Math.sin(streamTime * 4) * 0.5,
          alpha,
        });
      }

      // Sort by z for proper depth ordering (back to front)
      points.sort((a, b) => a.z - b.z);

      // Draw all points
      points.forEach((point) => {
        // HeartMetrics brand color: deep navy #0C2C55
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(12, 44, 85, ${point.alpha})`;
        ctx.fill();
      });

      // Add subtle glow effect in center
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, scale * 15
      );
      glowGradient.addColorStop(0, "rgba(12, 44, 85, 0.08)");
      glowGradient.addColorStop(0.5, "rgba(12, 44, 85, 0.03)");
      glowGradient.addColorStop(1, "rgba(12, 44, 85, 0)");
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      time += 0.015;
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
      aria-hidden="true"
    />
  );
}
