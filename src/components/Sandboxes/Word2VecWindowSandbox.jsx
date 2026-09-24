import React, { useState } from 'react';

const TOKENS = ["deep", "learning", "models", "transform", "human", "language", "processing", "rapidly"];

export default function Word2VecWindowSandbox() {
  const [targetIdx, setTargetIdx] = useState(3);
  const targetWord = TOKENS[targetIdx];

  const contextWords = TOKENS.filter((_, i) => Math.abs(i - targetIdx) <= 2 && i !== targetIdx);

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block mb-2">
          Sliding Context Horizon (Window Radius = 2):
        </span>
        <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] font-mono">
          {TOKENS.map((word, i) => {
            const isTarget = i === targetIdx;
            const isContext = Math.abs(i - targetIdx) <= 2 && !isTarget;

            let style = "bg-[#f6f4ee] dark:bg-[#24272c] text-[#8c887b] dark:text-[#78716c] border-[#ebe7de] dark:border-[#2e3238]";
            if (isTarget) style = "bg-[#faece6] dark:bg-[#382723] text-[#b85d38] dark:text-[#d97753] border-[#b85d38]/40 font-bold";
            else if (isContext) style = "bg-[#e8efe9] dark:bg-[#22352c] text-[#2d4a3e] dark:text-[#76a992] border-[#2d4a3e]/30";

            return (
              <span key={i} className={`px-2.5 py-1 rounded-md border transition text-xs ${style}`}>
                {word}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238]">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
          Pivot Position:
        </label>
        <input
          type="range"
          min="2"
          max="5"
          value={targetIdx}
          onChange={(e) => setTargetIdx(parseInt(e.target.value))}
          className="flex-1 accent-[#b85d38]"
        />
        <span className="text-[#b85d38] dark:text-[#d97753] font-mono text-xs font-semibold">Center: "{targetWord}"</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-1.5">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            Continuous Bag-of-Words (CBOW)
          </span>
          <p className="text-[#57534e] dark:text-[#a8a29e]">Input Context: <code className="text-[#2d4a3e] dark:text-[#76a992] font-mono">[{contextWords.join(', ')}]</code></p>
          <p className="text-[#57534e] dark:text-[#a8a29e]">Prediction Goal: Pivot Target <strong className="text-[#b85d38] dark:text-[#d97753] font-mono">"{targetWord}"</strong></p>
        </div>

        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-1.5">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            Skip-Gram Architecture
          </span>
          <p className="text-[#57534e] dark:text-[#a8a29e]">Input Center: <strong className="text-[#b85d38] dark:text-[#d97753] font-mono">"{targetWord}"</strong></p>
          <p className="text-[#57534e] dark:text-[#a8a29e]">Prediction Goal: Flanking Context <code className="text-[#2d4a3e] dark:text-[#76a992] font-mono">[{contextWords.join(', ')}]</code></p>
        </div>
      </div>
    </div>
  );
}
