# ⌬ DevScan

**What you claim. What GitHub proves.**

DevScan is an automated technical audit engine designed to cross-reference software engineering resumes against empirical evidence from GitHub. It extracts claims from PDF resumes, identifies GitHub handles, and fetches deep repository data via GraphQL to validate skills, experience, and project scale.

---

## 🚀 Features

- **PDF Parsing**: Automated text extraction from PDF resumes using `pdf.js`.
- **GitHub Auto-Detection**: Regex-based detection of GitHub profiles from resume text.
- **Deep Audit**: Fetches repository metadata, languages (line count estimation), and manifest files (`package.json`, `requirements.txt`).
- **AI-Powered Analysis**: (In-Progress) Cross-references extracted claims against GitHub evidence using Gemini 2.0 Flash / GPT-4o mini.
- **Recruiter Workflow**: Decisions (Tick/Cross) on candidates with the ability to bundle accepted resumes into a ZIP file.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Radix UI (Primitives), Lucide Icons
- **Data Fetching**: Octokit GraphQL (GitHub API)
- **PDF Processing**: PDF.js
- **Services**: Modular service layer for OCR, GitHub, AI, and Archiving

---

## 🎯 Roadmap & Future Goals

### High Impact (Short Term)
- [ ] **LinkedIn Cross-Reference**: Triangulate data by scraping or accepting pasted LinkedIn profiles.
- [ ] **Commit Heatmap Analysis**: Detect bursty vs. consistent contributors using GitHub's contribution graph.
- [ ] **Interview Question Generator**: Generate targeted questions based on "partial" or "missing" claims.
- [ ] **Side-by-Side Comparison**: Overlay skill bars and scores for multiple candidates.
- [ ] **Score History**: Track credibility improvements over time with re-audits.

### Medium Impact (Mid Term)
- [ ] **Code Quality Signals**: Check for tests, CI/CD configs, and linting standards in repositories.
- [ ] **Repo Freshness**: Cross-reference claimed dates against actual `updatedAt` timestamps.
- [ ] **Plagiarism Detection**: Advanced detection for forks and unoriginal commit history.
- [ ] **Stack Coherence**: AI-driven analysis of whether the tech stack across repos matches the professional profile.
- [ ] **Percentile Ranking**: Rank candidates against the broader pool of audited developers.

### Ambitious (Long Term)
- [ ] **Browser Extension**: Instant audits directly from LinkedIn profile pages.
- [ ] **ATS Integration**: API for companies to pipe resumes directly into the audit engine.
- [ ] **Candidate Self-Audit**: A mode for developers to audit themselves before applying.
- [ ] **Language-Specific Depth**: Analyze code patterns (e.g., idiomatic Python vs. shallow code).

---

## 📦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (Recommended)

### Installation
```bash
bun install
```

### Environment Setup
Create a `.env` file in the root:
```env
VITE_GITHUB_TOKEN=your_ghp_token
VITE_OPENAI_API_KEY=sk-...
VITE_GEMINI_API_KEY=AIza...
VITE_GROQ_API_KEY=gsk_...
```

### Development
```bash
bun dev
```
