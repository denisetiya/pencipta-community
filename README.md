# pencipta-comunity - AI Knowledge & Mentorship Network

A high-trust knowledge community layered on a familiar social feed. Anyone "tells their
story" once; AI extracts a structured **Profile** (what they know, what they want
to learn). Search and matching run on these profiles, and every connection request
carries context + an AI-generated icebreaker - replacing cold outreach with a warm,
context-rich handshake.

Built for **Tecnofest** - a senior-grade production prototype applied on top of an
nsosyal-style social platform.

## Features

- **Senior-Grade AI Assistant** - multi-modal chat interface with history drawer, capsule input, dynamic suggestions, auto-hiding floating drawer, and global keyboard shortcuts (`Cmd+K` / `Ctrl+K`).
- **Dynamic Device Preview System** - live viewport switcher (`Responsive`, `Android`, `iOS` with hardware notch Dynamic Island) for instant testing across devices.
- **Story-Based Onboarding (AI)** - chat freely, AI generates your Profile
  (summary, skills, interests, experience) in one call.
- **AI Solution Discovery** - natural-language search ("find someone who's raised
  funding") → ranked matches with trust score + *"Why this person"* evidence.
- **Mentorship Handshake** - every request carries a context question + AI icebreaker
  referencing real profile details. Mentor accepts/declines with full context.
- **Ask the Community (AI)** - get answers grounded in the community corpus with citations.
- **Social Base** - feed, posts, likes, comments, follows, hashtags & trends.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 (Strict Mode) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| ORM / DB | Prisma 7 (Driver Adapter) + PostgreSQL 16 |
| LLM | OpenAI-compatible API (DeepSeek v4 Pro / atomix) |

## Project Structure

```
src/
  app/                                  # Next.js App Router (pages & endpoints)
    page.tsx                            # Landing / Home page
    layout.tsx                          # Root layout with global providers & dev tools
    icon.svg                            # Tab browser favicon & dynamic app icon
    assistant/
      page.tsx                          # Full-page AI Assistant workspace
    ask/
      page.tsx                          # Ask page entrypoint
    api/
      hello/route.ts                    # Smoke-test GET /api/hello
      onboarding/route.ts               # POST - chat → Profile extraction
      search/route.ts                   # POST - natural-language matching
      connect/route.ts                  # POST/PATCH - mentorship connect & handshake
      ask/route.ts                      # POST - Ask the Community agent
  components/
    assistant/                          # Modular AI Assistant domain
      assistant-workspace.tsx           # Adaptive layout (full page / popup drawer)
      index.ts                          # Clean barrel export
      context/
        assistant-context.tsx           # State management with lazy initializers
      types/
        assistant.types.ts              # Strict TypeScript domain interfaces
      data/
        mock-conversations.ts           # Demo conversation dataset
      ui/
        header.tsx                      # Header with iOS Dynamic Island / Android status bar
        input.tsx                       # Capsule multi-modal prompt input
        chat-view.tsx                   # Conversation stream & message bubbles
        history-view.tsx                # Chat history search & management drawer
      widget/
        floating-widget.tsx             # Auto-hiding Floating Action Button & drawer
    dev/
      dev-toolbar.tsx                   # Auto-hiding viewport toggle (Responsive/Android/iOS)
    layout/
      app-shell.tsx                     # Social app responsive shell
      sidebar.tsx                       # Global brand sidebar navigation
      global-viewport.tsx               # Hardware-accurate device frames (iOS/Android)
    ui/                                 # Global design system primitives
      logo.tsx                          # Centralized brand Logo component (sm/md/lg/xl)
      button.tsx                        # Core button variants
      card.tsx                          # Card container
      avatar.tsx                        # Profile avatar
      badge.tsx                         # Badge chip
      input.tsx                         # Form input
      spinner.tsx                       # Loading spinner
  context/
    viewport-context.tsx                # Global viewport platform state
  server/                               # Server-only backend application layer
    ai/
      prompts/                          # Pure prompt builders (no I/O)
      pipelines/                        # LLM invocation & Zod schema validation
    services/                           # Domain services & database orchestration
    schemas/                            # Zod validation schemas
    http/                               # HTTP response formatting & error handling
  lib/                                  # Shared utilities & client wrappers
    llm.ts                              # OpenAI-compatible LLM client
    prisma.ts                           # Prisma 7 client instance
    api.ts                              # Typed API client
    utils.ts                            # Tailwind cn helper, formatters
prisma/
  schema.prisma                         # Prisma database schema
  seed.ts                               # Seed data for demo accounts
docs/
  PRD.md                                # Product requirements document
  ENGINEERING_RULES.md                  # Senior engineering standards & architecture rules
```


## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env

# 3. Apply database migrations and seed data
pnpm db:migrate
pnpm db:seed

# 4. Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
pnpm dev              # Start development server
pnpm build            # Production build with Turbopack
pnpm lint             # Run ESLint validation
pnpm exec tsc --noEmit # Strict TypeScript check
pnpm db:migrate       # Apply Prisma migrations
pnpm db:seed          # Seed demo accounts
pnpm exec prisma studio # Open database studio
```
