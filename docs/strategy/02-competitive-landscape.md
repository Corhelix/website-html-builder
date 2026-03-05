# Competitive Landscape

---

## The Three-Layer Problem (Detail)

### Layer 1: Page Builders — Fast to Start, Slow to Finish

**Players:** Webflow, Framer, Elementor, GHL Website Builder, Divi, Squarespace, Wix

**What they do well:**
- Structure: templates, drag-and-drop, component systems
- Ecosystem: forms, CRM integrations, analytics, hosting
- Visual editing for non-developers

**Where time dies:**
- Font/image/asset tweaking after template selection
- Responsive fixes across breakpoints
- Copy edits that break spacing and layout
- Custom CSS overrides to escape template constraints
- "2-hour template build" → 15 hours of finish work
- **Every single page builder shares this problem**

**Key limitation:** Output is locked to the platform. Moving from Webflow to GHL means rebuilding. No portability.

---

### Layer 2: AI Chat Agents — Fast Generation, No Management

**Players:** Claude (Projects), ChatGPT (Projects), Lovable, Bolt, v0, Cursor

**What they do well:**
- Generate clean HTML in minutes
- Brand-consistent output when given proper context
- Handle complex layouts, responsive design, animations

**Where it breaks (5 specific failures):**

1. **Where does the code live?** Chat thread. Google Drive. Local file. You've generated 20 blocks — where are they? What naming convention? Which version?
2. **What does each block look like?** You're staring at code. No visual preview without manually opening in a browser.
3. **How do you edit safely?** Non-tech users can't change a date without risking a broken div. Opening the code editor in GHL or WordPress is a wall of markup.
4. **You have to build everything.** Headers, footers, forms, emails, navigation — AI builds in isolation. Every session starts from scratch unless you manually paste context back in.
5. **No ecosystem integration.** AI-generated HTML doesn't know about your GHL tags, form IDs, CRM fields. Beautiful block that connects to nothing.

**Key limitation:** Generation is solved. Management is not.

---

### Layer 3: Generic AI Builders — Fast but Shallow

**Players:** Gamma.ai, Durable, 10Web, Hostinger AI Builder

**What they do well:**
- Full sites in seconds
- Low barrier to entry
- Good for quick presentations and mockups

**Where it breaks:**
- Can't edit individual blocks cleanly
- No brand system persistence across projects
- Not part of CRM/form/deployment ecosystems
- Template-based, not knowledge-driven
- Generic output — no vertical depth
- **Presentation tools, not production tools**

---

### The Hybrid Approach (Closest to Working)

**Pattern:** AI generates HTML → inject into page builder (GHL, WordPress) via code injection blocks

**What works:**
- AI speed for the HTML generation
- Platform ecosystem for headers, forms, CRM tags, navigation
- Injection points let the platform do the wiring
- Best of both worlds in theory

**Where it falls apart — management:**
- Open the code editor in GHL = wall of markup
- 20 blocks across 5 pages = no visual map of what exists
- No version control — which is current? What changed?
- No approval workflow — changes happen in Slack, not in a system
- Google Drive folders with naming conventions = rebuilt silo
- Non-tech team members can't participate
- No way to see what was generated, when, from what prompt, and what it looks like

---

## Competitor Map

| Category | Examples | Does Well | Where Time Dies | Management Layer |
|----------|----------|-----------|----------------|-----------------|
| **Page Builders** | Webflow, Framer, Elementor, GHL, Divi | Structure, templates, drag-and-drop | Font/image/asset tweaking, responsive fixes, copy edits. 2hr → 15hr. | Platform-locked. No AI. No portability. |
| **AI Chat Agents** | Claude, ChatGPT, Lovable, Bolt, v0 | Generate clean HTML fast | Code in chat threads. No preview. No versioning. No ecosystem. Rebuild every session. | None. |
| **AI Site Generators** | Gamma.ai, Durable, 10Web, Hostinger AI | Full sites in seconds | Can't edit blocks. No brand persistence. No CRM/form ecosystem. | None. |
| **Hybrid (AI → Page Builder)** | Claude → GHL/WordPress code injection | AI speed + platform ecosystem | Code editor = wall of markup. No visual map. No version control. No approval. | **The gap this product fills.** |
| **Developer Tools** | Claude Code, Cursor, GitHub Copilot | Full control, powerful | Requires developer. No visual layer. No client workflow. Skill barrier. | Developer-managed only. |

---

## The Gap

No existing tool provides:

1. **Visual preview and organisation** of AI-generated HTML blocks
2. **Version control** tied to the work (not the operator's file discipline)
3. **Safe editing** for non-technical users (change copy without breaking markup)
4. **Client-entity knowledge** that persists across sessions and compounds across projects
5. **Deployment routing** to any target (GHL, WordPress, Vercel, custom) from one source of truth
6. **Approval workflow** that non-technical stakeholders can actually use
7. **Block library** that compounds — every approved asset makes the next project faster

---

## Competitive Positioning

### What We Are
The missing management and production layer between AI generation and deployment.

### What We Are Not
- Not competing with Webflow/Framer (they're deployment targets, not competitors)
- Not competing with Claude/ChatGPT (they're the generation engine, not competitors)
- Not competing with GHL/WordPress (they're ecosystem hosts, not competitors)
- Not competing with Lovable/Bolt (they're build tools; we're the management layer for their output)

### The Strategic Position
Every tool in this landscape is either a **builder** or a **generator**. None of them is a **manager**. The system that organises, previews, versions, and routes AI-generated assets — with client knowledge that compounds — does not exist.

We are building it.
