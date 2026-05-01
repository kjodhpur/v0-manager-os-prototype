'use client';

import { useEffect, useRef, useMemo, useState } from "react";

// Pre-generate stable particles with more spacing (fewer particles)
function generateHeartParticles() {
  const particles: { t: number; layer: number; fill: number }[] = [];
  
  // Fewer layers and particles for more spread out, airy look
  const layers = 5;
  const particlesPerLayer = 40;
  
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

// Pre-generate outline particles with more spacing
function generateOutlineParticles() {
  const outline: { t: number; offset: number }[] = [];
  const count = 36; // Reduced from 80 for more spacing
  
  for (let i = 0; i < count; i++) {
    outline.push({
      t: (i / count) * Math.PI * 2,
      offset: i * 0.15,
    });
  }
  
  return outline;
}

export function AnimatedHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // Normalized 0-1 position
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  
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

    // Mouse move handler for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    // Also track mouse on document level for smoother response
    const handleDocumentMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      // Clamp to 0-1 range to keep rotation moderate and heart visible
      targetMouseRef.current = {
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);

    // Heart parametric function (classic heart curve)
    const heartX = (t: number) => 16 * Math.pow(Math.sin(t), 3);
    const heartY = (t: number) => 
      -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Smooth mouse interpolation for fluid interaction
      const lerp = 0.08;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const baseScale = Math.min(rect.width, rect.height) * 0.022;
      
      // Very subtle pulse - reduced from 0.04 to 0.015
      const pulse = 1 + Math.sin(time * 1.8) * 0.015;
      const scale = baseScale * pulse;

      // Mouse-controlled rotation with smooth damping - reduced sensitivity for stability
      const mouseOffsetX = (mouseRef.current.x - 0.5) * 2; // -1 to 1
      const mouseOffsetY = (mouseRef.current.y - 0.5) * 2; // -1 to 1
      
      // Combine subtle time-based rotation with mouse control (reduced from 0.4 and 0.25)
      const baseRotY = Math.sin(time * 0.25) * 0.15;
      const baseRotX = Math.sin(time * 0.2) * 0.08;
      
      const rotY = baseRotY + mouseOffsetX * 0.25;
      const rotX = baseRotX + mouseOffsetY * 0.15;

      // Collect all points for depth sorting
      const points: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      // Render pre-generated heart particles with more spacing
      heartParticles.forEach((particle) => {
        const zOffset = (particle.layer / 5 - 0.5) * 6; // Adjusted for 5 layers
        const layerScale = 1 - Math.abs(zOffset) * 0.04;

        // Get base heart point
        let hx = heartX(particle.t) * layerScale;
        let hy = heartY(particle.t) * layerScale;
        let hz = zOffset;

        // Apply fill scaling for interior points (more spread out)
        if (particle.fill < 0.65) {
          const innerScale = 0.2 + particle.fill * 0.8;
          hx *= innerScale;
          hy *= innerScale;
          hz += (particle.fill - 0.5) * 2.5;
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
        const alpha = 0.25 + normalizedZ * 0.45;
        const size = 2 + normalizedZ * 3; // Slightly larger particles for visibility

        points.push({
          x: screenX,
          y: screenY,
          z: z2,
          size,
          alpha: Math.min(alpha, 0.7),
        });
      });

      // Render flowing outline particles (more spaced out)
      outlineParticles.forEach((particle) => {
        const flowT = (particle.t + time * 0.5) % (Math.PI * 2); // Slower flow
        const waveZ = Math.sin(time * 1.5 + particle.offset) * 2;

        let hx = heartX(flowT) * 1.12; // Slightly larger outline
        let hy = heartY(flowT) * 1.12;
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

        const alpha = 0.3 + Math.sin(time * 1.5 + particle.offset * 0.3) * 0.08;

        points.push({
          x: screenX,
          y: screenY,
          z: z2,
          size: 2.5,
          alpha,
        });
      });

      // Sort by z for proper depth ordering (back to front)
      points.sort((a, b) => a.z - b.z);

      // Draw all points with HeartMetrics brand color (teal)
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 1.3, 0, Math.PI * 2);
        // Use brand teal color: #00B8A0
        ctx.fillStyle = `rgba(0, 184, 160, ${point.alpha * 1.2})`;
        ctx.fill();
      });

      // Add subtle center glow with brand color
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, scale * 16
      );
      glowGradient.addColorStop(0, "rgba(0, 184, 160, 0.08)");
      glowGradient.addColorStop(0.5, "rgba(0, 184, 160, 0.03)");
      glowGradient.addColorStop(1, "rgba(0, 184, 160, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      time += 0.01;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [heartParticles, outlineParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", cursor: "default" }}
      aria-hidden="true"
    />
  );
}
