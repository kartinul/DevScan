# DevScan

**What you claim. What GitHub proves.**

DevScan is an automated technical audit engine designed to cross-reference software engineering resumes against empirical evidence from GitHub. It extracts claims from PDF resumes, identifies GitHub handles, and fetches deep repository data via GraphQL to validate skills, experience, and project scale.

## Features

- **PDF Parsing**: Automated text extraction from PDF resumes using PDF.js.
- **GitHub Auto-Detection**: Regex-based detection of GitHub profiles from resume text.
- **Deep Audit**: Fetches repository metadata, languages (line count estimation), and manifest files (`package.json`, `requirements.txt`).
- **AI-Powered Analysis**: Cross-references extracted claims against GitHub evidence using Gemini 3.0 Flash Preview (with automatic fallback to Gemini 2.0 Flash).
- **Recruiter Workflow**: Decisions (Tick/Cross) on candidates with the ability to bundle accepted resumes into a ZIP file.

## Technical Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Radix UI (Primitives), Lucide Icons
- **Data Fetching**: Octokit GraphQL (GitHub API)
- **PDF Processing**: PDF.js
- **Services**: Modular service layer for OCR, GitHub, AI, and Archiving

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js

### Installation

```bash
bun install
```

### Environment Setup

Create a `.env` file in the root:

```env
VITE_GITHUB_TOKEN=your_ghp_token
VITE_GEMINI_API_KEY=AIza...
```

### Development

```bash
bun dev
```

### Building

```bash
bun run build
```
