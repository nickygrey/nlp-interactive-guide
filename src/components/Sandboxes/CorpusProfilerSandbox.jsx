import React, { useState } from 'react';

const PRESETS = [
  { label: "Tech News", text: "Natural language processing helps computers read text and understand human intent. Machine learning models learn patterns from text datasets. Large language models process billions of words to answer questions." },
  { label: "Medical Note", text: "The patient presented with acute asthma symptoms and persistent coughing. Clinical evaluation revealed respiratory inflammation. Treatment with bronchodilators alleviated the acute symptoms." },
  { label: "Customer Review", text: "The battery life on this phone is truly fantastic! It lasts two full days on a single charge and charges up super fast. Highly recommended for anyone who travels." }
];

export default function CorpusProfilerSandbox() {
  const [corpus, setCorpus] = useState(PRESETS[0].text);

  // Compute stats
  const tokens = corpus.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
  const sentences = corpus.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const freqMap = {};
  tokens.forEach(t => freqMap[t] = (freqMap[t] || 0) + 1);

  const uniqueVocab = Object.keys(freqMap).length;
  const totalTokens = tokens.length;
  const ttr = totalTokens > 0 ? (uniqueVocab / totalTokens).toFixed(2) : "0.00";

  const sortedFreq = Object.entries(freqMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCount = sortedFreq.length > 0 ? sortedFreq[0][1] : 1;

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
          Sample Text to Analyze (Click a preset or edit below):
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setCorpus(p.text)}
              className="px-2.5 py-1 rounded-md border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] transition text-[11px] font-mono"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={3}
        value={corpus}
        onChange={(e) => setCorpus(e.target.value)}
        className="w-full p-3 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea] font-mono">{totalTokens}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider font-mono">Total Words</span>
        </div>
        <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#2d4a3e] dark:text-[#4d7a66] font-mono">{uniqueVocab}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider font-mono">Unique Words</span>
        </div>
        <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#b85d38] dark:text-[#d97753] font-mono">{ttr}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider font-mono">Diversity Ratio</span>
        </div>
        <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#57534e] dark:text-[#a8a29e] font-mono">{sentences.length}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase tracking-wider font-mono">Sentences</span>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-2.5">
        <span className="font-serif text-xs font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
          Most Common Words (Zipf's Law in Action):
        </span>
        <div className="space-y-1.5">
          {sortedFreq.map(([word, count]) => {
            const pct = Math.round((count / maxCount) * 100);
            return (
              <div key={word} className="flex items-center gap-2">
                <span className="w-24 font-mono text-[11px] text-right truncate text-[#57534e] dark:text-[#a8a29e]">"{word}"</span>
                <div className="flex-1 bg-[#f6f4ee] dark:bg-[#24272c] h-3 rounded-full overflow-hidden border border-[#ebe7de] dark:border-[#2e3238]">
                  <div className="bg-[#2d4a3e] dark:bg-[#4d7a66] h-full rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="w-10 text-[11px] text-[#8c887b] dark:text-[#78716c] font-mono text-right">{count}x</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
