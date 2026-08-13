# PRD: pencipta community - AI Knowledge & Mentorship Network

## 1. Executive Summary

**Problem**: People need guidance across every domain - career moves, launching a
product, learning a skill, navigating life decisions - but finding the *right person to
ask* is hard. Social platforms' anonymity breeds spam and noise, and the fear of
bothering a stranger ("they're too busy / too important / why would they answer me?")
blocks the connection. Mentors, in turn, drown in vague, low-context requests.

**Solution**: A high-trust knowledge community layered on a familiar social feed. Anyone
"tells their story" once; AI extracts a structured Pencipta Profile (what they know, what
they want to learn). Search and matching run on these profiles, and every connection
request carries context + an AI-generated icebreaker - replacing cold outreach with a
warm, context-rich handshake. No forms, no awkwardness, no spam.

**Success Criteria (demo-measurable)**:
- Time from natural-language query → ranked suggestions ≤ 30s (single LLM round-trip).
- 100% of match recommendations include a `reason` backed by a verbatim `evidence`
  quote from the candidate's profile (zero fabricated citations).
- 100% of connection requests require a context field + generated icebreaker before
  sending (anti-spam guarantee, provable in demo).
- Onboarding chat → generated Pencipta Profile in one call; profile editable after.

## 2. User Experience & Functionality

### User Personas
| Persona | Role | Goal |
|---|---|---|
| Seeker | Anyone needing insight | Find the right person to ask, without cold-call awkwardness |
| Pencipta | Anyone with experience to share | Help people meaningfully, without spam or vague asks |
| Judge / Demo user | Evaluator | See the full loop work in ~90 seconds |

*Any field qualifies - career, startups, engineering, design, finance, health, hobbies,
academics, life decisions. Roles are behavioral, not tied to age or title.*

### User Stories
1. As a seeker, I want to tell my story in a chat, so the AI builds my profile instead
   of me filling forms.
   - **AC**: free-text multi-turn input; generated profile shows summary, skills chips,
     interests, experience years; profile is editable before confirming.
2. As a seeker, I want to ask in plain language ("find someone who's raised funding",
   "who can review my portfolio?"), so I get relevant people without guessing keywords.
   - **AC**: top-3 ranked results; each shows trust score 0-100 + "Why this person"
     block with reason + verbatim evidence; empty state when nothing fits.
3. As a seeker, I want to request a conversation with context + a suggested first
   message, so I'm not awkward and the pencipta can judge the request.
   - **AC**: request modal requires a context question; AI icebreaker generated
     (≤50 words) referencing a real detail from the pencipta's profile; icebreaker editable.
4. As a pencipta, I want to accept/decline requests showing the requester's context, so I
   only invest time in people worth helping.
   - **AC**: requests list shows seeker + context + icebreaker; accept → status becomes
     "accepted".
5. As a user, I want a familiar social feed (posts, likes, comments, follows,
   hashtags/trends), so the experience feels native, not like a form.
   - **AC**: create post, like, comment (1 level), follow, hashtag page, trends panel.

### Non-Goals (v1.0)
- Real-time notifications / websockets.
- Reply nesting, retweets, media uploads, DM chat.
- Auto-indexing of every new post/comment into the knowledge graph (future roadmap).
- Mobile apps; responsive web only.
- Payments / monetization / certification.

## 3. AI System Requirements

- **Model**: self-hosted DeepSeek v4 Pro (OpenAI-compatible API, 1M context).
- **Wrapper**: `src/lib/llm.ts` - `chatJSON<T>()` enforces `response_format: json_object`
  with markdown-fence + regex fallback; every pipeline returns typed JSON, validated
  before use.
- **Pipelines** (each in `src/lib/prompts/<name>.ts`):
  1. **Extraction** (`POST /api/onboarding`): chat → `{summary, skills[], interests[],
     experienceYears, keywords[]}`. Rule: derive from what the user SAID; never invent
     credentials.
  2. **Matching** (`POST /api/search`): query + all profiles → top-3
     `{profile_id, score, reason, evidence}`. Rule: `evidence` MUST be verbatim from the
     profile; drop non-fitting profiles.
  3. **Icebreaker** (`POST /api/connect`): pencipta + request → first message ≤50 words
     referencing one real profile detail.
  4. **Ask the Community** (`POST /api/ask`): question → `{answer, citedProfiles[]}`.

### Evaluation Strategy
- Golden test set of 5 onboarding inputs + 5 search queries (diverse domains); each must
  produce valid JSON and evidence that exists in the corpus (checked programmatically).
- Latency budget per pipeline ≤ 5s. If exceeded, cache matching results keyed by query.
- Prompt changes must pass the golden set before merging.

## 4. Technical Specifications

- **Stack**: Next.js (App Router) fullstack, Prisma 7 + Postgres (driver adapter),
  Tailwind CSS v4, NextAuth (Auth.js v5).
- **Data model** (`prisma/schema.prisma`): User, Profile, Connection, ChatSession,
  Post, Like, Comment, Follow, Hashtag.
- **Auth**: NextAuth credentials + one-click demo accounts (seeded).
- **API**:
  - Social: post/like/comment/follow/profile/hashtag CRUD.
  - Pencipta: `/api/onboarding`, `/api/search`, `/api/connect`, `/api/ask`,
    `/api/connections/:id/accept|decline`.
- **Security**: no client-side secrets; LLM key server-only; validate all JSON inputs;
  error responses never leak prompt internals.
- **Seed**: 8-10 realistic profiles across diverse domains (career, tech, design,
  finance, health, education, hobbies) + posts + hashtags, idempotent.

## 5. Risks & Roadmap

**Risks**:
- LLM output deviates from JSON schema → wrapper fallback + golden-set regression.
- Evidence fabrication → prompt rule + programmatic evidence check.
- Demo latency >5s → cache matches, pre-warm LLM, keep corpus small.

**Roadmap**:
- **MVP (v1.0, 25 Aug)**: clone base + 3 AI pipelines + connect flow + demo seed.
- **v1.1**: Ask the Community agent; auto-index posts/comments into knowledge graph;
  reputation/pencipta points; request inbox polish.
- **v2.0**: real-time chat sessions, skill verification from sessions, mobile apps.
