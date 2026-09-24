import React, { useState } from 'react';
import { 
  X, Search, Sparkles, Compass, Database, Thermometer, Calculator, 
  Layers, Play, Filter, ArrowRight, CheckCircle2, Sliders, Cpu, Activity,
  Split, BarChart2, Scissors, Binary, BookOpen, Hash, MapPin, Smile,
  PieChart, ShieldAlert, Zap
} from 'lucide-react';

const ALL_INTERACTIVE_TOOLS = [
  // APPLIED SUITE (5)
  {
    id: "app-semantic",
    category: "applied",
    type: "lab",
    categoryLabel: "Applied Suite • Tool 1",
    title: "Semantic vs. Keyword Search Arena",
    description: "Side-by-side comparison: lexical keyword matching (BM25) vs. dense cosine embedding retrieval across 6 documents.",
    icon: Sparkles,
    color: "text-[#b85d38]",
    actionType: "applied_lab",
    labKey: "semantic"
  },
  {
    id: "app-vectors",
    category: "applied",
    type: "lab",
    categoryLabel: "Applied Suite • Tool 2",
    title: "Word2Vec Vector Arithmetic Playground",
    description: "Mikolov's geometric equation solver: King − Man + Woman = Queen, with SVG parallelogram and cosine nearest neighbors.",
    icon: Compass,
    color: "text-[#2d4a3e]",
    actionType: "applied_lab",
    labKey: "vectors"
  },
  {
    id: "app-rag",
    category: "applied",
    type: "lab",
    categoryLabel: "Applied Suite • Tool 3",
    title: "RAG from Scratch Simulator",
    description: "Interactive document chunking, sliding overlap, cosine similarity scoring, and prompt injection vs. hallucination.",
    icon: Database,
    color: "text-[#b85d38]",
    actionType: "applied_lab",
    labKey: "rag"
  },
  {
    id: "app-temp",
    category: "applied",
    type: "lab",
    categoryLabel: "Applied Suite • Tool 4",
    title: "LLM Next-Token & Temperature Simulator",
    description: "Interactive Softmax temperature dial (T: 0.0 to 1.4), Top-P nucleus sampling cutoff, and stochastic word generation.",
    icon: Thermometer,
    color: "text-[#2d4a3e]",
    actionType: "applied_lab",
    labKey: "temp"
  },
  {
    id: "app-cost",
    category: "applied",
    type: "lab",
    categoryLabel: "Applied Suite • Tool 5",
    title: "Token Economics & Context Calculator",
    description: "Real-time subword token estimator, reading speed, and comparative pricing across Gemini, GPT-4o, and Claude 3.5 Sonnet.",
    icon: Calculator,
    color: "text-[#8c887b]",
    actionType: "applied_lab",
    labKey: "cost"
  },

  // CAPSTONE PIPELINE & HERO (2)
  {
    id: "hero-parser",
    category: "foundations",
    type: "hero",
    categoryLabel: "Hero Real-Time Parser",
    title: "Keystroke Reactive Sentence Parser",
    description: "Type any sentence to see real-time token segmentation, stopword filtering, 3D coordinate mapping, and intent classification.",
    icon: Activity,
    color: "text-[#b85d38]",
    actionType: "hero",
    targetId: "hero-section"
  },
  {
    id: "capstone-pipeline",
    category: "capstone",
    type: "pipeline",
    categoryLabel: "Capstone Synthesis",
    title: "5-Stage End-of-Course Pipeline Builder",
    description: "Assemble raw text through cleaning, tokenization, TF-IDF vectorization, and spam classification with live step debugging.",
    icon: Layers,
    color: "text-[#2d4a3e]",
    actionType: "pipeline",
    targetId: "pipeline-builder"
  },

  // CURRICULUM LESSON SANDBOXES (15)
  {
    id: "sandbox-q1",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part I • Question 1",
    title: "Syntactic & Lexical Ambiguity Parser",
    description: "Explore double meanings, structural parse trees, and prepositional attachment ('We saw her duck', 'Time flies...').",
    qNum: 1,
    actionType: "lesson_sandbox",
    icon: Split
  },
  {
    id: "sandbox-q2",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part I • Question 2",
    title: "Corpus Profiler & Zipf's Law Explorer",
    description: "Analyze vocabulary richness, Type-Token Ratio (TTR), and observe Zipf's power-law frequency distributions in real time.",
    qNum: 2,
    actionType: "lesson_sandbox",
    icon: BarChart2
  },
  {
    id: "sandbox-q3",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part I • Question 3",
    title: "Regex Cleaning & Noise Reduction Lab",
    description: "Toggle live HTML stripping, regex normalization, punctuation removal, and stopword filtering with reduction stats.",
    qNum: 3,
    actionType: "lesson_sandbox",
    icon: Scissors
  },
  {
    id: "sandbox-q4",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part I • Question 4",
    title: "spaCy vs. NLTK Architectural Comparison",
    description: "Compare spaCy's unified C-level Doc memory pipeline with NLTK's decoupled functional Python toolchain.",
    qNum: 4,
    actionType: "lesson_sandbox",
    icon: Cpu
  },
  {
    id: "sandbox-q5",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part II • Question 5",
    title: "BPE Subword & Tokenizer Laboratory",
    description: "Test whitespace splitting vs character streams vs Byte-Pair Encoding (BPE) subword tiles with hash token IDs.",
    qNum: 5,
    actionType: "lesson_sandbox",
    icon: Hash
  },
  {
    id: "sandbox-q6",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part II • Question 6",
    title: "Porter Stemmer vs. WordNet Lemmatizer",
    description: "Side-by-side linguistic comparison showing when heuristic suffix chopping fails versus vocabulary-aware dictionary lemmas.",
    qNum: 6,
    actionType: "lesson_sandbox",
    icon: BookOpen
  },
  {
    id: "sandbox-q7",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part III • Question 7",
    title: "Vectorization & Memory Tradeoffs Matrix",
    description: "Interactive RAM and sparsity simulator comparing One-Hot arrays, Compressed Sparse Row (CSR) BoW, and dense embeddings.",
    qNum: 7,
    actionType: "lesson_sandbox",
    icon: Binary
  },
  {
    id: "sandbox-q8",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part III • Question 8",
    title: "TF-IDF Statistical Weighting Matrix",
    description: "Calculate dynamic Term Frequency (TF) × Inverse Document Frequency (IDF) salience scores across editable documents.",
    qNum: 8,
    actionType: "lesson_sandbox",
    icon: Database
  },
  {
    id: "sandbox-q9",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part III • Question 9",
    title: "2D Semantic Embedding Space & Analogies",
    description: "Interactive coordinate canvas measuring cosine proximity and directional semantic vectors (King - Man + Woman = Queen).",
    qNum: 9,
    actionType: "lesson_sandbox",
    icon: Compass
  },
  {
    id: "sandbox-q10",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part III • Question 10",
    title: "Word2Vec Sliding Window (CBOW & Skip-Gram)",
    description: "Sweep a context horizon across tokens to inspect training pairs for Continuous Bag-of-Words and Skip-Gram.",
    qNum: 10,
    actionType: "lesson_sandbox",
    icon: Sliders
  },
  {
    id: "sandbox-q11",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part IV • Question 11",
    title: "Named Entity Recognition (NER) & BIO Tagger",
    description: "Extract real-world entities (Persons, Organizations, Locations) and inspect token-level BIO sequence tags.",
    qNum: 11,
    actionType: "lesson_sandbox",
    icon: MapPin
  },
  {
    id: "sandbox-q12",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part IV • Question 12",
    title: "Sentiment Valence & Negation Analyzer",
    description: "Gauge emotional polarity from -1.0 to +1.0 and observe how negation modifiers dynamically invert sentiment.",
    qNum: 12,
    actionType: "lesson_sandbox",
    icon: Smile
  },
  {
    id: "sandbox-q13",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part IV • Question 13",
    title: "LDA Probabilistic Topic Mixture Modeler",
    description: "Adjust topic proportion weights to generate probabilistic document word distributions across thematic clusters.",
    qNum: 13,
    actionType: "lesson_sandbox",
    icon: PieChart
  },
  {
    id: "sandbox-q14",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part IV • Question 14",
    title: "Naive Bayes Text & Spam Classifier",
    description: "Test incoming messages against weighted trigger features with real-time log-odds inference and confidence gauges.",
    qNum: 14,
    actionType: "lesson_sandbox",
    icon: ShieldAlert
  },
  {
    id: "sandbox-q15",
    category: "curriculum",
    type: "lesson",
    categoryLabel: "Part V • Question 15",
    title: "Transformer Self-Attention Disambiguator",
    description: "Explore how self-attention heads resolve ambiguous pronouns ('it' -> animal vs street) using weighted token connections.",
    qNum: 15,
    actionType: "lesson_sandbox",
    icon: Zap
  }
];

export default function InteractiveDirectoryModal({ isOpen, onClose, onNavigateToTool }) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all"); // 'all' | 'applied' | 'curriculum' | 'capstone'

  if (!isOpen) return null;

  const filteredTools = ALL_INTERACTIVE_TOOLS.filter((t) => {
    const matchesCat = filterCategory === "all" || t.category === filterCategory;
    const q = search.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesSearch = 
      t.title.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q) || 
      t.categoryLabel.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleLaunch = (tool) => {
    onClose();
    onNavigateToTool(tool);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141618]/80 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-3 border-b border-[#2e3238] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg border border-[#3e4249] bg-[#1c1e21] flex items-center justify-center font-serif text-sm text-[#b85d38]">
            ✦
          </div>
          <div>
            <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-[#f5f2ea] block">
              Interactive Tools Directory
            </span>
            <span className="font-mono text-[10px] text-[#a6a197] uppercase tracking-wider">
              22 Live Sandboxes, Simulators & Labs
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#1c1e21] border border-[#2e3238] text-[#a6a197] hover:text-[#f5f2ea] transition"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full py-4 space-y-4">
        
        {/* Controls: Search & Category Filter */}
        <div className="p-4 bg-[#fbfaf8] dark:bg-[#1c1e21] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] shadow-sm space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tool name, concept (e.g. 'rag', 'temperature', 'zipf', 'vector', 'token')..."
              className="w-full p-2.5 pl-9 rounded-lg bg-white dark:bg-[#141618] border border-[#e5e2da] dark:border-[#2e3238] text-xs font-mono text-[#1c1917] dark:text-[#f5f2ea] focus:outline-none focus:border-[#b85d38]"
              autoFocus
            />
            <Search className="w-3.5 h-3.5 text-[#8c887b] absolute left-3 top-3" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2.5 text-xs text-[#8c887b] hover:text-[#1c1917]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
            <span className="text-[10px] text-[#8c887b] uppercase tracking-wider mr-1">Categories:</span>
            {[
              { key: "all", label: `All (${ALL_INTERACTIVE_TOOLS.length})` },
              { key: "applied", label: "Applied Suite (5)" },
              { key: "curriculum", label: "Lesson Sandboxes (15)" },
              { key: "capstone", label: "Pipeline & Hero (2)" }
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterCategory(f.key)}
                className={`px-2.5 py-1 rounded-md text-xs transition border ${
                  filterCategory === f.key
                    ? 'border-[#2d4a3e] bg-[#2d4a3e] text-white font-medium dark:bg-[#4d7a66]'
                    : 'border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#141618] text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Help Note */}
        <div className="flex items-center justify-between text-xs font-mono text-[#8c887b] px-1">
          <span>Showing {filteredTools.length} interactive elements</span>
          <span className="hidden sm:inline">Click any tool to jump directly and launch its interactive demo tab</span>
        </div>

        {/* Grid of Interactive Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
          {filteredTools.map((tool) => {
            const Icon = tool.icon || Sliders;
            return (
              <div
                key={tool.id}
                onClick={() => handleLaunch(tool)}
                className="cursor-pointer p-4 rounded-xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] hover:border-[#b85d38] dark:hover:border-[#d97753] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8c887b] dark:text-[#a6a197]">
                    <span className="uppercase tracking-wider font-semibold text-[#b85d38] dark:text-[#d97753]">
                      {tool.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[#2d4a3e] dark:text-[#76a992]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d4a3e] dark:bg-[#76a992]"></span>
                      Interactive
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-medium text-[#1c1917] dark:text-[#f5f2ea] flex items-center gap-2 group-hover:text-[#b85d38] dark:group-hover:text-[#d97753] transition">
                    <Icon className="w-4 h-4 text-[#8c887b] group-hover:text-[#b85d38] dark:group-hover:text-[#d97753] transition flex-shrink-0" />
                    <span>{tool.title}</span>
                  </h4>

                  <p className="font-sans text-xs text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-[#eeebe3] dark:border-[#2b2e34] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8c887b]">
                    {tool.actionType === "applied_lab" ? "Lab Tool" : tool.actionType === "lesson_sandbox" ? "Curriculum Sandbox" : "Capstone"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(tool);
                    }}
                    className="px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-[#f6f4ee] group-hover:bg-[#2d4a3e] group-hover:text-white dark:bg-[#24272c] dark:group-hover:bg-[#4d7a66] text-[#1c1917] dark:text-[#f5f2ea] transition flex items-center gap-1.5"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
