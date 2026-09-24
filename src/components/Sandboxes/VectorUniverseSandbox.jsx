import React, { useRef, useEffect, useState } from 'react';

const POINTS = [
  { name: "king", x: 120, y: 70, color: "#b85d38" },
  { name: "queen", x: 130, y: 220, color: "#2d4a3e" },
  { name: "man", x: 270, y: 65, color: "#b85d38" },
  { name: "woman", x: 280, y: 215, color: "#2d4a3e" },
  { name: "paris", x: 420, y: 80, color: "#1f2d3d" },
  { name: "france", x: 530, y: 70, color: "#1f2d3d" },
  { name: "tokyo", x: 430, y: 220, color: "#926c2e" },
  { name: "japan", x: 540, y: 210, color: "#926c2e" }
];

export default function VectorUniverseSandbox() {
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState("Click any two words or try an analogy button below to measure similarity:");

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

    // Draw subtle grid
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Draw points
    POINTS.forEach(p => {
      const isSel = selected.some(s => s.name === p.name);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSel ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();

      if (isSel) {
        ctx.strokeStyle = isDark ? "#f5f2ea" : "#1c1917";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.font = "500 12px 'JetBrains Mono', monospace";
      ctx.fillStyle = isSel ? (isDark ? "#f5f2ea" : "#1c1917") : (isDark ? "#d6d3d1" : p.color);
      ctx.fillText(p.name, p.x + 9, p.y + 4);
    });

    // Draw connecting line if 2 selected
    if (selected.length === 2) {
      const [p1, p2] = selected;
      ctx.strokeStyle = isDark ? "#d97753" : "#1c1917";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  useEffect(() => {
    draw();
  }, [selected]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let clicked = null;
    POINTS.forEach(p => {
      if (Math.hypot(p.x - clickX, p.y - clickY) < 25) {
        clicked = p;
      }
    });

    if (clicked) {
      let next;
      if (selected.some(s => s.name === clicked.name)) {
        next = selected.filter(s => s.name !== clicked.name);
      } else {
        next = selected.length >= 2 ? [selected[1], clicked] : [...selected, clicked];
      }
      setSelected(next);

      if (next.length === 2) {
        const dist = Math.hypot(next[0].x - next[1].x, next[0].y - next[1].y);
        const cosSim = Math.max(0.1, 1 - (dist / 400)).toFixed(3);
        setFeedback(`Cosine Similarity("${next[0].name}", "${next[1].name}") = ${cosSim} (Words are close in meaning!)`);
      } else if (next.length === 1) {
        setFeedback(`Selected "${next[0].name}". Now click a second word to compare them.`);
      }
    }
  };

  const runAnalogy = (type) => {
    if (type === 'king_queen') {
      const king = POINTS.find(p => p.name === 'king');
      const queen = POINTS.find(p => p.name === 'queen');
      const man = POINTS.find(p => p.name === 'man');
      const woman = POINTS.find(p => p.name === 'woman');

      setSelected([king, man, woman, queen]);
      setFeedback("Word Math: Vector(King) - Vector(Man) + Vector(Woman) = Vector(Queen)! The gender difference between Man and Woman equals the difference between King and Queen.");
    } else {
      const paris = POINTS.find(p => p.name === 'paris');
      const france = POINTS.find(p => p.name === 'france');
      const tokyo = POINTS.find(p => p.name === 'tokyo');
      const japan = POINTS.find(p => p.name === 'japan');

      setSelected([france, paris, tokyo, japan]);
      setFeedback("Country & Capital Analogy: Vector(Paris -> France) is parallel to Vector(Tokyo -> Japan). The coordinates capture geographical relationships!");
    }
  };

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
          Interactive 2D Word Map:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => runAnalogy('king_queen')}
            className="px-2.5 py-1 rounded-md border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#b85d38] dark:text-[#d97753] font-mono text-[11px] transition"
          >
            King - Man + Woman = Queen
          </button>
          <button
            onClick={() => runAnalogy('paris_tokyo')}
            className="px-2.5 py-1 rounded-md border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#2d4a3e] dark:text-[#76a992] font-mono text-[11px] transition"
          >
            France - Paris + Tokyo = Japan
          </button>
        </div>
      </div>

      <div className="relative bg-[#fcfbf9] dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] p-1 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={640}
          height={280}
          onClick={handleCanvasClick}
          className="cursor-crosshair max-w-full"
        />
      </div>

      <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-xs text-[#2d4a3e] dark:text-[#76a992]">
        {feedback}
      </div>
    </div>
  );
}
