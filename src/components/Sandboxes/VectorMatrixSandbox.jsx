import React, { useState } from 'react';

export default function VectorMatrixSandbox() {
  const [vocabSize, setVocabSize] = useState(50000);
  const [docCount, setDocCount] = useState(10000);
  const [denseDim, setDenseDim] = useState(384);

  // Math memory estimations (in MB)
  const oneHotMb = ((vocabSize * docCount * 4) / (1024 * 1024)).toFixed(1);
  const denseMb = ((denseDim * docCount * 4) / (1024 * 1024)).toFixed(1);
  const sparseBowMb = ((docCount * 120 * 8) / (1024 * 1024)).toFixed(1);

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238]">
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block mb-1">
            Lexicon Cardinality (|V|):
          </label>
          <input
            type="range"
            min="10000"
            max="200000"
            step="10000"
            value={vocabSize}
            onChange={(e) => setVocabSize(parseInt(e.target.value))}
            className="w-full accent-[#1c1917] dark:accent-[#f5f2ea]"
          />
          <span className="text-[#1c1917] dark:text-[#f5f2ea] font-mono text-[11px] font-medium">{vocabSize.toLocaleString()} terms</span>
        </div>

        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block mb-1">
            Corpus Folios (|D|):
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="5000"
            value={docCount}
            onChange={(e) => setDocCount(parseInt(e.target.value))}
            className="w-full accent-[#2d4a3e] dark:accent-[#4d7a66]"
          />
          <span className="text-[#2d4a3e] dark:text-[#76a992] font-mono text-[11px] font-medium">{docCount.toLocaleString()} documents</span>
        </div>

        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block mb-1">
            Dense Latent Dimensions (d):
          </label>
          <input
            type="range"
            min="128"
            max="1024"
            step="64"
            value={denseDim}
            onChange={(e) => setDenseDim(parseInt(e.target.value))}
            className="w-full accent-[#b85d38] dark:accent-[#d97753]"
          />
          <span className="text-[#b85d38] dark:text-[#d97753] font-mono text-[11px] font-medium">{denseDim} dimensions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            1. Dense One-Hot Array
          </span>
          <div className="space-y-1.5 text-[#57534e] dark:text-[#a8a29e] text-xs">
            <div>Vector Length: <strong className="font-mono text-[#1c1917] dark:text-[#f5f2ea]">{vocabSize.toLocaleString()}</strong></div>
            <div>Sparsity: <strong className="text-[#b83838] dark:text-[#e07575] font-mono">99.98% Zeros</strong></div>
            <div>Geometric Overlap: <strong className="font-mono text-[#8c887b]">0.00 (Orthogonal)</strong></div>
            <div className="pt-1 border-t border-[#eeebe3] dark:border-[#2b2e34]">
              RAM: <strong className="text-[#b83838] dark:text-[#e07575] font-mono text-sm">{oneHotMb} MB</strong>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            2. Sparse Bag-of-Words (CSR)
          </span>
          <div className="space-y-1.5 text-[#57534e] dark:text-[#a8a29e] text-xs">
            <div>Vector Length: <strong className="font-mono text-[#1c1917] dark:text-[#f5f2ea]">{vocabSize.toLocaleString()}</strong></div>
            <div>Encoding: <strong className="font-mono text-[#57534e] dark:text-[#a8a29e]">Index Pointer Pairs</strong></div>
            <div>Non-zero Elements: <strong className="font-mono text-[#2d4a3e] dark:text-[#76a992]">~120 / doc</strong></div>
            <div className="pt-1 border-t border-[#eeebe3] dark:border-[#2b2e34]">
              RAM: <strong className="text-[#57534e] dark:text-[#a8a29e] font-mono text-sm">{sparseBowMb} MB</strong>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            3. Continuous Embedding
          </span>
          <div className="space-y-1.5 text-[#57534e] dark:text-[#a8a29e] text-xs">
            <div>Vector Length: <strong className="font-mono text-[#1c1917] dark:text-[#f5f2ea]">{denseDim}</strong></div>
            <div>Sparsity: <strong className="text-[#2d4a3e] dark:text-[#76a992] font-mono">0% (Every value active)</strong></div>
            <div>Geometric Overlap: <strong className="font-mono text-[#2d4a3e] dark:text-[#76a992]">Cosine Angle Sim</strong></div>
            <div className="pt-1 border-t border-[#eeebe3] dark:border-[#2b2e34]">
              RAM: <strong className="text-[#2d4a3e] dark:text-[#76a992] font-mono text-sm">{denseMb} MB</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
