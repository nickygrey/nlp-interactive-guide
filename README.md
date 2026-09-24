# Natural Language Processing: An Interactive Compendium

An interactive educational web portal designed in a **Minimalist Scandinavian Editorial** aesthetic, exploring the 15 fundamental questions of Natural Language Processing (NLP)—from basic tokenization and Zipf's law to Word2Vec, TF-IDF, and modern Transformer self-attention.

---

## Highlights

- **Dual-Perspective Mode**: Toggle between **Plain English** (tangible real-world analogies like Lego bricks, postal mail, and email spam) and **Deep Tech** (mathematical formulas, vector spaces, and Python implementations).
- **15 Interactive Sandboxes**: Live browser-based visualizers for token parsing, stopword filtering, word vectors, topic modeling, and self-attention weight heatmaps.
- **Applied Production Suite**:
  - **1. Semantic Search vs. Keyword Arena**: Live side-by-side search comparing exact lexical matching (BM25) against dense vector similarity.
  - **2. LLM Next-Token & Temperature Simulator**: Interactive Softmax temperature scaling and Top-P (nucleus sampling) next-word generator.
  - **3. Token Cost & Context Window Calculator**: Real-time token estimator and inference pricing comparisons across Gemini 1.5 Flash, GPT-4o, and Claude 3.5 Sonnet.
- **Certificate & Reference Cheat Sheet**: Personalized printable completion diploma and a 1-page reference cheat sheet with formulas and rules of thumb.
- **Standalone Slide Deck**: Interactive presentation mode and a 18-slide PowerPoint Keynote (`.pptx`) download included.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## Curriculum Overview

- **Part I: Foundations of Text** (Q1–Q4): Linguistic diversity, Zipf's law, corpus length distributions, stopword mechanics.
- **Part II: Words & Tokens** (Q5–Q6): Tokenization pitfalls, stemming vs. lemmatization, Byte-Pair Encoding (BPE).
- **Part III: Words into Numbers** (Q7–Q10): Bag-of-Words, TF-IDF statistical salience, Word2Vec geometric embeddings, cosine similarity.
- **Part IV: Extracting Meaning** (Q11–Q14): Part-of-speech tagging, named entity recognition (NER), topic modeling (LDA), sentiment classification.
- **Part V: Modern Transformers & Pretrained LLMs** (Q15): Query-Key-Value self-attention, masked language modeling, temperature scaling.

---

## License

MIT
