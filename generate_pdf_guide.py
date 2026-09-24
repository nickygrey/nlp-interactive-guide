#!/usr/bin/env python3
"""
Generates an executive, publication-grade PDF guide for:
"Natural Language Processing: An Interactive Compendium & Presentation Guide"
Designed for reading, presenting the website, and delivering step-by-step NLP lessons to colleagues.
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute total page count and draw running headers/footers."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # Suppress headers/footers on cover page
            return

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#78716C"))

        # Running Header
        self.drawString(54, 11 * 72 - 36, "Natural Language Processing — Interactive Compendium & Presentation Guide")
        self.drawRightString(8.5 * 72 - 54, 11 * 72 - 36, "https://nickygrey.github.io/nlp-interactive-guide/")
        self.setStrokeColor(colors.HexColor("#E5E2DA"))
        self.setLineWidth(0.5)
        self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        # Running Footer
        self.line(54, 45, 8.5 * 72 - 54, 45)
        self.drawString(54, 32, "Scandinavian Editorial Edition • Prepared for Engineering Teams & Colleagues")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 32, page_text)
        self.restoreState()


def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Color Palette: Minimalist Scandinavian Editorial
    TERRACOTTA = colors.HexColor("#B85D38")
    PINE = colors.HexColor("#2D4A3E")
    CHARCOAL = colors.HexColor("#1C1917")
    MUTED_GRAY = colors.HexColor("#646059")
    LIGHT_BG = colors.HexColor("#FBF9F5")
    CARD_BORDER = colors.HexColor("#E5E2DA")
    ACCENT_BG = colors.HexColor("#F4EFEA")

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=28,
        leading=34,
        textColor=CHARCOAL,
        alignment=0,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=14,
        leading=18,
        textColor=TERRACOTTA,
        spaceAfter=18
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=18,
        leading=22,
        textColor=CHARCOAL,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=13,
        leading=17,
        textColor=PINE,
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'SectionH3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=TERRACOTTA,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=CHARCOAL,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    script_action = ParagraphStyle(
        'ScriptAction',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12.5,
        textColor=PINE
    )

    script_dialogue = ParagraphStyle(
        'ScriptDialogue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=CHARCOAL
    )

    mono_style = ParagraphStyle(
        'MonoCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11.5,
        textColor=CHARCOAL
    )

    meta_tag = ParagraphStyle(
        'MetaTag',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=8,
        leading=10,
        textColor=TERRACOTTA,
        textTransform='uppercase'
    )

    story = []

    def make_callout(title, content_p, bg_color=LIGHT_BG, border_color=CARD_BORDER):
        """Creates an elegant editorial box for speaker scripts, formulas, or takeaways."""
        t_data = [
            [Paragraph(f"<b>{title}</b>", meta_tag)],
            [content_p]
        ]
        t = Table(t_data, colWidths=[504])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg_color),
            ('BOX', (0,0), (-1,-1), 1, border_color),
            ('PADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,0), 6),
            ('BOTTOMPADDING', (0,0), (-1,0), 2),
            ('BOTTOMPADDING', (0,1), (-1,1), 6),
        ]))
        return t

    # ==========================================
    # COVER PAGE / TITLE SPREAD
    # ==========================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("✦ &nbsp; EXECUTIVE FIELD GUIDE & SPEAKER SCRIPT", meta_tag))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Natural Language Processing:<br/>An Interactive Compendium", title_style))
    story.append(Paragraph("The Step-by-Step Curriculum, Architecture Walkthrough, and Website Presentation Guide", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=TERRACOTTA, spaceBefore=4, spaceAfter=14))

    intro_p = Paragraph(
        "<b>About this Document:</b> This guide is engineered to accompany the live web portal at "
        "<font color='#B85D38'><b>https://nickygrey.github.io/nlp-interactive-guide/</b></font>. "
        "It provides a complete, grounded curriculum across the 15 fundamental questions of computational linguistics, "
        "step-by-step speaker presentation scripts, sandbox demonstration guides, and an overview of the "
        "5 production-grade applied NLP simulators. Use this guide to present to colleagues, onboard new engineers, "
        "or study the mathematical mechanics bridging raw text to modern Transformers.",
        body_style
    )
    story.append(intro_p)
    story.append(Spacer(1, 10))

    # Metadata Grid
    meta_data = [
        [
            Paragraph("<b>Live Web Portal:</b> https://nickygrey.github.io/nlp-interactive-guide/", body_style),
            Paragraph("<b>Target Audience:</b> Colleagues, ML Engineers, Researchers", body_style)
        ],
        [
            Paragraph("<b>GitHub Repository:</b> github.com/nickygrey/nlp-interactive-guide", body_style),
            Paragraph("<b>Aesthetic & Format:</b> Scandinavian Minimalist Editorial", body_style)
        ],
        [
            Paragraph("<b>Published Edition:</b> Autumn 2026", body_style),
            Paragraph("<b>Core Focus:</b> 100% Pure Natural Language Processing", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ACCENT_BG),
        ('BOX', (0,0), (-1,-1), 1, CARD_BORDER),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 18))

    # ==========================================
    # SECTION 1: HOW TO PRESENT THE WEBSITE (DEMO SCRIPT)
    # ==========================================
    story.append(Paragraph("Part 0: How to Present This Website to Colleagues", h1_style))
    story.append(Paragraph(
        "When showcasing this platform to your colleagues, follow this proven 5-step walkthrough to hook both "
        "non-technical stakeholders and veteran machine learning engineers within the first 3 minutes.",
        body_style
    ))

    demo_steps = [
        ("Step 1: The Live Keystroke Parser (Hero)",
         "<b>Action on Screen:</b> Type into the hero input box: <i>'How do machines understand the meaning of human language?'</i><br/>"
         "<b>What to Say:</b> <i>'Notice what happens on every single keystroke. In milliseconds, the browser slices raw characters into discrete tokens, identifies high-frequency stopwords, and maps the sentence into a real-time 3D vector space that calculates semantic intent. We are not calling an external server—this is live NLP running directly in client memory.'</i>"),

        ("Step 2: Dual-Perspective Toggle (Plain English vs. Deep Tech)",
         "<b>Action on Screen:</b> Click the toggle in the top-right header between <b>Plain English</b> and <b>Deep Tech</b>.<br/>"
         "<b>What to Say:</b> <i>'Every concept in this curriculum is built for dual audiences. Switch to Plain English, and you get tangible analogies—Lego bricks, postal sorting, compass directions. Switch to Deep Tech, and the folios instantly surface exact mathematical formulas, loss objectives, and production Python scripts.'</i>"),

        ("Step 3: The 5-Act Architectural Rail",
         "<b>Action on Screen:</b> Point out the sticky index rail. Click <b>Part III (Vector Space)</b> or <b>Applied Suite</b>.<br/>"
         "<b>What to Say:</b> <i>'The curriculum is structured into 5 cohesive acts spanning 15 foundational questions, culminating in 5 specialized production sandboxes. Each act features live interactive widgets rather than passive static text.'</i>"),

        ("Step 4: The 5-Stage Synthesis Pipeline",
         "<b>Action on Screen:</b> Scroll down to the Capstone Pipeline Builder before the footer.<br/>"
         "<b>What to Say:</b> <i>'Here, we assemble every concept into an end-to-end production pipeline: Raw String → Cleaning → Subword Tokenization → TF-IDF Vectorization → Spam/Ham Classification.'</i>"),

        ("Step 5: Verified Diploma & 1-Page Field Cheat Sheet",
         "<b>Action on Screen:</b> Click the <b>Certificate</b> button in the header.<br/>"
         "<b>What to Say:</b> <i>'Once finished, colleagues can type their name to generate a personalized Scandinavian completion certificate and print a high-density 1-page reference cheat sheet summarizing all equations and rules of thumb.'</i>")
    ]

    for title, text in demo_steps:
        story.append(Paragraph(title, h2_style))
        story.append(make_callout("SPEAKER DEMO SCRIPT", Paragraph(text, script_dialogue)))
        story.append(Spacer(1, 6))

    story.append(PageBreak())

    # ==========================================
    # SECTION 2: STEP-BY-STEP NLP CURRICULUM
    # ==========================================
    story.append(Paragraph("Part I: Foundations of Language (Q1 – Q4)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    # Q1
    story.append(Paragraph("Question 1: What Makes Human Language Difficult for Computers?", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Natural language is not code. Unlike Python or C++ with strict syntax trees, human language is "
        "permeated by morphological ambiguity, structural polysemy, and cultural pragmatics. For example: "
        "<i>'I saw the man with the telescope'</i> contains two valid parse trees (Did you use the telescope, or did the man have it?).",
        body_style
    ))
    story.append(make_callout("TALKING POINT & ANALOGY", Paragraph(
        "<b>Real-World Analogy:</b> Programming languages are like train tracks—every junction has an exact mechanical switch. "
        "Human language is like walking through a fog: words shift meaning based on who is speaking, tone, and shared context.",
        script_dialogue
    )))
    story.append(Spacer(1, 8))

    # Q2
    story.append(Paragraph("Question 2: Zipf's Law & Vocabulary Distribution", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> In 1935, linguist George Zipf proved that in any natural corpus, word frequency is inversely "
        "proportional to rank: <b>f(r) ∝ 1/r</b>. The 2nd most frequent word appears 1/2 as often as the 1st; the 10th word appears 1/10th as often. "
        "Remarkably, a mere <b>135 words</b> account for ~50% of all words spoken or written in English.",
        body_style
    ))
    story.append(make_callout("ENGINEERING IMPLICATION", Paragraph(
        "<b>The Long-Tail Problem:</b> Because 80% of words appear fewer than 3 times in typical datasets, models struggle to learn "
        "rare words if treated as whole units. This mathematical reality directly necessitated modern subword tokenization (BPE).",
        script_dialogue
    )))
    story.append(Spacer(1, 8))

    # Q3
    story.append(Paragraph("Question 3: Document Length Distributions & Corpus Profiling", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Documents in real-world corpora follow skewed Poisson or log-normal length curves. Profiling these distributions "
        "is critical for machine learning efficiency: setting maximum sequence lengths too high wastes VRAM on padding zeros, while "
        "setting them too low truncates vital context.",
        body_style
    ))
    story.append(make_callout("SPEAKER SCRIPT", Paragraph(
        "<i>'In the Corpus Profiler sandbox, watch how customer tweets cluster tightly at 20 words, while contracts extend past 1,000 words. "
        "In production, picking your 95th-percentile cutoff dictates GPU memory allocation.'</i>",
        script_dialogue
    )))
    story.append(Spacer(1, 8))

    # Q4
    story.append(Paragraph("Question 4: Stopwords — Computational Savings vs. Semantic Blindspots", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Stopwords are structural grammar glue (<i>the, is, in, at, of</i>). In classical Bag-of-Words and search indexing, "
        "stripping stopwords reduces vocabulary dimensionality by <b>30% to 40%</b> with zero loss in topic categorization. "
        "However, in sentiment analysis (<i>'not good'</i>) or Transformers, removing them destroys negation and syntactic dependencies.",
        body_style
    ))
    story.append(make_callout("RULE OF THUMB", Paragraph(
        "<b>When to strip:</b> TF-IDF search indexing, topic modeling (LDA), keyword density clustering.<br/>"
        "<b>When to preserve:</b> Transformer LLMs, sentiment classification, translation, question answering.",
        script_dialogue
    )))

    story.append(PageBreak())

    # ==========================================
    # PART II: WORDS & TOKENS
    # ==========================================
    story.append(Paragraph("Part II: Words, Tokens & Subwords (Q5 – Q6)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    # Q5
    story.append(Paragraph("Question 5: Tokenization Pitfalls & Sentence Slicing", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Naive splitting on whitespace fails catastrophically in production. It shatters contractions (<i>don't</i> → <i>don</i>, <i>'t</i>), "
        "chokes on currency symbols, URLs, hyphenated compounds (<i>state-of-the-art</i>), and completely breaks in non-segmented languages "
        "like Chinese (Mandarin) or Japanese where spaces do not exist between words.",
        body_style
    ))
    story.append(make_callout("DEMO TALKING POINT", Paragraph(
        "<b>Try in Sandbox:</b> Type <i>'Dr. Smith's phone # (555-0199) cost $1,200.50!'</i>. Compare how standard Regex separates currency, "
        "phone numbers, and honorific abbreviations into clean semantic units.",
        script_dialogue
    )))
    story.append(Spacer(1, 8))

    # Q6
    story.append(Paragraph("Question 6: Stemming, Lemmatization, and Byte-Pair Encoding (BPE)", h2_style))
    story.append(Paragraph(
        "<b>The Evolution of Word Normalization:</b><br/>"
        "<b>1. Stemming (Porter 1980):</b> Fast, heuristic suffix chopping. <i>'running'</i> → <i>'run'</i>, but <i>'universe'</i> → <i>'univers'</i> (not a real word).<br/>"
        "<b>2. Lemmatization:</b> Morphological dictionary lookup based on Part-of-Speech. <i>'better'</i> → <i>'good'</i>, <i>'was'</i> → <i>'be'</i>.<br/>"
        "<b>3. Byte-Pair Encoding (BPE / WordPiece):</b> The modern standard used in GPT-4 and Gemini. Iteratively merges frequent character pairs. "
        "Unseen words are broken into known subwords (<i>'unprecedented'</i> → <i>'un'</i> + <i>'precedent'</i> + <i>'ed'</i>), eliminating Out-Of-Vocabulary (OOV) errors forever.",
        body_style
    ))
    story.append(make_callout("KEY TAKEAWAY", Paragraph(
        "Subword tokenization is the architectural bridge that enables LLMs to process code, slang, chemical formulas, and new vocabulary without retraining.",
        script_dialogue
    )))

    story.append(Spacer(1, 14))

    # ==========================================
    # PART III: WORDS INTO NUMBERS
    # ==========================================
    story.append(Paragraph("Part III: Words into Numbers & Vector Spaces (Q7 – Q10)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    # Q7
    story.append(Paragraph("Question 7: Bag-of-Words & One-Hot Encoding", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Computers cannot process raw text; they require numerical vectors. Bag-of-Words (BoW) represents text by "
        "counting occurrences of each vocabulary word. However, BoW suffers from two catastrophic limitations: "
        "<b>1. Complete loss of word order</b> (<i>'dog bites man'</i> and <i>'man bites dog'</i> have identical vectors), and "
        "<b>2. Massive sparsity</b> (a vector with 50,000 dimensions containing mostly zeros).",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Q8
    story.append(Paragraph("Question 8: TF-IDF (Term Frequency – Inverse Document Frequency)", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> TF-IDF addresses BoW's weakness by weighting words based on their informational uniqueness across a corpus. "
        "A word that appears frequently in one document (high TF) but rarely across the whole library (high IDF) is assigned a high score.",
        body_style
    ))
    story.append(make_callout("MATHEMATICAL FORMULATION", Paragraph(
        "<b>TF-IDF Equation:</b><br/>"
        "<font face='Courier'>TF-IDF(t, d, D) = TF(t, d) × log( N / DF(t) )</font><br/>"
        "Where <i>N</i> is total documents in corpus, and <i>DF(t)</i> is document frequency containing term <i>t</i>.",
        script_dialogue
    )))
    story.append(Spacer(1, 6))

    # Q9
    story.append(Paragraph("Question 9: Word2Vec (Skip-Gram & CBOW)", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> Tomás Mikolov (2013) introduced dense, low-dimensional word embeddings based on J.R. Firth's famous linguistic maxim: "
        "<i>'You shall know a word by the company it keeps.'</i> Instead of 50,000 sparse dimensions, Word2Vec trains a shallow neural network "
        "to project words into a dense 300-dimensional continuous space where contextually similar words share neighboring coordinates.",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Q10
    story.append(Paragraph("Question 10: Cosine Similarity vs. Euclidean Distance", h2_style))
    story.append(Paragraph(
        "<b>Core Concept:</b> In text spaces, document length artificially inflates Euclidean (straight-line) distance. A 10-page essay and "
        "a 1-paragraph summary on the same topic point in the exact same direction, but their endpoints are far apart. "
        "<b>Cosine Similarity</b> measures the cosine of the angle between vectors, normalizing for magnitude and isolating pure conceptual direction.",
        body_style
    ))
    story.append(make_callout("COSINE FORMULA", Paragraph(
        "<font face='Courier'>cos(θ) = (u · v) / ( ||u|| × ||v|| )</font><br/>"
        "Returns 1.0 for identical direction (perfect semantic match), 0.0 for orthogonal (unrelated), and -1.0 for polar opposites.",
        script_dialogue
    )))

    story.append(PageBreak())

    # ==========================================
    # PART IV & V: MEANING & TRANSFORMERS
    # ==========================================
    story.append(Paragraph("Part IV: Extracting Meaning & Structure (Q11 – Q14)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("Question 11: Part-of-Speech (POS) Tagging", h2_style))
    story.append(Paragraph(
        "Assigns grammatical roles (Noun, Verb, Adjective). Disambiguates homographs like <i>'book a flight'</i> (Verb) vs. <i>'read a book'</i> (Noun).",
        body_style
    ))

    story.append(Paragraph("Question 12: Named Entity Recognition (NER)", h2_style))
    story.append(Paragraph(
        "Extracts real-world entities into predefined categories: Persons (PER), Organizations (ORG), Locations (LOC), and Dates. "
        "Essential for information extraction and knowledge graph construction.",
        body_style
    ))

    story.append(Paragraph("Question 13: Topic Modeling (Latent Dirichlet Allocation - LDA)", h2_style))
    story.append(Paragraph(
        "An unsupervised probabilistic technique that models documents as mixtures of topics, and topics as mixtures of words. "
        "Enables automated thematic organization of vast archives without human annotations.",
        body_style
    ))

    story.append(Paragraph("Question 14: Sentiment Classification & Polarity", h2_style))
    story.append(Paragraph(
        "Quantifies subjective attitude and emotional valence. Evolved from rule-based lexicons (VADER) to contextual neural classifiers.",
        body_style
    ))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Part V: The Modern Transformer Revolution (Q15)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("Question 15: Self-Attention & Query-Key-Value Mechanics", h2_style))
    story.append(Paragraph(
        "<b>The Breakthrough:</b> Introduced by Vaswani et al. in 2017 (<i>'Attention Is All You Need'</i>). Previous architectures "
        "(RNNs, LSTMs) processed words sequentially, suffering from vanishing gradients across long contexts and preventing GPU parallelization. "
        "Transformers process all tokens simultaneously, calculating mutual attention weights across every word pair.",
        body_style
    ))

    story.append(make_callout("THE LIBRARY / FILING CABINET ANALOGY", Paragraph(
        "<b>How Query-Key-Value Works:</b><br/>"
        "• <b>Query (Q):</b> What a word is searching for (e.g. <i>'it'</i> searches for the singular noun it refers to).<br/>"
        "• <b>Key (K):</b> What each word in the sentence offers (e.g. <i>'dog'</i> advertises: <i>'I am a singular animal noun'</i>).<br/>"
        "• <b>Value (V):</b> The actual semantic content retrieved once Q and K match.<br/>"
        "<font face='Courier'>Attention(Q, K, V) = softmax( (Q × K^T) / sqrt(d_k) ) × V</font>",
        script_dialogue
    )))

    story.append(PageBreak())

    # ==========================================
    # PART VI: THE APPLIED PRODUCTION SUITE
    # ==========================================
    story.append(Paragraph("Part VI: The Applied Production Suite (5 Specialized Labs)", h1_style))
    story.append(Paragraph(
        "The web portal features five interactive laboratories that bridge theoretical computational linguistics "
        "with modern production engineering. Here is how to present each sandbox to your team.",
        body_style
    ))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    labs = [
        ("Lab 1: Semantic Search vs. Exact Keyword Matching",
         "BM25 Lexical vs. Dense Vector Retrieval",
         "<b>How to Demo:</b> Search for <i>'automobile'</i> in the portal.<br/>"
         "<b>The Contrast:</b> Keyword search returns <b>0 results</b> because the text says <i>'electric cars and luxury sedans'</i>. "
         "Dense semantic search scores <b>0.93 similarity</b> because Word2Vec/BERT embeddings place 'car' and 'automobile' together in latent space.<br/>"
         "<b>Speaker Takeaway:</b> <i>'This demonstrates why modern retrieval cannot rely solely on exact string matching.'</i>"),

        ("Lab 2: Word2Vec Vector Arithmetic Playground",
         "Linear Geometric Subspaces & Mikolov's Discovery",
         "<b>How to Demo:</b> Select the preset: <b>King − Man + Woman = Queen</b>.<br/>"
         "<b>Visual Explanation:</b> Walk colleagues through the SVG Parallelogram diagram. Point out that the vector displacement "
         "from 'Man' to 'King' is identical to 'Woman' to 'Queen'. "
         "Show how other linguistic analogies hold: <i>Paris − France + Japan = Tokyo</i> (Capitals), <i>Bigger − Big + Cold = Colder</i> (Grammar).<br/>"
         "<b>Speaker Takeaway:</b> <i>'Word embeddings do not merely cluster—they preserve relational geometry.'</i>"),

        ("Lab 3: Interactive RAG from Scratch Simulator",
         "Document Slicing, Cosine Indexing, and Grounded Prompting",
         "<b>How to Demo:</b> Choose the <i>'NASA Artemis'</i> document. Adjust the Chunk Slider (20 to 70 words) and Top-K retrieval.<br/>"
         "<b>The Contrast:</b> Click <b>'Mode: Without RAG'</b> to show how the raw model hallucinates outdated parameters. "
         "Then click <b>'Mode: With RAG'</b> to show how the system injects the top-scoring chunks into the system prompt for a factual, cited response.<br/>"
         "<b>Speaker Takeaway:</b> <i>'This is the exact architecture powering enterprise chatbots and private document search today.'</i>"),

        ("Lab 4: LLM Next-Token & Temperature Simulator",
         "Softmax Scaling, Logit Distributions & Nucleus Top-P",
         "<b>How to Demo:</b> Set Temperature to T=0.2 (deterministic, sharp probabilities), then raise it to T=1.2 (flat, creative distribution). "
         "Demonstrate how Top-P nucleus sampling dynamically cuts off the low-probability hallucination tail.<br/>"
         "<b>Speaker Takeaway:</b> <i>'Temperature does not change the model's intelligence; it scales the Softmax exponent z_i / T.'</i>"),

        ("Lab 5: Token Economics & Context Window Calculator",
         "Subword Counting, Reading Time & API Pricing",
         "<b>How to Demo:</b> Paste any email or contract. Show the real-time token estimator (1 token ≈ 4 characters). "
         "Review the pricing matrix comparing Google Gemini 1.5 Flash ($0.075/1M), OpenAI GPT-4o ($2.50/1M), and Claude 3.5 Sonnet ($3.00/1M).<br/>"
         "<b>Speaker Takeaway:</b> <i>'Helps engineering leads budget context windows and model selection for enterprise workloads.'</i>")
    ]

    for title, subtitle, content in labs:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(f"<b>Focus:</b> {subtitle}", script_action))
        story.append(make_callout("PRESENTATION & LAB DEMO GUIDE", Paragraph(content, script_dialogue)))
        story.append(Spacer(1, 8))

    story.append(PageBreak())

    # ==========================================
    # PART VII: SPEAKER SCRIPT & TALKING POINTS
    # ==========================================
    story.append(Paragraph("Part VII: Presentation Script & Meeting Agendas", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=CARD_BORDER, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("10-Minute Executive Lightning Talk Outline", h2_style))
    exec_script = (
        "<b>Minute 0–2: The Fundamental Problem.</b> Open the website. Show the Live Parser in the Hero. "
        "Explain that language is messy, ambiguous, and non-numerical. Introduce the goal: how do machines turn human text into math?<br/>"
        "<b>Minute 3–5: Words to Vectors (The Turning Point).</b> Scroll to Part III. Open the <b>Vector Arithmetic Lab</b>. "
        "Show King − Man + Woman = Queen. Explain that words live in continuous coordinate spaces.<br/>"
        "<b>Minute 6–8: Applied Production (RAG & Search).</b> Open the <b>RAG Simulator Lab</b>. Demonstrate document slicing, "
        "cosine retrieval, and prompt augmentation. Show why RAG stops hallucination.<br/>"
        "<b>Minute 9–10: Wrap-Up & Certification.</b> Show the End-of-Course Pipeline Builder. Open the <b>Certificate Modal</b>. "
        "Invite colleagues to explore the portal at their own pace and download the 18-slide PowerPoint deck."
    )
    story.append(make_callout("EXECUTIVE TALK AGENDA", Paragraph(exec_script, script_dialogue)))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Common Colleague Questions & Crisp Answers", h2_style))

    faq_items = [
        ("Q: Why not just use full words instead of subword tokens (BPE)?",
         "<b>Answer:</b> Full-word vocabularies cannot handle typos, new slang, or technical jargon without exploding in size. "
         "Character-level models are too slow. Subword tokenization gives you an open vocabulary: common words stay whole, "
         "while rare words are built from universal subword fragments."),

        ("Q: What is the real difference between BM25 and Vector Search?",
         "<b>Answer:</b> BM25 matches exact lexical tokens with TF-IDF weighting—fast and perfect for part numbers or exact quotes. "
         "Vector search matches conceptual meaning in high-dimensional embedding space—handling synonyms and intent even when zero words overlap. "
         "Modern production search uses <i>Hybrid Search</i> combining both."),

        ("Q: Why does raising Temperature make an LLM more creative?",
         "<b>Answer:</b> The model outputs raw numerical scores called logits. In Softmax, dividing logits by Temperature T > 1.0 "
         "compresses the differences between the top token and runner-up tokens. The probability distribution flattens, "
         "giving diverse words a statistical chance to be sampled.")
    ]

    for q, a in faq_items:
        story.append(Paragraph(f"<b>{q}</b>", h3_style))
        story.append(Paragraph(a, body_style))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 14))

    # Colophon Footer Box
    colophon_p = Paragraph(
        "<b>COLOPHON:</b> This presentation handbook was designed according to Minimalist Scandinavian Editorial principles. "
        "Typeset in Times-Roman and Helvetica. All interactive sandboxes, simulators, and slides are accessible live at "
        "<font color='#B85D38'><b>https://nickygrey.github.io/nlp-interactive-guide/</b></font>.<br/>"
        "<i>'Thank you my friend, for listening, trying, and participating.'</i>",
        script_dialogue
    )
    story.append(make_callout("CURRICULUM COLOPHON", colophon_p, bg_color=ACCENT_BG, border_color=TERRACOTTA))

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename} ({os.path.getsize(filename):,} bytes)")

if __name__ == '__main__':
    target_path = sys.argv[1] if len(sys.argv) > 1 else 'NLP_Complete_Presentation_Guide.pdf'
    build_pdf(target_path)
