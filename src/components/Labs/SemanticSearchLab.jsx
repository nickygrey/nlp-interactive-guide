import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const DOCUMENTS = [
  {
    id: 1,
    category: "Automotive",
    text: "Modern electric cars and luxury sedans feature high battery efficiency, rapid acceleration, and zero carbon emissions.",
    keywords: ["electric", "cars", "sedans", "battery", "acceleration", "emissions", "vehicle", "automotive", "drive"],
    semanticCoords: { automotive: 0.95, culinary: 0.02, computing: 0.20, fitness: 0.05, astronomy: 0.01 }
  },
  {
    id: 2,
    category: "Culinary",
    text: "The Italian pasta recipe calls for simmering crushed heirloom tomatoes, fresh garlic, olive oil, and sweet basil.",
    keywords: ["pasta", "recipe", "tomatoes", "garlic", "oil", "basil", "cooking", "food", "italian", "dinner"],
    semanticCoords: { automotive: 0.01, culinary: 0.96, computing: 0.01, fitness: 0.15, astronomy: 0.01 }
  },
  {
    id: 3,
    category: "Computing & AI",
    text: "Deep neural networks train over distributed GPU clusters to optimize mathematical weights on massive text datasets.",
    keywords: ["neural", "networks", "gpu", "clusters", "weights", "datasets", "ai", "computing", "software", "code"],
    semanticCoords: { automotive: 0.15, culinary: 0.01, computing: 0.98, fitness: 0.02, astronomy: 0.10 }
  },
  {
    id: 4,
    category: "Health & Fitness",
    text: "Daily cardiovascular workouts, interval running, and balanced nutrition significantly improve heart longevity and stamina.",
    keywords: ["cardiovascular", "workouts", "running", "nutrition", "heart", "longevity", "stamina", "exercise", "health"],
    semanticCoords: { automotive: 0.03, culinary: 0.25, computing: 0.01, fitness: 0.94, astronomy: 0.01 }
  },
  {
    id: 5,
    category: "Astronomy",
    text: "The orbital space telescope photographed distant spiral galaxies, nebula clusters, and ultraviolet planetary transits.",
    keywords: ["space", "telescope", "galaxies", "nebula", "planetary", "transits", "astronomy", "stars", "orbit"],
    semanticCoords: { automotive: 0.02, culinary: 0.01, computing: 0.22, fitness: 0.01, astronomy: 0.97 }
  },
  {
    id: 6,
    category: "Domestic Pets",
    text: "Golden retriever puppies require gentle obedience training, daily leash walks, and socialization with other dogs.",
    keywords: ["puppies", "dogs", "training", "walks", "socialization", "pets", "animals", "canine"],
    semanticCoords: { automotive: 0.05, culinary: 0.08, computing: 0.01, fitness: 0.35, astronomy: 0.01 }
  }
];

const PRESETS = [
  { label: "automobile", desc: "Synonym test (fails keyword search)" },
  { label: "healthy breakfast", desc: "Cross-topic test" },
  { label: "machine learning", desc: "Concept test" },
  { label: "space exploration", desc: "Thematic test" },
  { label: "friendly canines", desc: "Vocabulary shift test" }
];

// Semantic mapping for demo queries
const QUERY_MAP = {
  automobile: { automotive: 0.92, culinary: 0.01, computing: 0.12, fitness: 0.02, astronomy: 0.01 },
  "healthy breakfast": { automotive: 0.01, culinary: 0.78, computing: 0.01, fitness: 0.72, astronomy: 0.01 },
  "machine learning": { automotive: 0.18, culinary: 0.01, computing: 0.95, fitness: 0.01, astronomy: 0.12 },
  "space exploration": { automotive: 0.05, culinary: 0.01, computing: 0.15, fitness: 0.01, astronomy: 0.96 },
  "friendly canines": { automotive: 0.02, culinary: 0.05, computing: 0.01, fitness: 0.25, astronomy: 0.01 }
};

function cosineSim(v1, v2) {
  let dot = 0;
  let mag1 = 0;
  let mag2 = 0;
  for (const k in v1) {
    const val1 = v1[k] || 0;
    const val2 = v2[k] || 0;
    dot += val1 * val2;
    mag1 += val1 * val1;
    mag2 += val2 * val2;
  }
  if (mag1 === 0 || mag2 === 0) return 0;
  return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

export default function SemanticSearchLab() {
  const [query, setQuery] = useState("automobile");

  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

  // 1. Keyword search (lexical exact match)
  const keywordResults = DOCUMENTS.map(doc => {
    const docLower = doc.text.toLowerCase();
    const matches = queryTokens.filter(t => docLower.includes(t));
    return {
      ...doc,
      matchCount: matches.length,
      matchedWords: matches
    };
  }).filter(d => d.matchCount > 0);

  // 2. Semantic search (vector cosine similarity)
  // Derive query vector: check preset map or synthesize from words
  let queryVec = QUERY_MAP[cleanQuery];
  if (!queryVec) {
    queryVec = { automotive: 0.1, culinary: 0.1, computing: 0.1, fitness: 0.1, astronomy: 0.1 };
    if (/car|auto|drive|vehicle|sedan/i.test(cleanQuery)) queryVec.automotive = 0.9;
    if (/food|cook|eat|recipe|meal|pasta/i.test(cleanQuery)) queryVec.culinary = 0.9;
    if (/code|computer|ai|model|data|learn/i.test(cleanQuery)) queryVec.computing = 0.9;
    if (/exercise|health|gym|heart|run|walk/i.test(cleanQuery)) queryVec.fitness = 0.9;
    if (/star|planet|telescope|galaxy|space/i.test(cleanQuery)) queryVec.astronomy = 0.9;
  }

  const semanticResults = DOCUMENTS.map(doc => {
    const sim = cosineSim(queryVec, doc.semanticCoords);
    return {
      ...doc,
      similarity: sim
    };
  }).sort((a, b) => b.similarity - a.similarity);

  return (
    <div className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#eeebe3] dark:border-[#2b2e34] pb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
          <Search className="w-3.5 h-3.5 text-[#b85d38] dark:text-[#d97753]" />
          <span>Specialized Lab • Information Retrieval</span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          Keyword Search vs. Semantic Vector Search
        </h3>
        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e]">
          See why 1990s search engines failed on synonyms, and how modern vector embeddings find answers by meaning.
        </p>
      </div>

      {/* Search Input & Quick Presets */}
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] mb-1.5">
            Type any search query to test both engines:
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg bg-[#fbfaf8] dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-[#1c1917] dark:text-[#f5f2ea] font-mono text-xs focus:outline-none focus:border-[#b85d38]"
              placeholder="Try: automobile, healthy breakfast, machine learning..."
            />
            <Search className="w-4 h-4 text-[#8c887b] absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-[#8c887b] dark:text-[#78716c]">Try presets:</span>
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setQuery(p.label)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono border transition ${
                query.toLowerCase() === p.label
                  ? 'bg-[#1c1917] text-[#fbfaf8] border-[#1c1917] dark:bg-[#f5f2ea] dark:text-[#1c1917]'
                  : 'bg-[#f6f4ee] dark:bg-[#24272c] text-[#57534e] dark:text-[#a8a29e] border-[#ebe7de] dark:border-[#2e3238] hover:text-[#1c1917]'
              }`}
            >
              "{p.label}"
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Search Results Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Column 1: Keyword Search */}
        <div className="p-4 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <div>
              <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
                1. Classic Keyword Search (Exact Match)
              </span>
              <span className="text-[10px] font-mono text-[#8c887b]">BM25 / Substring matching</span>
            </div>
            <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${
              keywordResults.length > 0 ? 'bg-[#e8efe9] text-[#2d4a3e]' : 'bg-[#fbeeed] text-[#b83838]'
            }`}>
              {keywordResults.length} match{keywordResults.length === 1 ? '' : 'es'}
            </span>
          </div>

          {keywordResults.length === 0 ? (
            <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] text-center space-y-1.5">
              <AlertCircle className="w-5 h-5 text-[#b83838] mx-auto opacity-75" />
              <p className="text-xs font-semibold text-[#b83838]">No documents matched</p>
              <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
                The query <strong>"{query}"</strong> does not appear as an exact word in the text. Even though document #1 is about cars and sedans, classic keyword search fails completely!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {keywordResults.map(doc => (
                <div key={doc.id} className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#8c887b]">{doc.category}</span>
                    <span className="font-mono text-[10px] text-[#2d4a3e] font-semibold">{doc.matchCount} exact hit{doc.matchCount === 1 ? '' : 's'}</span>
                  </div>
                  <p className="text-[#383531] dark:text-[#d6d3d1] text-[11px] leading-relaxed">
                    {doc.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Semantic Vector Search */}
        <div className="p-4 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <div>
              <span className="font-serif text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea] block">
                2. Modern Semantic Search (Dense Vectors)
              </span>
              <span className="text-[10px] font-mono text-[#2d4a3e] dark:text-[#76a992]">Embeddings & Cosine Similarity</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#e8efe9] text-[#2d4a3e] font-mono text-[11px] font-medium">
              Ranked by Meaning
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {semanticResults.slice(0, 3).map((doc, idx) => {
              const pct = Math.round(doc.similarity * 100);
              const isTop = idx === 0;

              return (
                <div 
                  key={doc.id} 
                  className={`p-3 rounded-lg border transition text-xs space-y-1.5 ${
                    isTop 
                      ? 'bg-white dark:bg-[#1c1e21] border-[#2d4a3e]/40 shadow-sm' 
                      : 'bg-white dark:bg-[#1c1e21] border-[#e5e2da] dark:border-[#2e3238] opacity-85'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#8c887b]">{doc.category}</span>
                    <span className={`font-mono text-[11px] font-semibold ${isTop ? 'text-[#2d4a3e] dark:text-[#76a992]' : 'text-[#57534e]'}`}>
                      {pct}% match
                    </span>
                  </div>

                  <div className="w-full bg-[#f6f4ee] dark:bg-[#24272c] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isTop ? 'bg-[#2d4a3e] dark:bg-[#76a992]' : 'bg-[#8c887b]'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>

                  <p className="text-[#383531] dark:text-[#d6d3d1] text-[11px] leading-relaxed">
                    {doc.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-[#e8efe9] dark:bg-[#22352c] rounded-lg border border-[#2d4a3e]/30 text-[11px] text-[#2d4a3e] dark:text-[#76a992] leading-relaxed">
            <strong>Key Insight:</strong> Even with zero overlapping words, semantic vectors place <em>"automobile"</em> right next to <em>"electric cars and sedans"</em>!
          </div>
        </div>

      </div>

    </div>
  );
}
