# Website HTML Builder

## What This Actually Is

A project-scoped generative build system where an AI agent carries the full client context into every run, outputs clean self-contained HTML blocks and pages to a structured visual review board, and routes approved assets through GitHub to whatever deployment environment the project requires.

It is not a website builder. It is not a CMS. It is not Claude with a nicer wrapper. It is a **production environment** — the layer that sits above the AI and turns generative output into managed, versioned, deployable assets with proper client boundaries and an approval workflow that non-technical stakeholders can actually use.

## The Problem

AI solves dev time — the biggest cost line in web builds. Clean HTML, brand-consistent output, fast generation. That part works.

What AI doesn't solve is **what happens after generation**:
- Where does the code live? Chat threads? Google Drive folders?
- What does each block actually look like? You're staring at raw markup.
- How do you edit safely? Non-tech users can't touch HTML without breaking things.
- Which version is current? What changed? Who approved it?
- How do you deploy it? Every time is custom handling.

Page builders (Webflow, Framer, GHL, Elementor) have structure but eat 15+ hours in pixel-tweaking per build. AI generators (Lovable, Bolt, Gamma) are fast but create unmanageable output. The hybrid approach — AI generates, inject into page builder — almost works but has no management layer.

**This product is that management layer.**

## The Output Paths

1. **Full build** → system manages blocks, previews, versions, approval gates → deploy via Vercel/custom domain
2. **Hybrid inject** → system manages HTML blocks → paste approved blocks into GHL/WordPress code injection → platform handles headers, forms, CRM tags, nav
3. **Mix of both** → some pages full-build, some blocks injected into existing platform

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind (Vite)
- **Backend**: Supabase (database, auth, storage, RLS)
- **Version Control**: GitHub (structured repo per project)
- **AI Generation**: Claude API with skill packs and knowledge banks
- **Deployment**: Vercel (SaaS hosting + client site deployments)

## Documentation

All strategy and product documentation lives in `docs/`:

### Strategy & Business Case (Phases 1-2)

| Document | Contents |
|----------|----------|
| [Strategic Kernel](docs/strategy/01-strategic-kernel.md) | Diagnosis, guiding policy, coherent actions |
| [Competitive Landscape](docs/strategy/02-competitive-landscape.md) | Three-layer problem, competitor map, gap analysis |
| [SWOT-CAME](docs/strategy/03-swot-came.md) | Strengths, weaknesses, opportunities, threats + actions |
| [Business Model Canvas](docs/strategy/04-business-model-canvas.md) | Full 9-block BMC |
| [Positioning & Messaging](docs/strategy/05-positioning-messaging.md) | Value prop, messaging hierarchy, differentiation |
| [GTM Strategy](docs/strategy/06-gtm-strategy.md) | Go-to-market phases, channels, unit economics |

### Users & Product-Market Fit (Phase 3)

| Document | Contents |
|----------|----------|
| [User Journeys](docs/strategy/07-user-journeys.md) | Four personas: Account Manager, CMO, Marketing Manager, Developer |
| [Product-Market Fit](docs/strategy/08-product-market-fit.md) | PMF hypothesis, validation plan, pricing validation |

### Product Definition (Phase 4)

| Document | Contents |
|----------|----------|
| [PRD](docs/strategy/09-prd.md) | MVP scope, technical requirements, database schema, risks |
| [Feature Prioritization](docs/strategy/10-feature-prioritization.md) | RICE-scored backlog, build order, effort estimates |

### Architecture & Build Readiness (Phase 5)

| Document | Contents |
|----------|----------|
| [Architecture](docs/strategy/11-architecture.md) | System diagram, component architecture, data flows, security |
| [Build Readiness](docs/strategy/12-build-readiness.md) | Pre-mortem, assumptions, risk register, build gates |

### Sprint Execution (Phase 6)

| Document | Contents |
|----------|----------|
| [Sprint Acceptance Criteria](docs/strategy/13-sprint-acceptance-criteria.md) | Per-sprint testable definitions, build gate checklists |

## Status

**Phase**: Strategy complete. Sprint acceptance criteria defined. Ready to build. Next: Sprint 1 (Foundation — Auth, Project Hierarchy, Knowledge Bank)

---

Built by [Wolf & Eagle](https://wolfandeagle.agency) / [ALC Advisory](https://alcadvisory.com.au)
