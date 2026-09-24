import React, { useState } from 'react';

const PALETTE = [
  'bg-[#e8efe9] text-[#2d4a3e] border-[#2d4a3e]/30 dark:bg-[#22352c] dark:text-[#76a992]',
  'bg-[#faece6] text-[#b85d38] border-[#b85d38]/30 dark:bg-[#382723] dark:text-[#d97753]',
  'bg-[#f2efe9] text-[#57534e] border-[#ebe7de] dark:bg-[#282a2e] dark:text-[#d6d3d1]',
  'bg-[#edf2f7] text-[#2c3e50] border-[#d2dce6] dark:bg-[#1e2730] dark:text-[#8ba4be]',
  'bg-[#f7f2e7] text-[#825e24] border-[#e8dcc4] dark:bg-[#2e291f] dark:text-[#d4af66]'
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 32000) + 100;
}

export default function TokenizerSandbox() {
  const [text, setText] = useState("Unbelievably, modern architectures tokenize subwords effortlessly!");
  const [method, setMethod] = useState('bpe');

  let tokens = [];
  if (method === 'char') {
    tokens = text.split('');
  } else if (method === 'word') {
    tokens = text.match(/\b\w+\b|[^\w\s]/g) || [];
  } else {
    // Simulated BPE
    const words = text.match(/\S+/g) || [];
    words.forEach(w => {
      if (w.length <= 4) {
        tokens.push(w);
      } else {
        if (w.toLowerCase().startsWith('un')) {
          tokens.push(w.slice(0, 2));
          tokens.push(w.slice(2));
        } else if (w.toLowerCase().endsWith('tion')) {
          tokens.push(w.slice(0, -4));
          tokens.push(w.slice(-4));
        } else if (w.toLowerCase().endsWith('ly')) {
          tokens.push(w.slice(0, -2));
          tokens.push(w.slice(-2));
        } else {
          const mid = Math.floor(w.length / 2);
          tokens.push(w.slice(0, mid));
          tokens.push(w.slice(mid));
        }
      }
    });
  }

  const tokenIds = tokens.map(t => hashString(t));

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Text Stream to Tokenize:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'bpe', label: 'Subword (BPE / WordPiece)' },
          { key: 'word', label: 'Word Tokenization' },
          { key: 'char', label: 'Character Stream' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMethod(key)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition ${
              method === key
                ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
                : 'bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
          <span className="font-mono text-xs text-[#1c1917] dark:text-[#f5f2ea] font-medium">
            Atomic Token Tiles (Discrete Subword Pieces):
          </span>
          <span className="px-2 py-0.5 rounded bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] font-mono text-xs border border-[#ebe7de] dark:border-[#2e3238]">
            {tokens.length} Pieces
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[44px] p-2.5 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          {tokens.map((tok, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded border font-mono text-xs ${PALETTE[i % PALETTE.length]}`}
              title={`Token #${i} | Vocabulary ID: ${tokenIds[i]}`}
            >
              {tok}
            </span>
          ))}
        </div>

        <div className="p-2.5 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] font-mono text-[11px] text-[#57534e] dark:text-[#a8a29e] break-all">
          <strong className="text-[#1c1917] dark:text-[#f5f2ea]">Discrete Vocabulary Indices:</strong> [{tokenIds.join(', ')}]
        </div>
      </div>
    </div>
  );
}
