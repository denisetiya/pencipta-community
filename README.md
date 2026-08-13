# pencipta community - AI Knowledge & Mentorship Network

A high-trust knowledge community layered on a familiar social feed. Anyone "tells their
story" once; AI extracts a structured **Pencipta Profile** (what they know, what they want
to learn). Search and matching run on these profiles, and every connection request
carries context + an AI-generated icebreaker - replacing cold outreach with a warm,
context-rich handshake.

Built for **Tecnofest** - a working prototype of the concept applied on top of an
nsosyal-style social platform.

## Features

- **Story-Based Onboarding (AI)** - chat freely, AI generates your Pencipta Profile
  (summary, skills, interests, experience) in one call.
- **AI Solution Discovery** - natural-language search ("find someone who's raised
  funding") → ranked matches with trust score + *"Why this person"* evidence.
- **Mentorship Handshake** - every request carries a context question + AI icebreaker
  that references a real detail from the pencipta's profile. Pencipta accepts/declines with full
  context.
- **Ask the Community (AI)** - get an answer grounded in the community corpus, with
  clickable citations to the people who can help.
- **Social base** - feed, posts, likes, comments, follows, hashtags & trends.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| ORM / DB | Prisma 7 (driver adapter) + PostgreSQL |
| Auth | NextAuth (Auth.js v5) - *planned* |
| LLM | Self-hosted OpenAI-compatible API (DeepSeek v4 Pro / atomix), 1M context |

## Getting Started

### Prerequisites

- Node.js ≥ 20, pnpm ≥ 11
- PostgreSQL running locally (e.g. `docker run -d --name pg -p 5432:5432 -e POSTGRES_PASSWORD=... postgres:16`)
- A reachable OpenAI-compatible LLM endpoint

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env
#   DATABASE_URL: your Postgres connection string
#   AI_BASE_URL / AI_API_KEY / AI_MODEL: your LLM endpoint

# 3. Create the database, run migrations, seed demo accounts
pnpm db:migrate
pnpm db:seed

# 4. Run the dev server
pnpm dev
```

Open [link](https://tecnofest.denisetiya.site/)

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `AI_BASE_URL` | Base URL of the OpenAI-compatible LLM endpoint (e.g. `http://localhost:8080/v1`) |
| `AI_API_KEY` | API key for the LLM endpoint |
| `AI_MODEL` | Model id served by the endpoint |

## Project Structure

Layered architecture - request flows down, dependencies point down, each layer is
replaceable:

```
src/
  app/                          # Presentation: routing + thin handlers
    page.tsx                    # landing (AppShell)
    api/
      hello/route.ts            # smoke-test endpoint: GET /api/hello
      onboarding/route.ts       # POST - chat → Pencipta Profile
      search/route.ts           # POST - natural-language matchmaking
      connect/route.ts          # POST/PATCH - request + accept/decline
      ask/route.ts              # POST - Ask the Community agent
  server/                       # Application layer (server-only)
    ai/
      prompts/                  # Pure prompt builders (no I/O)
        extraction.ts  matching.ts  icebreaker.ts  ask.ts
      pipelines/                # Build prompt → call LLM → validate output (zod)
        extraction.pipeline.ts  matching.pipeline.ts
        icebreaker.pipeline.ts  ask.pipeline.ts
    services/                   # Use cases: orchestrate pipelines + DB
      onboarding.service.ts     search.service.ts
      connection.service.ts     ask.service.ts
    schemas/                    # Zod input validation
      onboarding.schema.ts  search.schema.ts  connect.schema.ts  ask.schema.ts
    http/
      errors.ts                 # ApiError (status + code)
      response.ts               # jsonOk / toHttpError (incl. zod mapping)
  components/
    ui/                         # Design-system primitives (Button, Card, Avatar,
                                #   Badge, Input, Textarea, Spinner)
    layout/                     # Sidebar, AppShell
  lib/                          # Infrastructure + shared client helpers
    llm.ts                      # chatJSON<T>() / chatText() → OpenAI-compatible LLM
    prisma.ts                   # Prisma 7 client (driver adapter)
    api.ts                      # typed client → /api/* (OnboardingResult, SearchMatch…)
    utils.ts                    # cn(), initials(), timeAgo()
prisma/
  schema.prisma                 # 9 models: User, Profile, Post, Like, Comment,
                                # Follow, Hashtag, Connection, ChatSession
  seed.ts                       # demo accounts (aya = seeker, gökçe = pencipta)
docs/
  PRD.md                        # full product requirements document
```

**Data flow example** - `POST /api/search`:
`route.ts (parse+validate)` → `search.service.ts (load profiles)` →
`matching.pipeline.ts (prompt → LLM → zod check)` → `prompts/matching.ts (pure)` →
`lib/llm.ts (HTTP)` → back up with `response.ts (jsonOk / toHttpError)`.

Note on `app/api`: Next.js requires route handlers (`route.ts`) to live inside `app/`.
The handlers are kept as thin controllers that delegate to `server/` - all business
logic and AI stay framework-free.

## Useful Commands

```bash
pnpm dev            # dev server
pnpm build          # production build
pnpm lint           # eslint
pnpm db:migrate     # apply Prisma migrations
pnpm db:seed        # seed demo data
pnpm db:generate    # regenerate Prisma client
pnpm exec prisma studio  # browse the database
```

## Demo Flow (90 seconds)

1. Login with a demo seeker account.
2. Onboarding: type a short story → Pencipta Profile generates → confirm.
3. Explore: "find someone who has raised funding" → match cards with trust score +
   "Why this person" + evidence.
4. Connect: request with context + AI icebreaker → send.
5. Switch to the pencipta demo account → inbox shows context + icebreaker → Accept.

## Roadmap

- **MVP**: clone base + 3 AI pipelines + connect flow + demo seed *(current)*
- **v1.1**: Ask the Community agent; auto-index posts/comments into the knowledge
  graph; reputation/pencipta points.
- **v2.0**: real-time chat sessions, skill verification from sessions, mobile apps.
