import React, { useState } from 'react';

const POSITIVE = ["amazing", "great", "good", "love", "loved", "excellent", "superb", "fast", "helpful", "delighted", "exceptional", "calm", "fantastic"];
const NEGATIVE = ["bad", "terrible", "awful", "hate", "hated", "slow", "horrible", "broken", "unhelpful", "poor", "rude", "cluttered"];
const NEGATORS = ["not", "never", "no", "hardly", "barely", "wasn't", "isn't", "didn't"];

export default function SentimentGaugeSandbox() {
  const [text, setText] = useState("The battery life is fantastic, but the customer support desk was not helpful.");

  const tokens = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
  let score = 0;
  const chips = [];
  const explanations = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const prev1 = i > 0 ? tokens[i - 1] : "";
    const isNegated = NEGATORS.includes(prev1);

    if (POSITIVE.includes(token)) {
      if (isNegated) {
        score -= 1.0;
        chips.push({ text: `${prev1} ${token} (-1.0)`, color: "bg-[#fbeeed] text-[#b83838] border-[#b83838]/30 dark:bg-[#382323] dark:text-[#e07575]" });
        explanations.push(`Negation detected: '${prev1} ${token}' flipped positive to negative.`);
      } else {
        score += 1.0;
        chips.push({ text: `${token} (+1.0)`, color: "bg-[#e8efe9] text-[#2d4a3e] border-[#2d4a3e]/30 dark:bg-[#22352c] dark:text-[#76a992]" });
      }
    } else if (NEGATIVE.includes(token)) {
      if (isNegated) {
        score += 0.5;
        chips.push({ text: `${prev1} ${token} (+0.5)`, color: "bg-[#e8efe9] text-[#2d4a3e] border-[#2d4a3e]/30 dark:bg-[#22352c] dark:text-[#76a992]" });
        explanations.push(`Softened negative: '${prev1} ${token}' neutralized the complaint.`);
      } else {
        score -= 1.0;
        chips.push({ text: `${token} (-1.0)`, color: "bg-[#fbeeed] text-[#b83838] border-[#b83838]/30 dark:bg-[#382323] dark:text-[#e07575]" });
      }
    }
  }

  const normalized = Math.max(-1.0, Math.min(1.0, score / 2.0));
  const isPos = normalized > 0.15;
  const isNeg = normalized < -0.15;

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Type or edit any customer review:
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] flex flex-col items-center justify-center text-center space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
            Overall Sentiment Score
          </span>
          <div className={`text-3xl font-serif font-medium ${isPos ? 'text-[#2d4a3e] dark:text-[#76a992]' : isNeg ? 'text-[#b83838] dark:text-[#e07575]' : 'text-[#8c887b]'}`}>
            {(normalized > 0 ? "+" : "") + normalized.toFixed(2)}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
            isPos ? 'bg-[#e8efe9] text-[#2d4a3e] dark:bg-[#22352c] dark:text-[#76a992]' :
            isNeg ? 'bg-[#fbeeed] text-[#b83838] dark:bg-[#382323] dark:text-[#e07575]' :
            'bg-[#f6f4ee] text-[#57534e] dark:bg-[#24272c] dark:text-[#a8a29e]'
          }`}>
            {isPos ? 'Positive Mood' : isNeg ? 'Negative / Frustrated' : 'Mixed / Neutral'}
          </span>
        </div>

        <div className="sm:col-span-2 p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
          <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
            How the Computer Scored Each Word:
          </span>
          <div className="flex flex-wrap gap-1.5 min-h-[36px]">
            {chips.length > 0 ? chips.map((c, i) => (
              <span key={i} className={`px-2 py-0.5 rounded border font-mono text-xs ${c.color}`}>
                {c.text}
              </span>
            )) : (
              <span className="text-[#8c887b] dark:text-[#78716c] italic font-serif">No strong emotional words detected in this sentence.</span>
            )}
          </div>
          {explanations.length > 0 && (
            <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] border-t border-[#eeebe3] dark:border-[#2b2e34] pt-2 leading-relaxed">
              {explanations.join(" ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
