import React, { useState } from 'react';

const SENTENCE_A = {
  text: "The animal didn't cross the street because it was too tired.",
  tokens: ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired", "."],
  targetIdx: 7, // "it"
  weights: { "animal": 0.88, "tired": 0.65, "street": 0.12, "cross": 0.25 },
  resolution: "The model pays 88% attention to 'animal' because tiredness is a physical biological state of animals."
};

const SENTENCE_B = {
  text: "The animal didn't cross the street because it was too wide.",
  tokens: ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "wide", "."],
  targetIdx: 7, // "it"
  weights: { "street": 0.92, "wide": 0.70, "animal": 0.08, "cross": 0.20 },
  resolution: "The model pays 92% attention to 'street' because width is a spatial property of roads."
};

export default function TransformerAttentionSandbox() {
  const [selectedCase, setSelectedCase] = useState('A');
  const activeData = selectedCase === 'A' ? SENTENCE_A : SENTENCE_B;

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCase('A')}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition ${
            selectedCase === 'A'
              ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
              : 'bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
          }`}
        >
          Sentence 1: "...because it was too tired"
        </button>
        <button
          onClick={() => setSelectedCase('B')}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs transition ${
            selectedCase === 'B'
              ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
              : 'bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
          }`}
        >
          Sentence 2: "...because it was too wide"
        </button>
      </div>

      <div className="p-5 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea]">
            Self-Attention: What does the pronoun <strong className="font-mono text-[#b85d38] dark:text-[#d97753]">"it"</strong> connect to?
          </span>
          <span className="text-[10px] font-mono text-[#8c887b] dark:text-[#a6a197]">Attention Weights</span>
        </div>

        <div className="flex flex-wrap gap-2 p-3 bg-[#fbfaf8] dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] items-center">
          {activeData.tokens.map((tok, i) => {
            const isTarget = i === activeData.targetIdx;
            const weight = activeData.weights[tok] || 0.05;

            let tokenStyle = "bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]";
            if (isTarget) {
              tokenStyle = "bg-[#faece6] text-[#b85d38] border-[#b85d38]/50 font-bold dark:bg-[#382723] dark:text-[#d97753]";
            } else if (weight > 0.4) {
              tokenStyle = "bg-[#e8efe9] text-[#2d4a3e] border-[#2d4a3e]/40 font-bold dark:bg-[#22352c] dark:text-[#76a992]";
            }

            return (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-md font-mono text-xs transition ${tokenStyle}`}
                title={`Attention Weight: ${Math.round(weight * 100)}%`}
              >
                {tok}
              </span>
            );
          })}
        </div>

        <div className="p-3 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] space-y-1">
          <div className="font-mono text-xs text-[#2d4a3e] dark:text-[#76a992] font-semibold flex items-center gap-1.5">
            <span>✦</span>
            <span>How Self-Attention Disambiguates Meaning:</span>
          </div>
          <p className="text-[#57534e] dark:text-[#a8a29e] text-xs leading-relaxed">
            {activeData.resolution}
          </p>
        </div>
      </div>
    </div>
  );
}
