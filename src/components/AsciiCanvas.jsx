import { useEffect, useRef } from "react";
import { customStyles } from "../styles/customStyles";

export default function AsciiCanvas({ anchorRef }) {
  const canvasRef = useRef(null);
  const spinFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    const chars = [" ", ".", ",", "/", "\\", "|", "#"];
    const fontSize = 12;
    const charWidth = fontSize * 0.6;
    const charHeight = fontSize;

    let width;
    let height;

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.fillStyle = "#4A3424";
      ctx.textBaseline = "top";
    }

    function drawGlobe(time = 0) {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);
      const radius = Math.min(width, height) * 0.8;
      let centerX = width / 2;
      let centerY = height / 2;
      if (anchorRef?.current) {
        const canvasRect = canvas.getBoundingClientRect();
        const anchorRect = anchorRef.current.getBoundingClientRect();
        centerX = anchorRect.left + anchorRect.width / 2 - canvasRect.left;
        centerY = anchorRect.top + anchorRect.height / 2 - canvasRect.top;
      }
      const rotation = time * 0.00009;
      const light = { x: -0.5, y: -0.5, z: 1.0 };
      const axis = { x: -0.3827, y: -0.9239, z: 0 };
      const axisMag = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
      axis.x /= axisMag;
      axis.y /= axisMag;
      axis.z /= axisMag;
      const lightMag = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
      light.x /= lightMag;
      light.y /= lightMag;
      light.z /= lightMag;

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * charWidth;
          const y = r * charHeight;
          const dx = x - centerX;
          const dy = y - centerY;
          const distSq = dx * dx + dy * dy;

          if (distSq < radius * radius) {
            const normalizedX = dx / radius;
            const normalizedY = dy / radius;
            const normalizedZ = Math.sqrt(1 - normalizedX * normalizedX - normalizedY * normalizedY);
            const cosTheta = Math.cos(rotation);
            const sinTheta = Math.sin(rotation);
            const dot =
              axis.x * normalizedX +
              axis.y * normalizedY +
              axis.z * normalizedZ;
            const cross = {
              x: axis.y * normalizedZ - axis.z * normalizedY,
              y: axis.z * normalizedX - axis.x * normalizedZ,
              z: axis.x * normalizedY - axis.y * normalizedX,
            };
            const nx =
              normalizedX * cosTheta +
              cross.x * sinTheta +
              axis.x * dot * (1 - cosTheta);
            const ny =
              normalizedY * cosTheta +
              cross.y * sinTheta +
              axis.y * dot * (1 - cosTheta);
            const nz =
              normalizedZ * cosTheta +
              cross.z * sinTheta +
              axis.z * dot * (1 - cosTheta);
            let intensity = nx * light.x + ny * light.y + nz * light.z;
            intensity = Math.max(0, intensity);
            let charIndex = Math.floor((1 - intensity) * chars.length * 1.2);
            if (charIndex < 0) {
              charIndex = 0;
            }
            if (charIndex >= chars.length) {
              charIndex = chars.length - 1;
            }
            const char = chars[charIndex];
            if (char !== " ") {
              ctx.fillText(char, x, y);
            }
          }
        }
      }
    }

    function animate(time) {
      drawGlobe(time);
      spinFrameRef.current = requestAnimationFrame(animate);
    }

    resize();
    spinFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (spinFrameRef.current) {
        cancelAnimationFrame(spinFrameRef.current);
      }
    };
  }, [anchorRef]);

  return <canvas ref={canvasRef} style={customStyles.asciiCanvas} />;
}
