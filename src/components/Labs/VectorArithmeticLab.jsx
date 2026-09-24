import React, { useState } from 'react';
import { Compass, Sparkles, Plus, Minus, ArrowRight, BookOpen, Layers } from 'lucide-react';

// Latent dimensional features:
// [0: royalty, 1: feminine, 2: capital_city, 3: geography_nation, 4: comparative, 5: verb_continuous, 6: animal_juvenile, 7: temperature_cold]
const VOCABULARY = {
  // Royalty & Gender
  king:     [0.95, -0.85, 0.05, 0.02, 0.00, 0.00, 0.00, 0.00],
  man:      [0.05, -0.92, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  woman:    [0.05,  0.92, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  queen:    [0.96,  0.88, 0.04, 0.01, 0.00, 0.00, 0.00, 0.00],
  princess: [0.85,  0.90, 0.02, 0.00, 0.00, 0.00, 0.00, 0.00],
  prince:   [0.85, -0.88, 0.02, 0.00, 0.00, 0.00, 0.00, 0.00],
  monarch:  [0.92,  0.02, 0.05, 0.02, 0.00, 0.00, 0.00, 0.00],

  // Geography & Capitals
  paris:    [0.05,  0.00, 0.95, 0.15, 0.00, 0.00, 0.00, 0.00],
  france:   [0.02,  0.00, 0.12, 0.96, 0.00, 0.00, 0.00, 0.00],
  japan:    [0.02,  0.00, 0.10, 0.95, 0.00, 0.00, 0.00, 0.00],
  tokyo:    [0.05,  0.00, 0.94, 0.18, 0.00, 0.00, 0.00, 0.00],
  london:   [0.05,  0.00, 0.93, 0.16, 0.00, 0.00, 0.00, 0.00],
  england:  [0.02,  0.00, 0.11, 0.94, 0.00, 0.00, 0.00, 0.00],
  rome:     [0.05,  0.00, 0.91, 0.14, 0.00, 0.00, 0.00, 0.00],
  italy:    [0.02,  0.00, 0.10, 0.95, 0.00, 0.00, 0.00, 0.00],

  // Comparatives
  bigger:   [0.00,  0.00, 0.00, 0.00, 0.94, 0.00, 0.00, 0.00],
  big:      [0.00,  0.00, 0.00, 0.00, 0.10, 0.00, 0.00, 0.00],
  cold:     [0.00,  0.00, 0.00, 0.00, 0.10, 0.00, 0.00, 0.88],
  colder:   [0.00,  0.00, 0.00, 0.00, 0.93, 0.00, 0.00, 0.89],
  small:    [0.00,  0.00, 0.00, 0.00, 0.10, 0.00, 0.00, 0.00],
  smaller:  [0.00,  0.00, 0.00, 0.00, 0.92, 0.00, 0.00, 0.00],

  // Verb Tenses
  walking:  [0.00,  0.00, 0.00, 0.00, 0.00, 0.95, 0.00, 0.00],
  walk:     [0.00,  0.00, 0.00, 0.00, 0.00, 0.08, 0.00, 0.00],
  swim:     [0.00,  0.00, 0.00, 0.00, 0.00, 0.08, 0.00, 0.00],
  swimming: [0.00,  0.00, 0.00, 0.00, 0.00, 0.94, 0.00, 0.00],

  // Young Animals
  puppy:    [0.00,  0.00, 0.00, 0.00, 0.00, 0.00, 0.94, 0.00],
  dog:      [0.00,  0.00, 0.00, 0.00, 0.00, 0.00, 0.10, 0.00],
  cat:      [0.00,  0.00, 0.00, 0.00, 0.00, 0.00, 0.10, 0.00],
  kitten:   [0.00,  0.00, 0.00, 0.00, 0.00, 0.00, 0.93, 0.00]
};

const PRESET_EQUATIONS = [
  {
    title: "Gender & Royalty",
    wordA: "king",
    wordB: "man",
    wordC: "woman",
    expected: "queen",
    note: "Subtracting masculinity and adding femininity transforms monarch into Queen."
  },
  {
    title: "Capital Cities",
    wordA: "paris",
    wordB: "france",
    wordC: "japan",
    expected: "tokyo",
    note: "Subtracting the nation isolates the 'capital city' vector and projects it onto Japan."
  },
  {
    title: "Comparative Adjectives",
    wordA: "bigger",
    wordB: "big",
    wordC: "cold",
    expected: "colder",
    note: "Isolates the linguistic comparative suffix '-er' and applies it to temperature."
  },
  {
    title: "Verb Continuous Tense",
    wordA: "walking",
    wordB: "walk",
    wordC: "swim",
    expected: "swimming",
    note: "Isolates the grammatical '-ing' continuous aspect vector."
  },
  {
    title: "Juvenile Animals",
    wordA: "puppy",
    wordB: "dog",
    wordC: "cat",
    expected: "kitten",
    note: "Extracts the 'young offspring' semantic dimension."
  }
];

function cosineSimilarity(v1, v2) {
  let dot = 0, m1 = 0, m2 = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
    m1 += v1[i] * v1[i];
    m2 += v2[i] * v2[i];
  }
  if (m1 === 0 || m2 === 0) return 0;
  return dot / (Math.sqrt(m1) * Math.sqrt(m2));
}

export default function VectorArithmeticLab() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [wordA, setWordA] = useState(PRESET_EQUATIONS[0].wordA);
  const [wordB, setWordB] = useState(PRESET_EQUATIONS[0].wordB);
  const [wordC, setWordC] = useState(PRESET_EQUATIONS[0].wordC);

  const preset = PRESET_EQUATIONS[selectedPresetIdx];

  const handleSelectPreset = (idx) => {
    setSelectedPresetIdx(idx);
    setWordA(PRESET_EQUATIONS[idx].wordA);
    setWordB(PRESET_EQUATIONS[idx].wordB);
    setWordC(PRESET_EQUATIONS[idx].wordC);
  };

  // Compute resulting vector: Vector(A) - Vector(B) + Vector(C)
  const computeResult = () => {
    const vA = VOCABULARY[wordA] || new Array(8).fill(0);
    const vB = VOCABULARY[wordB] || new Array(8).fill(0);
    const vC = VOCABULARY[wordC] || new Array(8).fill(0);

    const resultVec = [];
    for (let i = 0; i < 8; i++) {
      resultVec.push(vA[i] - vB[i] + vC[i]);
    }

    // Rank vocabulary by cosine similarity
    const candidates = Object.keys(VOCABULARY).map(word => {
      // Exclude the inputs themselves from nearest neighbors to see true analogy target
      const sim = cosineSimilarity(resultVec, VOCABULARY[word]);
      return {
        word,
        similarity: sim,
        isInput: [wordA, wordB, wordC].includes(word)
      };
    })
    .filter(c => !c.isInput)
    .sort((a, b) => b.similarity - a.similarity);

    return {
      vector: resultVec,
      topNeighbors: candidates.slice(0, 4)
    };
  };

  const { vector, topNeighbors } = computeResult();

  return (
    <div className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
          <Compass className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span>Specialized Lab • Word2Vec Geometry & Distributional Semantics</span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          Semantic Vector Arithmetic Playground
        </h3>
        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
          Witness Tomás Mikolov's historic 2013 discovery: how neural embeddings organize human concepts into linear geometric translations where meaning can be added and subtracted like numbers.
        </p>
      </div>

      {/* Preset Analogy Selectors */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#78716c]">
          Classic Linguistic Analogies:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_EQUATIONS.map((eq, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 border ${
                selectedPresetIdx === idx
                  ? 'border-[#2d4a3e] bg-[#2d4a3e] text-white font-semibold dark:bg-[#4d7a66] dark:border-[#4d7a66]'
                  : 'border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#181a1d] hover:bg-[#f2efe9] text-[#57534e] dark:text-[#a8a29e]'
              }`}
            >
              <span>{eq.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The Equation Display Box */}
      <div className="p-5 sm:p-7 rounded-xl bg-[#fbfaf8] dark:bg-[#16181b] border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#8c887b] text-center">
          Active Vector Equation
        </div>

        {/* Math Visual Expression */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-center py-2">
          
          {/* Word A */}
          <div className="px-4 py-2.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] shadow-sm">
            <span className="text-[10px] font-mono text-[#8c887b] block uppercase">Vector A</span>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea] capitalize">
              {wordA}
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-[#f0ede6] dark:bg-[#202327] flex items-center justify-center text-[#b85d38] font-bold">
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </div>

          {/* Word B */}
          <div className="px-4 py-2.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] shadow-sm">
            <span className="text-[10px] font-mono text-[#8c887b] block uppercase">Vector B</span>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea] capitalize">
              {wordB}
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-[#f0ede6] dark:bg-[#202327] flex items-center justify-center text-[#2d4a3e] font-bold">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>

          {/* Word C */}
          <div className="px-4 py-2.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] shadow-sm">
            <span className="text-[10px] font-mono text-[#8c887b] block uppercase">Vector C</span>
            <span className="font-serif text-lg sm:text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea] capitalize">
              {wordC}
            </span>
          </div>

          <div className="font-mono text-xl text-[#8c887b] px-1">=</div>

          {/* Solved Target (Top Nearest Neighbor) */}
          <div className="px-5 py-2.5 rounded-lg border-2 border-[#b85d38] bg-[#faece6] dark:bg-[#341d18] shadow-sm">
            <span className="text-[10px] font-mono text-[#b85d38] dark:text-[#e08968] block uppercase font-semibold">
              Nearest Neighbor
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#b85d38] dark:text-[#e08968] capitalize">
              {topNeighbors[0]?.word || "..."}
            </span>
          </div>
        </div>

        <p className="text-center font-serif italic text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] pt-1">
          "{preset.note}"
        </p>
      </div>

      {/* Geometry Parallelogram & Nearest Neighbors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        
        {/* Left: Geometric Parallelogram Diagram */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#181a1d] space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <span className="font-mono text-[11px] text-[#1c1917] dark:text-[#f5f2ea] font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2d4a3e]" />
              Geometric Translation Parallelogram
            </span>
            <span className="font-mono text-[10px] text-[#8c887b]">2D Subspace</span>
          </div>

          {/* SVG Diagram */}
          <div className="w-full h-44 bg-white dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] flex items-center justify-center p-3 relative select-none">
            <svg viewBox="0 0 320 160" className="w-full h-full">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#b85d38" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2d4a3e" />
                </marker>
              </defs>

              {/* Dashed parallelogram guidelines */}
              <line x1="50" y1="120" x2="140" y2="40" stroke="#d5d0c7" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="180" y1="120" x2="270" y2="40" stroke="#d5d0c7" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Horizontal translation arrows */}
              {/* Bottom: B -> C */}
              <line x1="60" y1="120" x2="170" y2="120" stroke="#2d4a3e" strokeWidth="2" markerEnd="url(#arrow-green)" />
              {/* Top: A -> Result */}
              <line x1="150" y1="40" x2="260" y2="40" stroke="#b85d38" strokeWidth="2.5" markerEnd="url(#arrow)" />

              {/* Points */}
              {/* Word B */}
              <circle cx="50" cy="120" r="5" fill="#2d4a3e" />
              <text x="50" y="142" fontSize="11" fontFamily="Newsreader" textAnchor="middle" fill="#1c1917" fontWeight="bold">
                {wordB}
              </text>

              {/* Word C */}
              <circle cx="180" cy="120" r="5" fill="#2d4a3e" />
              <text x="180" y="142" fontSize="11" fontFamily="Newsreader" textAnchor="middle" fill="#1c1917" fontWeight="bold">
                {wordC}
              </text>

              {/* Word A */}
              <circle cx="140" cy="40" r="5" fill="#b85d38" />
              <text x="135" y="25" fontSize="11" fontFamily="Newsreader" textAnchor="middle" fill="#1c1917" fontWeight="bold">
                {wordA}
              </text>

              {/* Result Target */}
              <circle cx="270" cy="40" r="6" fill="#b85d38" />
              <text x="270" y="25" fontSize="12" fontFamily="Newsreader" textAnchor="middle" fill="#b85d38" fontWeight="bold">
                {topNeighbors[0]?.word} ✦
              </text>

              {/* Direction label */}
              <text x="205" y="32" fontSize="9" fontFamily="JetBrains Mono" fill="#b85d38" textAnchor="middle">
                + Translation
              </text>
            </svg>
          </div>

          <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
            The vector pointing from <strong className="text-[#1c1917] dark:text-[#f5f2ea]">{wordB}</strong> to <strong className="text-[#1c1917] dark:text-[#f5f2ea]">{wordC}</strong> encodes a pure semantic transformation. Adding this exact shift to <strong className="text-[#1c1917] dark:text-[#f5f2ea]">{wordA}</strong> points directly at <strong className="text-[#b85d38] dark:text-[#d97753]">{topNeighbors[0]?.word}</strong>.
          </p>
        </div>

        {/* Right: Ranked Cosine Similarity Neighbors */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#181a1d] space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <span className="font-mono text-[11px] text-[#1c1917] dark:text-[#f5f2ea] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b85d38]" />
              Top Nearest Neighbors in Vocabulary
            </span>
            <span className="font-mono text-[10px] text-[#8c887b]">Cosine Distance</span>
          </div>

          <div className="space-y-2 pt-1">
            {topNeighbors.map((candidate, idx) => {
              const pct = Math.max(0, Math.min(100, Math.round(candidate.similarity * 100)));
              const isTop = idx === 0;

              return (
                <div
                  key={candidate.word}
                  className={`p-2.5 rounded-lg border transition ${
                    isTop
                      ? 'bg-white dark:bg-[#1c1e21] border-[#b85d38]/50 shadow-sm'
                      : 'bg-white/60 dark:bg-[#16181b] border-[#e5e2da] dark:border-[#2e3238]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#8c887b]">#{idx + 1}</span>
                      <span className={`font-serif text-sm capitalize ${isTop ? 'font-bold text-[#b85d38] dark:text-[#e08968]' : 'text-[#1c1917] dark:text-[#f5f2ea]'}`}>
                        {candidate.word}
                      </span>
                      {isTop && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#faece6] dark:bg-[#341d18] text-[#b85d38] dark:text-[#e08968]">
                          Target Match
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-[#57534e] dark:text-[#a8a29e]">
                      {candidate.similarity.toFixed(3)} ({pct}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#eeebe3] dark:bg-[#2b2e34] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${isTop ? 'bg-[#b85d38]' : 'bg-[#2d4a3e]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 rounded-lg bg-[#eeebe3]/50 dark:bg-[#202327] border border-[#e5e2da] dark:border-[#2e3238] text-[10px] font-mono text-[#57534e] dark:text-[#a8a29e] flex items-center justify-between">
            <span>Cosine Formula:</span>
            <span>{"cos(θ) = (u · v) / (||u|| × ||v||)"}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
