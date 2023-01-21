/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POMOSHARE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
