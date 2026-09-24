import React, { useState } from 'react';

const EXAMPLES = [
  {
    sentence: "We saw her duck.",
    interp1: {
      meaning: "Interpretation 1: Her Pet Bird",
      structure: "[Subject: We] [Verb: saw] [Object: her duck (a bird owned by her)]",
      badge: "Pet Animal"
    },
    interp2: {
      meaning: "Interpretation 2: She Crouched Down",
      structure: "[Subject: We] [Verb: saw] [Action: her (person) duck (quickly crouch to avoid an obstacle)]",
      badge: "Physical Action"
    },
    lesson: "The word 'duck' can be a noun (a waterfowl) or an action verb (crouching down). Without context, a computer can't tell which one you mean."
  },
  {
    sentence: "Time flies like an arrow; fruit flies like a banana.",
    interp1: {
      meaning: "First Part: Time passes quickly",
      structure: "[Noun: Time] [Verb: flies] [Comparison: like an arrow]",
      badge: "Metaphor"
    },
    interp2: {
      meaning: "Second Part: Insects enjoy fruit",
      structure: "[Compound Noun: fruit flies] [Verb: like (enjoy)] [Object: a banana]",
      badge: "Literal Biology"
    },
    lesson: "Notice how 'flies' flips from an action verb to a bug, and 'like' flips from a comparison preposition to an enjoyment verb mid-sentence!"
  },
  {
    sentence: "I saw the man with a telescope.",
    interp1: {
      meaning: "Interpretation 1: I used a telescope",
      structure: "I used a telescope to look at the man.",
      badge: "Viewing Tool"
    },
    interp2: {
      meaning: "Interpretation 2: The man was holding a telescope",
      structure: "The man was holding or carrying a telescope when I saw him.",
      badge: "His Possession"
    },
    lesson: "Who has the telescope? In grammar, this is called prepositional phrase attachment—a sentence structure that can attach to the verb or the noun."
  }
];

export default function AmbiguitySandbox() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeEx = EXAMPLES[selectedIdx];

  return (
    <div className="space-y-4 text-xs font-sans">
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`px-3 py-1.5 rounded-lg border font-mono transition text-xs ${
              selectedIdx === i
                ? 'bg-[#1c1917] text-[#fbfaf8] border-[#1c1917] dark:bg-[#f5f2ea] dark:text-[#1c1917] dark:border-[#f5f2ea] font-medium'
                : 'bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] border-[#e5e2da] dark:border-[#2e3238]'
            }`}
          >
            "{ex.sentence}"
          </button>
        ))}
      </div>

      <div className="p-5 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeebe3] dark:border-[#2b2e34]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">Sentence to Analyze:</span>
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea]">"{activeEx.sentence}"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
            <div className="flex items-center justify-between">
              <strong className="text-[#1c1917] dark:text-[#f5f2ea] font-serif">{activeEx.interp1.meaning}</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] font-mono border border-[#ebe7de] dark:border-[#2e3238]">
                {activeEx.interp1.badge}
              </span>
            </div>
            <code className="block p-2.5 bg-white dark:bg-[#1c1e21] rounded border border-[#e5e2da] dark:border-[#2e3238] text-[11px] text-[#57534e] dark:text-[#a8a29e] font-mono leading-relaxed">
              {activeEx.interp1.structure}
            </code>
          </div>

          <div className="p-3.5 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
            <div className="flex items-center justify-between">
              <strong className="text-[#1c1917] dark:text-[#f5f2ea] font-serif">{activeEx.interp2.meaning}</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] font-mono border border-[#ebe7de] dark:border-[#2e3238]">
                {activeEx.interp2.badge}
              </span>
            </div>
            <code className="block p-2.5 bg-white dark:bg-[#1c1e21] rounded border border-[#e5e2da] dark:border-[#2e3238] text-[11px] text-[#57534e] dark:text-[#a8a29e] font-mono leading-relaxed">
              {activeEx.interp2.structure}
            </code>
          </div>
        </div>

        <div className="p-3 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] text-xs text-[#57534e] dark:text-[#a8a29e]">
          <strong className="text-[#1c1917] dark:text-[#f5f2ea] font-mono uppercase text-[10px] block mb-0.5">Why this is tricky for computers:</strong>
          {activeEx.lesson}
        </div>
      </div>
    </div>
  );
}
