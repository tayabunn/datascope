"use client";

import React, { useEffect, useRef } from "react";

interface FluidWaveCanvasProps {
  className?: string;
  intensity?: "light" | "dark";
}

export default function FluidWaveCanvas({
  className = "",
  intensity = "dark",
}: FluidWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Gradient mesh wave curves matching the Genesis fluid ribbon aesthetic
      const numWaves = 4;
      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        
        const grad = ctx.createLinearGradient(0, 0, width, height);
        if (intensity === "dark") {
          grad.addColorStop(0, `rgba(30, 106, 255, ${0.18 - i * 0.03})`);
          grad.addColorStop(0.5, `rgba(56, 189, 248, ${0.14 - i * 0.02})`);
          grad.addColorStop(1, `rgba(0, 18, 37, 0)`);
        } else {
          grad.addColorStop(0, `rgba(30, 106, 255, ${0.35 - i * 0.06})`);
          grad.addColorStop(0.6, `rgba(56, 189, 248, ${0.28 - i * 0.04})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        }

        ctx.fillStyle = grad;

        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const y1 = Math.sin(x * 0.002 + time + i * 1.2) * 110;
          const y2 = Math.cos(x * 0.003 - time * 0.7 + i * 0.8) * 70;
          const y3 = Math.sin((x + time * 100) * 0.001) * 50;
          const baseY = height * 0.45 + i * 45;
          const y = baseY + y1 + y2 + y3;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
}
