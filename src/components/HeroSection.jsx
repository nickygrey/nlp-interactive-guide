import React, { useState } from 'react';
import { ArrowRight, Play, Compass, Activity, Tag, Sparkles, Sliders } from 'lucide-react';

const STOPWORDS = new Set(["the", "a", "an", "is", "it", "if", "in", "on", "at", "to", "for", "with", "me", "you", "my", "of", "and", "or", "so", "be", "do"]);

export default function HeroSection({ personaMode, onStartJourney, onOpenDeck, onOpenDirectory }) {
  const [heroInput, setHeroInput] = useState("How do machines understand the meaning of human language?");
  
  // Real-time live analysis in hero
  const rawWords = heroInput.trim().length > 0 ? heroInput.match(/\S+/g) || [] : [];
  const cleanTokens = heroInput.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);

  // Dynamic real-time 3D vector and intent computation based on user input
  const computeVector = () => {
    if (!heroInput.trim()) {
      return { x: "0.00", y: "0.00", z: "0.00", intent: "Awaiting input...", mag: "0.00" };
    }
    const lower = heroInput.toLowerCase();
    
    // Dim 1 (X): Length & Complexity factor (-1.0 to 1.0)
    const len = heroInput.trim().length;
    const x = Math.min(0.99, Math.max(-0.99, (len - 25) / 35)).toFixed(2);
    
    // Dim 2 (Y): Tone / Sentiment (-1.0 to 1.0)
    let tone = 0.0;
    if (/good|great|works|please|helpful|awesome|love|happy|nice|perfect|yes|fine/i.test(lower)) tone += 0.62;
    if (/bad|terrible|broken|fail|hate|error|doesn't|not|never|ugly|slow|bug/i.test(lower)) tone -= 0.68;
    const y = Math.min(0.99, Math.max(-0.99, tone)).toFixed(2);

    // Dim 3 (Z): Inquisitive / Action orientation (-1.0 to 1.0)
    let intentScore = 0.1;
    let label = "Informational Statement";
    if (/\?|tell|how|what|why|who|where|if|can|could|please|check|verify/i.test(lower)) {
      intentScore = 0.85;
      label = "User Inquiry / Request";
    } else if (/!|urgent|warning|alert|attention/i.test(lower)) {
      intentScore = 0.75;
      label = "High-Urgency Alert";
    } else if (tone > 0.3) {
      label = "Positive Affirmation";
    } else if (tone < -0.3) {
      label = "Critical Feedback";
    }
    const z = Math.min(0.99, Math.max(-0.99, intentScore)).toFixed(2);

    const mag = Math.sqrt(parseFloat(x)**2 + parseFloat(y)**2 + parseFloat(z)**2).toFixed(2);
    return { x, y, z, intent: label, mag };
  };

  const vector = computeVector();
  const isStory = personaMode === 'story';

  return (
    <section id="hero-section" className="scroll-mt-20 pt-14 pb-16 px-4 sm:px-6 border-b border-[#e5e2da] dark:border-[#2e3238] bg-[#fbfaf8] dark:bg-[#141618] transition-colors duration-200">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        
        {/* Topic Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
          <span>Interactive Guide</span>
          <span>•</span>
          <span>15 Foundational Questions</span>
        </div>

        {/* Serif Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-[#1c1917] dark:text-[#f5f2ea] font-normal tracking-tight leading-[1.15]">
          {isStory ? (
            <>
              Computers only understand numbers.{" "}
              <em className="italic font-serif font-normal text-[#b85d38] dark:text-[#d97753]">
                How do we teach them to understand human speech?
              </em>
            </>
          ) : (
            <>
              Language is discrete words.{" "}
              <em className="italic font-serif font-normal text-[#2d4a3e] dark:text-[#4d7a66]">
                Machine learning is continuous geometry.
              </em>
            </>
          )}
        </h1>

        {/* Direct Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#57534e] dark:text-[#a8a29e] leading-relaxed font-sans">
          {isStory ? (
            <>
              A simple, interactive guide explaining how computers process text, spot meaning, and generate answers—using clear, everyday analogies.
            </>
          ) : (
            <>
              A hands-on technical breakdown of computational linguistics: subword tokenization, TF-IDF weights, dense vector embeddings, and Transformer self-attention.
            </>
          )}
        </p>

        {/* Perspective Callout */}
        <div className="p-3.5 rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] text-xs text-[#57534e] dark:text-[#a8a29e] max-w-xl mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#b85d38] dark:bg-[#d97753] flex-shrink-0"></span>
          <span>
            {isStory 
              ? 'Showing Plain-English view: clear everyday metaphors and intuitive explanations.'
              : 'Showing Deep Tech view: mathematical equations, engineering layers, and Python scripts.'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartJourney}
            className="px-6 py-3 rounded-xl bg-[#1c1917] text-[#fbfaf8] hover:bg-[#2e2a27] dark:bg-[#f5f2ea] dark:text-[#1c1917] dark:hover:bg-white text-xs font-semibold tracking-wide transition flex items-center gap-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
          >
            <span>Start Exploring (Question 1)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenDeck}
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#1c1e21] hover:bg-[#f6f4ee] dark:hover:bg-[#24272c] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] text-xs font-medium transition flex items-center gap-2"
          >
            <Play className="w-3 h-3 text-[#b85d38] dark:text-[#d97753]" />
            <span>Launch Slide Deck</span>
          </button>
          <button
            onClick={onOpenDirectory}
            className="px-6 py-3 rounded-xl bg-[#faece6] hover:bg-[#f5dbcf] dark:bg-[#341d18] dark:hover:bg-[#45241c] border border-[#b85d38]/40 text-[#b85d38] dark:text-[#e08968] text-xs font-semibold transition flex items-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#e08968]" />
            <span>All Interactive Tools (22)</span>
          </button>
        </div>

        {/* Live Interactive Parser Simulator */}
        <div id="hero-parser-widget" className="scroll-mt-24 pt-8 max-w-2xl mx-auto text-left">
          <div className="p-5 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-[#eeebe3] dark:border-[#2b2e34]">
              <span className="font-mono text-[#1c1917] dark:text-[#f5f2ea] flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
                Live Real-Time Sentence Parser
              </span>
              <span className="text-[11px] font-mono text-[#2d4a3e] dark:text-[#76a992] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d4a3e] dark:bg-[#76a992] animate-pulse"></span>
                Active on every keystroke
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#78716c]">
                  Type any sentence below to test:
                </label>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#8c887b] dark:text-[#a6a197]">
                  <span>Try:</span>
                  <button
                    onClick={() => setHeroInput("How do machines understand the meaning of human language?")}
                    className="hover:text-[#b85d38] dark:hover:text-[#d97753] underline decoration-dotted transition"
                  >
                    Question
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setHeroInput("Neural networks convert raw words into high-dimensional geometric vectors.")}
                    className="hover:text-[#b85d38] dark:hover:text-[#d97753] underline decoration-dotted transition"
                  >
                    Vectors
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setHeroInput("The quick brown fox jumps over the lazy dog.")}
                    className="hover:text-[#b85d38] dark:hover:text-[#d97753] underline decoration-dotted transition"
                  >
                    Classic
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#fbfaf8] dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
                placeholder="Type any sentence to see it parsed in real time..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              {/* Box 1: All Tokens */}
              <div className="p-3 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block">
                    1. Tokens ({rawWords.length})
                  </span>
                  <span className="text-[10px] text-[#8c887b] font-mono">discrete pieces</span>
                </div>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {rawWords.length > 0 ? (
                    rawWords.map((w, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1c1e21] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-[11px] break-all">
                        {w}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#8c887b] text-[11px] italic">Type text to see tokens</span>
                  )}
                </div>
              </div>

              {/* Box 2: All Cleaned Words with Stopword Detection */}
              <div className="p-3 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2d4a3e] dark:text-[#4d7a66] block font-medium">
                    2. Cleaned Words ({cleanTokens.length})
                  </span>
                  <span className="text-[10px] text-[#2d4a3e] dark:text-[#76a992] font-mono">lowercased</span>
                </div>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {cleanTokens.length > 0 ? (
                    cleanTokens.map((w, i) => {
                      const isStop = STOPWORDS.has(w);
                      return (
                        <span 
                          key={i} 
                          className={`px-1.5 py-0.5 rounded font-mono text-[11px] border ${
                            isStop 
                              ? 'bg-white dark:bg-[#1c1e21] text-[#8c887b] border-[#e5e2da] dark:border-[#2e3238]' 
                              : 'bg-[#e8efe9] dark:bg-[#22352c] text-[#2d4a3e] dark:text-[#76a992] border-[#2d4a3e]/30 font-medium'
                          }`}
                          title={isStop ? 'Grammar stopword' : 'Content keyword'}
                        >
                          {w}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[#8c887b] text-[11px] italic">No words detected</span>
                  )}
                </div>
              </div>

              {/* Box 3: Live Dynamic 3D Vector & Intent */}
              <div className="p-3 bg-[#f6f4ee] dark:bg-[#24272c] rounded-lg border border-[#ebe7de] dark:border-[#2e3238] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#b85d38] dark:text-[#d97753] block font-medium">
                    3. Vector Coordinates
                  </span>
                  <span className="text-[10px] font-mono text-[#b85d38] dark:text-[#d97753]">live ℝ³</span>
                </div>
                <div className="font-mono text-[11px] text-[#1c1917] dark:text-[#f5f2ea] bg-white dark:bg-[#1c1e21] p-1.5 rounded border border-[#e5e2da] dark:border-[#2e3238] text-center font-bold">
                  [{vector.x}, {vector.y}, {vector.z}]
                </div>
                <div className="text-[10px] text-[#57534e] dark:text-[#a8a29e] flex items-center justify-between pt-0.5">
                  <span className="truncate font-medium">{vector.intent}</span>
                  <span className="font-mono text-[#8c887b]">||v||={vector.mag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
