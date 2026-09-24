import React, { useState } from 'react';

const ENTITY_PATTERNS = [
  { label: "PERSON", regex: /\b(Satya Nadella|Elon Musk|Sundar Pichai|Steve Jobs|Sam Altman|Ada Lovelace)\b/gi, color: "bg-[#faece6] text-[#b85d38] border-[#b85d38]/30 dark:bg-[#382723] dark:text-[#d97753]" },
  { label: "ORG", regex: /\b(Microsoft|Google|Apple|Nuance|OpenAI|DeepMind|Tesla|Nokia)\b/gi, color: "bg-[#edf2f7] text-[#2c3e50] border-[#d2dce6] dark:bg-[#1e2730] dark:text-[#8ba4be]" },
  { label: "LOCATION", regex: /\b(Seattle|London|Stockholm|Copenhagen|Oslo|Paris|Tokyo|Chicago)\b/gi, color: "bg-[#e8efe9] text-[#2d4a3e] border-[#2d4a3e]/30 dark:bg-[#22352c] dark:text-[#76a992]" },
  { label: "DATE", regex: /\b(Monday|Tuesday|yesterday|today|next Friday|in 2026)\b/gi, color: "bg-[#f7f2e7] text-[#825e24] border-[#e8dcc4] dark:bg-[#2e291f] dark:text-[#d4af66]" },
  { label: "MONEY", regex: /\$\d+(\.\d+)?\s*(billion|million)?/gi, color: "bg-[#f6f4ee] text-[#1c1917] border-[#ebe7de] dark:bg-[#24272c] dark:text-[#f5f2ea]" }
];

export default function NERHighlighterSandbox() {
  const [text, setText] = useState("Satya Nadella announced Microsoft acquired Nuance in Seattle on Monday for $19 billion.");

  let highlighted = text;
  const entitiesFound = [];

  ENTITY_PATTERNS.forEach(p => {
    highlighted = highlighted.replace(p.regex, (match) => {
      entitiesFound.push({ text: match, label: p.label });
      return `<mark class="px-2 py-0.5 rounded border ${p.color} font-medium mx-0.5 inline-flex items-center gap-1">${match} <span class="text-[9px] uppercase tracking-wider font-mono opacity-80">${p.label}</span></mark>`;
    });
  });

  const words = text.split(/\s+/);

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Type or edit any sentence to extract entities:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
        <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
          Detected Real-World Entities (People, Companies, Places, Money):
        </span>
        <div
          dangerouslySetInnerHTML={{ __html: highlighted }}
          className="p-3.5 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] leading-loose text-xs sm:text-sm font-sans text-[#1c1917] dark:text-[#f5f2ea]"
        />

        <div className="overflow-x-auto rounded-lg border border-[#e5e2da] dark:border-[#2e3238] mt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] p-2.5 block bg-[#fbfaf8] dark:bg-[#141618] border-b border-[#e5e2da] dark:border-[#2e3238]">
            How the Computer Tags Each Word (Beginning, Inside, Outside):
          </span>
          <table className="w-full text-left font-mono text-xs">
            <tbody className="divide-y divide-[#eeebe3] dark:divide-[#2b2e34]">
              {words.map((w, i) => {
                let tag = 'O';
                entitiesFound.forEach(ent => {
                  if (ent.text.includes(w)) {
                    tag = ent.text.startsWith(w) ? `B-${ent.label}` : `I-${ent.label}`;
                  }
                });
                return (
                  <tr key={i} className="hover:bg-[#fbfaf8] dark:hover:bg-[#181a1d]">
                    <td className="p-2 text-[#1c1917] dark:text-[#f5f2ea] pl-3">{w}</td>
                    <td className={`p-2 ${tag !== 'O' ? 'font-semibold text-[#b85d38] dark:text-[#d97753]' : 'text-[#8c887b] dark:text-[#78716c]'}`}>
                      {tag}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
