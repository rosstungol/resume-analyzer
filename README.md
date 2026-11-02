# Resume Analyzer

Give Your Resume a Glow-Up ✨

A lightweight AI-powered tool that analyzes your resume against a specific job target and provides clear, actionable feedback—so you can apply with more confidence and better results.

**Live Demo:** [Resmyze](https://resmyze.pages.dev/)

## Features

- **Job-Specific Analysis**  
  Tailor feedback based on company name, job title, and job summary.

- **Resume Upload**  
  Upload a PDF and get instant insights.

- **Overall Score**  
  Quickly see how your resume performs at a glance.

- **Detailed Breakdown**
  - ATS Compatibility
  - Writing Style
  - Content Quality
  - Structure & Formatting
  - Skills Match

- **Actionable Feedback**  
  Practical suggestions you can actually apply—no vague advice.

## How It Works

1. Enter job details (company, title, summary)
2. Upload your resume
3. Get instant analysis and feedback

## Notes

- This is a **demo project**
- Results are AI-generated and meant for guidance, not final judgment

## Tech Stack

| Layer                     | Technology                                          |
| ------------------------- | --------------------------------------------------- |
| Framework                 | React 19 + React Router 7 + TypeScript              |
| Backend                   | Puter.js                                            |
| State                     | Zustand                                             |
| Styling                   | Tailwind v4                                         |
| Build                     | Vite+ (Vite 8.3.4 via @voidzero-dev/vite-plus-core) |
| Package manager / runtime | Bun                                                 |
| Linter / Formatter        | Vite+ (oxfmt / oxlint via `vp`)                     |

## Commands

This project uses [Vite+](https://viteplus.dev) (`vp`) as its unified toolchain and [Bun](https://bun.sh) as its package manager.

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `bun i`             | Install dependencies.                                   |
| `bun run dev`       | Start dev server.                                       |
| `bun run build`     | Build for production.                                   |
| `bun run typecheck` | Run React Router typegen and TypeScript check.          |
| `bun run lint`      | Lint with oxlint.                                       |
| `bun run format`    | Format code with oxfmt.                                 |
| `bun run check`     | Run Vite+ checks (format/lint/typecheck as configured). |
