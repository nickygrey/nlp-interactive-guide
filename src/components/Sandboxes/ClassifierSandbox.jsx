import React, { useState } from 'react';

const SPAM_TRIGGERS = [
  { word: "free", weight: 2.0 },
  { word: "prize", weight: 2.5 },
  { word: "cash", weight: 2.0 },
  { word: "winner", weight: 2.5 },
  { word: "urgent", weight: 1.8 },
  { word: "claim", weight: 1.9 },
  { word: "$", weight: 1.5 },
  { word: "congratulations", weight: 2.2 },
  { word: "bonus", weight: 1.8 }
];

export default function ClassifierSandbox() {
  const [text, setText] = useState("Congratulations! You won a $1,000 gift certificate. Call urgently to claim your free reward.");

  const lower = text.toLowerCase();
  let logOdds = -1.2; // Prior bias toward ham
  const matched = [];

  SPAM_TRIGGERS.forEach(item => {
    if (lower.includes(item.word)) {
      logOdds += item.weight;
      matched.push(item);
    }
  });

  const probSpam = Math.min(0.99, Math.max(0.01, 1 / (1 + Math.exp(-logOdds))));
  const pctSpam = Math.round(probSpam * 100);
  const isSpam = probSpam >= 0.5;

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Type or test an incoming email:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            Classifier Prediction:
          </span>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full font-mono text-xs font-semibold ${
              isSpam 
                ? 'bg-[#fbeeed] text-[#b83838] border border-[#b83838]/30 dark:bg-[#382323] dark:text-[#e07575]' 
                : 'bg-[#e8efe9] text-[#2d4a3e] border border-[#2d4a3e]/30 dark:bg-[#22352c] dark:text-[#76a992]'
            }`}>
              {isSpam ? 'Flagged as Spam' : 'Normal Email (Inbox)'}
            </span>
            <span className="text-[#57534e] dark:text-[#a8a29e] font-mono text-xs">
              {isSpam ? `${pctSpam}% Spam Confidence` : `${100 - pctSpam}% Normal Confidence`}
            </span>
          </div>

          <div className="w-full bg-[#f6f4ee] dark:bg-[#24272c] h-2 rounded-full overflow-hidden flex border border-[#ebe7de] dark:border-[#2e3238]">
            <div className="bg-[#b83838] dark:bg-[#e07575] h-full transition-all duration-300" style={{ width: `${pctSpam}%` }}></div>
            <div className="bg-[#2d4a3e] dark:bg-[#4d7a66] h-full transition-all duration-300" style={{ width: `${100 - pctSpam}%` }}></div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            Trigger Words Detected:
          </span>
          <div className="space-y-1">
            {matched.length > 0 ? matched.map((item, i) => (
              <div key={i} className="flex justify-between font-mono text-xs text-[#57534e] dark:text-[#a8a29e]">
                <span>"{item.word}"</span>
                <span className="text-[#b85d38] dark:text-[#d97753]">Spam Weight: +{item.weight.toFixed(1)}</span>
              </div>
            )) : (
              <span className="text-[#8c887b] dark:text-[#78716c] italic font-serif">No spam trigger keywords found.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
