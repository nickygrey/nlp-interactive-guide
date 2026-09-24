import React, { useState } from 'react';
import { Thermometer, Play, RotateCcw, Sparkles } from 'lucide-react';

const SCENARIOS = [
  {
    prompt: "The astronaut opened the hatch and saw the",
    candidates: [
      { word: "Earth", logit: 3.8 },
      { word: "stars", logit: 3.1 },
      { word: "moon", logit: 2.6 },
      { word: "darkness", logit: 2.0 },
      { word: "spaceship", logit: 1.4 },
      { word: "dragon", logit: -0.6 }
    ]
  },
  {
    prompt: "To bake authentic Italian pizza, knead flour, water, and",
    candidates: [
      { word: "yeast", logit: 3.9 },
      { word: "salt", logit: 3.2 },
      { word: "olive oil", logit: 2.7 },
      { word: "sugar", logit: 1.8 },
      { word: "honey", logit: 1.1 },
      { word: "gasoline", logit: -0.8 }
    ]
  },
  {
    prompt: "The software engineer debugged the code and restarted the",
    candidates: [
      { word: "server", logit: 3.7 },
      { word: "service", logit: 3.0 },
      { word: "computer", logit: 2.5 },
      { word: "application", logit: 2.1 },
      { word: "terminal", logit: 1.5 },
      { word: "lawnmower", logit: -0.7 }
    ]
  }
];

export default function TemperatureSimulatorLab() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [currentText, setCurrentText] = useState(SCENARIOS[0].prompt);
  const [lastSampled, setLastSampled] = useState(null);

  const scenario = SCENARIOS[scenarioIdx];

  // Compute Softmax probabilities with Temperature
  const computeProbs = () => {
    const T = Math.max(0.01, temperature); // Prevent division by zero
    
    // Scale logits by temperature: z_i / T
    const scaled = scenario.candidates.map(c => ({
      ...c,
      scaledExp: Math.exp(c.logit / T)
    }));

    const sumExp = scaled.reduce((acc, curr) => acc + curr.scaledExp, 0);

    // Raw Softmax probabilities
    let withProbs = scaled.map(c => ({
      ...c,
      prob: c.scaledExp / sumExp
    })).sort((a, b) => b.prob - a.prob);

    // Apply Top-P (Nucleus Sampling) cutoff
    let cumulative = 0;
    withProbs = withProbs.map(c => {
      cumulative += c.prob;
      return {
        ...c,
        inTopP: cumulative - c.prob < topP
      };
    });

    return withProbs;
  };

  const candidateProbs = computeProbs();

  const handleSelectScenario = (idx) => {
    setScenarioIdx(idx);
    setCurrentText(SCENARIOS[idx].prompt);
    setLastSampled(null);
  };

  const handleSampleToken = () => {
    // Probabilistic weighted choice among eligible Top-P candidates
    const eligible = candidateProbs.filter(c => c.inTopP);
    const totalEligibleProb = eligible.reduce((acc, c) => acc + c.prob, 0);

    const rand = Math.random() * totalEligibleProb;
    let running = 0;
    let selectedToken = eligible[0];

    for (const c of eligible) {
      running += c.prob;
      if (rand <= running) {
        selectedToken = c;
        break;
      }
    }

    setLastSampled(selectedToken);
    setCurrentText(prev => `${prev} ${selectedToken.word}`);
  };

  const handleReset = () => {
    setCurrentText(scenario.prompt);
    setLastSampled(null);
  };

  return (
    <div className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
          <Thermometer className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span>Specialized Lab • Large Language Models</span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          Next-Token Prediction & The Temperature Dial
        </h3>
        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e]">
          See how LLMs choose the next word, and how temperature controls the balance between predictable logic and creative chaos.
        </p>
      </div>

      {/* Preset Prompts */}
      <div className="space-y-2">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
          Select Prompt Scenario:
        </label>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectScenario(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
                scenarioIdx === idx
                  ? 'bg-[#1c1917] text-[#fbfaf8] border-[#1c1917] dark:bg-[#f5f2ea] dark:text-[#1c1917]'
                  : 'bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] border-[#ebe7de] dark:border-[#2e3238]'
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Live Text Generator Preview */}
      <div className="p-4 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#8c887b] uppercase tracking-wider">Generated Text Stream:</span>
          <button
            onClick={handleReset}
            className="text-[11px] font-mono text-[#8c887b] hover:text-[#1c1917] dark:hover:text-[#f5f2ea] flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Prompt</span>
          </button>
        </div>
        <p className="font-serif text-base sm:text-lg text-[#1c1917] dark:text-[#f5f2ea] leading-relaxed">
          {currentText}
          <span className="w-2 h-4 inline-block bg-[#b85d38] dark:bg-[#d97753] ml-1.5 animate-pulse"></span>
        </p>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#f6f4ee] dark:bg-[#24272c] rounded-xl border border-[#ebe7de] dark:border-[#2e3238]">
        
        {/* Temperature Dial */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#1c1917] dark:text-[#f5f2ea] font-medium">
              Temperature (T = {temperature.toFixed(2)})
            </span>
            <span className="font-mono text-[11px] text-[#b85d38] dark:text-[#d97753] font-semibold">
              {temperature < 0.2 ? '0.0: Deterministic / Cold' : temperature < 0.8 ? '0.7: Natural & Balanced' : '1.3: Wild / Creative'}
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.4"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-[#b85d38]"
          />
          <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
            {temperature < 0.2 
              ? 'Low temperature freezes the distribution: the model strictly picks the #1 most probable word every single time.' 
              : temperature < 0.8 
              ? 'Moderate temperature flattens probabilities slightly, allowing natural human variation.' 
              : 'High temperature flattens the distribution completely: rare words get equal chances, causing hallucinations.'}
          </p>
        </div>

        {/* Top-P (Nucleus) Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#1c1917] dark:text-[#f5f2ea] font-medium">
              Top-P Nucleus (P = {topP.toFixed(2)})
            </span>
            <span className="font-mono text-[11px] text-[#2d4a3e] dark:text-[#76a992] font-semibold">
              Pool: {Math.round(topP * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={topP}
            onChange={(e) => setTopP(parseFloat(e.target.value))}
            className="w-full accent-[#2d4a3e]"
          />
          <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
            Only considers the top candidate words whose cumulative probability adds up to {Math.round(topP * 100)}%, cutting off the bottom unlikely tail.
          </p>
        </div>

      </div>

      {/* Candidate Next Tokens with Probability Distribution Bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197]">
            Next Token Probability Distribution (Softmax):
          </span>
          <button
            onClick={handleSampleToken}
            className="px-4 py-2 rounded-lg bg-[#1c1917] text-[#fbfaf8] dark:bg-[#f5f2ea] dark:text-[#1c1917] font-mono text-xs font-semibold hover:opacity-90 transition flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
            <span>Sample Next Word</span>
          </button>
        </div>

        <div className="space-y-2">
          {candidateProbs.map((cand, idx) => {
            const pct = Math.round(cand.prob * 100);
            const isSelected = lastSampled && lastSampled.word === cand.word;

            return (
              <div 
                key={idx}
                className={`p-2.5 rounded-lg border transition text-xs flex items-center gap-3 ${
                  isSelected 
                    ? 'bg-[#e8efe9] dark:bg-[#22352c] border-[#2d4a3e]/50 shadow-sm' 
                    : cand.inTopP 
                    ? 'bg-white dark:bg-[#1c1e21] border-[#e5e2da] dark:border-[#2e3238]' 
                    : 'bg-[#fbfaf8] dark:bg-[#181a1d] border-[#eeebe3] dark:border-[#2b2e34] opacity-40'
                }`}
              >
                <div className="w-24 font-mono font-bold text-[#1c1917] dark:text-[#f5f2ea] truncate">
                  "{cand.word}"
                </div>

                <div className="flex-1 bg-[#f6f4ee] dark:bg-[#24272c] h-3.5 rounded-full overflow-hidden border border-[#ebe7de] dark:border-[#2e3238]">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-[#2d4a3e] dark:bg-[#76a992]' : 'bg-[#b85d38] dark:bg-[#d97753]'
                    }`}
                    style={{ width: `${Math.max(2, pct)}%` }}
                  ></div>
                </div>

                <div className="w-14 text-right font-mono text-xs font-medium text-[#1c1917] dark:text-[#f5f2ea]">
                  {pct}%
                </div>

                {!cand.inTopP && (
                  <span className="text-[10px] font-mono text-[#b83838] uppercase">Cut by Top-P</span>
                )}
                {isSelected && (
                  <span className="text-[10px] font-mono text-[#2d4a3e] dark:text-[#76a992] font-semibold">✓ Chosen</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
