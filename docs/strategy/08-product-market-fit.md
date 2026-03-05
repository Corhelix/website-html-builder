# Product-Market Fit Analysis

---

## PMF Hypothesis

**For digital agencies** who use AI to generate web content but lose hours managing, versioning, and deploying the output, **Website HTML Builder** provides a production management layer that cuts build time by 60%+ and eliminates the management chaos between AI generation and deployment.

### The Sean Ellis Test (Target)

> "How would you feel if you could no longer use this product?"

**Target:** >40% of users respond "Very disappointed"

**Who we expect to say "Very disappointed":**
- Agencies running 5+ builds per quarter who have adopted the full workflow (knowledge bank → generation → review board → Git → deploy)
- Account managers who use the client portal for approvals
- CMOs managing multi-brand sites from one system

**Who might say "Somewhat disappointed":**
- Freelancers who use it for individual projects (less compounding value)
- Teams that only use the review board but not the knowledge bank (partial adoption)

---

## PMF Signals to Track

### Leading Indicators (Weeks 1-4)

| Signal | What It Means | Target |
|--------|--------------|--------|
| Time-to-first-approved-block | Product delivers value quickly | <2 hours from signup |
| Knowledge bank completion rate | Users invest in the system (not just trying it) | >60% of trials complete a knowledge bank |
| Review board daily active usage | The workflow sticks | >3 sessions/week per active user |
| Client portal link shared | User trusts the product enough to show clients | >50% of projects have a shared portal |

### Lagging Indicators (Months 2-6)

| Signal | What It Means | Target |
|--------|--------------|--------|
| Block reuse rate | Library is compounding | >30% by project 5 in same vertical |
| Free-to-paid conversion | Willingness to pay validated | >10% |
| Monthly churn | Product is sticky | <5% |
| Second project created | User came back | >70% of paid users |
| Team members invited | Expanding within org | >2 users per Agency account |
| NPS | Overall satisfaction | >50 |

### PMF Killers (Red Flags)

| Red Flag | What It Means | Response |
|----------|--------------|----------|
| <30% knowledge bank completion | Setup is too hard or value isn't clear | Simplify onboarding; add vertical templates |
| >10% monthly churn | Product isn't sticky enough | Interview churned users; find the drop-off point |
| Review board bypassed (approvals via Slack) | Workflow adds friction instead of removing it | Make the board faster than Slack; reduce clicks to approve |
| No second project | First project worked but system isn't worth returning to | Investigate: was it the product or the project type? |
| Solo tier dominates (no Agency upgrades) | Multi-user value not clear | Improve client portal value proposition |

---

## Product-Market Fit Validation Plan

### Phase 1: Internal Validation (Months 1-3)

**Users:** Wolf & Eagle, EdisonEd, Serve With Clarity (3 internal agencies)

**Method:**
1. Run 3-5 real client projects through the system end-to-end
2. Track all time metrics (before vs after comparison)
3. Document every friction point and workaround
4. Weekly retrospectives: what worked, what broke, what's missing

**PMF Gate (must pass to proceed to Phase 2):**
- [ ] At least 2 projects completed end-to-end through the system
- [ ] Total build time reduced by >40% compared to traditional process
- [ ] Client portal used for at least 1 approval per project
- [ ] Block reuse observed on second project in same vertical
- [ ] Team says "I don't want to go back to the old way"

### Phase 2: Early Access Validation (Months 3-6)

**Users:** 10 external agencies (selected from GHL/WordPress/Claude Code communities)

**Method:**
1. White-glove onboarding — build first project together
2. Track same metrics as Phase 1 plus: onboarding time, support requests, feature requests
3. Weekly 1:1 feedback calls for first month, biweekly after
4. Run Sean Ellis survey at week 6

**PMF Gate (must pass to proceed to Phase 3):**
- [ ] 7/10 agencies retained after 3 months
- [ ] >40% "Very disappointed" on Sean Ellis survey
- [ ] >80% willing to pay $149/mo
- [ ] >50% willing to pay $249/mo
- [ ] Feature requests align with roadmap (>70%)
- [ ] At least 3 agencies created a second project unprompted

### Phase 3: Public Launch (Months 6-12)

**PMF is confirmed when:**
- [ ] Monthly churn <5%
- [ ] Free-to-paid conversion >10%
- [ ] LTV:CAC >5:1
- [ ] NPS >50
- [ ] Organic word-of-mouth driving >20% of new signups
- [ ] Block reuse rate >30% by project 5

---

## Segment-Specific PMF

PMF may be stronger in some segments than others. Track separately.

| Segment | Expected PMF Strength | Why |
|---------|----------------------|-----|
| **AU independent schools** (EdisonEd) | Strongest | Tight vertical, repeatable structure, same conversion challenges, same ICP characteristics. Block library compounds fast. |
| **SMB services** (Wolf & Eagle) | Strong | High volume of similar builds. Brand tokens change but structure is reusable. |
| **Nonprofits/churches** (Serve With Clarity) | Strong | Similar structure to schools. Donation/volunteer conversion patterns are repeatable. |
| **General agencies** (diverse clients) | Moderate | Less reuse across diverse verticals. Knowledge bank setup overhead is higher. Value is in management, not compounding. |
| **Freelancers** | Weakest | Solo operator can manage chaos manually. Less need for approval workflow and client portal. Value is speed only. |

**Implication:** Launch and validate in vertical-specific segments first. General agency and freelancer segments are Phase 3+ opportunities.

---

## Pricing Validation

### Current Hypothesis

| Tier | Price | Value Metric |
|------|-------|-------------|
| Solo | $49/mo | 3 projects, 1 user, 50 generations |
| Agency | $199/mo | Unlimited projects, 5 users, 200 generations, client portal |
| Scale | $499/mo | Unlimited everything, white-label, API, 500 generations |

### Validation Method

**Phase 2 (Early Access):**
1. Offer Agency tier at $149/mo introductory price
2. At week 6, survey willingness to pay at $199 and $249
3. Track which features drive upgrade decisions
4. Track generation run usage to validate per-tier limits

**Pricing Signals to Watch:**
- If >90% willing to pay $149 → we're underpriced
- If <50% willing to pay $199 → hold at $149 or add more value
- If generation limits hit frequently → raise limits or adjust pricing model
- If client portal is the #1 upgrade driver → it's correctly gated to Agency tier

### Value Metric Validation

**Primary metric:** Per workspace (monthly subscription)
**Secondary metric:** Generation runs (usage-based component)

**Test:** Do users think about value in terms of projects, users, or generation runs?
- If projects → per-project pricing might work better
- If users → per-seat is validated
- If generation runs → usage-based is the right secondary metric

### Competitive Price Positioning

| Alternative | What They Pay Now | Our Price | Savings |
|------------|------------------|-----------|---------|
| Developer time (15 hrs × $100/hr) | $1,500/build | $199/mo (unlimited builds) | $1,300+/build after first build |
| Page builder subscription | $39-79/mo | $199/mo | More expensive but 60%+ time reduction |
| Google Drive + manual management | $0 | $199/mo | Paying for time savings and organisation |
| Freelance dev for code management | $500-1,000/mo | $199/mo | Cheaper and more systematic |

**Positioning:** We're not cheaper than free (Google Drive) or cheap tools (page builders). We're cheaper than the developer time and management overhead we eliminate. $199/mo against $1,500+ per build in labour savings is trivial ROI.
