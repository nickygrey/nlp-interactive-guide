import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ActRoadmap from './components/ActRoadmap';
import TopicCard from './components/TopicCard';
import InteractivePipelineBuilder from './components/InteractivePipelineBuilder';
import PresentationDeckModal from './components/PresentationDeckModal';
import CertificateModal from './components/CertificateModal';
import InteractiveDirectoryModal from './components/InteractiveDirectoryModal';
import SemanticSearchLab from './components/Labs/SemanticSearchLab';
import VectorArithmeticLab from './components/Labs/VectorArithmeticLab';
import RagSimulatorLab from './components/Labs/RagSimulatorLab';
import TemperatureSimulatorLab from './components/Labs/TemperatureSimulatorLab';
import TokenCostCalculatorLab from './components/Labs/TokenCostCalculatorLab';
import Footer from './components/Footer';
import { CURRICULUM_DATA } from './data/curriculumData';
import { FlaskConical, Award, Sparkles, Compass, Database, Thermometer, Calculator, FileText } from 'lucide-react';

export default function App() {
  const [personaMode, setPersonaMode] = useState('story'); // 'story' | 'tech'
  const [completedQuestions, setCompletedQuestions] = useState([1]);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [cardTabOverrides, setCardTabOverrides] = useState({});
  const [activeLabTab, setActiveLabTab] = useState('semantic'); // 'semantic' | 'temp' | 'cost'
  const [theme, setTheme] = useState('light'); // Minimalist Scandinavian default: light warm chalk

  useEffect(() => {
    // Ensure document reflects the light theme initially
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const handleMarkComplete = (qNum) => {
    setCompletedQuestions(prev => (prev.includes(qNum) ? prev : [...prev, qNum]));
  };

  const scrollToTopic = (qNum) => {
    const el = document.getElementById(`topic-${qNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToLabs = () => {
    const el = document.getElementById('applied-labs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPipeline = () => {
    const el = document.getElementById('pipeline-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToTool = (tool) => {
    setIsDirectoryOpen(false);

    // Wait 120ms for modal overlay to clear so scroll calculations are unobstructed
    setTimeout(() => {
      // 1. Applied Suite Labs (5 tools)
      if (tool.actionType === 'applied_lab' || tool.category === 'applied' || tool.labKey) {
        if (tool.labKey) {
          setActiveLabTab(tool.labKey);
        }
        scrollToLabs();
      } 
      // 2. Curriculum Module Sandboxes (15 tools)
      else if (tool.actionType === 'lesson_sandbox' || tool.category === 'curriculum' || tool.qNum) {
        const qNum = tool.qNum;
        if (qNum) {
          setCardTabOverrides(prev => ({
            ...prev,
            [qNum]: { tab: 'interactive', ts: Date.now() }
          }));
          scrollToTopic(qNum);
        }
      } 
      // 3. Capstone Synthesis Pipeline
      else if (tool.actionType === 'pipeline' || tool.id === 'capstone-pipeline') {
        scrollToPipeline();
      } 
      // 4. Hero Live Parser
      else if (tool.actionType === 'hero' || tool.id === 'hero-parser') {
        const el = document.getElementById('hero-parser-widget') || document.getElementById('hero-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-[#1c1917] dark:bg-[#141618] dark:text-[#f5f2ea] transition-colors duration-200">
      <Header
        personaMode={personaMode}
        setPersonaMode={setPersonaMode}
        completedCount={completedQuestions.length}
        totalCount={CURRICULUM_DATA.length}
        onOpenDeck={() => setIsDeckOpen(true)}
        onOpenCert={() => setIsCertOpen(true)}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1">
        <HeroSection
          personaMode={personaMode}
          onStartJourney={() => scrollToTopic(1)}
          onOpenDeck={() => setIsDeckOpen(true)}
          onOpenDirectory={() => setIsDirectoryOpen(true)}
        />

        <ActRoadmap
          completedQuestions={completedQuestions}
          onSelectAct={scrollToTopic}
          onSelectLab={scrollToLabs}
        />

        {/* 15 Topics List */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
          {CURRICULUM_DATA.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              personaMode={personaMode}
              isCompleted={completedQuestions.includes(topic.qNum)}
              onMarkComplete={handleMarkComplete}
              forcedTab={cardTabOverrides[topic.qNum]}
            />
          ))}

          {/* Applied NLP Laboratory Suite */}
          <section id="applied-labs" className="scroll-mt-20 pt-8 border-t border-[#e5e2da] dark:border-[#2e3238] space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] text-xs font-mono text-[#b85d38] dark:text-[#d97753]">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Interactive Applied NLP Laboratory Suite</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1c1917] dark:text-[#f5f2ea] tracking-tight">
                Production Simulators & Tools
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
                Step beyond the individual lessons into five specialized engineering sandboxes designed to explore vector geometry, dense RAG retrieval, temperature dynamics, and enterprise token economics.
              </p>

              {/* Lab Navigation Switcher */}
              <div className="inline-flex flex-wrap items-center justify-center bg-[#f0ede6] dark:bg-[#202327] rounded-xl p-1 border border-[#e5e2da] dark:border-[#2e3238] gap-1 mt-4 max-w-full overflow-x-auto">
                <button
                  onClick={() => setActiveLabTab('semantic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                    activeLabTab === 'semantic'
                      ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-sm font-semibold'
                      : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-[#b85d38] dark:text-[#d97753]" />
                  <span>1. Semantic Search</span>
                </button>
                <button
                  onClick={() => setActiveLabTab('vectors')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                    activeLabTab === 'vectors'
                      ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-sm font-semibold'
                      : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                  }`}
                >
                  <Compass className="w-3 h-3 text-[#2d4a3e] dark:text-[#76a992]" />
                  <span>2. Vector Arithmetic</span>
                </button>
                <button
                  onClick={() => setActiveLabTab('rag')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                    activeLabTab === 'rag'
                      ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-sm font-semibold'
                      : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                  }`}
                >
                  <Database className="w-3 h-3 text-[#b85d38] dark:text-[#d97753]" />
                  <span>3. RAG Simulator</span>
                </button>
                <button
                  onClick={() => setActiveLabTab('temp')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                    activeLabTab === 'temp'
                      ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-sm font-semibold'
                      : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                  }`}
                >
                  <Thermometer className="w-3 h-3 text-[#2d4a3e] dark:text-[#76a992]" />
                  <span>4. LLM Temperature</span>
                </button>
                <button
                  onClick={() => setActiveLabTab('cost')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                    activeLabTab === 'cost'
                      ? 'bg-white dark:bg-[#141618] text-[#1c1917] dark:text-[#f5f2ea] shadow-sm font-semibold'
                      : 'text-[#646059] dark:text-[#a6a197] hover:text-[#1c1917] dark:hover:text-[#f5f2ea]'
                  }`}
                >
                  <Calculator className="w-3 h-3 text-[#8c887b]" />
                  <span>5. Token Economics</span>
                </button>
              </div>
            </div>

            {/* Active Lab Component */}
            <div className="pt-2">
              {activeLabTab === 'semantic' && <SemanticSearchLab />}
              {activeLabTab === 'vectors' && <VectorArithmeticLab />}
              {activeLabTab === 'rag' && <RagSimulatorLab />}
              {activeLabTab === 'temp' && <TemperatureSimulatorLab />}
              {activeLabTab === 'cost' && <TokenCostCalculatorLab />}
            </div>
          </section>

          {/* End-of-Course Capstone Sandbox */}
          <InteractivePipelineBuilder />

          {/* Certificate & Reference Cheat Sheet Callout Card */}
          <section className="pt-4 pb-2">
            <div className="p-8 sm:p-10 rounded-2xl border border-[#e5e2da] dark:border-[#2e3238] bg-white dark:bg-[#1c1e21] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-[11px] uppercase tracking-widest text-[#b85d38] dark:text-[#d97753]">
                  <Award className="w-4 h-4" />
                  <span>Verification & Field Reference</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#1c1917] dark:text-[#f5f2ea]">
                  Claim Your Certificate & 1-Page Cheat Sheet
                </h3>
                <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#a8a29e] max-w-lg leading-relaxed">
                  Generate your personalized Scandinavian Diploma certifying your verified competency across all 15 curriculum modules, or print the 1-Page Field Cheat Sheet for quick reference.
                </p>
              </div>
              <button
                onClick={() => setIsCertOpen(true)}
                className="px-5 py-3 rounded-xl bg-[#2d4a3e] hover:bg-[#233b31] dark:bg-[#4d7a66] dark:hover:bg-[#3d6353] text-white font-mono text-xs font-semibold flex items-center gap-2 transition shadow-sm whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-[#e5b382]" />
                <span>Open Certificate & Cheat Sheet</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenDeck={() => setIsDeckOpen(true)} />

      <PresentationDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
      />

      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        completedCount={completedQuestions.length}
        totalCount={CURRICULUM_DATA.length}
      />

      <InteractiveDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        onNavigateToTool={handleNavigateToTool}
      />
    </div>
  );
}
