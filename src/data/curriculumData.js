export const CURRICULUM_DATA = [
  {
    id: "what-is-nlp",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 1,
    chapter: "Chapter 01",
    title: "What is NLP?",
    subtitle: "Why human conversation confuses computers",
    tagline: "How machines learn to make sense of human slang, context, and messy grammar.",
    plainEnglish: {
      metaphorName: "The Conversational Maze",
      metaphorIcon: "✦",
      headline: "Computers love clean rules. Human speech is full of shortcuts and double meanings.",
      story: `Computers love predictable rules. In Python or Excel, every comma and formula has an exact, unambiguous job. If you miss a bracket, the program halts.
Human speech is completely different. It's full of humor, slang, sarcasm, and context:
If someone texts you "I saw her duck", did they watch her pet bird, or did they watch her quickly crouch down to avoid being hit?
If you say "Time flies like an arrow, but fruit flies like a banana", the word "flies" flips from an action verb to a tiny fruit insect mid-sentence!
Natural Language Processing (NLP) is the branch of AI that teaches computers to make sense of this messiness—not by writing millions of brittle if-else rules, but with smart math that understands context and probability.`,
      takeaways: [
        "Context is king: A word's meaning changes depending on who says it and what sentence it's in.",
        "Ambiguity everywhere: The exact same sentence can have two completely different meanings.",
        "Beyond spellcheck: Understanding tone, intent, and subtext is much harder than matching letters."
      ]
    },
    technical: {
      headline: "The Four Core Layers of Computational Linguistics",
      overview: "Computational linguistics breaks raw text down into four structured layers, moving from individual word parts all the way up to high-level conversational context.",
      layers: [
        { name: "1. Morphology", desc: "How words are built from smaller parts (prefixes, roots, suffixes): un-break-able." },
        { name: "2. Syntax", desc: "The grammatical structure connecting words together (Subject, Verb, Object)." },
        { name: "3. Semantics", desc: "The actual meaning of words and how combining them creates true or false statements." },
        { name: "4. Pragmatics", desc: "Real-world context. 'Can you pass the salt?' is a request to hand over the shaker, not a medical test of your arm." }
      ],
      mathFormula: "P(W) = \\prod_{i=1}^n P(w_i \\mid w_1, w_2, \\dots, w_{i-1})"
    },
    codeSnippet: `import spacy

# Load spaCy's standard English model
nlp = spacy.load("en_core_web_sm")
doc = nlp("Language carries meaning that depends entirely on context.")

# Print each word, its part of speech, and its grammatical role
for token in doc:
    print(f"{token.text:12} POS: {token.pos_:6} Role: {token.dep_:8} Links to: {token.head.text}")`,
    quiz: {
      question: "Why do rule-based syntactic grammars (like regular expressions or nested if-else statements) fail when scaling to real-world natural language?",
      options: [
        "Context-free grammars cannot be parsed in polynomial time by modern algorithmic engines.",
        "Human language exhibits pervasive structural ambiguity, polysemy, and pragmatic context shifts that deterministic combinatorial rules cannot resolve.",
        "Regular expressions are mathematically incapable of matching non-ASCII Unicode characters in modern corpora.",
        "Deterministic rule engines require continuous GPU matrix recalculations that exhaust hardware cache memory."
      ],
      correctIndex: 1,
      explanation: "Human language is governed by context, non-literal idioms, and structural ambiguities (like prepositional phrase attachment). Hand-crafted deterministic rules suffer from combinatorial explosion and brittleness, whereas statistical and neural models evaluate continuous probabilistic context."
    },
    interactiveType: "ambiguity"
  },
  {
    id: "explore-text-data",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 2,
    chapter: "Chapter 02",
    title: "How to explore text data?",
    subtitle: "Taking inventory before you build",
    tagline: "Checking word counts, vocabulary diversity, and the strange rule of Zipf's Law.",
    plainEnglish: {
      metaphorName: "Taking Inventory",
      metaphorIcon: "✦",
      headline: "A tiny handful of common words dominate almost half of everything we write.",
      story: `Before you train any AI model, you need to know what's actually in your data: How long are your documents? Are people writing one-line tweets or ten-page legal briefs? How many unique words appear?
When you count words across any large collection of text, you'll immediately bump into a strange rule discovered by linguist George Zipf:
In almost every human language, the most common word appears roughly twice as often as the second most common, and ten times as often as the tenth!
A tiny handful of filler words (like "the", "and", "is", and "of") make up almost 50% of all the words you'll ever read.
Meanwhile, the words that actually matter (like "aspirin", "refund", or "battery") appear only a few times. Knowing this helps you filter out the noise and focus on words that carry real information.`,
      takeaways: [
        "Zipf's Law is everywhere: A few filler words take up most of the space in any dataset.",
        "Vocabulary Diversity (TTR): Measures how repetitive or diverse a text is (unique words divided by total words).",
        "Document Lengths: Knowing sentence length helps you set limits so your models don't run out of memory."
      ]
    },
    technical: {
      headline: "Exploratory Text Analysis & Statistical Distributions",
      overview: "Profiling a text dataset establishes baselines for vocabulary pruning, memory limits, and text normalization.",
      layers: [
        { name: "Type-Token Ratio (TTR)", desc: "TTR = |V| / N. The ratio of unique words (|V|) to total word count (N). High ratio = rich vocabulary." },
        { name: "Zipf's Power Law", desc: "Word frequency drops off sharply: Frequency ∝ 1 / Rank. A few words dominate; most words are rare." },
        { name: "Length Distributions", desc: "Plotting word counts per document reveals extreme outliers that could crash GPU memory." }
      ],
      mathFormula: "f(r) = \\frac{C}{r^s}, \\quad \\sum_{r=1}^{|V|} f(r) = 1, \\quad s \\approx 1.0"
    },
    codeSnippet: `import collections
import re

text = "Natural language processing helps computers read text. Machine learning models learn from text datasets."
tokens = re.findall(r"\\b[a-zA-Z]+\\b", text.lower())

counts = collections.Counter(tokens)
print("Total words:", len(tokens))
print("Unique words:", len(counts))
print("Vocabulary diversity (TTR):", f"{len(counts) / len(tokens):.2f}")
print("Top 3 most common words:", counts.most_common(3))`,
    quiz: {
      question: "When evaluating vocabulary growth across increasingly large corpora, why does the Type-Token Ratio (TTR = |V| / N) systematically decline rather than remain constant?",
      options: [
        "As sample size N expands, closed-class grammatical tokens continue accumulating linearly while the discovery rate of new lexical types asymptotically diminishes according to Heaps' Law.",
        "Zipf's Law forces high-frequency rank-one terms to be pruned from the active lexicon once token volume exceeds memory capacity.",
        "The tokenization engine begins discarding low-frequency hapax legomena to protect the document-term matrix from dimensional explosion.",
        "Type-Token Ratio is mathematically unnormalized, making it strictly dependent on the sentence boundary punctuation threshold."
      ],
      correctIndex: 0,
      explanation: "According to Heaps' Law (|V| = k · N^β, with β < 1), vocabulary size grows sublinearly relative to token volume. Common function words repeat indefinitely, causing TTR = |V| / N to naturally decrease in larger corpora."
    },
    interactiveType: "corpus"
  },
  {
    id: "clean-normalize-text",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 3,
    chapter: "Chapter 03",
    title: "Why clean and normalize text?",
    subtitle: "Teaching computers that 'Dog' and 'dog!' are the same thing",
    tagline: "Removing HTML, stripping punctuation, and standardizing casing.",
    plainEnglish: {
      metaphorName: "Standardizing the Mess",
      metaphorIcon: "✦",
      headline: "To a computer, 'Dog', 'dog!', and 'DOG' look like three completely different words.",
      story: `Real-world text scraped from the internet is messy. It's packed with typos, random capitalization, emojis, website links, and HTML tags like <b>.
To a computer, the word "Coffee", the word "coffee.", and the word "COFFEE" have completely different binary codes. Unless you clean them, the machine treats them as three unrelated things.
Cleaning and normalizing text simply means leveling the playing field:
1. Converting everything to lowercase so capitalization doesn't cause duplicates.
2. Stripping out HTML tags, website links, and stray punctuation.
3. Removing filler words (like "the", "a", "an") if they don't add useful meaning.
This keeps your vocabulary compact and helps the model focus on what the words actually mean.`,
      takeaways: [
        "Lowercase everything: Merges words like 'Book' and 'book' so they count as the same thing.",
        "Strip the junk: Removes HTML tags and broken links that confuse models.",
        "Modern AI note: If you are using modern LLMs (like ChatGPT), don't strip punctuation! Punctuation helps modern models understand tone and sentence rhythm."
      ]
    },
    technical: {
      headline: "Text Preprocessing & Unicode Normalization",
      overview: "Preprocessing standardizes messy raw text into canonical forms, shrinking vocabulary size and eliminating noise.",
      layers: [
        { name: "Unicode Normalization", desc: "Standardizes accents and character variations (e.g., turning 'café' into standard 'cafe')." },
        { name: "Case Folding", desc: "Converting everything to lowercase, except when case matters (like distinguishing 'Apple' the company from 'apple' the fruit)." },
        { name: "Regex Cleaning", desc: "Using regular expressions to strip HTML tags (<[^>]+>), URLs, and duplicate spaces." }
      ],
      mathFormula: "\\hat{S} = \\text{RegexFilter}(\\text{NFKD}(\\text{lower}(S)))"
    },
    codeSnippet: `import re
import unicodedata

def clean_text(text: str) -> str:
    # 1. Normalize accents (café -> cafe)
    text = unicodedata.normalize('NFKD', text)
    # 2. Lowercase and remove punctuation/special characters
    text = re.sub(r"[^a-zA-Z0-9\\s]", " ", text.lower())
    # 3. Collapse multiple spaces into one
    return re.sub(r"\\s+", " ", text).strip()

raw = "<h1>Special Offer!</h1> Visit https://example.com for 50% off! :)"
print("Cleaned:", clean_text(raw))  # -> "special offer visit for 50 off"`,
    quiz: {
      question: "In which NLP pipeline task is aggressive case-folding (converting all characters to lowercase) most likely to degrade model performance?",
      options: [
        "In TF-IDF document retrieval, because query term frequencies will fail to match document vocabulary indices.",
        "In Bag-of-Words text classification, because sparse matrix dimensionality will collapse below the required rank.",
        "In Named Entity Recognition (NER), because orthographic casing is a vital discriminatory signal distinguishing proper nouns (e.g., 'Apple' vs. 'apple').",
        "In Latent Dirichlet Allocation (LDA), because symmetric Dirichlet hyperparameters assume strictly capitalized token distributions."
      ],
      correctIndex: 2,
      explanation: "Capitalization is one of the strongest orthographic signals for NER models identifying organizations, locations, and personal names. Lowercasing everything destroys this distinction ('Bush' the president vs. 'bush' the plant)."
    },
    interactiveType: "cleaning"
  },
  {
    id: "spacy-vs-nltk",
    act: "Act I · Foundations",
    actNum: 1,
    qNum: 4,
    chapter: "Chapter 04",
    title: "How to use spaCy vs. NLTK?",
    subtitle: "The research lab vs. the production factory",
    tagline: "When to use an academic toolkit (NLTK) and when to use a high-speed production engine (spaCy).",
    plainEnglish: {
      metaphorName: "The Workshop vs. The Assembly Line",
      metaphorIcon: "✦",
      headline: "One is built for studying how algorithms work; the other is built to process millions of real user requests.",
      story: `If you want to understand how linguistics works under the hood, use NLTK (Natural Language Toolkit). Created at a university, it's packed with dozens of educational tools and alternate algorithms. It's great for classrooms, but because it runs in pure Python, it's slow when processing large amounts of data.
If you need to build a real product—like parsing incoming customer support emails for an app—use spaCy.
spaCy was built for software engineers. Instead of giving you ten different ways to split a sentence, it gives you one battle-tested, lightning-fast method written in optimized C. You pass a sentence in, and in one single step, it tags parts of speech, finds names, and extracts grammar.`,
      takeaways: [
        "spaCy: Fast, memory-efficient, and opinionated. The industry standard for building real apps.",
        "NLTK: Great for learning, research, and experimenting with classic linguistics algorithms.",
        "Simple advice: Use NLTK to learn the concepts; use spaCy to build real-world software."
      ]
    },
    technical: {
      headline: "Pipeline Architecture & Performance Comparison",
      overview: "spaCy uses an integrated C-level pipeline returning a single Doc object; NLTK chains independent Python functions together.",
      layers: [
        { name: "spaCy (Cython Pipeline)", desc: "Tokens are pointers into a shared global vocabulary table. Runs at C-speed with minimal Python memory overhead." },
        { name: "NLTK (Modular Toolchain)", desc: "Passes Python lists and tuples between standalone functions: tokenize() -> pos_tag() -> ne_chunk(). Very flexible, but slower." }
      ],
      mathFormula: "\\text{Memory Overhead}(\\text{spaCy}) \\ll \\text{Memory Overhead}(\\text{NLTK})"
    },
    codeSnippet: `# --- Fast Production NLP with spaCy ---
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Ada Lovelace wrote the first computer algorithm in 1843.")

# All tags and entities are computed in a single fast pass:
for ent in doc.ents:
    print(f"Found: {ent.text:15} Type: {ent.label_}")`,
    quiz: {
      question: "What is the primary architectural reason spaCy achieves substantially higher throughput than NLTK on large document batches?",
      options: [
        "spaCy replaces all neural dependency parsing with deterministic dictionary-based lookup heuristics.",
        "spaCy trains custom subword vocabularies on every incoming batch rather than reusing global static string tables.",
        "NLTK requires distributed worker clusters and cannot execute on a single local central processing unit.",
        "spaCy manages data structures in contiguous Cython C-struct memory arrays, whereas NLTK instantiates nested Python lists, tuples, and generator objects."
      ],
      correctIndex: 3,
      explanation: "spaCy is implemented in Cython with direct C-level memory structures. Tokens in a Doc are contiguous pointers into a shared global string store (vocab.strings), completely bypassing the memory and garbage-collection overhead of pure Python objects."
    },
    interactiveType: "spacy_nltk"
  },
  {
    id: "what-is-tokenization",
    act: "Act II · Linguistic Units",
    actNum: 2,
    qNum: 5,
    chapter: "Chapter 05",
    title: "What is tokenization?",
    subtitle: "Chopping sentences into bite-sized puzzle pieces",
    tagline: "Why modern AI models break text into subwords instead of whole words.",
    plainEnglish: {
      metaphorName: "Cutting Text into Lego Bricks",
      metaphorIcon: "✦",
      headline: "Computers can't read sentences as a whole—they need them sliced into manageable pieces.",
      story: `Before a computer can analyze a sentence, it has to chop it into discrete pieces called "tokens".
You might think the easiest way is to split words by spaces: one word = one token. But what happens when someone writes a typo, or uses modern slang like "unfriendable"? A word-based system crashes because it has never seen that exact combination before.
Modern AI uses a clever middle ground called Subword Tokenization (like Byte-Pair Encoding).
Common words like "the" or "cat" stay whole. But rare or long words get broken into familiar building blocks: "unbelievable" becomes "un" + "believ" + "able".
This means the computer can understand any new word or typo by assembling familiar syllables—just like snapping Lego bricks together.`,
      takeaways: [
        "Tokens are the currency of AI: Words, syllables, or punctuation marks sliced into addressable pieces.",
        "Splitting by spaces fails: New words, slang, and typos break systems that rely on whole words.",
        "Subwords solve it: Breaking rare words into common chunks (like 'un' + 'break' + 'able') means the model never gets stuck."
      ]
    },
    technical: {
      headline: "Byte-Pair Encoding (BPE) & Vocabulary Compression",
      overview: "Subword algorithms build an optimal vocabulary by starting with basic characters and repeatedly merging the most common adjacent pairs.",
      layers: [
        { name: "Character Base", desc: "Starts with single characters (or 256 byte values), ensuring no word is ever truly unknown." },
        { name: "Frequency Count", desc: "Scans the entire training corpus to find which character pairs appear next to each other most often." },
        { name: "Iterative Merge", desc: "Merges the top pairs into new tokens (e.g., 't' + 'h' -> 'th') until the vocabulary reaches its target size (e.g. 50,000 tokens)." }
      ],
      mathFormula: "\\text{Pair}^* = \\arg\\max_{(u, v)} \\text{Freq}(u, v)"
    },
    codeSnippet: `from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")
phrase = "Tokenization slices long words into reusable pieces."

tokens = tokenizer.tokenize(phrase)
ids = tokenizer.encode(phrase)

print("Subword tokens:", tokens)
print("Numeric IDs:", ids)`,
    quiz: {
      question: "Why have modern Large Language Models almost universally adopted Byte-Pair Encoding (BPE) or WordPiece over traditional whitespace/regex word tokenizers?",
      options: [
        "Subword tokenizers compress word vectors into one-dimensional scalar indices to eliminate embedding layers.",
        "Subword tokenizers establish a fixed vocabulary boundary while eliminating out-of-vocabulary (OOV) tokens by decomposing unknown words into frequent subword fragments.",
        "Word-level tokenizers require bidirectional self-attention matrices to compute initial space delimiters.",
        "Character-level tokenizers produce embeddings that violate Markovian sequence length constraints in attention heads."
      ],
      correctIndex: 1,
      explanation: "Traditional word tokenizers either produce infinite vocabularies or encounter <UNK> (Out-of-Vocabulary) errors on novel words. BPE solves this by maintaining a compact vocabulary (typically 32k–100k tokens) that can decompose any arbitrary new word into known morphological or byte chunks."
    },
    interactiveType: "tokenizer"
  },
  {
    id: "stemming-vs-lemmatization",
    act: "Act II · Linguistic Units",
    actNum: 2,
    qNum: 6,
    chapter: "Chapter 06",
    title: "Stemming vs. Lemmatization?",
    subtitle: "The chainsaw vs. the dictionary",
    tagline: "Chopping word endings with simple rules versus looking up true grammatical roots.",
    plainEnglish: {
      metaphorName: "The Chainsaw vs. The Dictionary",
      metaphorIcon: "✦",
      headline: "Stemming chops off endings with crude rules; lemmatization checks a real dictionary.",
      story: `When someone searches for "running shoes", they also want to see results for "runner" and "runs". How do we connect these variations?
Stemming uses a crude set of rules to chop off word endings: it hacks off "-ing", "-ed", and "-s". It's super fast, but it often leaves behind butchered non-words. For example, it turns "studies" into "studi" and chops "flying" into "fli".
Lemmatization is much smarter. It looks at the sentence, figures out whether the word is a noun or a verb, and checks a real dictionary to find the true root word:
It knows that "wolves" comes from "wolf", and that "better" comes from "good".`,
      takeaways: [
        "Stemming: Quick and dirty rule-chopping. Very fast for simple search bars, but produces ugly non-words.",
        "Lemmatization: Smart dictionary lookup. Takes grammar into account to find the true root word.",
        "When to use: Use stemming when speed is all you care about; use lemmatization when real grammar and meaning matter."
      ]
    },
    technical: {
      headline: "Rule-Based Suffix Truncation vs. Morphological Lookup",
      overview: "Stemmers apply pattern-matching rules without grammatical awareness; lemmatizers use Part-of-Speech tags and vocabulary dictionaries.",
      layers: [
        { name: "Porter Stemmer", desc: "A series of sequential heuristic rules (e.g., replace 'sses' with 'ss'). Fast, but blind to word meaning." },
        { name: "Lemmatization Engine", desc: "Looks up (word, POS tag) in a morphological database (like WordNet) to find the canonical base form ('was' -> 'be')." }
      ],
      mathFormula: "\\text{Lemma}(w, \\text{POS}) = \\arg\\min_{r \\in \\mathcal{D}} \\text{MorphologicalDistance}(w, r, \\text{POS})"
    },
    codeSnippet: `from nltk.stem import PorterStemmer
import spacy

# 1. Stemming: Rough rule-based chopping
stemmer = PorterStemmer()
print("Stemming 'wolves':", stemmer.stem("wolves"))  # -> "wolv"
print("Stemming 'better':", stemmer.stem("better"))  # -> "better"

# 2. Lemmatization: Dictionary lookup with grammar context
nlp = spacy.load("en_core_web_sm")
doc = nlp("The wolves are eating better food.")
for token in doc:
    print(f"{token.text:8} -> Root: {token.lemma_:8} ({token.pos_})")`,
    quiz: {
      question: "Why does an algorithmic stemmer (such as Porter) fail to map the comparative adjective 'better' to its canonical root 'good', whereas a lemmatizer succeeds?",
      options: [
        "Stemmers apply heuristic affix-stripping rules without access to a morphological vocabulary or Part-of-Speech context, whereas lemmatizers perform full lexical dictionary analysis.",
        "Stemmers only evaluate prefixes rather than terminal suffixes, preventing detection of comparative inflections.",
        "Stemmers require sentence-level dense cosine embeddings to resolve suppletive adjective inflections.",
        "Lemmatizers compute character n-gram edit distances, while stemmers rely strictly on phonetic Soundex approximations."
      ],
      correctIndex: 0,
      explanation: "'Better' -> 'good' is an irregular suppletive form with no shared affixes. Heuristic stemmers only chop common suffixes like '-ing' or '-ed'. Only a lemmatizer with a complete morphological database and POS knowledge can map irregular forms to their true dictionary lemma."
    },
    interactiveType: "morphology"
  },
  {
    id: "vectorize-text",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 7,
    chapter: "Chapter 07",
    title: "How to vectorize text?",
    subtitle: "Giving words GPS coordinates so math can measure distance",
    tagline: "Why we turn words into lists of numbers, and how dense coordinates work.",
    plainEnglish: {
      metaphorName: "Giving Words a GPS Coordinate",
      metaphorIcon: "✦",
      headline: "Computers can't do math on letters—they need coordinates.",
      story: `Computers are essentially glorified calculators. They can multiply millions of numbers in a millisecond, but they have no idea what the letters "h-o-p-e" mean.
To make text computable, we have to turn words into lists of numbers—called vectors.
Think of a vector like a GPS coordinate on a map. If you plot cities on a grid, you can calculate the exact distance between Stockholm and Rome.
In the exact same way, once you turn sentences into lists of numbers, you can use basic math to measure how close two sentences are in meaning.`,
      takeaways: [
        "Vectors = Lists of numbers: The only way machine learning models can process words.",
        "One-Hot encoding is wasteful: Giant lists of 50,000 zeros with a single '1' at the word's position.",
        "Dense vectors are efficient: Compact lists of numbers (like 384 numbers) where similar ideas sit close to each other."
      ]
    },
    technical: {
      headline: "Representational Approaches in Vector Space Modeling",
      overview: "Vectorization converts discrete words into real-valued vectors in multidimensional space so machine learning algorithms can compute distances.",
      layers: [
        { name: "1. One-Hot Encoding", desc: "A vector as long as the entire dictionary. All zeros except for one single '1'. High memory usage, zero semantic overlap." },
        { name: "2. Bag-of-Words Counts", desc: "Counts how many times each word appears in a document. Captures word frequency, but ignores word order." },
        { name: "3. Dense Embeddings", desc: "Compact vectors (128 to 768 dimensions) where every number represents a learned feature, and geometric distance equals similarity." }
      ],
      mathFormula: "\\mathbf{x} \\in \\mathbb{R}^d, \\quad \\text{Sparsity} = 1 - \\frac{\\|\\mathbf{x}\\|_0}{d}"
    },
    codeSnippet: `from sklearn.feature_extraction.text import CountVectorizer

corpus = [
    "Machine learning models process text.",
    "Text is converted into numerical vectors."
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus)

print("Vocabulary:", vectorizer.get_feature_names_out())
print("Vector Shape:", X.shape)
print("Doc 0 as numbers:", X.toarray()[0])`,
    quiz: {
      question: "What fundamental mathematical deficiency makes high-dimensional One-Hot Encoding unsuitable for measuring semantic relationships between words?",
      options: [
        "One-Hot vectors have non-zero covariance that distorts Euclidean distance calculations.",
        "One-Hot vectors cannot be transformed into dense matrices because their singular value decomposition is undefined.",
        "All distinct One-Hot vectors are mutually orthogonal in vector space, yielding a dot product and cosine similarity of zero regardless of semantic similarity.",
        "The magnitude of a One-Hot vector scales exponentially with the total number of documents in the collection."
      ],
      correctIndex: 2,
      explanation: "In One-Hot encoding, each word is an orthogonal basis vector with a 1 at its index and 0 elsewhere. The dot product u · v between any two different words is always 0, meaning 'physician' and 'doctor' appear as geometrically unrelated as 'doctor' and 'submarine'."
    },
    interactiveType: "vector_matrix"
  },
  {
    id: "bow-vs-tfidf",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 8,
    chapter: "Chapter 08",
    title: "Bag-of-Words vs. TF-IDF?",
    subtitle: "Why rare words shout and common words whisper",
    tagline: "Weighting words by how informative they are across your documents.",
    plainEnglish: {
      metaphorName: "The Highlighter Effect",
      metaphorIcon: "✦",
      headline: "Common words appear everywhere; signature words only appear when it matters.",
      story: `Bag-of-Words is the simplest way to count text: you dump all the words into a basket and tally them up. But if you analyze an article about asthma, it will tell you the top words are "the" (400 times), "and" (300 times), and "is" (200 times). That tells you nothing about the actual topic!
TF-IDF solves this with a smart two-part formula:
1. Term Frequency (TF): Counts how often a word appears in this specific article.
2. Inverse Document Frequency (IDF): Checks how common the word is across all articles in your library.
If a word appears in every single article (like "the"), its score gets knocked down to zero. But if a word appears multiple times in just one article (like "inhaler" or "bronchitis"), it gets highlighted as the signature topic.`,
      takeaways: [
        "Bag-of-Words just counts: Blind to whether a word is informative or just grammatical filler.",
        "TF-IDF adds perspective: Gives high scores to rare, important words and lowers the volume on words that appear everywhere.",
        "Great for search engines: Helps rank which articles are actually about your specific search query."
      ]
    },
    technical: {
      headline: "The Information-Theoretic Balance of TF-IDF",
      overview: "TF-IDF calculates word importance by multiplying local term frequency by the logarithmic inverse of how often the word appears across the entire dataset.",
      layers: [
        { name: "Term Frequency (TF)", desc: "TF(t, d) = Count of word t in doc d / Total words in doc d. Measures local prominence." },
        { name: "Inverse Document Frequency (IDF)", desc: "IDF(t, D) = log( Total docs / Docs containing word t ). Penalizes universally common words." }
      ],
      mathFormula: "\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\log\\left(\\frac{1 + |D|}{1 + \\text{DF}(t, D)}\\right) + 1"
    },
    codeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

docs = [
    "The patient has acute asthma symptoms.",
    "The solar panel generates clean electricity.",
    "Asthma inhalers relieve breathing difficulty."
]

tfidf = TfidfVectorizer()
matrix = tfidf.fit_transform(docs)

df = pd.DataFrame(matrix.toarray(), columns=tfidf.get_feature_names_out())
print(df[["asthma", "the", "electricity"]])`,
    quiz: {
      question: "In the standard smoothed TF-IDF formulation IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1, what mathematical purpose does the addition of constants serve?",
      options: [
        "It guarantees that high-frequency terms receive weights greater than document length bounds.",
        "It prevents division by zero for unseen terms and ensures that words appearing in every document retain a positive baseline weight rather than zeroing out.",
        "It forces the resulting document vectors to lie strictly on a unit hyper-sphere before cosine projection.",
        "It converts the term frequency distribution from a power law into a Gaussian normal distribution."
      ],
      correctIndex: 1,
      explanation: "Without smoothing, terms appearing in all N documents yield ln(N/N) = ln(1) = 0, completely discarding the word from the vector. Adding +1 ensures numerical stability (avoiding division by zero) and preserves a non-zero baseline weight."
    },
    interactiveType: "tfidf_matrix"
  },
  {
    id: "word-embeddings",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 9,
    chapter: "Chapter 09",
    title: "What are word embeddings?",
    subtitle: "Putting words on a map where meaning equals distance",
    tagline: "Dense vector coordinates where spatial directions encode human concepts.",
    plainEnglish: {
      metaphorName: "The Neighborhood Map",
      metaphorIcon: "✦",
      headline: "Words with similar meanings live on the same street.",
      story: `Old-fashioned computer systems treated every word as an isolated island. To a basic search engine, "doctor" and "physician" had nothing in common because they don't share letters.
Word embeddings changed everything by placing words onto a shared coordinate map.
Words that are used similarly get placed close together. "Coffee", "espresso", and "tea" live in the café district; "truck", "van", and "sedan" live in the garage district.
Because these coordinates capture real concepts, you can even do math with meaning:
Vector("King") - Vector("Man") + Vector("Woman") = Vector("Queen")!
The geometry automatically preserves human relationships like gender, geography, and verb tense.`,
      takeaways: [
        "Meaning = Location: Words that mean similar things have coordinates that sit right next to each other.",
        "Vector arithmetic: The system learns concepts like gender and nationality as geometric directions.",
        "Cosine similarity: Measures the angle between two word vectors to tell how closely they are related."
      ]
    },
    technical: {
      headline: "Continuous Semantic Spaces & Angular Similarity",
      overview: "Dense embeddings map a vocabulary into continuous vector space (typically 100 to 768 dimensions), capturing semantic relationships as spatial angles.",
      layers: [
        { name: "Cosine Similarity", desc: "Measures the cosine of the angle between two vectors. Ranges from -1.0 to +1.0, independent of vector length." },
        { name: "Linear Vector Offsets", desc: "Directional offsets capture analogies: Vector(King) - Vector(Man) + Vector(Woman) ≈ Vector(Queen)." }
      ],
      mathFormula: "\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2} = \\frac{\\sum_{i=1}^d u_i v_i}{\\sqrt{\\sum_{i=1}^d u_i^2} \\sqrt{\\sum_{i=1}^d v_i^2}}"
    },
    codeSnippet: `import numpy as np

def cosine_similarity(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

# Sample 3D coordinates: [Royalty, Masculine, Feminine]
v_king  = np.array([0.95,  0.88, -0.10])
v_man   = np.array([0.05,  0.92, -0.05])
v_woman = np.array([0.04, -0.08,  0.95])
v_queen = np.array([0.96, -0.12,  0.91])

# Vector math: King - Man + Woman
analogy = v_king - v_man + v_woman
print("Similarity to Queen:", f"{cosine_similarity(analogy, v_queen):.3f}")`,
    quiz: {
      question: "In high-dimensional semantic vector spaces, why is Cosine Similarity generally preferred over Euclidean (L2) Distance for comparing document or word embeddings?",
      options: [
        "Euclidean distance requires computing complex matrix inversions that scale cubically with dimensionality.",
        "Cosine similarity is a non-linear kernel that enables separation of non-convex clusters in Euclidean space.",
        "Euclidean distance can only be computed between vectors with identical non-zero index coordinates.",
        "Cosine similarity evaluates purely the directional angle between vectors, normalizing away variations in vector magnitude caused by document length or raw token frequency."
      ],
      correctIndex: 3,
      explanation: "Euclidean distance is heavily sensitive to vector magnitude (length). A long article and a short paragraph discussing the same topic will have very different L2 norms. Cosine similarity normalizes vector lengths, measuring purely the angular alignment of their semantic orientations."
    },
    interactiveType: "vector_universe"
  },
  {
    id: "word2vec-and-glove",
    act: "Act III · The Mathematical Bridge",
    actNum: 3,
    qNum: 10,
    chapter: "Chapter 10",
    title: "How to use Word2Vec/GloVe?",
    subtitle: "Learning meaning by looking at neighbors",
    tagline: "You shall know a word by the company it keeps.",
    plainEnglish: {
      metaphorName: "Guessed by Your Friends",
      metaphorIcon: "✦",
      headline: "You can understand almost any word just by looking at the words around it.",
      story: `If you read the sentence: "I drank a hot mug of ___ to wake up this morning", you don't need anyone to tell you the missing word is probably "coffee" or "tea". It's definitely not "sand" or "motor oil".
In 1957, linguist John Rupert Firth summed this up: "You shall know a word by the company it keeps."
Word2Vec learns word meanings using this exact fill-in-the-blank game across billions of sentences from Wikipedia and the web.
By constantly guessing missing words, the model nudges coordinates around until words that appear in similar situations end up right next to each other.
No human needs to label anything—the text trains itself.`,
      takeaways: [
        "Context teaches meaning: Words that share similar neighbors end up with similar coordinates.",
        "Zero human labeling: The algorithm trains itself just by reading raw text and playing fill-in-the-blank.",
        "CBOW vs. Skip-Gram: CBOW guesses the center word from its neighbors; Skip-Gram guesses the neighbors from the center word."
      ]
    },
    technical: {
      headline: "Sliding Window Architectures & Negative Sampling",
      overview: "Word2Vec trains a lightweight neural network on sliding context windows, updating vector representations via gradient descent.",
      layers: [
        { name: "Continuous Bag-of-Words (CBOW)", desc: "Takes surrounding context words as input and predicts the center word. Trains fast, great for common words." },
        { name: "Skip-Gram Architecture", desc: "Takes the center word as input and predicts its surrounding context words. Better at capturing rare words." },
        { name: "Negative Sampling", desc: "Turns a massive, slow 100,000-word probability calculation into a fast binary decision against a few random noise words." }
      ],
      mathFormula: "\\mathcal{L}_{\\text{NEG}} = \\log \\sigma(\\mathbf{v}_{w_O}'^\\top \\mathbf{v}_{w_I}) + \\sum_{i=1}^k \\mathbb{E}_{w_i \\sim P_n(w)} [\\log \\sigma(-\\mathbf{v}_{w_i}'^\\top \\mathbf{v}_{w_I})]"
    },
    codeSnippet: `import gensim.downloader as api

# Load pretrained GloVe word vectors
glove = api.load("glove-wiki-gigaword-100")

# Check similarity between words
print("Similarity(coffee, tea):", f"{glove.similarity('coffee', 'tea'):.3f}")

# Solve analogy: Paris is to France as Tokyo is to ?
analogy = glove.most_similar(positive=["france", "tokyo"], negative=["paris"], topn=1)
print("Analogy result:", analogy[0])  # -> ('japan', 0.812)`,
    quiz: {
      question: "In the Word2Vec Skip-Gram architecture, what computational bottleneck motivated the introduction of Negative Sampling (SGNS)?",
      options: [
        "Computing the full Softmax denominator required summing exponential dot products across the entire vocabulary |V| at every single training step.",
        "The input context window suffered from vanishing gradient decay across sentences exceeding five tokens.",
        "Dot products in continuous latent spaces produced negative eigenvalues during backpropagation.",
        "The hierarchical clustering algorithm could not allocate dynamic weights across multi-threaded CPU workers."
      ],
      correctIndex: 0,
      explanation: "The full Softmax normalization term requires summing exp(v' · v) across the entire vocabulary (|V| > 100,000) for every single context word update, which is O(|V|). Negative Sampling reduces this to O(k) binary logistic classifications against k random noise tokens."
    },
    interactiveType: "word2vec_window"
  },
  {
    id: "named-entity-recognition",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 11,
    chapter: "Chapter 11",
    title: "What is Named Entity Recognition? (NER)",
    subtitle: "Spotting people, companies, places, and numbers",
    tagline: "Turning unstructured paragraphs into clean database records.",
    plainEnglish: {
      metaphorName: "The Auto-Highlighter",
      metaphorIcon: "✦",
      headline: "Instantly spotting the 'who', 'what', 'where', and 'how much' in any message.",
      story: `Imagine reading an email that says:
"Satya Nadella announced that Microsoft will acquire Nuance in Seattle next Monday for $19 billion."
Your brain immediately categorizes the key facts:
- Who: Satya Nadella (Person)
- Company: Microsoft, Nuance (Organizations)
- Where: Seattle (Location)
- When: Next Monday (Date)
- How much: $19 billion (Money)
Named Entity Recognition (NER) is an automated highlighter that does this for millions of documents in seconds.
It turns messy paragraphs into neat spreadsheet columns, making it easy to search, filter, and organize information.`,
      takeaways: [
        "Extracts key facts: Pulls out people, companies, cities, dates, and currency automatically.",
        "Handles multi-word names: Knows that 'New York City' is one single location, not three separate words.",
        "Everyday applications: Powers search filters, news aggregators, resume screeners, and support bots."
      ]
    },
    technical: {
      headline: "Token Classification & The IOB2 Boundary Scheme",
      overview: "NER treats text as a sequence labeling task, assigning each token a tag that marks the beginning, continuation, or absence of an entity.",
      layers: [
        { name: "B- (Beginning)", desc: "Marks the first word of an entity (e.g. 'Satya' -> B-PERSON)." },
        { name: "I- (Inside)", desc: "Marks continuation words belonging to the same entity ('Nadella' -> I-PERSON)." },
        { name: "O (Outside)", desc: "Marks ordinary words that are not part of any named entity." }
      ],
      mathFormula: "\\hat{\\mathbf{y}} = \\arg\\max_{\\mathbf{y}} \\sum_{i=1}^n \\log P(y_i \\mid \\mathbf{x}, y_{i-1})"
    },
    codeSnippet: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Satya Nadella announced Microsoft acquired Nuance in Seattle for $19 billion.")

# Extract detected entities
for ent in doc.ents:
    print(f"{ent.text:20} -> {ent.label_:8} ({spacy.explain(ent.label_)})")`,
    quiz: {
      question: "Why is the standard BIO (Beginning, Inside, Outside) sequence tagging scheme preferred over a simpler binary entity classification scheme?",
      options: [
        "Binary classification cannot be processed by conditional random field (CRF) or Viterbi decoding layers.",
        "Binary tagging causes token vectors to lose positional encoding order in Transformer encoders.",
        "The 'B-' prefix explicitly marks the boundary between adjacent distinct entities of the identical entity type (such as two consecutive names).",
        "The 'I-' tag is mathematically required to normalize softmax logits across uneven token spans."
      ],
      correctIndex: 2,
      explanation: "If two distinct entities of the same type appear back-to-back (e.g. 'President Lincoln Grant visited...'), binary tagging cannot distinguish whether it is one person or two. The 'B-' prefix marks the inception of a new entity: B-PER, B-PER."
    },
    interactiveType: "ner_highlighter"
  },
  {
    id: "analyze-sentiment",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 12,
    chapter: "Chapter 12",
    title: "How to analyze sentiment?",
    subtitle: "Measuring whether a customer is happy, frustrated, or neutral",
    tagline: "Scoring emotional tone and catching tricky negations like 'not bad'.",
    plainEnglish: {
      metaphorName: "The Customer Mood Meter",
      metaphorIcon: "✦",
      headline: "Detecting whether feedback is positive, negative, or neutral.",
      story: `Companies get thousands of reviews and customer support tickets every day. No human has time to read them all one by one.
Sentiment analysis scores text on a scale from negative to positive.
The tricky part is handling everyday human language. A basic program might see the word "good" and think a review is positive. But what if the customer wrote:
"The battery life is not good at all."
The single word "not" flips the whole meaning. Good sentiment models look at the entire sentence structure, catching negations, sarcasm, and mixed reviews ("great screen, terrible battery").`,
      takeaways: [
        "Beyond word counts: A single word like 'not' or 'barely' can completely flip the meaning of nearby adjectives.",
        "Tone scale: Measures feelings on a scale from -1.0 (angry or disappointed) to +1.0 (thrilled).",
        "Real-world use: Helps companies automatically route angry emails to customer support managers first."
      ]
    },
    technical: {
      headline: "Rule-Based Valence Lexicons vs. Transformer Encoders",
      overview: "Sentiment analysis spans from lightweight lexicon rules with negation detection (like VADER) to fine-tuned contextual Transformer models.",
      layers: [
        { name: "Lexicon Rules (VADER)", desc: "Uses a dictionary of pre-scored words with rules that amplify exclamation marks and flip scores after words like 'not'." },
        { name: "Machine Learning Classifiers", desc: "TF-IDF n-grams combined with Logistic Regression trained on labeled review datasets." },
        { name: "Transformer Models", desc: "Pretrained models (like RoBERTa) that read full sentence context to catch subtle irony and mixed feelings." }
      ],
      mathFormula: "\\text{Valence} = \\frac{x}{\\sqrt{x^2 + \\alpha}}, \\quad x = \\sum_{i} v_i \\cdot w_{\\text{neg}}"
    },
    codeSnippet: `from transformers import pipeline

# Load a pretrained sentiment analysis pipeline
classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

reviews = [
    "The battery longevity is exceptional and the display is gorgeous.",
    "Customer service was rude and completely unhelpful.",
    "The product was not bad, but distinctly overpriced."
]

for res, text in zip(classifier(reviews), reviews):
    print(f"[{res['label']:8}] ({res['score']:.1%}): {text}")`,
    quiz: {
      question: "Why do unigram Bag-of-Words classifiers frequently misclassify sentences containing valence shifters, such as 'The food was not at all bad'?",
      options: [
        "Adverbs like 'terribly' or 'at all' are automatically stripped as stopwords during dictionary tokenization.",
        "Bag-of-Words representations discard word order and syntactic dependency scope, isolating negative lexical items ('bad') from their modifying negation operators ('not at all').",
        "Unigram frequency counts scale inversely with sentence length in Naive Bayes likelihood estimation.",
        "Sentiment lexicons only support binary polarity labels and cannot calculate continuous floating-point scores."
      ],
      correctIndex: 1,
      explanation: "In a unigram bag-of-words, the sentence is broken into isolated tokens: {'food', 'not', 'at', 'all', 'bad'}. The negative polarity of 'bad' is evaluated independently without the syntactic binding of the negator, misclassifying the positive endorsement as a negative review."
    },
    interactiveType: "sentiment_gauge"
  },
  {
    id: "topic-modeling",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 13,
    chapter: "Chapter 13",
    title: "What is topic modeling?",
    subtitle: "Discovering main themes in 10,000 articles without reading them",
    tagline: "Unsupervised thematic discovery across large document collections.",
    plainEnglish: {
      metaphorName: "The Automatic Filing Cabinet",
      metaphorIcon: "✦",
      headline: "Sorting fifty thousand articles into themes without any human labeling.",
      story: `Imagine you're handed 50,000 customer survey responses or news articles with no labels. How do you find out what people are talking about without reading them all?
Topic modeling scans all the text and automatically discovers the hidden themes.
It works by grouping words that frequently appear together:
- Group 1: "flight", "delay", "luggage", "ticket" -> Clearly about Airline Travel.
- Group 2: "hotel", "room", "clean", "breakfast" -> Clearly about Hotel Stays.
An article can belong to multiple themes at once—for example, 70% Travel and 30% Finance.`,
      takeaways: [
        "Zero human labeling: You don't have to define categories in advance; the math finds them for you.",
        "Mixture of themes: An article can be 60% technology and 40% business.",
        "Saves hundreds of hours: Gives you an instant high-level summary of giant document collections."
      ]
    },
    technical: {
      headline: "Latent Dirichlet Allocation (LDA) & Bayesian Topic Mixtures",
      overview: "LDA models each document as a probability distribution over hidden topics, where each topic is a probability distribution over words.",
      layers: [
        { name: "Document-Topic Distribution (θ)", desc: "How much each document talks about each topic (e.g. Doc 1 is 80% Tech, 20% Health)." },
        { name: "Topic-Word Distribution (φ)", desc: "Which words define each topic (e.g. 'doctor' and 'hospital' define Health)." },
        { name: "Gibbs Sampling", desc: "The algorithm iteratively guesses which topic generated each word until the overall patterns stabilize." }
      ],
      mathFormula: "P(\\mathbf{W}, \\mathbf{Z}, \\boldsymbol{\\theta}, \\boldsymbol{\\phi}) = \\prod_{d=1}^M P(\\theta_d \\mid \\alpha) \\prod_{n=1}^{N_d} P(z_{dn} \\mid \\theta_d) P(w_{dn} \\mid \\phi_{z_{dn}})"
    },
    codeSnippet: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

articles = [
    "Astronomers discovered a new planet orbiting a distant star.",
    "Central banks raised interest rates to combat inflation.",
    "Telescopes captured images of a supernova explosion.",
    "Stock markets rallied after positive earnings reports."
]

vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(articles)

lda = LatentDirichletAllocation(n_components=2, random_state=42)
lda.fit(X)

words = vectorizer.get_feature_names_out()
for i, topic in enumerate(lda.components_):
    top_words = [words[idx] for idx in topic.argsort()[:-4:-1]]
    print(f"Topic {i+1}:", ", ".join(top_words))`,
    quiz: {
      question: "What is the key generative assumption that distinguishes Latent Dirichlet Allocation (LDA) from hard document clustering algorithms like K-Means?",
      options: [
        "LDA assumes words are generated from a fixed orthogonal distance matrix without probabilistic priors.",
        "K-Means models document topics as continuous probability distributions over latent dimensions.",
        "LDA requires supervised topic labels for document clusters before computing variational inference.",
        "LDA models each document as a continuous probabilistic mixture over multiple topics, and each topic as a Dirichlet distribution over the vocabulary."
      ],
      correctIndex: 3,
      explanation: "In K-Means, every document is forced into exactly one cluster (hard assignment). In contrast, LDA assumes mixed membership: a document can be 60% Biology, 30% Chemistry, and 10% Computing, with Dirichlet distributions governing topic and word proportions."
    },
    interactiveType: "lda_topic"
  },
  {
    id: "build-text-classifier",
    act: "Act IV · Extracting Meaning",
    actNum: 4,
    qNum: 14,
    chapter: "Chapter 14",
    title: "How to build a text classifier?",
    subtitle: "Sorting messages into buckets, and the danger of 99% accuracy",
    tagline: "Supervised categorization, training models, and balancing Precision vs. Recall.",
    plainEnglish: {
      metaphorName: "The Spam Filter Dilemma",
      metaphorIcon: "✦",
      headline: "Why an AI that brags about 99% accuracy might actually be broken.",
      story: `Text classification is the workhorse of NLP: it takes an incoming message and drops it into the right folder—like sorting emails into "Inbox" or "Spam".
When evaluating a classifier, there is a dangerous trap called the Accuracy Paradox:
Imagine 99% of your emails are normal messages, and only 1% is spam. A broken model that does literally nothing and marks EVERY email as normal will claim to be 99% accurate! But it completely failed its only real job.
That's why engineers look at two specific numbers:
1. Precision: When the model sounds the alarm ("SPAM!"), is it actually spam? (Avoids deleting your boss's email).
2. Recall: Out of all the real spam that came in, how much did it catch?`,
      takeaways: [
        "Accuracy is a trap: If one category is rare (like fraud or rare diseases), raw accuracy lies to you.",
        "Precision vs. Recall: The eternal trade-off between avoiding false alarms and catching every bad item.",
        "F1-Score: A single balanced score that ensures your model is good at both."
      ]
    },
    technical: {
      headline: "The Supervised Pipeline & Precision-Recall Dynamics",
      overview: "Supervised text classification maps text feature vectors into discrete categories, evaluated using harmonic precision and recall metrics.",
      layers: [
        { name: "Feature Extraction", desc: "Raw Text -> Cleaning -> Tokenization -> TF-IDF or Embedding Vectorization." },
        { name: "Model Training", desc: "Training a Logistic Regression, Support Vector Machine, or fine-tuned Transformer on labeled examples." },
        { name: "F1-Score", desc: "The harmonic mean of Precision and Recall. Prevents models from cheating on imbalanced data." }
      ],
      mathFormula: "F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\text{TP}}{2 \\text{TP} + \\text{FP} + \\text{FN}}"
    },
    codeSnippet: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# 1. Training data
messages = [
    "Claim your free $1,000 cash prize now! Call urgently.",
    "Hey Sarah, are we still meeting for lunch at 1pm?",
    "Winner! You have won a free gift card today.",
    "Can you review the attached budget spreadsheet before tomorrow?"
]
labels = ["spam", "ham", "spam", "ham"]

# 2. Build and train pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression())
])
model.fit(messages, labels)

# 3. Test on new incoming message
new_msg = ["Urgent: Claim your free gift now!"]
print("Prediction:", model.predict(new_msg)[0])`,
    quiz: {
      question: "When evaluating a text classifier on an extreme class imbalance dataset (e.g. 0.1% phishing emails vs. 99.9% legitimate emails), why is Accuracy a dangerously misleading metric?",
      options: [
        "A trivial dummy model that predicts 'legitimate' for 100% of incoming emails achieves 99.9% accuracy while failing to detect a single phishing attack.",
        "Accuracy can only be computed when the classification decision threshold is configured to exactly 0.0.",
        "Accuracy mathematically penalizes false positive errors twice as heavily as false negative omissions.",
        "Scikit-learn classification reporting modules require strictly balanced binary integers in input labels."
      ],
      correctIndex: 0,
      explanation: "On a 99.9% / 0.1% imbalanced dataset, a model that blindly predicts the majority class achieves 99.9% accuracy, yet is 100% useless in production. Practitioners must evaluate Precision, Recall, and the Precision-Recall Area Under Curve (PR-AUC)."
    },
    interactiveType: "classifier"
  },
  {
    id: "whats-next-in-nlp",
    act: "Act V · The Frontier",
    actNum: 5,
    qNum: 15,
    chapter: "Chapter 15",
    title: "What's next in NLP?",
    subtitle: "From word counters to reasoning models and AI agents",
    tagline: "The Transformer revolution, multi-head self-attention, and autonomous reasoning agents.",
    plainEnglish: {
      metaphorName: "From Calculator to Thinking Partner",
      metaphorIcon: "✦",
      headline: "How Transformers and Self-Attention unlocked modern reasoning AI.",
      story: `For decades, NLP models read sentences like a human reading through a tiny straw: one word at a time, from left to right. By the end of a long paragraph, the model had already forgotten what happened at the start.
In 2017, the Transformer architecture introduced Self-Attention.
Instead of reading sequentially, a Transformer looks at every word in the sentence at the exact same time. It draws connecting threads between related ideas—instantly knowing which person a pronoun like "they" refers to.
This single breakthrough enabled models like ChatGPT, Claude, and Gemini.
Today, NLP has moved beyond simple text matching. Modern models can reason through complex logic puzzles, write code, use web browsers, and act as autonomous digital coworkers.`,
      takeaways: [
        "Self-Attention: Looks at all words at once to understand deep context and long-range connections.",
        "Reasoning and thinking: Modern models pause and check their own logic before giving an answer.",
        "Autonomous Agents: NLP models don't just generate text anymore—they can use tools, browse the web, and run code."
      ]
    },
    technical: {
      headline: "Scaled Dot-Product Attention & Frontier Horizons",
      overview: "The Transformer architecture (Vaswani et al. 2017) replaced sequential recurrent networks with parallelized multi-head self-attention.",
      layers: [
        { name: "1. Self-Attention Mechanics", desc: "Attention(Q, K, V) = softmax( (QK^T) / sqrt(d_k) ) V. Allows every token to weigh its relevance against every other token." },
        { name: "2. Test-Time Reasoning", desc: "Allocating extra compute at inference time to generate hidden chains of logic and verification before answering." },
        { name: "3. Tool Use & Agents", desc: "Grounding models in external tools: running Python scripts, querying databases, and executing browser tasks." },
        { name: "4. Multimodal Fusion", desc: "Unifying text, audio, images, and video into a shared continuous token stream." }
      ],
      mathFormula: "\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q} \\mathbf{K}^T}{\\sqrt{d_k}}\\right) \\mathbf{V}"
    },
    codeSnippet: `# Modern NLP: Zero-shot reasoning with modern models
from transformers import pipeline

generator = pipeline("text-generation", model="meta-llama/Llama-3.2-1B-Instruct")

prompt = """Explain why the word 'it' refers to 'animal' in:
'The animal didn't cross the street because it was too tired.'"""

output = generator(prompt, max_new_tokens=100)
print(output[0]['generated_text'])`,
    quiz: {
      question: "What fundamental computational limitation of Recurrent Neural Networks (LSTMs / GRUs) did the Transformer's Multi-Head Self-Attention architecture overcome?",
      options: [
        "LSTMs required continuous pre-training on character-level n-gram matrices before task fine-tuning.",
        "LSTMs could only accept static one-hot input arrays rather than continuous floating-point vectors.",
        "RNNs enforced sequential O(n) step-by-step token recurrence that prohibited parallel training across hardware and suffered from long-range gradient decay.",
        "RNN hidden states could only store grammar rules rather than semantic contextual word representations."
      ],
      correctIndex: 2,
      explanation: "In RNNs, token t cannot be computed until token t-1 finishes, creating an unparallelizable sequential bottleneck. Transformers process all tokens simultaneously using matrix multiplications (Q, K, V), fully utilizing modern GPU parallelism and computing direct connections between distant tokens in constant O(1) operations."
    },
    interactiveType: "transformer_attention"
  }
];
