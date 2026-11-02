# Project architecture

One line: React Router 7 app using Puter.js for auth/storage/AI, rendered as SPA (ssr:false) with Vite+ toolchain.

## Stack

| Layer              | Tech                                                                                        | Notes                                        |
| ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Framework          | React 19, React Router 7, TypeScript                                                        | SPA mode (see react-router.config.ts).       |
| Build/tooling      | Vite+ (Vite 8.3.4 via @voidzero-dev/vite-plus-core), vite-tsconfig-paths, @tailwindcss/vite | Unified toolchain via `vp`.                  |
| Styling            | Tailwind CSS v4, tw-animate-css, class-variance-authority, clsx, tailwind-merge             | Global styles in app/app.css.                |
| UI                 | Radix UI, lucide-react                                                                      | Components in app/components/.               |
| State              | Zustand                                                                                     | app/lib/puter.ts store.                      |
| Data/validation    | zod                                                                                         | app/data/schemas.ts.                         |
| PDF                | pdfjs-dist, react-dropzone                                                                  | Resume upload/preview.                       |
| Backend/services   | Puter.js (loaded via script in app/root.tsx)                                                | Auth, FS, KV, AI (no custom backend server). |
| Formatting/linting | Vite+ (oxfmt/oxlint via vp)                                                                 | Migrated from Biome.                         |

## Entry points

| File                   | Role                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| app/root.tsx           | HTML layout, loads Puter.js script, initializes Puter store (init()), global error boundary. |
| app/routes.ts          | Route map: `/`, `/upload`, `/resume/:id`, `/wipe`.                                           |
| app/app.css            | Tailwind entry and global styles.                                                            |
| vite.config.ts         | Vite+ config (fmt/lint/staged, lazyPlugins).                                                 |
| react-router.config.ts | SPA (`ssr: false`), `future.v8_viteEnvironmentApi: true`.                                    |

## Routes

| Route         | Component             | Purpose                                    |
| ------------- | --------------------- | ------------------------------------------ |
| `/`           | app/routes/home.tsx   | Home/resume list.                          |
| `/upload`     | app/routes/upload.tsx | Job details + resume upload/analysis flow. |
| `/resume/:id` | app/routes/resume.tsx | View analysis results.                     |
| `/wipe`       | app/routes/wipe.tsx   | Clear stored data.                         |

## Data flow

1. `usePuterStore` (app/lib/puter.ts) initializes Puter API on client; exposes auth, FS, KV, AI.
2. Upload flow: `UploadForm` collects company/title/job summary, uploads the selected `File` directly to Puter FS, runs AI analysis on the uploaded path (prompt + schema), and saves the parsed results to Puter KV.
3. Results rendered from stored data on `/resume/:id`.
4. No server API routes - all operations go through Puter.js client.

## Key modules

| Path                | Purpose                                      |
| ------------------- | -------------------------------------------- |
| app/lib/puter.ts    | Puter client/store (auth, fs, kv, ai, init). |
| app/lib/utils.ts    | Shared utilities.                            |
| app/lib/response.ts | Response helpers.                            |
| app/data/schemas.ts | Zod schemas for analysis.                    |
| app/data/types/*    | Type definitions.                            |
| app/components/*    | UI by feature/layout/ui.                     |

## Toolchain

- Package manager/runtime: Bun.
- Commands: `vp dev`, `vp build`, `vp check`, `vp fmt`, `vp lint`. See package.json scripts.
- Config: vite.config.ts uses `defineConfig` from `vite-plus` with fmt/lint/staged.
