# Product Requirements Document (PRD)

## Website HTML Builder — MVP

---

## 1. Product Purpose

### Problem Statement
Digital agencies using AI to generate web content lose 15+ hours per build on post-generation management: finding code, previewing output, versioning changes, coordinating approvals, and deploying to target platforms. No existing tool manages AI-generated HTML blocks as structured, versioned, deployable assets with client-entity knowledge persistence.

### Solution
A light SaaS that organises, previews, versions, and routes AI-generated HTML blocks through a visual review board with Git-backed version control, client-entity knowledge banks, and role-separated views.

### Primary Goal
Reduce agency build time from 40-60 hours to 8-12 hours by eliminating post-generation management overhead and enabling block reuse across projects.

### Success Criteria
| Metric | Target | Measurement |
|--------|--------|-------------|
| Build time reduction | >60% vs traditional | Time tracking on first 5 projects |
| Time-to-first-approved-block | <2 hours from signup | Product analytics |
| Block reuse rate (same vertical) | >30% by project 5 | Project analytics |
| User retention (3 months) | >70% | Cohort analysis |
| Sean Ellis "Very Disappointed" | >40% | Survey at week 6 |

---

## 2. Users

| User | Role in System | Access Level |
|------|---------------|-------------|
| **Builder** (Account Manager / Designer) | Creates projects, manages knowledge banks, runs generation, reviews output | Full access |
| **Reviewer** (Agency Director / Senior) | Reviews generated blocks, approves/flags/rejects, manages team | Review board + project settings |
| **Client** (Marketing Manager) | Views approved assets, submits change requests | Read-only portal |
| **Developer** | Accesses Git repo, builds custom components, handles integrations | Full access + Git |

---

## 3. Definitions

### What is a Block?

A **block** is a single, self-contained visual section of a web page. It maps to one distinct purpose on the page and renders independently.

**Examples of blocks:**
- Hero section (headline, subheadline, CTA, background image)
- Social proof bar (logos, testimonial quotes, stats)
- Feature grid (3-4 feature cards with icons and descriptions)
- Testimonials section (carousel or grid of quotes)
- CTA section (final call-to-action with form injection point)
- FAQ accordion
- Footer

**NOT blocks (too granular):**
- A single button
- A heading
- An individual testimonial card within a testimonials section

**NOT blocks (too broad):**
- An entire page
- A multi-section layout combining hero + features + CTA

**Rule of thumb:** If it has its own conversion purpose or visual identity on the page, it is a block. If removing it from the page leaves a visible gap, it is a block. A typical landing page has 4-8 blocks.

**Impact:** This definition drives the data model (one `block` row per section), generation prompts (one generation call per block), review board layout (one iframe preview per block), and reuse metrics (blocks are the reusable unit across projects).

---

## 4. MVP Scope

### In Scope (MVP)

#### 4.1 Knowledge Bank
- Create and manage knowledge banks per client entity
- Required fields: brand tokens (colours, fonts, spacing), ICP definition, tone of voice
- Optional fields: writing framework, approved module styles, reference pages, logo/assets
- Clone knowledge bank to new project (modify tokens, keep structure)
- Knowledge bank persists across sessions — not locked to a thread
- Pre-loaded templates for 3 verticals: schools, nonprofits, SMB services

#### 4.2 Project Management
- Create projects linked to a knowledge bank
- Project contains: name, knowledge bank reference, page list, generation queue
- Page-level structure: name, conversion goal, block sequence (wireframe)
- Project-level notes and brief documentation

#### 4.3 AI Generation
- Generate HTML blocks informed by knowledge bank context + page wireframe
- Single block generation (one section at a time)
- Full page generation (all blocks for a page in one run)
- Batch generation (multiple pages in one run)
- Generation uses Claude API with skill pack prompts
- Each generation tagged with: prompt, timestamp, knowledge bank version, model used

#### 4.4 Review Board
- Visual board showing generated blocks as live iframe previews
- Side-by-side comparison of multiple versions
- Approval workflow: approve, flag for edit, reject
- Flagged blocks carry edit brief (text field describing what needs to change)
- Flagged blocks go back to generation with existing HTML as context (iterate, don't regenerate)
- Version number visible per block
- Current approved state vs in-review state visible

#### 4.5 HTML Output
- Self-contained HTML with inline/scoped CSS
- No external stylesheet dependencies
- Vanilla JS only where needed (no libraries)
- Injection points for forms, CRM tags, and conversion elements
- Consistent naming convention for injection points
- Responsive by default

#### 4.6 Git Integration
- Every approved block auto-commits to project GitHub repo
- Structured folder hierarchy: `client/project/page/block-name/`
- Version history visible in the UI (mirrors Git history)
- Rollback to previous version via UI (triggers Git revert)
- Diff view between versions

#### 4.7 Client Portal
- Read-only view for client stakeholders
- Shows current approved page stack (rendered, not code)
- Change request submission via text field
- Change requests appear as flagged items on the review board
- No code visibility, no generation interface

#### 4.8 Auth & Roles
- Supabase Auth (email + password, magic link)
- Role-based access: Builder, Reviewer, Client, Developer
- Workspace-level team management
- Invite flow for team members and clients
- Developer role: full Builder access plus direct Git repo access and API credentials visibility

#### 4.9 Deployment Routing
- **Vercel**: Connect repo → auto-deploy approved pages to staging URL
- **Manual export**: Download approved HTML blocks for manual injection into GHL/WordPress
- Deployment status visible per project (staged, live, not deployed)

---

### Out of Scope (MVP)

| Feature | Why Deferred | When |
|---------|-------------|------|
| White-label client portal | Complexity; validate core workflow first | v2 (post-PMF) |
| Template marketplace | Need library depth first | v2 |
| API access | No external integrations needed for MVP | v2 |
| GHL direct integration (API push) | Manual injection works; validate demand first | v2 |
| WordPress plugin | Manual injection works; validate demand first | v2 |
| Multi-model support (GPT-4, Gemini) | Claude is sufficient; architecture is model-agnostic | v2 |
| Inline text editing (WYSIWYG) | Complex; change requests + re-generation handle edits | v3 |
| Custom domain per project | Vercel staging URLs are sufficient for MVP | v2 |
| Analytics / conversion tracking | Out of scope for surface layer tool | Not planned |
| A/B testing | Premature; need base workflow first | v3 |
| Collaborative real-time editing | Single-user generation is fine for MVP | v3 |

---

## 5. Technical Requirements

### Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React + TypeScript + Tailwind (Vite) | Modern, fast, component-based |
| Backend | Supabase (Postgres, Auth, Storage, Edge Functions) | Managed, scalable, RLS for multi-tenancy |
| AI | Claude API (Anthropic) | Best HTML generation quality; existing skill packs |
| Version Control | GitHub API | Industry standard; structured repos |
| Hosting (SaaS) | Vercel | Fast deploys, edge network |
| Hosting (Client Sites) | Vercel (connected to project repos) | Auto-deploy from approved commits |

### Database Schema (High-Level)

```
workspaces
  ├── users (roles: builder, reviewer, client)
  ├── knowledge_banks
  │     ├── brand_tokens (colours, fonts, spacing)
  │     ├── icp_definition
  │     ├── tone_of_voice
  │     ├── writing_framework
  │     └── assets (logos, reference images)
  ├── projects
  │     ├── knowledge_bank_id (FK)
  │     ├── pages
  │     │     ├── blocks
  │     │     │     ├── versions
  │     │     │     │     ├── html_content
  │     │     │     │     ├── prompt_used
  │     │     │     │     ├── generation_metadata
  │     │     │     │     └── status (draft/in_review/approved/rejected)
  │     │     │     └── current_approved_version_id
  │     │     └── block_sequence (wireframe order)
  │     └── deployment_config
  └── change_requests
        ├── block_id (FK)
        ├── requested_by (user_id)
        ├── description
        └── status (pending/in_progress/resolved)
```

### Security
- Row-Level Security (RLS) on all tables — users only see their workspace data
- Client role can only read approved blocks and submit change requests
- API keys (Claude, GitHub) stored as Supabase secrets, never client-side
- HTTPS everywhere
- No PII stored beyond user email and name

### Performance
- Iframe previews lazy-loaded on review board
- HTML blocks cached in Supabase Storage (not re-rendered from DB on every view)
- Generation runs async (queue-based) — UI shows progress, not blocking
- Git operations batched where possible

---

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time (review board) | <2 seconds |
| Generation queue feedback | Progress indicator within 1 second of submission |
| Uptime | 99.5% (Supabase + Vercel SLA) |
| Data backup | Supabase automated backups + Git repos as secondary source of truth |
| Mobile responsive | Review board and client portal must work on tablet; generation is desktop |

---

## 7. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Claude API rate limits / downtime | Generation blocked | Medium | Queue system with retry; show clear status to user |
| GitHub API rate limits | Commits fail | Low | Batch commits; cache locally then push |
| Iframe preview security (XSS) | Security vulnerability | Medium | Sandboxed iframes with CSP headers; no script execution in preview |
| Knowledge bank quality varies | Poor generation output | High | Required fields with validation; vertical templates as starting points |
| Scope creep toward CMS | Lost focus, delayed launch | High | Explicit out-of-scope list; scope guardrails overlay; say no to WYSIWYG editing in MVP |

---

## 8. Open Questions

1. **Generation credit model**: Fixed per tier or pay-per-run? Need to validate with early users.
2. **Git repo structure**: One repo per workspace or one repo per project? Per-project is cleaner but more repos to manage.
3. **Iframe sandbox level**: How locked down should previews be? Need to balance security with accurate rendering (some blocks may need JS).
4. **Change request workflow**: Does a change request auto-create a flagged block, or does the AM review the request first and decide?
5. **Knowledge bank versioning**: When a knowledge bank is updated, do existing blocks need re-validation or are they grandfathered?
