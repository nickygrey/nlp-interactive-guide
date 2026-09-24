import React, { useState } from 'react';
import { Award, Printer, X, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, completedCount, totalCount }) {
  const [activeTab, setActiveTab] = useState('certificate');
  const [recipientName, setRecipientName] = useState("Curious Learner");

  if (!isOpen) return null;

  const todayStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141618]/80 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* Top Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-3 border-b border-[#2e3238] text-xs print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'bg-[#f5f2ea] text-[#1c1917] font-semibold'
                : 'bg-[#1c1e21] text-[#a6a197] hover:text-[#f5f2ea]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#b85d38]" />
            <span>Mastery Certificate</span>
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition flex items-center gap-1.5 ${
              activeTab === 'cheatsheet'
                ? 'bg-[#f5f2ea] text-[#1c1917] font-semibold'
                : 'bg-[#1c1e21] text-[#a6a197] hover:text-[#f5f2ea]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#2d4a3e]" />
            <span>1-Page Field Cheat Sheet</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-[#f5f2ea] hover:bg-white text-[#1c1917] font-mono text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#b85d38]" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1c1e21] border border-[#2e3238] text-[#a6a197] hover:text-[#f5f2ea] transition"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full py-4">
        
        {/* VIEW 1: DIPLOMA CERTIFICATE */}
        {activeTab === 'certificate' && (
          <div className="p-8 sm:p-14 bg-[#fbfaf8] text-[#1c1917] rounded-2xl border-2 border-[#e5e2da] shadow-2xl space-y-8 text-center relative print:shadow-none print:border print:m-0 print:p-8">
            
            {/* Scandinavian Certificate Header */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-[#e5e2da] bg-white mx-auto flex items-center justify-center font-serif text-xl text-[#b85d38] shadow-sm">
                ✦
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8c887b] block">
                Certificate of Foundational Competency
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                Natural Language Processing
              </h2>
              <div className="w-16 h-0.5 bg-[#b85d38] mx-auto opacity-75"></div>
            </div>

            {/* Recipient Input */}
            <div className="space-y-2 max-w-lg mx-auto">
              <p className="font-serif italic text-sm text-[#57534e]">Presented to</p>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full text-center font-serif text-2xl sm:text-3xl font-medium text-[#1c1917] border-b border-[#e5e2da] bg-transparent focus:outline-none focus:border-[#b85d38] py-1"
                placeholder="Type your name here..."
                title="Click to type your name"
              />
              <p className="font-sans text-xs sm:text-sm text-[#57534e] leading-relaxed pt-2 max-w-lg mx-auto">
                Thank you my friend, for listening, trying and participating. You have successfully explored with me 15 core principles of computational linguistics, vector representation, and transformer architectures.
              </p>
            </div>

            {/* Verified Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto text-left pt-2">
              {[
                "Syntactic Parsing & Ambiguity",
                "Zipf's Law & Corpus Profiling",
                "Subword Tokenization (BPE)",
                "Dense Vector Embeddings",
                "TF-IDF Statistical Salience",
                "Transformer Self-Attention"
              ].map((skill, i) => (
                <div key={i} className="p-2.5 bg-white rounded-lg border border-[#e5e2da] flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d4a3e] flex-shrink-0" />
                  <span className="font-mono text-[10px] text-[#1c1917] leading-snug">{skill}</span>
                </div>
              ))}
            </div>

            {/* Signatures & Date */}
            <div className="flex items-center justify-between border-t border-[#eeebe3] pt-6 max-w-lg mx-auto text-xs font-mono text-[#8c887b]">
              <div>
                <span className="block text-[#1c1917] font-serif italic text-sm font-semibold">Natural Language Processing</span>
                <span>Interactive Compendium</span>
              </div>
              <div className="text-right">
                <span className="block text-[#1c1917] font-semibold">{todayStr}</span>
                <span>Verified Curriculum</span>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: 1-PAGE CHEAT SHEET */}
        {activeTab === 'cheatsheet' && (
          <div className="p-8 bg-[#fbfaf8] text-[#1c1917] rounded-2xl border border-[#e5e2da] shadow-2xl space-y-6 text-xs font-sans print:shadow-none print:border print:m-0 print:p-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#eeebe3]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c887b]">1-Page Field Card</span>
                <h3 className="font-serif text-xl font-medium text-[#1c1917]">The Essential NLP Reference Sheet</h3>
              </div>
              <span className="font-mono text-[11px] text-[#2d4a3e]">Updated for Modern AI</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Core Definitions */}
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2da] space-y-2">
                <strong className="font-serif text-sm text-[#1c1917] block">1. The 4 Structural Layers</strong>
                <ul className="space-y-1 text-[11px] text-[#57534e]">
                  <li><strong>Morphology:</strong> Word structure (un-break-able).</li>
                  <li><strong>Syntax:</strong> Grammatical dependency trees (Subject-Verb-Object).</li>
                  <li><strong>Semantics:</strong> Word meanings and truth conditions.</li>
                  <li><strong>Pragmatics:</strong> Situational context and intent.</li>
                </ul>
              </div>

              {/* Card 2: Essential Formulas */}
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2da] space-y-2">
                <strong className="font-serif text-sm text-[#1c1917] block">2. Essential Math Formulas</strong>
                <div className="font-mono text-[10px] space-y-1.5 text-[#2d4a3e]">
                  <div><strong>Zipf's Law:</strong> Frequency ∝ 1 / Rank</div>
                  <div><strong>Cosine Similarity:</strong> cos(θ) = (u · v) / (||u|| ||v||)</div>
                  <div><strong>TF-IDF:</strong> TF(t, d) × log( |D| / DF(t) )</div>
                  <div><strong>Attention:</strong> softmax(QKᵀ / √d) V</div>
                </div>
              </div>

              {/* Card 3: Rule of Thumb Rules */}
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2da] space-y-2">
                <strong className="font-serif text-sm text-[#1c1917] block">3. When to Use What</strong>
                <ul className="space-y-1 text-[11px] text-[#57534e]">
                  <li><strong>Stemming vs. Lemma:</strong> Use Stemming for raw speed in basic search; use Lemmatization when grammar and root words matter.</li>
                  <li><strong>spaCy vs. NLTK:</strong> Use NLTK to learn linguistics; use spaCy to build real-world software.</li>
                  <li><strong>Subword BPE:</strong> Modern standard. Breaks rare words into syllables so no word is ever unknown.</li>
                </ul>
              </div>

              {/* Card 4: Evaluation & Accuracy Trap */}
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2da] space-y-2">
                <strong className="font-serif text-sm text-[#1c1917] block">4. The Accuracy Trap</strong>
                <ul className="space-y-1 text-[11px] text-[#57534e]">
                  <li><strong>The Trap:</strong> On 99% normal email, an AI that predicts "normal" 100% of the time claims 99% accuracy while letting all spam through!</li>
                  <li><strong>Precision:</strong> When model alarms "Spam!", how often is it right?</li>
                  <li><strong>Recall:</strong> Out of all real spam, how much was caught?</li>
                  <li><strong>F1-Score:</strong> Harmonic mean balancing both metrics.</li>
                </ul>
              </div>

            </div>

            <div className="p-3 bg-[#f6f4ee] rounded-lg border border-[#ebe7de] text-[11px] text-[#57534e] text-center font-mono">
              ✦ Natural Language Processing Interactive Compendium • Designed for Print & Quick Desk Reference
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
