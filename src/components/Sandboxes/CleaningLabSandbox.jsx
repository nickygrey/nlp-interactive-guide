import React, { useState } from 'react';

const STOPWORDS_SET = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "was", "are", "of"]);

export default function CleaningLabSandbox() {
  const [rawText, setRawText] = useState("<p>Great deals!!</p> Get 50% off right now at http://shop.com #MegaSale! 🚀 :)");
  const [opts, setOpts] = useState({
    html: true,
    lower: true,
    punct: true,
    urls: true,
    stopwords: true
  });

  const toggle = (key) => setOpts(prev => ({ ...prev, [key]: !prev[key] }));

  // Clean execution
  let processed = rawText;
  if (opts.html) processed = processed.replace(/<[^>]+>/g, " ");
  if (opts.urls) processed = processed.replace(/https?:\/\/\S+|#\S+|@\S+/g, " ");
  if (opts.lower) processed = processed.toLowerCase();
  if (opts.punct) processed = processed.replace(/[^a-z0-9\s]/g, " ");
  processed = processed.replace(/\s+/g, " ").trim();

  let tokens = processed.split(" ").filter(w => w.length > 0);
  const initialTokenCount = rawText.trim().split(/\s+/).length;

  if (opts.stopwords) {
    tokens = tokens.filter(t => !STOPWORDS_SET.has(t));
  }

  const finalOutput = tokens.join(" ");
  const reduction = initialTokenCount > 0 ? Math.round(((initialTokenCount - tokens.length) / initialTokenCount) * 100) : 0;

  return (
    <div className="space-y-4 text-xs font-sans">
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Uncleaned Raw Text (Try editing it):
        </label>
        <input
          type="text"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { key: 'html', label: 'Strip HTML Tags (<p>, <b>)' },
          { key: 'urls', label: 'Remove URLs & Hashtags' },
          { key: 'lower', label: 'Convert to Lowercase' },
          { key: 'punct', label: 'Strip Punctuation & Emojis' },
          { key: 'stopwords', label: 'Remove Common Stopwords' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] cursor-pointer text-[#57534e] dark:text-[#a8a29e] hover:border-[#b85d38]/40 transition">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={() => toggle(key)}
              className="rounded accent-[#b85d38]"
            />
            <span className="font-mono text-[11px]">{label}</span>
          </label>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
          <span className="font-mono text-xs font-semibold text-[#2d4a3e] dark:text-[#4d7a66]">
            Cleaned Output:
          </span>
          <span className="text-[#2d4a3e] dark:text-[#76a992] font-mono text-xs font-semibold">
            {reduction}% of noise removed
          </span>
        </div>
        <div className="p-3 bg-[#fbfaf8] dark:bg-[#141618] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-[#2d4a3e] dark:text-[#76a992] text-xs break-all">
          {finalOutput || "(empty)"}
        </div>
        <p className="text-[11px] text-[#8c887b] dark:text-[#78716c] font-mono">
          Reduced from {initialTokenCount} messy tokens down to {tokens.length} clean, meaningful words.
        </p>
      </div>
    </div>
  );
}
