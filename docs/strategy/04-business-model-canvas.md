# Business Model Canvas

---

## 1. Value Proposition

For **agencies and marketing teams** who use AI to generate web content but lose hours managing the output — Website HTML Builder is a **production management layer** that organises, previews, versions, and routes AI-generated HTML blocks to any deployment platform.

Unlike Claude Projects, Google Drive folders, or page builder code editors, it gives you:
- Visual control of your generated assets
- Git-backed version history
- Structured approval gates
- Client-entity knowledge that compounds across projects
- Safe editing for non-technical users

**The value equation:**
- AI eliminates the biggest cost line: **dev time** (the 15 hours of pixel-tweaking, responsive-fixing, copy-formatting that follows every "2-hour template build")
- This system eliminates the second biggest cost line: **management time** (where's the code, what version, what does it look like, how do I edit without breaking it)
- Together: agency builds go from 40-60 hours → 8-12 hours. The strategic thinking stays the same. The execution and management compress.

---

## 2. Customer Segments

| Segment | Size | Pain Intensity | Willingness to Pay | Priority |
|---------|------|---------------|--------------------|---------|
| **Digital agencies (5-30 people)** | High volume | Extreme — losing 15+ hrs per build on pixel work + management | High — directly reduces biggest cost line | **Primary (launch)** |
| **In-house marketing teams** | Medium volume | High — dependent on dev team for every content change | Medium — budget constrained but dev dependency is expensive | Secondary |
| **Freelance web developers** | High volume | Medium — they manage the chaos themselves but it's slow | Low-medium — price sensitive but time-poor | Tertiary |
| **SaaS companies** | Medium volume | Medium — landing pages, marketing sites | Medium — have devs but marketing wants autonomy | Future |

**Primary segment (launch):** Digital agencies running 5+ client builds per quarter. They feel the pain hardest and have budget authority.

**Beachhead:** Wolf & Eagle, EdisonEd, Serve With Clarity (internal agencies, existing relationships, immediate access).

---

## 3. Revenue Streams

### Subscription Model (Tiered)

| Tier | For | Price (Target) | Includes |
|------|-----|---------------|---------|
| **Solo** | Freelancers, single operator | $49/mo | 3 projects, 1 user, Git integration, review board |
| **Agency** | Small agencies (5-15 people) | $149-249/mo | Unlimited projects, 5 users, client read-only view, knowledge bank templates, vertical block libraries |
| **Scale** | Larger agencies, multi-brand | $499/mo | Unlimited everything, team roles, white-label client portal, API access, priority support |

### Additional Revenue

| Stream | Structure | Timing |
|--------|-----------|--------|
| **Per-project add-on** | Optional for agencies billing clients through | Launch |
| **Usage-based component** | AI generation runs beyond included tier | Launch |
| **Template marketplace** | Sell proven vertical block libraries | Post-PMF |
| **White-label** | Agency-branded client portals | Post-PMF |

---

## 4. Key Partners

| Partner | Role | Relationship Type |
|---------|------|------------------|
| **Anthropic (Claude API)** | AI generation engine | API customer |
| **GitHub** | Version control backbone | Integration |
| **Vercel** | Deployment path for full-build projects | Integration |
| **GoHighLevel** | Primary injection target for hybrid deploys | Integration / marketplace |
| **WordPress** | Secondary injection target | Integration |
| **Lovable** | Potential visual editing layer integration | Partnership (future) |
| **Supabase** | Backend infrastructure | Platform |

---

## 5. Key Activities

1. **Build and maintain the platform** — review board, knowledge bank, Git integration, client portal, role management
2. **Maintain AI generation quality** — prompt engineering, skill packs, knowledge bank templates
3. **Onboard agencies** — white-glove for first 10, then self-serve with templates
4. **Build vertical template libraries** — schools, nonprofits, SMB services
5. **Grow the approved block library** — every project contributes; curate and publish best blocks
6. **Competitive content and community** — comparison pages, agency community engagement, thought leadership

---

## 6. Key Resources

| Resource | Type | Status |
|----------|------|--------|
| HTML generation skill packs | IP (existing) | Built — Wolf & Eagle skill pack |
| StoryBrand framework integration | IP (existing) | Built — used in agency work |
| Brand token system | IP (existing) | Built — used across clients |
| Agency relationships | Network | Active — W&E, EdisonEd, Serve With Clarity |
| Vertical knowledge (AU independent schools) | Domain expertise | Deep — EdisonEd has built multiple school sites |
| Engineering capability | Team | Available — needs dedicated capacity |
| Agent config repo (Corhelix/Agent-and-Config-Files) | IP (existing) | 24+ skills, 9 identities, knowledge banks |

---

## 7. Channels

### Acquisition Channels

| Channel | Type | Priority | Expected CAC |
|---------|------|----------|-------------|
| **Internal agencies (dog-fooding)** | Direct | Immediate | $0 |
| **Content / SEO** | Inbound | Months 3-6 | Low |
| **Agency communities** (GHL, WordPress, Claude Code) | Community | Months 2-4 | Low |
| **Partner referral** (GHL marketplace, Vercel directory) | Partner | Months 6-12 | Medium |
| **Word of mouth** from early agencies | Viral | Months 4+ | $0 |

### Content Themes
- "Why page builders still take 15 hours"
- "The management layer AI-generated websites are missing"
- "Claude Code for agencies — and why it's not enough"
- "How we build a 10-page site in 8 hours"

---

## 8. Cost Structure

### Fixed Costs
| Item | Estimate |
|------|----------|
| Engineering (build phase) | Primary cost — internal team |
| Supabase (Pro plan) | ~$25/mo |
| Vercel (Pro plan) | ~$20/mo |
| Domain and infrastructure | Minimal |

### Variable Costs
| Item | Scales With |
|------|------------|
| Claude API usage | Number of generation runs |
| Supabase usage (bandwidth, storage) | Number of projects and blocks |
| GitHub (if org plans needed) | Number of repos |
| Support | Number of agency customers |

### Unit Economics Target

| Metric | Target |
|--------|--------|
| Agency tier price | $149-249/mo |
| CAC | <$500 (content-led, community-driven) |
| LTV | $3,600-7,200 (24-36 month retention) |
| LTV:CAC | >7:1 |
| Time-to-value | First approved block within 1 hour of signup |
| Payback period | <3 months |
| Gross margin | >80% (SaaS standard, API costs are primary COGS) |

---

## 9. Customer Relationships

| Relationship Type | Segment | How |
|------------------|---------|-----|
| **White-glove onboarding** | First 10 agencies | Direct support, knowledge bank setup assistance, first-project partnership |
| **Self-serve + templates** | General availability | Pre-loaded vertical templates, guided setup, documentation |
| **Client portal** | Agency's clients | Read-only view of approved assets, change request submission via text field |
| **Community** | All users | Shared block libraries, vertical templates, best practices |
| **Agency success** | Agency tier | Quarterly review of time savings, library growth, adoption metrics |
