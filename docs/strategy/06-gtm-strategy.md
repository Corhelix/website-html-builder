# Go-to-Market Strategy

---

## GTM Phases

### Phase 1: Internal Proof (Months 1-3)

**Objective:** Prove the system works on real client projects with real deadlines.

**Users:**
- Wolf & Eagle (SMB services builds)
- EdisonEd (Australian independent school enrolment sites)
- Serve With Clarity (nonprofit and church sites)

**Activities:**
- Run 3-5 real client projects through the system
- Build knowledge bank templates for each vertical
- Build initial block libraries from approved outputs
- Document time savings, quality improvements, and workflow friction

**Success Metrics:**
| Metric | Target |
|--------|--------|
| Projects completed through system | 3-5 |
| Time-to-first-approval (4-page site) | <4 hours |
| Total build hours (vs traditional) | 60% reduction |
| Block reuse on second project in same vertical | >20% |
| Client portal adoption (change requests through system) | >50% |

**Output:** 3 case studies with real numbers. Internal team trained on workflow.

---

### Phase 2: Early Access (Months 3-6)

**Objective:** Validate product-market fit with 10 external agencies.

**Users:**
- 10 agencies invited from GHL community, WordPress developer communities, Claude Code community
- Selection criteria: 5+ builds per quarter, currently using AI for web content, frustrated with management

**Activities:**
- White-glove onboarding for each agency
- Build their first project together (partnership, not just support)
- Weekly feedback sessions for first month
- Iterate on knowledge bank setup UX, review board, and deployment workflow
- Test pricing sensitivity (offer Agency tier at $149 introductory, $249 standard)

**Success Metrics:**
| Metric | Target |
|--------|--------|
| Agencies retained after 3 months | 7/10 |
| NPS from early access cohort | >50 |
| Willingness to pay at $149/mo | >80% |
| Willingness to pay at $249/mo | >50% |
| Feature requests that align with roadmap | >70% |
| Time-to-first-approved-block (new agency) | <2 hours |

**Output:** Product-market fit signal. Refined pricing. 10 case studies.

---

### Phase 3: Public Launch (Months 6-12)

**Objective:** Self-serve growth with content-led acquisition.

**Activities:**
- Self-serve signup with guided onboarding
- Pre-loaded knowledge bank templates for 3 verticals
- Content marketing engine (see Content Strategy below)
- Agency partner program (referral commissions)
- GHL marketplace listing
- Vercel integrations directory listing
- Template marketplace (beta)

**Success Metrics:**
| Metric | Target |
|--------|--------|
| MRR | $5,000-10,000 |
| Paying customers | 30-50 agencies |
| Organic traffic (monthly) | 5,000+ visits |
| Free-to-paid conversion | >10% |
| Churn (monthly) | <5% |
| LTV:CAC | >5:1 |

---

## Content Strategy

### Competitive Comparison Pages (SEO)
- "Website HTML Builder vs Google Drive for managing AI web builds"
- "Why Webflow still takes 15 hours per build"
- "Claude Code for agencies — powerful but not a system"
- "Lovable vs traditional agency builds — where the time actually goes"
- "GHL code injection: the hybrid approach that almost works"

### Thought Leadership
- "The three stages of AI adoption in web agencies (and where everyone stalls)"
- "Why your AI-generated HTML is sitting in a chat thread"
- "The case for deployment-agnostic web assets"
- "How we build a 10-page branded site in 8 hours"
- "Knowledge banks vs project folders: why context should belong to the client"

### Case Studies
- "EdisonEd: 10 school enrolment sites from one knowledge bank"
- "Wolf & Eagle: SMB builds at 3x speed with compounding block libraries"
- "Serve With Clarity: nonprofit sites with consistent brand and zero dev dependency"

### Distribution Channels
| Channel | Content Type | Frequency |
|---------|-------------|-----------|
| Blog / SEO | Comparison pages, thought leadership | 2x per week |
| GHL community | Tutorials, use cases, integration guides | Weekly |
| Claude Code community | Workflow patterns, skill pack examples | Weekly |
| Twitter/X | Short-form insights, build demos | Daily |
| YouTube | Build walkthroughs, before/after demos | 2x per month |
| Email newsletter | Product updates, case studies, tips | Weekly |

---

## Sales Model

### Primary: Product-Led Growth (PLG)

- Free trial or freemium Solo tier → self-serve upgrade to Agency tier
- Product drives acquisition: onboarding flow, first-project template, time-to-value <1 hour
- Product-qualified leads (PQLs): users who create 3+ projects or invite team members

### Secondary: Community-Led Sales

- Agency communities (GHL, WordPress, Claude Code) as primary top-of-funnel
- Demonstrate value through content and community participation
- Warm outreach to agencies already discussing AI web workflow problems

### Tertiary: Partner Channel (Post-PMF)

- GHL marketplace listing → agencies discover through platform they already use
- Vercel integration → developers discover through deployment platform
- Referral program → existing agencies refer others for commission or credits

---

## Pricing Strategy

### Principles
- **Value-based** — price on labour savings, not cost-plus
- **Tiered** — different needs at different scales
- **Usage-based component** — aligns cost with value delivered for AI generation
- **No free tier at launch** — focus on paying customers who are serious about workflow improvement. Free trial (14 days) instead.

### Tier Structure

| Tier | Price | Users | Projects | Key Features |
|------|-------|-------|----------|-------------|
| **Solo** | $49/mo | 1 | 3 | Review board, Git integration, knowledge bank (1), generation runs (50/mo) |
| **Agency** | $199/mo | 5 | Unlimited | Client portal (read-only), knowledge bank templates, vertical block libraries, generation runs (200/mo) |
| **Scale** | $499/mo | Unlimited | Unlimited | White-label portal, API access, custom integrations, priority support, generation runs (500/mo) |

### Overage
- Additional generation runs: $0.50-1.00 per run beyond tier limit
- Additional users (Agency tier): $29/user/mo

### Annual Discount
- 20% discount for annual billing (standard SaaS practice)

---

## Unit Economics

| Metric | Target | Rationale |
|--------|--------|-----------|
| **ARPU** | $199/mo | Majority on Agency tier |
| **CAC** | <$500 | Content-led, community-driven acquisition |
| **LTV** | $4,776 (24 months x $199) | Agency workflow tools have high retention |
| **LTV:CAC** | >9:1 | Healthy for SaaS |
| **Payback period** | <3 months | Fast recovery |
| **Gross margin** | >80% | API costs are primary COGS (~10-15%) |
| **Monthly churn** | <3% | Target for agency tools |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Low initial demand | Internal agencies guarantee first 3 customers. No external dependency for Phase 1. |
| Pricing too high | Start at $149 for early access, validate willingness to pay before setting $199 standard. |
| Pricing too low | Value-based framing. $199/mo vs 15+ hours saved per build at $100+/hr agency rates. Trivial ROI. |
| Feature creep toward CMS | Scope guardrails documented. System owns surface layer only. Say no to custom functionality features. |
| Claude API cost escalation | Usage-based pricing passes cost through. Generation efficiency (better prompts, cached knowledge) reduces cost per run over time. |
| Competitor enters space | Moat is knowledge bank depth + block library + production discipline. These compound with usage and cannot be replicated quickly. |
