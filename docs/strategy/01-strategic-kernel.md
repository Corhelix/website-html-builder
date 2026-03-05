# Strategic Kernel

> Framework: Rumelt's Strategic Kernel — Diagnosis + Guiding Policy + Coherent Actions

---

## Diagnosis

There is a pattern in how teams adopt AI for web content. It runs in three stages, and the third is where everything stalls.

**Stage 1: AI helps you write.** You prompt it, it produces, you edit. Faster than starting from scratch. Useful for isolated tasks.

**Stage 2: You load knowledge.** Brand guidelines, tone of voice, ICP definitions go into a project or folder. Output improves because context is better. Feels like a real workflow.

**Stage 3: The ceiling.** The knowledge you loaded belongs to the container — a Claude Project, a ChatGPT Project, a Google Drive folder. It's locked to that thread, that session, that folder. The moment work becomes complex — different client, adjusted ICP, same baseline applied to a new vertical — the container breaks. You're manually copying context across threads, rebuilding knowledge banks from scratch, pasting code back and forth.

The project becomes unmanageable not because the AI is bad but because **the architecture was designed for one person working on one thing**.

### The Three-Layer Problem

**Layer 1: Page builders are fast to start, slow to finish.**
Webflow, Framer, Elementor, GHL — they all have structure and templates. But the actual time sink is never the layout. It's the font adjustments, image sizing, responsive fixes, copy edits that break spacing. A "2-hour template build" becomes 15 hours of pixel work. Every page builder shares this problem.

**Layer 2: AI generates fast but creates a management nightmare.**
Claude, ChatGPT, Lovable, Bolt — clean HTML in minutes. But then: Where does the code live? What does each block look like? How do you edit without breaking a div? You have to build headers, forms, nav every time. No ecosystem awareness. 20 blocks across 5 pages = chaos in a Google Drive folder.

**Layer 3: Generic AI builders are fast but shallow.**
Gamma.ai, Durable, 10Web — entire sites in seconds. Can't edit blocks individually. No brand persistence. Not part of CRM/form/deployment ecosystems. Presentation tools, not production tools.

### The Hybrid Almost Works

The best current approach: AI generates HTML → inject into page builder (GHL, WordPress) via code injection. You get AI speed + platform ecosystem (forms, tags, headers, nav).

But it falls apart at management. Open the code editor = wall of markup. No visual preview. No version control. No way for non-tech users to edit safely. No organisation across 20 blocks and 5 pages.

### The Binding Constraint

The problem is not generation speed — AI solved that. The problem is **what happens after generation**: management, preview, versioning, safe editing, deployment routing.

---

## Guiding Policy

Build the management and production layer for AI-generated web assets.

- **Client-entity knowledge** makes generation consistent (context belongs to the client, not the session)
- **Visual review board** makes output manageable (see what was built, approve or flag)
- **Git-backed version control** makes it versioned (every approved asset committed with structured hierarchy)
- **Injection points** make it deployment-agnostic (self-contained HTML works in GHL, WordPress, Vercel, anywhere)
- **Role-separated views** make it team-ready (builder, reviewer, client each see what they need)

The system doesn't replace builders or AI — it's the missing layer between them.

### What This Is NOT

- Not a website builder (Webflow, Framer, Squarespace)
- Not a CMS (WordPress, Contentful)
- Not an AI wrapper (ChatGPT with a nicer UI)
- Not a code generation tool (Lovable, Bolt, Cursor)

It is a **production environment** — the layer that sits above AI and turns generative output into managed, versioned, deployable assets.

---

## Coherent Actions (5)

### 1. Knowledge Bank Architecture
Build client-entity-scoped knowledge banks that persist across sessions and projects. Brand tokens, ICP definitions, tone of voice, approved module styles. Portable, reusable, compounding. Not locked to a thread.

### 2. Visual Review Board
Surface every generated block as a live iframe preview with version number, prompt context, and generation timestamp. Approval workflow: approve, flag for edit, or reject and re-run. Nothing moves to deployment without passing through this gate.

### 3. Self-Contained HTML Output
Every block is clean HTML with inline and scoped CSS. No external stylesheet dependencies. No class conflicts with host platforms. Renders identically in GHL, WordPress, Vercel, or anywhere else. Forms and CRM handled through injection points — placeholder elements the deployment platform fills with its own native functionality.

### 4. Git-Backed Version Control
Every approved asset commits to the project's GitHub repository: `agency/client/project/page/block-name/version`. Rollback is a git operation. Diff between versions is visible. The repo is the source of truth regardless of deployment target.

### 5. Role-Separated Views
- **Builder**: full access — generation, editing, knowledge bank management
- **Reviewer**: review board, approval/flag/reject, prompt revision context
- **Client (read-only)**: see approved stack, submit change requests via text field, never see code or generation interface

---

## Theory of Advantage Checklist

- [x] **Causality**: Knowledge bank depth + approved block library + production discipline → faster builds, higher quality, compounding returns per vertical
- [x] **Value creation AND capture**: Agencies build faster (value creation). Subscription pricing tied to workspace (value capture). Block libraries compound — switching cost increases over time.
- [x] **Boundary conditions**: Works for surface-layer web content (HTML blocks, pages). Does NOT work for complex custom functionality (multi-step forms, auth systems, database-driven content). The system owns the surface layer; engineering owns the integration layer.
- [x] **Assumptions explicit**: (1) AI-generated HTML quality continues improving. (2) Agencies will adopt structured workflows over ad-hoc methods. (3) The hybrid approach (AI + page builder injection) becomes standard practice.
- [x] **Durability + adaptation**: Moat is knowledge bank depth + approved block library + production discipline. These are built over months of real client work. Not replicable quickly by a competitor with the same underlying model. Adaptation: model-agnostic architecture means switching from Claude to another provider is a configuration change, not a rebuild.
