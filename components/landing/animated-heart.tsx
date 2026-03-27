"use client";

import { useEffect, useRef, useMemo } from "react";

// Pre-generate stable particles to avoid flickering
function generateHeartParticles() {
  const particles: { t: number; layer: number; fill: number }[] = [];
  
  // Generate particles in layers for 3D depth
  const layers = 8;
  const particlesPerLayer = 120;
  
  for (let layer = 0; layer < layers; layer++) {
    for (let i = 0; i < particlesPerLayer; i++) {
      const t = (i / particlesPerLayer) * Math.PI * 2;
      // Deterministic fill value based on index
      const fill = ((layer * particlesPerLayer + i) * 0.618) % 1;
      particles.push({ t, layer, fill });
    }
  }
  
  return particles;
}

// Pre-generate outline particles
function generateOutlineParticles() {
  const outline: { t: number; offset: number }[] = [];
  const count = 80;
  
  for (let i = 0; i < count; i++) {
    outline.push({
      t: (i / count) * Math.PI * 2,
      offset: i * 0.1,
    });
  }
  
  return outline;
}

export function AnimatedHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  
  // Pre-compute particles once
  const heartParticles = useMemo(() => generateHeartParticles(), []);
  const outlineParticles = useMemo(() => generateOutlineParticles(), []);

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
      const baseScale = Math.min(rect.width, rect.height) * 0.02;
      
      // Gentle pulsing heartbeat effect
      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      const scale = baseScale * pulse;

      // Slow, smooth 3D rotation
      const rotY = Math.sin(time * 0.4) * 0.3;
      const rotX = Math.sin(time * 0.3) * 0.1;

      // Collect all points for depth sorting
      const points: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      // Render pre-generated heart particles
      heartParticles.forEach((particle) => {
        const zOffset = (particle.layer / 8 - 0.5) * 5;
        const layerScale = 1 - Math.abs(zOffset) * 0.06;

        // Get base heart point
        let hx = heartX(particle.t) * layerScale;
        let hy = heartY(particle.t) * layerScale;
        let hz = zOffset;

        // Apply fill scaling for interior points
        if (particle.fill < 0.75) {
          const innerScale = 0.15 + particle.fill * 0.85;
          hx *= innerScale;
          hy *= innerScale;
          hz += (particle.fill - 0.5) * 2;
        }

        // Apply 3D rotations
        // Rotate around Y axis
        const x1 = hx * Math.cos(rotY) - hz * Math.sin(rotY);
        const z1 = hx * Math.sin(rotY) + hz * Math.cos(rotY);
        const y1 = hy;

        // Rotate around X axis
        const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
        const x2 = x1;

        // Perspective projection
        const perspective = 800;
        const projScale = perspective / (perspective + z2 * 15);

        const screenX = centerX + x2 * scale * projScale;
        const screenY = centerY + y2 * scale * projScale;

        // Calculate appearance based on depth
        const normalizedZ = (z2 + 4) / 8;
        const alpha = 0.2 + normalizedZ * 0.5;
        const size = 1.5 + normalizedZ * 2.5;

        points.push({
          x: screenX,
          y: screenY,
          z: z2,
          size,
          alpha: Math.min(alpha, 0.75),
        });
      });

      // Render flowing outline particles
      outlineParticles.forEach((particle) => {
        const flowT = (particle.t + time * 0.8) % (Math.PI * 2);
        const waveZ = Math.sin(time * 2 + particle.offset) * 2.5;

        let hx = heartX(flowT) * 1.08;
        let hy = heartY(flowT) * 1.08;
        let hz = waveZ;

        // Apply rotations
        const x1 = hx * Math.cos(rotY) - hz * Math.sin(rotY);
        const z1 = hx * Math.sin(rotY) + hz * Math.cos(rotY);
        const y1 = hy;

        const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
        const x2 = x1;

        const perspective = 800;
        const projScale = perspective / (perspective + z2 * 15);

        const screenX = centerX + x2 * scale * projScale;
        const screenY = centerY + y2 * scale * projScale;

        const alpha = 0.25 + Math.sin(time * 2 + particle.offset * 0.5) * 0.1;

        points.push({
          x: screenX,
          y: screenY,
          z: z2,
          size: 2,
          alpha,
        });
      });

      // Sort by z for proper depth ordering (back to front)
      points.sort((a, b) => a.z - b.z);

      // Draw all points with HeartMetrics brand color
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(12, 44, 85, ${point.alpha})`;
        ctx.fill();
      });

      // Add center glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, scale * 14
      );
      glowGradient.addColorStop(0, "rgba(12, 44, 85, 0.06)");
      glowGradient.addColorStop(0.6, "rgba(12, 44, 85, 0.02)");
      glowGradient.addColorStop(1, "rgba(12, 44, 85, 0)");
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      time += 0.012;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [heartParticles, outlineParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
