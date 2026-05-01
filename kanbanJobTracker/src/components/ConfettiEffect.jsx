import { useEffect, useRef } from "react";
import "./ConfettiEffect.css";

const COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98FB98"];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function ConfettiEffect({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 180 }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-200, -10),
      w: randomBetween(8, 18),
      h: randomBetween(6, 14),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: randomBetween(-3, 3),
      vy: randomBetween(3, 8),
      rotation: randomBetween(0, Math.PI * 2),
      vr: randomBetween(-0.15, 0.15),
      opacity: 1,
    }));

    let frame;
    let elapsed = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elapsed++;

      let allDone = true;

      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.rotation += p.vr;
        if (elapsed > 80) p.opacity -= 0.012;

        if (p.y < canvas.height + 20 && p.opacity > 0) {
          allDone = false;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (allDone) {
        cancelAnimationFrame(frame);
        onDone();
      } else {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
