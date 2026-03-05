# Feature Prioritization (RICE)

> Scoring: Reach (1-10), Impact (1-5), Confidence (0.5-1.0), Effort (T-shirt: S=1, M=2, L=4, XL=8)
> RICE Score = (Reach × Impact × Confidence) / Effort

---

## MVP Features (Must Ship)

| # | Feature | Reach | Impact | Confidence | Effort | RICE | Priority |
|---|---------|-------|--------|------------|--------|------|----------|
| 1 | **Review Board** (iframe previews, approve/flag/reject) | 10 | 5 | 0.9 | L (4) | 11.3 | P0 |
| 2 | **Knowledge Bank** (create, edit, clone, templates) | 10 | 5 | 0.9 | L (4) | 11.3 | P0 |
| 3 | **AI Generation** (single block, full page, batch) | 10 | 5 | 0.8 | XL (8) | 5.0 | P0 |
| 4 | **Git Integration** (auto-commit approved, version history, rollback) | 8 | 4 | 0.9 | L (4) | 7.2 | P0 |
| 5 | **Project Structure** (workspace → project → page → block hierarchy) | 10 | 4 | 1.0 | M (2) | 20.0 | P0 |
| 6 | **Auth & Roles** (Supabase Auth, builder/reviewer/client) | 10 | 4 | 1.0 | M (2) | 20.0 | P0 |
| 7 | **Client Portal** (read-only approved view, change requests) | 7 | 4 | 0.8 | M (2) | 11.2 | P0 |
| 8 | **HTML Output** (scoped CSS, injection points, responsive) | 10 | 5 | 0.9 | M (2) | 22.5 | P0 |
| 9 | **Vercel Deployment** (connect repo, auto-deploy staging) | 6 | 3 | 0.8 | M (2) | 7.2 | P0 |
| 10 | **Manual Export** (download approved HTML for injection) | 8 | 3 | 1.0 | S (1) | 24.0 | P0 |

---

## Post-MVP (v2) — Prioritised

| # | Feature | Reach | Impact | Confidence | Effort | RICE | Priority |
|---|---------|-------|--------|------------|--------|------|----------|
| 11 | **Block Library** (save approved blocks as reusable templates) | 8 | 5 | 0.8 | M (2) | 16.0 | P1 |
| 12 | **Vertical Templates** (pre-built knowledge banks + block sets per vertical) | 7 | 4 | 0.7 | L (4) | 4.9 | P1 |
| 13 | **White-Label Client Portal** | 4 | 3 | 0.6 | L (4) | 1.8 | P2 |
| 14 | **GHL Direct Push** (API integration to inject HTML into GHL pages) | 5 | 4 | 0.5 | L (4) | 2.5 | P2 |
| 15 | **WordPress Plugin** (push approved blocks to WP pages) | 4 | 3 | 0.5 | XL (8) | 0.8 | P3 |
| 16 | **API Access** (external integrations, automation) | 3 | 3 | 0.5 | L (4) | 1.1 | P2 |
| 17 | **Multi-Model Support** (GPT-4, Gemini as generation options) | 5 | 2 | 0.6 | M (2) | 3.0 | P2 |
| 18 | **Template Marketplace** (sell/share block libraries) | 3 | 4 | 0.4 | XL (8) | 0.6 | P3 |
| 19 | **Inline Text Editing** (safe WYSIWYG for copy-only changes) | 6 | 4 | 0.5 | XL (8) | 1.5 | P3 |
| 20 | **Custom Domains** (per-project custom domain on Vercel) | 4 | 2 | 0.8 | S (1) | 6.4 | P1 |

---

## Build Order (MVP)

### Sprint 1-2: Foundation
1. **Auth & Roles** — Supabase Auth, workspace creation, role management
2. **Project Structure** — workspace → project → page → block data model
3. **Knowledge Bank** — CRUD, required field validation, clone functionality

### Sprint 3-4: Core Generation
4. **AI Generation** — Claude API integration, prompt construction from knowledge bank, single block + page generation
5. **HTML Output** — scoped CSS enforcement, injection point system, responsive validation

### Sprint 5-6: Review & Management
6. **Review Board** — iframe previews, version comparison, approve/flag/reject workflow
7. **Git Integration** — GitHub repo creation per project, auto-commit on approval, version history UI

### Sprint 7-8: Client & Deployment
8. **Client Portal** — read-only view, change request submission
9. **Manual Export** — download approved blocks as HTML files
10. **Vercel Deployment** — connect repo, staging URL generation

### Sprint 9-10: Polish & Launch Prep
- Onboarding flow (guided first project)
- Knowledge bank templates (3 verticals)
- Error handling and edge cases
- Performance optimisation (lazy loading, caching)
- Documentation

---

## Effort Estimates

| Phase | Sprints | Duration (2-week sprints) | Core Deliverables |
|-------|---------|--------------------------|-------------------|
| Foundation | 1-2 | 4 weeks | Auth, project structure, knowledge bank |
| Core Generation | 3-4 | 4 weeks | AI generation, HTML output quality |
| Review & Management | 5-6 | 4 weeks | Review board, Git integration |
| Client & Deployment | 7-8 | 4 weeks | Client portal, export, Vercel deploy |
| Polish & Launch | 9-10 | 4 weeks | Onboarding, templates, optimisation |
| **Total MVP** | **10** | **20 weeks** | Full MVP ready for early access |

**Note:** These estimates assume one primary developer. With parallel frontend/backend work or a second developer, timeline could compress to 12-14 weeks.

---

## Decision Log

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| Auth provider | Auth0, Clerk, Supabase Auth | Supabase Auth | Already using Supabase for DB; reduces stack complexity |
| Git provider | GitHub, GitLab, Bitbucket | GitHub | Most widely used; best API; existing Corhelix account |
| AI provider | Claude, GPT-4, Gemini | Claude (model-agnostic architecture) | Best HTML quality; existing skill packs; architecture allows switching |
| Hosting | Vercel, Netlify, Railway | Vercel | Best DX; auto-deploy from Git; edge network |
| Client editing | WYSIWYG, change requests, code editor | Change requests (via portal) | Lowest complexity; avoids breaking markup; validates demand first |
| Deployment | Direct API push, manual export, Git-connected | Manual export + Vercel Git-connect | Minimal integration complexity for MVP; validates both paths |
| Pricing model | Per-seat, per-project, per-workspace | Per-workspace (tiered subscription) | Simplest; aligns with agency mental model |
