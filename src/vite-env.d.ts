/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly OPENAI_API_KEY: string;
  readonly GEMINI_API_KEY: string;
  readonly GROQ_API_KEY: string;
  readonly OPENROUTER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
