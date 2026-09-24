import React, { useState } from 'react';
import { Database, Search, ArrowRight, Layers, FileText, CheckCircle2, AlertTriangle, Sparkles, Sliders } from 'lucide-react';

const DOCUMENTS = [
  {
    id: "artemis",
    title: "NASA Artemis Program Briefing",
    category: "Aerospace",
    fullText: "The NASA Artemis program aims to land the first woman and first person of color on the Moon. Exploration Ground Systems and the Space Launch System (SLS) rocket provide the foundational heavy-lift transport. The Lunar Gateway space station will orbit the Moon in a near-rectilinear halo orbit, serving as a staging post for expeditions. For surface power, NASA selected kilowatt-class fission surface power nuclear systems over solar arrays to survive the two-week lunar night where temperatures plunge to -130 degrees Celsius. Surface mobility will be facilitated by the Lunar Terrain Vehicle, an unpressurized rover capable of autonomous operation during crew absence."
  },
  {
    id: "coffee",
    title: "Agronomy of Specialty Coffee",
    category: "Agriculture",
    fullText: "Coffea arabica thrives exclusively at elevations between 1,200 and 2,200 meters above sea level where diurnal temperature swings slow cherry maturation. Slower maturation concentrates complex carbohydrates, creating bright phosphoric and malic acidity in the cup. The wet washed processing method involves mechanical pulping followed by 24 to 36 hours of underwater fermentation to break down mucilage before drying on raised African beds. Natural honey processing skips fermentation, retaining sugary fruit pulp to produce heavy body, strawberry undertones, and reduced perceived acidity."
  },
  {
    id: "quantum",
    title: "Post-Quantum Cryptographic Standards",
    category: "Cybersecurity",
    fullText: "Current public-key encryption relying on RSA and Elliptic Curve Cryptography will become vulnerable once Shor's algorithm runs on fault-tolerant quantum computers. The National Institute of Standards and Technology (NIST) finalized post-quantum standards based on lattice cryptography. CRYSTALS-Kyber was selected as the primary general encryption standard due to compact public key sizes and fast key exchange performance. For digital signatures, CRYSTALS-Dilithium provides robust mathematical security without requiring quantum hardware to generate or verify certificates."
  }
];

const SAMPLE_QUERIES = [
  { text: "What power system will be used during the lunar night?", docId: "artemis" },
  { text: "Why does high altitude improve coffee bean acidity?", docId: "coffee" },
  { text: "Which lattice encryption algorithm did NIST select?", docId: "quantum" }
];

// Simple keyword-density + semantic similarity scorer for demonstration
function scoreChunk(chunkText, queryText) {
  const qTokens = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  const cTokens = chunkText.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
  
  if (qTokens.length === 0 || cTokens.length === 0) return 0;
  
  // Exact token match weight
  let matches = 0;
  for (const q of qTokens) {
    if (cTokens.includes(q)) matches += 1.8;
    else if (cTokens.some(c => c.startsWith(q) || q.startsWith(c))) matches += 0.8;
  }
  
  // Normalized score between 0.15 and 0.96
  const rawScore = (matches / Math.sqrt(qTokens.length)) * 0.35 + 0.15;
  return Math.min(0.96, Math.max(0.12, rawScore));
}

export default function RagSimulatorLab() {
  const [docIdx, setDocIdx] = useState(0);
  const [chunkWords, setChunkWords] = useState(35);
  const [query, setQuery] = useState(SAMPLE_QUERIES[0].text);
  const [topK, setTopK] = useState(2);
  const [showWithoutRag, setShowWithoutRag] = useState(false);

  const activeDoc = DOCUMENTS[docIdx];

  // Slices document text into chunks based on word count with 5-word overlap
  const words = activeDoc.fullText.split(/\s+/);
  const chunks = [];
  const overlap = 6;
  const step = Math.max(10, chunkWords - overlap);

  for (let i = 0; i < words.length; i += step) {
    const slice = words.slice(i, i + chunkWords);
    if (slice.length > 0) {
      chunks.push({
        id: chunks.length + 1,
        text: slice.join(" "),
        wordCount: slice.length,
        startWord: i,
        endWord: i + slice.length
      });
    }
    if (i + chunkWords >= words.length) break;
  }

  // Score chunks against current query
  const scoredChunks = chunks.map(chunk => ({
    ...chunk,
    score: scoreChunk(chunk.text, query)
  })).sort((a, b) => b.score - a.score);

  const retrievedChunks = scoredChunks.slice(0, topK);
  const retrievedIds = new Set(retrievedChunks.map(c => c.id));

  // Synthesize answer based on top retrieved chunk
  const generateAnswer = () => {
    if (showWithoutRag) {
      return {
        text: "Without ground-truth context, the LLM relies entirely on its training cutoff weights. It might guess solar panels or radioisotope thermoelectric generators (RTGs), hallucinate outdated parameters, or state that details are unconfirmed.",
        grounded: false
      };
    }

    if (retrievedChunks.length === 0 || retrievedChunks[0].score < 0.25) {
      return {
        text: "I cannot find sufficient evidence in the indexed document chunks to answer this inquiry accurately.",
        grounded: false
      };
    }

    // Grounded synthesis using retrieved chunks
    const top = retrievedChunks[0];
    let synthesized = "";
    if (top.text.includes("fission surface power")) {
      synthesized = "NASA selected kilowatt-class fission surface power nuclear systems over solar arrays. Nuclear power was chosen specifically to survive the two-week lunar night when surface temperatures drop to -130°C.";
    } else if (top.text.includes("maturation")) {
      synthesized = "High elevation (1,200m–2,200m) causes significant diurnal temperature swings that slow cherry maturation, allowing complex carbohydrates to concentrate and create bright phosphoric and malic acidity.";
    } else if (top.text.includes("Kyber")) {
      synthesized = "NIST selected CRYSTALS-Kyber as the primary general post-quantum encryption standard due to its compact public key sizes and fast key exchange speed, built upon lattice cryptography.";
    } else {
      synthesized = `Based directly on the indexed text, ${top.text.slice(0, 140)}...`;
    }

    return {
      text: synthesized,
      grounded: true,
      citedChunks: retrievedChunks.map(c => `Chunk ${c.id}`)
    };
  };

  const answer = generateAnswer();

  return (
    <div className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#b85d38] dark:text-[#d97753]">
          <Database className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span>Specialized Lab • Information Retrieval & Dense Indexing</span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          RAG from Scratch: Slicing, Indexing & Retrieval
        </h3>
        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
          Retrieval-Augmented Generation bridges classical NLP document segmentation, vector cosine retrieval, and generative prompting. Test how chunk sizing and similarity thresholds dictate accuracy.
        </p>
      </div>

      {/* STAGE 1: Document Selection & Chunk Sizing */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf8] dark:bg-[#181a1d] border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1c1917] dark:bg-[#f5f2ea] text-white dark:text-[#1c1917] text-[11px] font-mono flex items-center justify-center font-bold">
              1
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1c1917] dark:text-[#f5f2ea]">
              Corpus Selection & Slicing Controls
            </span>
          </div>

          {/* Document picker pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {DOCUMENTS.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => {
                  setDocIdx(idx);
                  setQuery(SAMPLE_QUERIES[idx].text);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition border ${
                  docIdx === idx
                    ? 'border-[#2d4a3e] bg-[#2d4a3e] text-white font-medium dark:bg-[#4d7a66]'
                    : 'border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] text-[#646059] dark:text-[#a6a197]'
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#646059] dark:text-[#a6a197]">
              <span>Chunk Word Limit:</span>
              <span className="font-semibold text-[#1c1917] dark:text-[#f5f2ea]">{chunkWords} words</span>
            </div>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={chunkWords}
              onChange={(e) => setChunkWords(Number(e.target.value))}
              className="w-full accent-[#2d4a3e] dark:accent-[#4d7a66]"
            />
            <span className="text-[10px] text-[#8c887b] block font-mono">
              Smaller chunks isolate precise facts; larger chunks preserve context.
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#646059] dark:text-[#a6a197]">
              <span>Top-K Retrieved Chunks:</span>
              <span className="font-semibold text-[#1c1917] dark:text-[#f5f2ea]">K = {topK}</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-[#b85d38] dark:accent-[#d97753]"
            />
            <span className="text-[10px] text-[#8c887b] block font-mono">
              Controls how many candidate passages are injected into the prompt.
            </span>
          </div>
        </div>

        {/* Visualized Chunks Grid */}
        <div className="space-y-2 pt-2 border-t border-[#eeebe3] dark:border-[#2b2e34]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b]">
            Generated Document Chunks ({chunks.length} Total):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {chunks.map((c) => {
              const isRetrieved = retrievedIds.has(c.id);
              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-lg border text-xs transition relative flex flex-col justify-between ${
                    isRetrieved
                      ? 'bg-white dark:bg-[#1c1e21] border-[#2d4a3e] ring-2 ring-[#2d4a3e]/20 shadow-sm'
                      : 'bg-white/60 dark:bg-[#141618] border-[#e5e2da] dark:border-[#2e3238] opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8c887b] mb-1">
                      <span className="font-semibold text-[#1c1917] dark:text-[#f5f2ea]">Chunk #{c.id}</span>
                      <span>{c.wordCount} words</span>
                    </div>
                    <p className="font-sans text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed line-clamp-3">
                      "{c.text}"
                    </p>
                  </div>
                  {isRetrieved && (
                    <div className="mt-2 pt-1 border-t border-[#e5e2da] dark:border-[#2e3238] flex items-center justify-between text-[10px] font-mono text-[#2d4a3e] dark:text-[#76a992]">
                      <span className="font-bold">✓ Retrieved</span>
                      <span>Rank #{scoredChunks.findIndex(sc => sc.id === c.id) + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* STAGE 2 & 3: Query & Dense Vector Cosine Retrieval */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf8] dark:bg-[#181a1d] border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#1c1917] dark:bg-[#f5f2ea] text-white dark:text-[#1c1917] text-[11px] font-mono flex items-center justify-center font-bold">
            2
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1c1917] dark:text-[#f5f2ea]">
            Semantic Vector Query & Cosine Scoring
          </span>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-[#8c887b] dark:text-[#a6a197] mb-1">
            User Natural Language Query:
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2.5 pl-9 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-xs font-mono text-[#1c1917] dark:text-[#f5f2ea] focus:outline-none focus:border-[#b85d38]"
              placeholder="Ask anything about the active document..."
            />
            <Search className="w-3.5 h-3.5 text-[#8c887b] absolute left-3 top-3" />
          </div>
        </div>

        {/* Real-Time Similarity Score Ranking */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b]">
            Ranked Chunk Cosine Similarity Scores:
          </span>
          <div className="space-y-1.5">
            {scoredChunks.map((c, idx) => {
              const isWinner = idx < topK;
              const pct = Math.round(c.score * 100);
              return (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs transition ${
                    isWinner
                      ? 'bg-white dark:bg-[#1c1e21] border-[#2d4a3e]'
                      : 'bg-white/40 dark:bg-[#141618] border-[#e5e2da] dark:border-[#2e3238]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className={`w-5 h-5 rounded font-mono text-[10px] flex items-center justify-center font-bold ${
                      isWinner ? 'bg-[#2d4a3e] text-white dark:bg-[#4d7a66]' : 'bg-[#eeebe3] text-[#8c887b] dark:bg-[#202327]'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-[#1c1917] dark:text-[#f5f2ea] font-medium whitespace-nowrap">
                      Chunk #{c.id}
                    </span>
                    <p className="font-sans text-[11px] text-[#57534e] dark:text-[#a8a29e] truncate">
                      "{c.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs whitespace-nowrap">
                    <div className="w-16 bg-[#eeebe3] dark:bg-[#2b2e34] h-1.5 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className={`h-full ${isWinner ? 'bg-[#2d4a3e] dark:bg-[#4d7a66]' : 'bg-[#8c887b]'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={`font-semibold ${isWinner ? 'text-[#2d4a3e] dark:text-[#76a992]' : 'text-[#8c887b]'}`}>
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* STAGE 4: Augmented Generation & Hallucination Defense */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf8] dark:bg-[#181a1d] border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1c1917] dark:bg-[#f5f2ea] text-white dark:text-[#1c1917] text-[11px] font-mono flex items-center justify-center font-bold">
              3
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1c1917] dark:text-[#f5f2ea]">
              Grounded Generation vs. Parametric Hallucination
            </span>
          </div>

          {/* Toggle RAG on/off */}
          <button
            onClick={() => setShowWithoutRag(!showWithoutRag)}
            className={`px-3 py-1 rounded-md text-xs font-mono transition border ${
              showWithoutRag
                ? 'bg-[#b85d38] border-[#b85d38] text-white font-semibold'
                : 'bg-white dark:bg-[#1c1e21] border-[#e5e2da] dark:border-[#2e3238] text-[#57534e] dark:text-[#a8a29e]'
            }`}
          >
            {showWithoutRag ? "Mode: Without RAG (Raw LLM)" : "Mode: With RAG (Augmented Context)"}
          </button>
        </div>

        {/* Synthesized Answer Output Card */}
        <div className={`p-4 sm:p-5 rounded-xl border transition space-y-3 ${
          showWithoutRag
            ? 'bg-[#faece6] dark:bg-[#341d18] border-[#b85d38]/40'
            : 'bg-white dark:bg-[#1c1e21] border-[#2d4a3e]/40 shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <span className="font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-medium">
              {showWithoutRag ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-[#b85d38]" />
                  <span className="text-[#b85d38] dark:text-[#e08968]">Parametric Generation (No Context Injected)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d4a3e] dark:text-[#76a992]" />
                  <span className="text-[#2d4a3e] dark:text-[#76a992]">Grounded RAG Synthesis</span>
                </>
              )}
            </span>
            
            {!showWithoutRag && answer.citedChunks && (
              <span className="font-mono text-[10px] text-[#2d4a3e] dark:text-[#76a992] bg-[#2d4a3e]/10 px-2 py-0.5 rounded">
                Verified from: {answer.citedChunks.join(", ")}
              </span>
            )}
          </div>

          <p className="font-serif text-sm sm:text-base text-[#1c1917] dark:text-[#f5f2ea] leading-relaxed">
            {answer.text}
          </p>

          {!showWithoutRag && (
            <div className="pt-2 border-t border-[#eeebe3] dark:border-[#2b2e34] text-[11px] font-mono text-[#8c887b] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#b85d38]" />
              <span>Prompt formula: <code>[System Prompt] + [Top-{topK} Retrieved Chunks] + [User Query]</code></span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
