import React, { useState } from 'react';
import { Layers, RefreshCw } from 'lucide-react';

const SPAM_KEYWORDS = ["free", "bonus", "prize", "cash", "urgent", "call", "winner", "$"];

export default function InteractivePipelineBuilder() {
  const [inputMsg, setInputMsg] = useState("URGENT: Claim your free $1,000 cash prize today! Call now.");
  const [activeStep, setActiveStep] = useState(4); // 0 to 4

  // Pipeline step 1: Cleaning
  const step1Cleaned = inputMsg.toLowerCase().replace(/[^a-z0-9\s$]/g, " ").replace(/\s+/g, " ").trim();

  // Pipeline step 2: Tokenization
  const step2Tokens = step1Cleaned.split(" ").filter(Boolean);

  // Pipeline step 3: TF-IDF / Vectors
  const step3Vectors = step2Tokens.map(tok => ({
    word: tok,
    tfidf: (Math.random() * 0.8 + 0.2).toFixed(3),
    isSpamCue: SPAM_KEYWORDS.includes(tok)
  }));

  // Pipeline step 4: Classification
  const spamMatches = step2Tokens.filter(t => SPAM_KEYWORDS.includes(t));
  const isSpam = spamMatches.length >= 2;
  const confidence = isSpam ? Math.min(99, 65 + spamMatches.length * 10) : 94;

  return (
    <section className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#eeebe3] dark:border-[#2b2e34]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197] flex items-center gap-1.5 mb-1">
            <Layers className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
            Putting It All Together
          </span>
          <h2 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
            The End-to-End NLP Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] mt-1 font-sans">
            See how a raw message travels through cleaning, tokenization, word scoring, and final classification.
          </p>
        </div>

        <button
          onClick={() => setInputMsg("Hey Sarah, are we still having our project review meeting at 3pm?")}
          className="px-3 py-1.5 rounded-lg border border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#141618] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] text-[#1c1917] dark:text-[#f5f2ea] text-xs font-mono flex items-center gap-1.5 transition self-start sm:self-auto flex-shrink-0"
        >
          <RefreshCw className="w-3 h-3 text-[#57534e]" />
          <span>Load Normal Email</span>
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block">
          Type an incoming message to test:
        </label>
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#fbfaf8] dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
        />
      </div>

      {/* Assembly Stages Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { num: 1, label: "1. Raw Message" },
          { num: 2, label: "2. Cleaning" },
          { num: 3, label: "3. Tokens" },
          { num: 4, label: "4. Word Scores" },
          { num: 5, label: "5. Decision" }
        ].map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition flex items-center gap-1 whitespace-nowrap ${
              activeStep === idx
                ? 'bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-medium'
                : 'bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] hover:text-[#1c1917]'
            }`}
          >
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      {/* Active Stage Detail Plate */}
      <div className="p-5 bg-[#fbfaf8] dark:bg-[#141618] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3 text-xs">
        {activeStep === 0 && (
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#1c1917] dark:text-[#f5f2ea] block">Step 1: Raw Uncleaned Input</span>
            <p className="text-[#57534e] dark:text-[#a8a29e] text-xs">The text as it was received, with raw capitalization and punctuation.</p>
            <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-xs text-[#1c1917] dark:text-[#f5f2ea] break-all">
              "{inputMsg}"
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#2d4a3e] dark:text-[#4d7a66] block">Step 2: Cleaning & Lowercasing</span>
            <p className="text-[#57534e] dark:text-[#a8a29e] text-xs">All letters converted to lowercase; extra punctuation and spacing stripped.</p>
            <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-xs text-[#2d4a3e] dark:text-[#76a992] break-all">
              "{step1Cleaned}"
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#b85d38] dark:text-[#d97753] block">Step 3: Chopping into Tokens</span>
            <p className="text-[#57534e] dark:text-[#a8a29e] text-xs">The cleaned sentence split into {step2Tokens.length} discrete word pieces:</p>
            <div className="flex flex-wrap gap-1.5 p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
              {step2Tokens.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[#f6f4ee] dark:bg-[#24272c] border border-[#ebe7de] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-[#1c1917] dark:text-[#f5f2ea] block">Step 4: Scoring Word Importance (TF-IDF)</span>
            <p className="text-[#57534e] dark:text-[#a8a29e] text-xs">Each word receives an importance score based on how rare and informative it is:</p>
            <div className="flex flex-wrap gap-2 p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-xs">
              {step3Vectors.map((v, i) => (
                <div key={i} className={`p-2 rounded border text-[11px] ${
                  v.isSpamCue 
                    ? 'bg-[#fbeeed] dark:bg-[#382323] text-[#b83838] dark:text-[#e07575] border-[#b83838]/30 font-medium' 
                    : 'bg-[#fbfaf8] dark:bg-[#181a1d] text-[#57534e] dark:text-[#a8a29e] border-[#e5e2da] dark:border-[#2e3238]'
                }`}>
                  <strong>"{v.word}"</strong>: {v.tfidf}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-3">
            <span className="font-mono text-xs font-semibold text-[#1c1917] dark:text-[#f5f2ea] block">Step 5: Final Decision</span>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full font-mono text-xs font-semibold ${
                isSpam 
                  ? 'bg-[#fbeeed] dark:bg-[#382323] text-[#b83838] dark:text-[#e07575] border border-[#b83838]/40' 
                  : 'bg-[#e8efe9] dark:bg-[#22352c] text-[#2d4a3e] dark:text-[#76a992] border border-[#2d4a3e]/40'
              }`}>
                {isSpam ? 'Flagged as Spam' : 'Delivered as Normal Email'}
              </span>
              <span className="text-[#57534e] dark:text-[#a8a29e] font-mono text-xs">
                {confidence}% Confidence
              </span>
            </div>
            <p className="text-[#57534e] dark:text-[#a8a29e] text-xs leading-relaxed">
              {isSpam 
                ? `Multiple high-risk keywords detected: [${spamMatches.join(', ')}]. Routed to junk folder.`
                : `Normal conversation vocabulary detected with standard conversational grammar. Delivered to inbox.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
