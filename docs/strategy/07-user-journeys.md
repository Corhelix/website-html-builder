# User Journeys

> Four primary personas mapped across the customer journey: Awareness → Consideration → Decision → Activation → Retention

---

## Persona 1: The Agency Account Manager

**Name:** Sarah
**Role:** Account Manager at a 10-person digital agency
**Day-to-day:** Manages 6-8 client accounts. Briefs designers and developers. Reviews work. Manages client communication. Runs project timelines.

### Pain Profile
- Spends 3-5 hours per project coordinating between designer, developer, and client
- Client review cycles take 2-3 weeks because changes go through the dev queue
- "Where's the latest version?" is a daily question
- Google Drive folder chaos: `homepage_v3_FINAL_revised_ACTUAL.html`
- Cannot show clients work-in-progress without scheduling a call and screen-sharing code output
- Small copy changes (dates, phone numbers, testimonials) require developer involvement

### Jobs to Be Done
- **Functional:** Get client sites built and launched faster with fewer coordination cycles
- **Emotional:** Feel in control of the project, not waiting on others
- **Social:** Look competent and responsive to clients; deliver faster than competitors

### Journey Through the Product

**Awareness:** Sees a LinkedIn post: "We just built a 10-page school enrolment site in 8 hours. Here's the workflow." Clicks through. Recognises the pain being described.

**Consideration:** Reads the competitive landscape page. Sees the comparison with Google Drive folders and page builder code editors. Thinks: "That's exactly what we're doing." Signs up for free trial.

**Decision:** Creates first project using the school knowledge bank template. Generates 4 blocks. Sees them rendered as live previews on the review board. Shares client portal link with the principal. Approval comes via the board, not email. Thinks: "This actually works."

**Activation (first value moment):** First approved block committed to Git. Client saw a live preview and approved without a call. Time from brief to approval: 3 hours instead of 2 weeks.

**Retention:** By project 3, block reuse from the school library cuts first-pass generation in half. Knowledge bank updates carry across projects. Sarah upgrades to Agency tier because she needs the client portal for all accounts.

---

## Persona 2: The CMO / Agency Director

**Name:** Marcus
**Role:** CMO of a multi-brand group (3 brands, 12 sites)
**Day-to-day:** Sets marketing strategy across brands. Approves budgets. Reviews creative. Manages agency relationships or internal team. Reports to CEO/board.

### Pain Profile
- Every new brand or campaign site is a 6-week project
- Proven conversion architecture from Brand A doesn't transfer to Brand B — rebuilt from scratch every time
- No visibility into what was built, what's live, or what version is current across brands
- Dependent on developer availability for every content update
- Paying agency rates for work that should be repeatable

### Jobs to Be Done
- **Functional:** Launch brand sites faster; reuse proven architecture across brands
- **Emotional:** Feel confident that quality is consistent and nothing is slipping through
- **Social:** Demonstrate operational efficiency to CEO/board; show ROI on marketing spend

### Journey Through the Product

**Awareness:** Hears about it from the agency (Wolf & Eagle) using it on their account. Sees the review board in a client presentation. Asks: "Can we use this across all our brands?"

**Consideration:** Gets a demo. Sees the knowledge bank clone-and-modify flow — same structure, different brand tokens, new output. Sees Git history across brands. Sees client portal for each brand's marketing manager.

**Decision:** Approves Scale tier. The ability to clone Brand A's proven school enrolment architecture to Brand B (new campus, different suburb, secondary-focused ICP) and get a first-pass site in one session is the deciding factor.

**Activation:** First brand clone. Brand B site is staged in 3 days instead of 4 weeks. The conversion architecture — StoryBrand structure, proof section sequencing, enrolment CTA logic — carries over. Only the brand expression changes.

**Retention:** Library compounds across brands. Every new campus launch is faster. Quarterly review shows 70% reduction in site launch time across the group. Marcus becomes an advocate.

---

## Persona 3: The Marketing Manager (Client-Side)

**Name:** Priya
**Role:** Marketing Manager at a single school / nonprofit / SMB
**Day-to-day:** Runs marketing for one organisation. Not a developer. Manages social, email, events. Coordinates with agency for website changes.

### Pain Profile
- Enrolment page needs updating: new open day date, updated fee structure, new testimonial, hero image refresh
- Traditional path: email agency → wait for availability → receive quote for 2 hours → approve → wait for build → review → request one small change → wait again. Three weeks for content that should take an hour.
- Feels dependent on the agency for things that should be simple
- Has no visibility into what the agency built or how it works
- Afraid of breaking something if given code access

### Jobs to Be Done
- **Functional:** Make small content updates without waiting for agency dev cycles
- **Emotional:** Feel autonomous and capable, not dependent
- **Social:** Be seen as proactive and effective by leadership

### Journey Through the Product

**Awareness:** Agency introduces the client portal during onboarding. "You can see your approved pages here and submit change requests."

**Consideration:** Priya opens the portal. Sees the current enrolment page rendered visually — not code, actual rendered page. Sees a "Request Change" button. No code editor. No risk.

**Decision:** Submits first change request: "Update open day date to March 15." Account manager opens the flagged block in Claude with existing HTML as context. Prompts the change. Previews on the board. Approves. Priya sees the updated page same-day.

**Activation:** First change request resolved in 20 minutes instead of 3 weeks. Priya never saw code. Never needed a Claude account. Never risked breaking anything.

**Retention:** Priya submits 2-3 change requests per month through the portal. Agency spends 20 minutes per request instead of 2 hours. Priya tells other marketing managers at peer schools about the experience. Word-of-mouth referral.

---

## Persona 4: The Developer

**Name:** James
**Role:** Frontend developer at the agency or freelance contractor
**Day-to-day:** Builds custom functionality. Handles integrations. Fixes bugs. Deploys sites. Gets pulled into content changes that shouldn't need a developer.

### Pain Profile
- Half his time goes to reconstructing context: scattered Slack threads, Figma files, meeting notes he didn't attend
- Gets handed "just a small change" that requires understanding the entire page structure
- No single source of truth for what was built, by whom, or why
- Content changes (dates, copy, images) get routed to him when they shouldn't
- Custom work (multi-step forms, event calendars, animated sections) gets mixed with production content work

### Jobs to Be Done
- **Functional:** Get full context immediately; focus on custom work, not content changes
- **Emotional:** Feel like a craftsman doing meaningful work, not a copy-paste machine
- **Social:** Be recognised for solving hard problems, not for changing dates

### Journey Through the Product

**Awareness:** Account manager shows him the project view. He sees: knowledge bank, PRD, wireframe, every approved block in the repo, version history, flagged items with edit briefs. All in one place.

**Consideration:** Opens the Git repo. Structured folder hierarchy. Clean HTML with scoped CSS. No mystery about what generates what. His custom builds (multi-step enrolment form, events calendar, animated stats section) commit to the same repo in the same structure.

**Decision:** Realises content changes no longer come to him. The review board and client portal handle copy updates. He only gets pulled in for custom functionality. His utilisation on high-value work increases.

**Activation:** First project where he opens the repo and has full context immediately. No Slack archaeology. No Figma guesswork. Handoff documentation is the repo itself.

**Retention:** James advocates for the system internally because it protects his time. He contributes to the block library with custom components. His work is versioned alongside AI-generated content in the same structure.

---

## Journey Summary

| Stage | Sarah (AM) | Marcus (CMO) | Priya (Client) | James (Dev) |
|-------|-----------|-------------|----------------|-------------|
| **Awareness** | LinkedIn content / case study | Agency presentation | Agency onboarding | Internal demo |
| **Consideration** | Free trial, first project | Demo, multi-brand clone | Client portal tour | Project repo walkthrough |
| **Decision trigger** | Client approves via board (not email) | Brand clone in 3 days (not 4 weeks) | Change request resolved same-day | Full context on first open |
| **Activation metric** | First approved block | First brand clone | First change request | First project with full context |
| **Retention driver** | Block library compounds | Cross-brand architecture reuse | Autonomy without risk | Protection from content work |
| **Expansion trigger** | Upgrades for client portal | Adds more brands | Refers peer organisations | Contributes custom components |
