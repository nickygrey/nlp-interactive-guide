import React, { useState } from 'react';
import { Calculator, DollarSign, Layers, Cpu, Clock, Check } from 'lucide-react';

const PRESETS = [
  {
    name: "Customer Tweet (32 words)",
    text: "Hey @support, my order #48921 has been delayed for three days. Can someone please check the tracking number and expedite delivery? Thanks!"
  },
  {
    name: "Tech Blog Article (350 words)",
    text: "Building scalable machine learning microservices requires a careful balance between compute latency, memory footprint, and model accuracy. When deploying transformer architectures to production, engineers must consider whether quantization—such as converting 16-bit floating-point weights to 8-bit or 4-bit integers—can yield 3x faster inference without unacceptable loss in linguistic fidelity. Furthermore, caching repeated semantic embeddings in vector databases avoids redundant forward-pass computations. By profiling input context lengths, allocating dynamic batch sizes, and orchestrating distributed GPU workers with streaming responses, modern AI engineering pipelines achieve sub-50-millisecond time-to-first-token latencies at enterprise scale."
  },
  {
    name: "Enterprise Contract (1,200 words)",
    text: "This Master Services Agreement ('Agreement') is entered into by and between Enterprise Solutions Inc. ('Provider') and Client Global Corp. ('Customer'). 1. Scope of Services. Provider agrees to deliver cloud-hosted artificial intelligence application programming interfaces ('APIs') subject to the Service Level Objectives set forth in Exhibit A. 2. Data Privacy & Confidentiality. Provider agrees that all customer prompt data, intermediate latent vectors, and generated responses shall remain strictly confidential. Provider shall not use Customer Data to train, fine-tune, or calibrate public foundational models without prior written consent. 3. Uptime Guarantee. Provider guarantees a monthly service uptime percentage of not less than 99.9%. In the event of service disruption exceeding allowable thresholds, Customer shall be entitled to proportionate service credits."
  }
];

const MODELS = [
  {
    name: "Google Gemini 1.5 Flash",
    provider: "Google",
    inputPricePer1M: 0.075,
    contextLimit: 1000000,
    color: "text-[#2d4a3e] border-[#2d4a3e]/30 bg-[#e8efe9] dark:bg-[#22352c] dark:text-[#76a992]"
  },
  {
    name: "OpenAI GPT-4o",
    provider: "OpenAI",
    inputPricePer1M: 2.50,
    contextLimit: 128000,
    color: "text-[#1f2d3d] border-[#d2dce6] bg-[#edf2f7] dark:bg-[#1e2730] dark:text-[#8ba4be]"
  },
  {
    name: "Anthropic Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputPricePer1M: 3.00,
    contextLimit: 200000,
    color: "text-[#b85d38] border-[#b85d38]/30 bg-[#faece6] dark:bg-[#382723] dark:text-[#d97753]"
  }
];

export default function TokenCostCalculatorLab() {
  const [text, setText] = useState(PRESETS[1].text);

  // Accurate word & subword token estimation
  const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  // Rule of thumb for English text: 1 token ≈ 4 characters, or ~0.75 words per token
  const estimatedTokens = Math.max(0, Math.round(chars / 3.8));
  const readingTimeSec = Math.max(1, Math.round((words / 220) * 60));

  return (
    <div className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
          <Calculator className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span>Specialized Lab • Economics & Engineering</span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          Token Cost & Context Window Calculator
        </h3>
        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e]">
          Paste any text to calculate subword tokens, reading time, and real API inference pricing across leading models.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-[#8c887b] dark:text-[#78716c]">Presets:</span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setText(p.text)}
            className="px-2.5 py-1 rounded-md text-xs font-mono border border-[#e5e2da] dark:border-[#2e3238] bg-[#f6f4ee] dark:bg-[#24272c] hover:bg-white dark:hover:bg-[#1c1e21] text-[#57534e] dark:text-[#a8a29e] transition"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Text Area */}
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
          Paste or Edit Any Document:
        </label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#fbfaf8] dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38] leading-relaxed"
          placeholder="Paste any article, email, or prompt here..."
        />
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-3 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea] font-mono">{words}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase font-mono">Word Count</span>
        </div>
        <div className="p-3 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#b85d38] dark:text-[#d97753] font-mono">{estimatedTokens.toLocaleString()}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase font-mono">Subword Tokens</span>
        </div>
        <div className="p-3 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#2d4a3e] dark:text-[#4d7a66] font-mono">{chars.toLocaleString()}</span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase font-mono">Characters</span>
        </div>
        <div className="p-3 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-lg border border-[#e5e2da] dark:border-[#2e3238]">
          <span className="block text-xl font-medium text-[#57534e] dark:text-[#a8a29e] font-mono">
            {readingTimeSec < 60 ? `${readingTimeSec}s` : `${Math.round(readingTimeSec / 60)}m`}
          </span>
          <span className="text-[10px] text-[#8c887b] dark:text-[#a6a197] uppercase font-mono">Human Read Time</span>
        </div>
      </div>

      {/* Model API Pricing Table */}
      <div className="overflow-x-auto rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21]">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#fbfaf8] dark:bg-[#141618] border-b border-[#e5e2da] dark:border-[#2e3238] font-mono text-[10px] text-[#8c887b] uppercase tracking-wider">
            <tr>
              <th className="p-3">Model</th>
              <th className="p-3">Context Window</th>
              <th className="p-3">Cost (1 Execution)</th>
              <th className="p-3">Cost (10,000 Runs)</th>
              <th className="p-3">Capacity Used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeebe3] dark:divide-[#2b2e34]">
            {MODELS.map((m, idx) => {
              const singleCost = (estimatedTokens * (m.inputPricePer1M / 1000000));
              const batchCost = singleCost * 10000;
              const capacityPct = Math.min(100, Math.max(0.01, (estimatedTokens / m.contextLimit) * 100));

              return (
                <tr key={idx} className="hover:bg-[#fbfaf8] dark:hover:bg-[#181a1d] transition">
                  <td className="p-3">
                    <span className="font-serif font-medium text-[#1c1917] dark:text-[#f5f2ea] block text-xs">{m.name}</span>
                    <span className="text-[10px] font-mono text-[#8c887b]">{m.provider} • ${m.inputPricePer1M.toFixed(3)}/1M</span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#57534e] dark:text-[#a8a29e]">
                    {(m.contextLimit / 1000).toLocaleString()}k tokens
                  </td>
                  <td className="p-3 font-mono font-semibold text-[#1c1917] dark:text-[#f5f2ea]">
                    ${singleCost.toFixed(6)}
                  </td>
                  <td className="p-3 font-mono font-medium text-[#2d4a3e] dark:text-[#76a992]">
                    ${batchCost.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#f6f4ee] dark:bg-[#24272c] h-2 rounded-full overflow-hidden border border-[#ebe7de] dark:border-[#2e3238]">
                        <div 
                          className="bg-[#2d4a3e] dark:bg-[#76a992] h-full rounded-full" 
                          style={{ width: `${Math.max(3, capacityPct)}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-[#8c887b]">
                        {capacityPct < 0.1 ? '<0.1%' : `${capacityPct.toFixed(1)}%`}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
