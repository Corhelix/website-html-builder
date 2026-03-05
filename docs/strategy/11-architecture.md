# Technical Architecture

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     WEBSITE HTML BUILDER                      │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────┐            │
│  │ Knowledge │  │  Generation  │  │   Review    │            │
│  │   Bank    │──│    Engine    │──│    Board    │            │
│  │  Manager  │  │ (Claude API) │  │  (Previews) │            │
│  └──────────┘  └──────────────┘  └──────┬──────┘            │
│       │                                   │                   │
│       │         ┌─────────────┐          │                   │
│       │         │   Client    │          │                   │
│       └────────│   Portal    │──────────┘                   │
│                 │ (Read-Only) │                               │
│                 └─────────────┘                               │
│                        │                                      │
│  ┌──────────────┐     │     ┌──────────────┐                │
│  │  Git Manager  │─────┘────│  Deploy      │                │
│  │  (GitHub API) │          │  Router      │                │
│  └──────────────┘          └──────────────┘                │
└─────────────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
┌────────────────┐     ┌─────────────────────┐
│  GitHub Repos  │     │  Deployment Targets  │
│  (per project) │     │  Vercel / GHL / WP   │
└────────────────┘     └─────────────────────┘
```

---

## Component Architecture

### Frontend (React + TypeScript + Tailwind)

```
src/
├── app/                          # App shell, routing, layouts
│   ├── routes/                   # Page routes
│   └── providers/                # Auth, theme, query providers
├── features/                     # Feature-based modules
│   ├── auth/                     # Login, signup, invite flow
│   ├── workspace/                # Workspace management, team, billing
│   ├── knowledge-bank/           # KB CRUD, templates, clone
│   │   ├── components/           # KBEditor, TokenPicker, ICPForm
│   │   ├── hooks/                # useKnowledgeBank, useClone
│   │   └── types.ts
│   ├── project/                  # Project, page, block hierarchy
│   │   ├── components/           # ProjectDashboard, PageEditor, BlockList
│   │   ├── hooks/                # useProject, usePage, useBlocks
│   │   └── types.ts
│   ├── generation/               # AI generation interface
│   │   ├── components/           # GeneratePanel, PromptEditor, QueueStatus
│   │   ├── hooks/                # useGenerate, useGenerationQueue
│   │   └── types.ts
│   ├── review-board/             # Visual review and approval
│   │   ├── components/           # BoardGrid, BlockPreview, ApprovalControls
│   │   ├── hooks/                # useReviewBoard, useApproval
│   │   └── types.ts
│   ├── git/                      # Git integration UI
│   │   ├── components/           # VersionHistory, DiffView, RollbackButton
│   │   ├── hooks/                # useGitHistory, useCommit
│   │   └── types.ts
│   ├── client-portal/            # Read-only client view
│   │   ├── components/           # ApprovedPageView, ChangeRequestForm
│   │   ├── hooks/                # useClientView, useChangeRequest
│   │   └── types.ts
│   └── deploy/                   # Deployment routing
│       ├── components/           # DeployPanel, ExportButton, VercelConnect
│       ├── hooks/                # useDeploy, useExport
│       └── types.ts
├── components/                   # Shared UI components
│   ├── ui/                       # Buttons, inputs, modals, etc.
│   └── layout/                   # Sidebar, header, page shells
├── lib/                          # Utilities, API clients
│   ├── supabase.ts               # Supabase client config
│   ├── claude.ts                 # Claude API wrapper (via Edge Function)
│   ├── github.ts                 # GitHub API wrapper (via Edge Function)
│   └── utils.ts
└── integrations/
    └── supabase/
        ├── client.ts
        └── types.ts              # Generated from Supabase schema
```

### Backend (Supabase)

**Database (Postgres + RLS):**

```sql
-- Core entities
workspaces (id, name, slug, plan, created_at)
workspace_users (workspace_id, user_id, role: builder|reviewer|client)

-- Knowledge management
knowledge_banks (id, workspace_id, name, vertical_template, created_at)
kb_brand_tokens (kb_id, colours, fonts, spacing_scale, logo_url)
kb_icp (kb_id, definition, pain_points, decision_factors)
kb_tone (kb_id, voice_description, writing_framework, examples)
kb_assets (kb_id, file_url, file_type, label)

-- Project hierarchy
projects (id, workspace_id, kb_id, name, status, github_repo_url, deploy_config)
pages (id, project_id, name, conversion_goal, block_sequence, sort_order)
blocks (id, page_id, name, current_version_id, sort_order)
block_versions (id, block_id, html_content, prompt_used, generation_metadata,
                status: draft|in_review|approved|rejected, created_by, created_at)

-- Workflow
change_requests (id, block_id, requested_by, description, status, resolved_at)
generation_runs (id, project_id, page_id, block_id, prompt, model, status,
                 started_at, completed_at, tokens_used)

-- Git tracking
git_commits (id, project_id, block_version_id, commit_sha, committed_at)
```

**Row-Level Security (RLS):**
- All tables filtered by workspace membership
- Client role: SELECT only on blocks WHERE status = 'approved' + INSERT on change_requests
- Reviewer role: SELECT + UPDATE status on block_versions
- Builder role: full CRUD within workspace

**Edge Functions (Supabase):**

| Function | Purpose | Calls |
|----------|---------|-------|
| `generate-block` | Constructs prompt from KB + wireframe, calls Claude API, stores result | Claude API |
| `commit-approved` | Takes approved block version, commits to GitHub repo | GitHub API |
| `create-project-repo` | Creates GitHub repo with folder structure for new project | GitHub API |
| `rollback-version` | Reverts block to previous approved version, updates Git | GitHub API |
| `export-blocks` | Packages approved blocks as downloadable HTML files | Supabase Storage |

---

## Data Flow

### Generation Flow

```
1. User selects page + block to generate (or batch)
2. Frontend calls `generate-block` Edge Function
3. Edge Function:
   a. Loads knowledge bank (brand tokens, ICP, tone, assets)
   b. Loads page wireframe (block sequence, conversion goal)
   c. Constructs prompt: skill pack template + KB context + wireframe spec
   d. Calls Claude API
   e. Receives HTML response
   f. Validates: scoped CSS present, no external deps, injection points correct
   g. Stores as new block_version (status: draft)
   h. Returns preview URL
4. Frontend renders iframe preview on review board
5. User reviews → approve / flag / reject
```

### Approval Flow

```
1. User marks block as "approved" on review board
2. Frontend updates block_version.status = 'approved'
3. Frontend updates block.current_version_id
4. Frontend calls `commit-approved` Edge Function
5. Edge Function:
   a. Reads approved HTML from block_version
   b. Commits to GitHub: client/project/page/block-name/index.html
   c. Stores commit SHA in git_commits table
6. If Vercel connected: auto-deploys from repo (Vercel webhook)
7. Client portal reflects updated approved state
```

### Change Request Flow

```
1. Client submits change request via portal (text description)
2. change_request created (status: pending)
3. Builder sees flagged item on review board
4. Builder opens block in generation interface with existing HTML as context
5. Builder prompts edit (Claude receives current HTML + edit brief)
6. New block_version created (status: in_review)
7. Builder previews → approves → normal approval flow
8. change_request marked resolved
```

---

## Key Technical Decisions

### Iframe Preview (Review Board)

**Approach:** Sandboxed iframes with `srcdoc` attribute
```html
<iframe
  sandbox="allow-same-origin"
  srcdoc={blockHtml}
  style="width: 100%; border: none;"
/>
```

**Security:** `sandbox` attribute prevents script execution by default. `allow-same-origin` needed for CSS to render correctly. No `allow-scripts` — blocks that need JS will render without it in preview (acceptable trade-off for MVP).

**Responsive preview:** Toggle iframe width to simulate mobile/tablet/desktop.

### HTML Output Standard

Every generated block must meet:
1. **Self-contained:** All CSS inline or in a `<style>` tag with scoped selectors
2. **No external dependencies:** No CDN links, no external fonts (fonts embedded or system fonts)
3. **Scoped selectors:** All CSS classes prefixed with block ID to prevent conflicts
4. **Injection points:** `<div data-inject="form-primary"></div>` for platform-specific elements
5. **Responsive:** Media queries included for mobile/tablet/desktop
6. **Semantic HTML:** Proper heading hierarchy, ARIA labels where appropriate
7. **Vanilla JS only:** If JS needed, inline `<script>` with no external dependencies

### Knowledge Bank → Prompt Construction

```
SYSTEM PROMPT (skill pack):
  HTML generation rules, scoped CSS requirements, injection point format

CONTEXT (from knowledge bank):
  Brand: {colours, fonts, spacing}
  ICP: {definition, pain points, decision factors}
  Tone: {voice, framework, examples}
  Module styles: {approved patterns}

INSTRUCTION (from wireframe):
  Page: {name, conversion goal}
  Block: {type, position in sequence, content brief}
  Constraints: {must include, must not include}

EXISTING CONTEXT (if editing):
  Current HTML: {approved version}
  Edit brief: {what needs to change}
```

### Git Repo Structure (Per Project)

```
website-html-builder-{client-slug}/
├── README.md                     # Auto-generated project summary
├── .builder/                     # Metadata (not for manual editing)
│   ├── knowledge-bank.json       # Snapshot of KB at generation time
│   └── project-config.json       # Page structure, deployment config
├── pages/
│   ├── homepage/
│   │   ├── hero/
│   │   │   └── index.html        # Current approved version
│   │   ├── proof-section/
│   │   │   └── index.html
│   │   ├── features/
│   │   │   └── index.html
│   │   ├── testimonials/
│   │   │   └── index.html
│   │   ├── cta/
│   │   │   └── index.html
│   │   └── full-page.html        # Assembled full page (all blocks)
│   ├── about/
│   │   └── ...
│   └── contact/
│       └── ...
└── assets/                       # Project assets (logos, images)
```

---

## Infrastructure

### Production Environment

| Service | Provider | Plan | Cost |
|---------|----------|------|------|
| Database + Auth + Storage | Supabase | Pro ($25/mo) | $25/mo |
| Edge Functions | Supabase | Included in Pro | $0 |
| Frontend Hosting | Vercel | Pro ($20/mo) | $20/mo |
| AI Generation | Claude API (Anthropic) | Pay-per-use | ~$0.01-0.05/block |
| Git Repos | GitHub | Free (public) or Team ($4/user) | $0-16/mo |
| Domain | Cloudflare | Standard | $10/yr |
| **Total (MVP)** | | | **~$50-70/mo + API usage** |

### Scaling Considerations

- Supabase Pro handles 500+ concurrent users
- Edge Functions scale automatically
- GitHub API rate limit: 5,000 requests/hour (authenticated) — sufficient for MVP
- Claude API: rate limits per tier — queue system handles bursts
- Vercel: auto-scales; each client project is a separate deployment

---

## Security Model

| Layer | Protection |
|-------|-----------|
| **Auth** | Supabase Auth (bcrypt passwords, JWT tokens, magic link) |
| **Authorization** | RLS on every table; role-based access per workspace |
| **API Keys** | Claude + GitHub tokens in Supabase Vault (server-side only) |
| **Client Portal** | Read-only RLS policy; no mutation endpoints exposed |
| **Iframe Previews** | Sandboxed; no script execution |
| **HTTPS** | Vercel enforces HTTPS; Supabase enforces HTTPS |
| **CORS** | Supabase configured for SaaS domain only |
