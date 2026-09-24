import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Copy, Check, HelpCircle, Code2, FlaskConical, BookOpen } from 'lucide-react';

// Dynamic Sandbox Loader
import AmbiguitySandbox from './Sandboxes/AmbiguitySandbox';
import CorpusProfilerSandbox from './Sandboxes/CorpusProfilerSandbox';
import CleaningLabSandbox from './Sandboxes/CleaningLabSandbox';
import SpacyNltkSandbox from './Sandboxes/SpacyNltkSandbox';
import TokenizerSandbox from './Sandboxes/TokenizerSandbox';
import MorphologySandbox from './Sandboxes/MorphologySandbox';
import VectorMatrixSandbox from './Sandboxes/VectorMatrixSandbox';
import TfIdfMatrixSandbox from './Sandboxes/TfIdfMatrixSandbox';
import VectorUniverseSandbox from './Sandboxes/VectorUniverseSandbox';
import Word2VecWindowSandbox from './Sandboxes/Word2VecWindowSandbox';
import NERHighlighterSandbox from './Sandboxes/NERHighlighterSandbox';
import SentimentGaugeSandbox from './Sandboxes/SentimentGaugeSandbox';
import LdaTopicSandbox from './Sandboxes/LdaTopicSandbox';
import ClassifierSandbox from './Sandboxes/ClassifierSandbox';
import TransformerAttentionSandbox from './Sandboxes/TransformerAttentionSandbox';

const SANDBOX_MAP = {
  ambiguity: AmbiguitySandbox,
  corpus: CorpusProfilerSandbox,
  cleaning: CleaningLabSandbox,
  spacy_nltk: SpacyNltkSandbox,
  tokenizer: TokenizerSandbox,
  morphology: MorphologySandbox,
  vector_matrix: VectorMatrixSandbox,
  tfidf_matrix: TfIdfMatrixSandbox,
  vector_universe: VectorUniverseSandbox,
  word2vec_window: Word2VecWindowSandbox,
  ner_highlighter: NERHighlighterSandbox,
  sentiment_gauge: SentimentGaugeSandbox,
  lda_topic: LdaTopicSandbox,
  classifier: ClassifierSandbox,
  transformer_attention: TransformerAttentionSandbox
};

export default function TopicCard({ 
  topic, 
  personaMode, 
  isCompleted, 
  onMarkComplete 
}) {
  const [activeTab, setActiveTab] = useState(personaMode === 'story' ? 'story' : 'technical');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Synchronize with personaMode when changed from header
  React.useEffect(() => {
    if (personaMode === 'story') {
      setActiveTab('story');
    } else {
      setActiveTab('technical');
    }
  }, [personaMode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(topic.codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleQuizSelect = (idx) => {
    setSelectedQuizAnswer(idx);
    setIsQuizSubmitted(true);

    if (idx === topic.quiz.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.75 }
      });
      onMarkComplete(topic.qNum);
    }
  };

  const SandboxComponent = SANDBOX_MAP[topic.interactiveType] || (() => <div>Sandbox coming soon</div>);

  return (
    <article 
      id={`topic-${topic.qNum}`} 
      className="p-6 sm:p-9 bg-white dark:bg-[#1c1e21] rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-7 transition-colors duration-200"
    >
      
      {/* Question Meta Line */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#eeebe3] dark:border-[#2b2e34]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#8c887b] dark:text-[#a6a197]">
            <span>{topic.act}</span>
            <span>•</span>
            <span>Question {topic.qNum} of 15</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1917] dark:text-[#f5f2ea] tracking-tight leading-snug">
            {topic.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] font-sans">
            {topic.subtitle}
          </p>
        </div>

        {/* Completion Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          {isCompleted ? (
            <span className="px-2.5 py-1 rounded-full bg-[#2d4a3e]/10 text-[#2d4a3e] dark:bg-[#4d7a66]/20 dark:text-[#76a992] border border-[#2d4a3e]/20 text-[11px] font-mono flex items-center gap-1.5">
              <span>✓</span> Completed
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-[#f6f4ee] dark:bg-[#24272c] text-[#8c887b] dark:text-[#78716c] border border-[#ebe7de] dark:border-[#2e3238] text-[11px] font-mono">
              In Progress
            </span>
          )}
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1 border-b border-[#eeebe3] dark:border-[#2b2e34] text-xs overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('story')}
          className={`pb-2.5 px-3.5 font-medium border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'story'
              ? 'border-[#b85d38] text-[#b85d38] dark:border-[#d97753] dark:text-[#d97753]'
              : 'border-transparent text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
          }`}
        >
          <span>Plain English</span>
        </button>

        <button
          onClick={() => setActiveTab('interactive')}
          className={`pb-2.5 px-3.5 font-medium border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'interactive'
              ? 'border-[#b85d38] text-[#b85d38] dark:border-[#d97753] dark:text-[#d97753]'
              : 'border-transparent text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Interactive Demo</span>
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`pb-2.5 px-3.5 font-medium border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'technical'
              ? 'border-[#2d4a3e] text-[#2d4a3e] dark:border-[#4d7a66] dark:text-[#76a992]'
              : 'border-transparent text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Under the Hood (Math & Tech)</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`pb-2.5 px-3.5 font-medium border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'code'
              ? 'border-[#1c1917] text-[#1c1917] dark:border-[#f5f2ea] dark:text-[#f5f2ea]'
              : 'border-transparent text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Python Code</span>
        </button>
      </div>

      {/* Tab 1: Plain-English Story */}
      {activeTab === 'story' && (
        <div className="p-6 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-5">
          <div className="border-b border-[#eeebe3] dark:border-[#2b2e34] pb-3.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#b85d38] dark:text-[#d97753] block mb-1">
              {topic.plainEnglish.headline}
            </span>
            <h3 className="font-serif text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
              {topic.plainEnglish.metaphorName}
            </h3>
          </div>

          <div className="font-serif text-sm sm:text-base text-[#383531] dark:text-[#d6d3d1] leading-relaxed whitespace-pre-line space-y-3">
            {topic.plainEnglish.story}
          </div>

          <div className="p-4 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8c887b] dark:text-[#a6a197] block font-semibold">
              Key Takeaways: What You Need to Know
            </span>
            <ul className="text-xs text-[#57534e] dark:text-[#a8a29e] space-y-1.5 list-disc list-inside font-sans">
              {topic.plainEnglish.takeaways.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Sandbox */}
      {activeTab === 'interactive' && (
        <div className="p-6 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eeebe3] dark:border-[#2b2e34]">
            <span className="text-xs font-mono text-[#57534e] dark:text-[#a8a29e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2d4a3e] dark:bg-[#4d7a66]"></span>
              Live Interactive Simulator
            </span>
            <span className="text-[11px] font-mono text-[#8c887b] dark:text-[#78716c]">Runs locally in your browser</span>
          </div>
          <SandboxComponent />
        </div>
      )}

      {/* Tab 3: Math & Deep Tech */}
      {activeTab === 'technical' && (
        <div className="p-6 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-5 text-xs sm:text-sm">
          <div className="border-b border-[#eeebe3] dark:border-[#2b2e34] pb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#2d4a3e] dark:text-[#4d7a66] block mb-1">
              Engineering Architecture
            </span>
            <h3 className="font-serif text-xl font-medium text-[#1c1917] dark:text-[#f5f2ea]">
              {topic.technical.headline}
            </h3>
          </div>

          <p className="text-[#57534e] dark:text-[#a8a29e] leading-relaxed text-xs sm:text-sm font-sans">
            {topic.technical.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {topic.technical.layers.map((layer, i) => (
              <div key={i} className="p-3.5 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] space-y-1">
                <strong className="text-[#1c1917] dark:text-[#f5f2ea] block text-xs font-serif">{layer.name}</strong>
                <p className="text-[11px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] font-mono text-xs">
            <span className="text-[#8c887b] dark:text-[#78716c] block text-[10px] uppercase tracking-wider font-semibold mb-1">
              Mathematical Formulation:
            </span>
            <div className="text-[#2d4a3e] dark:text-[#76a992] break-all">
              {topic.technical.mathFormula}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Python Code */}
      {activeTab === 'code' && (
        <div className="p-5 bg-[#181a1d] rounded-xl border border-[#2e3238] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#2e3238]">
            <span className="text-xs font-mono text-[#a6a197]">Python Implementation</span>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded bg-[#24272c] hover:bg-[#2e3238] text-[#f5f2ea] text-xs font-mono flex items-center gap-1.5 transition"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#76a992]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3 bg-[#141618] rounded-lg border border-[#24272c] overflow-x-auto font-mono text-xs text-[#e5e2da] leading-relaxed">
            <code>{topic.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Quick Checkpoint */}
      <div className="p-5 bg-[#fbfaf8] dark:bg-[#181a1d] rounded-xl border border-[#e5e2da] dark:border-[#2e3238] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#b85d38] dark:text-[#d97753]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Quick Check: Did this make sense?</span>
        </div>

        <p className="text-xs sm:text-sm font-medium text-[#1c1917] dark:text-[#f5f2ea]">
          {topic.quiz.question}
        </p>

        <div className="space-y-2 pt-1">
          {topic.quiz.options.map((opt, i) => {
            const isSelected = selectedQuizAnswer === i;
            const isCorrect = i === topic.quiz.correctIndex;
            let btnStyle = "bg-white dark:bg-[#1c1e21] border-[#e5e2da] dark:border-[#2e3238] text-[#44403c] dark:text-[#d6d3d1] hover:border-[#b85d38]/50";

            if (isQuizSubmitted) {
              if (isCorrect) {
                btnStyle = "bg-[#e8efe9] dark:bg-[#22352c] text-[#2d4a3e] dark:text-[#76a992] border-[#2d4a3e]/40 font-medium";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-[#fbeeed] dark:bg-[#382323] text-[#b83838] dark:text-[#e07575] border-[#b83838]/40";
              }
            }

            return (
              <button
                key={i}
                disabled={isQuizSubmitted}
                onClick={() => handleQuizSelect(i)}
                className={`w-full p-2.5 text-left rounded-lg border transition text-xs flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${btnStyle}`}
              >
                <span>{opt}</span>
                {isQuizSubmitted && isCorrect && <span className="text-[#2d4a3e] dark:text-[#76a992] font-mono text-[11px] ml-2">✓ Correct</span>}
                {isQuizSubmitted && isSelected && !isCorrect && <span className="text-[#b83838] dark:text-[#e07575] font-mono text-[11px] ml-2">✗ Incorrect</span>}
              </button>
            );
          })}
        </div>

        {isQuizSubmitted && (
          <div className="p-3 bg-white dark:bg-[#1c1e21] rounded-lg border border-[#e5e2da] dark:border-[#2e3238] text-xs text-[#57534e] dark:text-[#a8a29e] leading-relaxed">
            <strong className="text-[#1c1917] dark:text-[#f5f2ea] block mb-0.5 font-mono uppercase text-[10px]">Why this matters:</strong>
            {topic.quiz.explanation}
          </div>
        )}
      </div>

    </article>
  );
}
