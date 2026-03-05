# Build Readiness Review

> Software Build Process Overlay — Production Readiness Assessment

---

## Thesis Statement

**What must be true for this software to be worth building:**

Digital agencies using AI for web content will adopt a structured production layer to manage, version, and deploy AI-generated HTML blocks — and will pay $149-249/mo for it — because the management overhead after AI generation is their second-largest cost line and no existing tool addresses it.

---

## Pre-Build Checklist

### Strategy (Phases 1-2) ✓

- [x] Strategic kernel defined (diagnosis, guiding policy, coherent actions)
- [x] Competitive landscape mapped (three-layer problem, gap identified)
- [x] SWOT-CAME analysis complete
- [x] Business model canvas (all 9 blocks)
- [x] Positioning and messaging hierarchy
- [x] GTM strategy with phased rollout
- [x] Unit economics modelled

### Users & Market (Phase 3) ✓

- [x] Four user personas defined with journey maps
- [x] Product-market fit hypothesis stated
- [x] PMF validation plan with gates
- [x] Pricing validation method defined
- [x] Segment-specific PMF expectations set

### Product (Phase 4) ✓

- [x] PRD with clear MVP scope
- [x] In-scope and out-of-scope explicitly defined
- [x] RICE-scored feature backlog
- [x] Build order (10 sprints)
- [x] Decision log with rationale
- [x] Open questions documented

### Architecture (Phase 5) ✓

- [x] System architecture diagram
- [x] Component architecture (frontend)
- [x] Database schema (high-level)
- [x] Edge Functions defined
- [x] Data flows (generation, approval, change request)
- [x] Key technical decisions documented
- [x] Git repo structure per project
- [x] Infrastructure and cost estimate
- [x] Security model

---

## Pre-Mortem: How This Project Fails

| Failure Mode | Likelihood | Impact | Prevention |
|-------------|-----------|--------|-----------|
| **Scope creep toward CMS** | High | Critical | Explicit out-of-scope list. No WYSIWYG in MVP. Scope guardrails enforced every sprint. |
| **Review board UX too complex** | Medium | High | Build simplest version first (grid of iframes + 3 buttons). User test with Sarah persona before adding features. |
| **Knowledge bank setup too hard** | High | High | Pre-loaded vertical templates. Required fields only. Guided onboarding flow. |
| **AI generation quality inconsistent** | Medium | High | Skill pack prompts tested and iterated before MVP launch. Quality validation in Edge Function. |
| **GitHub integration fragile** | Medium | Medium | Queue + retry pattern. Local cache before push. Clear error messages to user. |
| **Build takes too long** | Medium | High | 20-week estimate is aggressive. Cut client portal to P1 if behind. Core loop (KB → generate → review → export) is the minimum. |
| **No one pays** | Low | Critical | Internal agencies use it first (guaranteed usage). Early access validates willingness to pay before public launch. |
| **Team too small** | High | Medium | One developer can build MVP if scope is held. Parallel work possible (frontend/backend). Lovable can accelerate UI. |

---

## Assumption Register

| # | Assumption | Confidence | How to Test | When |
|---|-----------|-----------|------------|------|
| A1 | Agencies will adopt structured AI workflows over ad-hoc methods | Medium | Phase 1 internal usage; Phase 2 early access retention | Months 1-6 |
| A2 | Claude API produces consistently good HTML from knowledge bank context | High | Existing skill pack evidence from Wolf & Eagle builds | Already partially validated |
| A3 | Self-contained HTML with scoped CSS renders correctly across GHL, WordPress, Vercel | Medium | Test 10 blocks across 3 platforms before MVP launch | Sprint 4-5 |
| A4 | Agencies will pay $149-249/mo for this | Medium | Phase 2 pricing sensitivity survey | Month 4-5 |
| A5 | Client portal drives adoption (not just builder-side features) | Low-Medium | Track portal usage in Phase 1; survey clients | Month 3-4 |
| A6 | Block reuse compounds meaningfully by project 5 | Medium | Track reuse rate across EdisonEd school builds | Month 3-6 |
| A7 | Review board is faster than Slack-based approvals | Medium | Time both flows on same project in Phase 1 | Month 2 |
| A8 | One developer can build MVP in 20 weeks | Medium | Track actual velocity in Sprint 1-2; adjust plan | Month 1-2 |

---

## Risk Register

| # | Risk | Probability | Impact | Score | Mitigation | Owner |
|---|------|-----------|--------|-------|-----------|-------|
| R1 | Scope creep | High | Critical | 9 | Scope guardrails; explicit out-of-scope; weekly scope review | Product |
| R2 | Claude API pricing increases | Medium | High | 6 | Usage-based pass-through; generation efficiency; model-agnostic architecture | Engineering |
| R3 | GitHub API rate limits at scale | Low | Medium | 2 | Batch commits; local queue; rate limit monitoring | Engineering |
| R4 | Iframe XSS vulnerability | Medium | High | 6 | Sandboxed iframes; CSP headers; security audit before launch | Engineering |
| R5 | Knowledge bank quality variance | High | High | 9 | Required fields; validation; vertical templates; intake guides | Product |
| R6 | Team burnout (small team, ambitious scope) | Medium | High | 6 | Realistic sprint planning; cut features before cutting quality; no crunch | Leadership |
| R7 | Competitor launches similar product | Low | Medium | 2 | Speed to market; vertical library depth; production discipline moat | Strategy |

---

## Build Gates

### Gate 0: Pre-Build (THIS DOCUMENT)
- [x] Strategy docs complete
- [x] PRD approved
- [x] Architecture defined
- [x] Pre-mortem conducted
- [x] Assumptions documented
- [x] Risk register created
- **Decision: PROCEED TO BUILD**

### Gate 1: Foundation Complete (End of Sprint 2)
- [ ] Auth working (signup, login, roles)
- [ ] Project hierarchy in DB (workspace → project → page → block)
- [ ] Knowledge bank CRUD functional
- [ ] RLS policies enforced
- **Decision: Proceed to core generation / pause and fix**

### Gate 2: Core Loop Working (End of Sprint 4)
- [ ] Generation produces clean HTML from knowledge bank context
- [ ] HTML passes quality validation (scoped CSS, no external deps)
- [ ] Block versions stored and retrievable
- [ ] Can generate, preview, and iterate on a single block
- **Decision: Proceed to review board / pause and fix generation quality**

### Gate 3: Review & Git Working (End of Sprint 6)
- [ ] Review board renders iframe previews
- [ ] Approve/flag/reject workflow functional
- [ ] Approved blocks commit to GitHub automatically
- [ ] Version history visible in UI
- [ ] End-to-end flow: KB → generate → review → approve → Git
- **Decision: Proceed to client portal & deploy / pause and fix**

### Gate 4: MVP Complete (End of Sprint 8)
- [ ] Client portal functional (read-only + change requests)
- [ ] Manual export (download HTML)
- [ ] Vercel deployment connected
- [ ] All four user journeys testable end-to-end
- **Decision: Proceed to polish / cut scope / extend timeline**

### Gate 5: Launch Ready (End of Sprint 10)
- [ ] Onboarding flow tested with 3 non-team users
- [ ] Vertical templates loaded (schools, nonprofits, SMB)
- [ ] Performance acceptable (<2s page load)
- [ ] Security review passed (RLS, iframe sandbox, API key storage)
- [ ] Error handling covers common failure modes
- [ ] Documentation written
- **Decision: SHIP to internal agencies (Phase 1 GTM)**

---

## What to Build First (Next Steps)

1. **Create the Supabase project** — database, auth, RLS policies
2. **Scaffold the React app** — Vite + TypeScript + Tailwind + Supabase client
3. **Build auth + workspace** — signup, login, workspace creation, invite flow
4. **Build project hierarchy** — workspace → project → page → block CRUD
5. **Build knowledge bank** — CRUD with required field validation + clone
6. → **Gate 1 review**

The build starts at Sprint 1: Foundation. Everything before this point is strategy and architecture. Everything after this point is code.
