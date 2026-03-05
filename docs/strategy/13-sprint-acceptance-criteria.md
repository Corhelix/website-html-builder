# Sprint Acceptance Criteria

> Testable "done means done" definitions per sprint, aligned with Build Gates from [Build Readiness](12-build-readiness.md).

---

## Sprint 1: Auth & Workspace Foundation

### 1.1 Supabase Auth — Email + Password
- [ ] User can sign up with email + password
- [ ] User can log in with valid credentials
- [ ] User cannot log in with invalid credentials (error shown)
- [ ] Magic link login sends email and completes auth on click
- [ ] JWT issued on login contains workspace membership claims
- [ ] Session persists across page refresh (token stored, auto-refresh)
- [ ] Logout clears session and redirects to login screen

### 1.2 Workspace Creation
- [ ] Authenticated user can create a new workspace (name + slug)
- [ ] Slug is auto-generated from name, editable, unique-validated
- [ ] Workspace creator is auto-assigned role `builder`
- [ ] User is redirected to workspace dashboard after creation

### 1.3 Role Management
- [ ] Four roles exist: `builder`, `reviewer`, `client`, `developer`
- [ ] Builder can invite users to workspace via email
- [ ] Invited user receives email → clicks link → creates account → lands in workspace
- [ ] Builder can assign or change roles for workspace members
- [ ] Client role cannot access generation, review board admin actions, or project settings
- [ ] Reviewer role can access review board but cannot create projects or run generation
- [ ] Developer role has full Builder access plus: Git repo URL visible, commit history accessible, API credentials section visible in project settings

### 1.4 Row-Level Security (RLS)
- [ ] User can only see workspaces they belong to
- [ ] All workspace-scoped tables enforce RLS (workspaces, workspace_users, knowledge_banks, projects)
- [ ] Direct Supabase API call without valid JWT returns 0 rows (not an error)
- [ ] User in Workspace A cannot read any data from Workspace B

**Sprint 1 done when:** A user can sign up, create a workspace, invite a team member with a specific role, and RLS prevents cross-workspace data access.

---

## Sprint 2: Project Hierarchy & Knowledge Bank

### 2.1 Project CRUD
- [ ] Builder can create a project within a workspace
- [ ] Project requires: name, linked knowledge bank
- [ ] Builder can rename and archive a project
- [ ] Project dashboard shows page count, block count, and deployment status

### 2.2 Page Structure
- [ ] Builder can add pages to a project (name, conversion goal)
- [ ] Pages have a `sort_order` — drag-to-reorder or manual number
- [ ] Page shows block sequence (wireframe) as an ordered list
- [ ] Builder can add/remove/reorder blocks in the wireframe

### 2.3 Block Data Model
- [ ] Block belongs to a page
- [ ] Block has: name, sort_order, current_version_id (nullable until first generation)
- [ ] Block version has: html_content, prompt_used, generation_metadata, status, created_by, created_at
- [ ] Status enum enforced: `draft`, `in_review`, `approved`, `rejected`

### 2.4 Knowledge Bank CRUD
- [ ] Builder can create a knowledge bank with required fields:
  - Brand tokens (colours array, font family, spacing scale)
  - ICP definition (text)
  - Tone of voice (text)
- [ ] Optional fields save correctly: writing framework, module styles, reference pages, logo upload
- [ ] Builder can edit any field in an existing knowledge bank
- [ ] Builder can delete a knowledge bank (blocked if linked to active projects)
- [ ] Logo/asset uploads stored in Supabase Storage with correct bucket policies

### 2.5 Knowledge Bank Clone
- [ ] Builder can clone a knowledge bank to create a copy
- [ ] Cloned KB has all fields pre-filled from source
- [ ] Cloned KB is independent — edits don't affect the source
- [ ] Clone button visible on KB detail and KB list views

### 2.6 Vertical Templates
- [ ] Three pre-loaded templates exist: Schools, Nonprofits, SMB Services
- [ ] Builder can create a new KB from a template (pre-fills all fields)
- [ ] Templates are read-only — not editable by users
- [ ] Template data loads from seed data (not hardcoded in frontend)

---

### BUILD GATE 1: Foundation Complete (End of Sprint 2)

| Criterion | Test |
|-----------|------|
| Auth working | Sign up → log in → log out → log back in. Magic link flow completes. |
| Roles enforced | Client user cannot access project settings or generation UI. Reviewer cannot create projects. |
| Project hierarchy in DB | Create workspace → project → page → block. Query returns correct tree. |
| Knowledge bank CRUD | Create → edit → clone → delete. Required field validation rejects empty submissions. |
| RLS enforced | Two users in different workspaces. User A cannot see User B's data via direct API call. |

**Gate decision:** Proceed to core generation / pause and fix.

---

## Sprint 3: AI Generation Engine

### 3.1 Edge Function — generate-block
- [ ] Edge Function `generate-block` accepts: block_id, prompt (optional override), page_id
- [ ] Function loads knowledge bank context: brand tokens, ICP, tone, writing framework
- [ ] Function loads page context: name, conversion goal, block sequence position
- [ ] Function constructs prompt: system (skill pack rules) + context (KB) + instruction (wireframe)
- [ ] Function calls Claude API and receives HTML response
- [ ] Function stores result as new `block_version` with status `draft`
- [ ] Function records `generation_run`: prompt, model, tokens_used, timestamps
- [ ] Function returns preview-ready HTML to frontend

### 3.2 Single Block Generation
- [ ] Builder selects a block → clicks "Generate" → sees loading indicator
- [ ] Generated HTML appears as iframe preview within 30 seconds
- [ ] Block version is created with status `draft`
- [ ] Generation metadata (prompt, model, timestamp, token count) is stored and viewable

### 3.3 Full Page Generation
- [ ] Builder clicks "Generate Page" on a page with 3+ blocks in wireframe
- [ ] All blocks generate sequentially (or parallel with queue)
- [ ] Progress indicator shows which block is generating (e.g. "3/5 complete")
- [ ] All block versions created with status `draft`
- [ ] Failed generations show error message per block (don't block others)

### 3.4 Batch Generation
- [ ] Builder can select multiple pages and click "Generate All"
- [ ] Generation queue processes pages in order
- [ ] Queue status shows: total blocks, completed, in-progress, failed
- [ ] Builder can cancel remaining queue items

### 3.5 Iterative Editing
- [ ] Builder can edit a generated block by providing an edit brief
- [ ] Edge Function receives existing HTML + edit brief as additional context
- [ ] New version is created (doesn't overwrite previous)
- [ ] Edit brief is stored in generation metadata

### 3.6 Generation Usage Tracking
- [ ] Every generation run increments a workspace-level counter for the current billing period
- [ ] Workspace dashboard shows: generation runs used / total allowed this period
- [ ] When 80% of generation limit is reached, a warning banner is shown
- [ ] When 100% of limit is reached, generation is blocked with a clear upgrade prompt
- [ ] Usage resets at the start of each billing period
- [ ] Admin/Builder can view usage breakdown by project

### 3.7 Error Handling
- [ ] Claude API timeout (>60s) returns user-friendly error, not raw stack trace
- [ ] Claude API rate limit returns "Generation queued, retrying shortly"
- [ ] Invalid knowledge bank (missing required fields) blocks generation with clear message
- [ ] Network failure during generation marks run as `failed` with reason

---

## Sprint 4: HTML Output Quality

### 4.1 Scoped CSS Validation
- [ ] Generated HTML contains `<style>` tag with all CSS classes prefixed by block ID
- [ ] No CSS class names leak into global scope (validated by Edge Function post-generation)
- [ ] Validation failure triggers re-generation with explicit scoping instruction

### 4.2 Self-Contained Output
- [ ] Generated HTML has zero external `<link>` or `<script src="">` tags
- [ ] No CDN references (fonts, icons, libraries)
- [ ] All fonts are system fonts or base64-embedded
- [ ] Validation check: reject output with external dependencies, retry once

### 4.3 Injection Points
- [ ] Generated HTML includes `<div data-inject="form-primary"></div>` where forms should go
- [ ] Injection point naming follows convention: `form-primary`, `form-secondary`, `cta-primary`, `tracking-head`, `tracking-body`
- [ ] Platform-specific elements (GHL forms, WP shortcodes) are NOT in generated HTML — only placeholder divs

### 4.4 Responsive Output
- [ ] Generated HTML includes media queries for mobile (<768px), tablet (768-1024px), desktop (>1024px)
- [ ] Review board preview can toggle between mobile/tablet/desktop widths
- [ ] Text remains readable at all breakpoints (no horizontal overflow)

### 4.5 Semantic HTML
- [ ] Generated HTML uses proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Interactive elements have ARIA labels where appropriate
- [ ] Images have alt text (or alt="" for decorative)
- [ ] HTML passes basic accessibility lint (axe-core or similar)

### 4.6 Output Standard Enforcement
- [ ] Edge Function runs post-generation validation checklist:
  1. Scoped CSS present
  2. No external dependencies
  3. Injection points use correct format
  4. Media queries present
  5. Heading hierarchy valid
- [ ] Validation result stored in generation_metadata
- [ ] Blocks that fail validation are flagged with specific failure reasons

---

### BUILD GATE 2: Core Loop Working (End of Sprint 4)

| Criterion | Test |
|-----------|------|
| Generation produces clean HTML | Generate 5 blocks from a knowledge bank. All 5 have scoped CSS, no external deps, injection points. |
| HTML passes quality validation | Edge Function validation returns pass for 4/5 blocks minimum. Failures have clear reasons. |
| Block versions stored | Generate → edit → generate again. Three versions exist. Each has correct metadata. |
| Can generate, preview, iterate | Single block: generate → preview in iframe → provide edit brief → new version appears. |
| Page generation works | Page with 4 blocks: "Generate Page" → all 4 blocks have draft versions → all render in preview. |

**Gate decision:** Proceed to review board / pause and fix generation quality.

---

## Sprint 5: Review Board

### 5.1 Board Layout
- [ ] Review board shows all blocks for a project, grouped by page
- [ ] Each block renders as a live iframe preview (sandboxed, `srcdoc`)
- [ ] Board supports grid view (overview) and single-block focus view
- [ ] Blocks show: name, version number, status badge (draft/in_review/approved/rejected)

### 5.2 Iframe Preview
- [ ] Iframes use `sandbox="allow-same-origin"` (no `allow-scripts`)
- [ ] CSS renders correctly within sandboxed iframe
- [ ] Responsive toggle: mobile (375px), tablet (768px), desktop (1280px) iframe widths
- [ ] Iframes lazy-load (only render when scrolled into viewport)

### 5.3 Version Comparison
- [ ] Builder can view two versions of the same block side-by-side
- [ ] Version selector dropdown shows: version number, date, status
- [ ] Currently approved version (if any) always available for comparison

### 5.4 Approval Workflow
- [ ] Builder/Reviewer can approve a block → status changes to `approved`
- [ ] Builder/Reviewer can flag a block → status changes to `in_review`, edit brief text field appears
- [ ] Builder/Reviewer can reject a block → status changes to `rejected`
- [ ] Approving a block updates `block.current_version_id`
- [ ] Only one version per block can be `approved` at a time (previous approved version status unchanged but current_version_id moves)

### 5.5 Status Visibility
- [ ] Block cards show clear visual distinction: draft (grey), in_review (amber), approved (green), rejected (red)
- [ ] Page-level summary shows: "3/5 blocks approved" progress bar
- [ ] Project-level summary shows: "Homepage: 5/5, About: 2/4" per-page status

---

## Sprint 6: Git Integration

### 6.1 Project Repo Creation
- [ ] Edge Function `create-project-repo` creates a GitHub repo when a project is created
- [ ] Repo follows naming convention: `website-html-builder-{client-slug}`
- [ ] Repo is initialised with README + `.builder/` metadata folder + `pages/` folder structure
- [ ] Repo URL stored on project record

### 6.2 Auto-Commit on Approval
- [ ] Edge Function `commit-approved` fires when a block is approved
- [ ] HTML file committed to correct path: `pages/{page-name}/{block-name}/index.html`
- [ ] Commit message includes: block name, version number, approver
- [ ] Commit SHA stored in `git_commits` table linked to block_version

### 6.3 Version History UI
- [ ] Project settings page shows Git history (list of commits)
- [ ] Each commit shows: block name, version, timestamp, commit SHA (linked to GitHub)
- [ ] History is reverse-chronological

### 6.4 Rollback
- [ ] Builder can rollback a block to any previous approved version
- [ ] Rollback creates a new commit (not a force push or revert)
- [ ] `block.current_version_id` updates to the rolled-back version
- [ ] Rollback appears in Git history with clear message

### 6.5 Error Handling
- [ ] GitHub API failure queues commit for retry (up to 3 attempts)
- [ ] Failed commits show warning badge on block card
- [ ] Rate limit approached → batch mode activates (combine commits)
- [ ] User sees clear error message if repo creation fails

---

### BUILD GATE 3: Review & Git Working (End of Sprint 6)

| Criterion | Test |
|-----------|------|
| Review board renders previews | Open review board with 6 blocks across 2 pages. All 6 render as iframe previews. Toggle responsive widths. |
| Approve/flag/reject workflow | Approve block A → status green, Git commit created. Flag block B → edit brief field appears. Reject block C → status red. |
| Approved blocks commit to GitHub | Approve 3 blocks → check GitHub repo → 3 commits exist with correct file paths and content. |
| Version history visible | View Git history for project → shows all commits. Click commit SHA → links to GitHub. |
| End-to-end flow | KB → generate block → preview → flag → edit → re-generate → approve → verify in GitHub repo. |

**Gate decision:** Proceed to client portal & deploy / pause and fix.

---

## Sprint 7: Client Portal

### 7.1 Client View
- [ ] Client role user sees only approved blocks (no drafts, no rejected)
- [ ] Blocks render as iframe previews, grouped by page
- [ ] No generation controls, no project settings, no code visible
- [ ] Full page assembled view: all approved blocks stacked in page order

### 7.2 Change Requests
- [ ] Client can submit a change request on any approved block
- [ ] Change request form: text description field + optional reference (URL or text)
- [ ] Submitted request creates `change_request` record (status: `pending`)
- [ ] Client can view their submitted requests and current status

### 7.3 Change Request → Review Board
- [ ] Pending change requests appear as flagged items on builder's review board
- [ ] Change request shows: block reference, client description, submission date
- [ ] Builder can open the block in generation interface with change request as context
- [ ] Resolving the request (approving new version) marks change_request as `resolved`

### 7.4 Client Portal Security
- [ ] RLS enforces: client role = SELECT only on block_versions WHERE status = 'approved'
- [ ] Client role = INSERT only on change_requests (own workspace)
- [ ] Client cannot access generation_runs, block_versions with non-approved status, or Git data
- [ ] Direct API call from client role to non-permitted table returns 0 rows

---

## Sprint 8: Export & Deployment

### 8.1 Manual Export
- [ ] Builder can download approved HTML for a single block (`.html` file)
- [ ] Builder can download all approved blocks for a page (`.zip` with folder structure)
- [ ] Builder can download full project export (all pages, all approved blocks)
- [ ] Downloaded files match the Git repo structure
- [ ] Export includes injection point comments explaining where to paste platform code

### 8.2 Vercel Connection
- [ ] Builder can connect a project to Vercel via project settings
- [ ] Connection creates a Vercel project linked to the GitHub repo
- [ ] Approved block commit triggers auto-deploy to staging URL
- [ ] Staging URL visible in project dashboard

### 8.3 Deployment Status
- [ ] Project dashboard shows deployment status: `not_deployed`, `staging`, `live`
- [ ] Staging URL is clickable and opens in new tab
- [ ] Failed deploys show error status with link to Vercel logs

### 8.4 Full Page Assembly
- [ ] Edge Function (or frontend) assembles all approved blocks for a page into `full-page.html`
- [ ] Full page includes all blocks in sort order with a basic HTML wrapper (`<html>`, `<head>`, `<body>`)
- [ ] Full page committed to Git alongside individual blocks
- [ ] Full page renders correctly in browser (all block styles scoped, no conflicts)

---

### BUILD GATE 4: MVP Complete (End of Sprint 8)

| Criterion | Test |
|-----------|------|
| Client portal functional | Client logs in → sees approved pages → submits change request → builder sees it on review board. |
| Manual export works | Download single block, full page, full project. Open downloaded HTML in browser — renders correctly. |
| Vercel deployment connected | Approve a block → commit hits GitHub → Vercel auto-deploys → staging URL shows updated page. |
| All four user journeys testable | Builder: KB → generate → review → approve → deploy. Reviewer: review → approve. Client: view → change request. Developer: Git repo → pull → inspect. |

**Gate decision:** Proceed to polish / cut scope / extend timeline.

---

## Sprint 9: Onboarding & Templates

### 9.1 Guided First Project
- [ ] New user sees onboarding wizard after first login
- [ ] Wizard steps: Create workspace → Choose template or blank KB → Create first project → Add a page → Generate first block
- [ ] Each step has a brief explainer (1-2 sentences, not a tutorial)
- [ ] User can skip onboarding and access dashboard directly
- [ ] Onboarding state persisted — doesn't repeat on next login

### 9.2 Vertical Templates (Content)
- [ ] Schools template: pre-filled KB with education-sector colours, ICP (parents, students), tone (professional, warm)
- [ ] Nonprofits template: pre-filled KB with charity-sector colours, ICP (donors, volunteers), tone (mission-driven, empathetic)
- [ ] SMB Services template: pre-filled KB with professional services colours, ICP (business owners), tone (confident, clear)
- [ ] Each template includes 3-5 sample block wireframes for a typical homepage

### 9.3 Error Handling & Edge Cases
- [ ] Empty project (no pages/blocks) shows helpful empty state, not a blank screen
- [ ] Generation on block with missing KB fields shows specific "KB incomplete" error listing missing fields
- [ ] Concurrent approval of same block by two users doesn't corrupt state (optimistic locking or last-write-wins with notification)
- [ ] Deleting a page with approved blocks warns user and requires confirmation
- [ ] Network disconnect during generation shows "Connection lost — generation will resume" message

---

## Sprint 10: Performance, Security & Documentation

### 10.1 Performance
- [ ] Review board with 20 blocks loads in <2 seconds (lazy-loaded iframes)
- [ ] Knowledge bank editor saves within 500ms (optimistic UI update)
- [ ] Generation queue status updates in real-time (WebSocket or polling <2s interval)
- [ ] Client portal page load <2 seconds
- [ ] No layout shift (CLS <0.1) on review board during iframe loading

### 10.2 Security Audit
- [ ] All RLS policies tested with direct Supabase API calls for each role
- [ ] Iframe sandbox prevents script execution (test with `<script>alert(1)</script>` in block HTML)
- [ ] API keys (Claude, GitHub) not accessible from browser (only Edge Functions)
- [ ] CORS policy on Supabase restricts to SaaS domain only
- [ ] CSP headers set on frontend to prevent XSS
- [ ] No PII in logs beyond user email

### 10.3 Testing Coverage
- [ ] Unit tests for: KB validation, HTML output validation, role permission checks
- [ ] Integration tests for: generation flow (KB → prompt → Claude → store), approval flow (approve → Git commit), export flow
- [ ] E2E test: signup → create workspace → create KB → create project → generate block → approve → verify in Git
- [ ] E2E test: client login → view approved blocks → submit change request → builder sees request

### 10.4 Documentation
- [ ] User guide: Getting Started (3 pages covering KB setup, first generation, approval)
- [ ] API documentation for Edge Functions (internal — for developer persona)
- [ ] Deployment guide: how to connect Vercel, how to export for GHL injection
- [ ] Changelog template for ongoing updates

---

### BUILD GATE 5: Launch Ready (End of Sprint 10)

| Criterion | Test |
|-----------|------|
| Onboarding tested with 3 non-team users | 3 users complete onboarding without assistance. Time-to-first-approved-block <2 hours. |
| Vertical templates loaded | Schools, Nonprofits, SMB templates exist. User can start a project from template in <5 minutes. |
| Performance acceptable | Review board: 20 blocks in <2s. Client portal: <2s. No CLS >0.1. |
| Security review passed | RLS tested per role. Iframe sandbox verified. API keys server-side only. CORS/CSP configured. |
| Error handling covers common failures | Test: API timeout, rate limit, network disconnect, concurrent edit, missing KB fields. All show user-friendly messages. |
| Documentation written | User guide, deployment guide, and Edge Function docs exist and are accurate. |

**Gate decision: SHIP to internal agencies (Phase 1 GTM).**

---

## Cross-Sprint Quality Criteria

These apply to every sprint — not sprint-specific but enforced at every gate review.

| Standard | Criterion |
|----------|-----------|
| **Code quality** | No TypeScript `any` types in production code. ESLint zero warnings. |
| **Accessibility** | All interactive elements keyboard-navigable. Colour contrast AA minimum. |
| **Mobile** | Review board and client portal usable on tablet (1024px). Generation is desktop-only (acceptable). |
| **Data integrity** | No orphaned records. Foreign keys enforced. Cascade deletes where appropriate. |
| **Error states** | Every user action that can fail has a visible error message. No silent failures. |
| **Loading states** | Every async operation shows a loading indicator. No frozen UI. |
| **Naming** | Components: PascalCase. Files: kebab-case. DB: snake_case. Consistent throughout. |
