# Roadmap — next wave

Framing: the site's job is to turn a recruiter/exec into a conversation, and to
signal Director/VP-level judgment. Features are grouped into four waves by intent.

**Legend** — Effort: S / M / L · Owner: 🛠 = build end-to-end · ✍️ = needs James's
input (content / numbers / account).

## Wave 1 — Convert (make it easy to act on & forward)
- [ ] **Résumé one-pager** — `/resume`, print-optimized + "Download PDF". **M · ✍️**
  The biggest gap: no scannable, forwardable artifact for a recruiter.
- [ ] **Sharpen the contact path** — one clear primary action (booking link or
  mailto) + a short "what I'm open to" line. **S · ✍️**
- [ ] **Privacy-first analytics** (GoatCounter / Plausible). **S · ✍️** (needs account ID).
  Can't optimize what you don't measure — an ironic gap for a data leader.

## Wave 2 — Prove (judgment & credibility)
- [ ] **Decision teardowns** — repeatable case-study format: framing → what the data
  said → the call → outcome. Ship 1–2 anonymized. **M · ✍️** (build template; supply story).
  VPs are hired on judgment, not tools — highest-ceiling item.
- [ ] **Social proof** — 2–4 short quotes from leaders/peers, tastefully placed. **S · ✍️**
- [ ] **"Now" section** — current focus / live POV; keeps the site fresh. **S · ✍️**

## Wave 3 — Engage (memorable & sticky)
- [ ] **⌘K command palette** — fuzzy-jump across the 12 experiments, writing, sections. **M · 🛠**
- [ ] **Shareable Lab / Spot-the-Lie results** — deep-linkable state + per-result OG cards. **M · 🛠**
- [ ] **2–3 new Lab experiments** on core themes (loss-aversion / prospect theory, an
  upgraded A/B power calculator, etc.). **M · 🛠**
- [ ] *(Optional)* **Dark mode**. **S · 🛠**

## Wave 4 — Scale & harden (infra to move faster + keep the bar high)
- [ ] **Content pipeline** — author Lab/writing in Markdown/data files; build renders pages. **L · 🛠**
  Velocity for Waves 2–3 (no more hand-coding each page).
- [ ] **CI quality gates** — axe (a11y) + Lighthouse/perf budget + Playwright
  visual-regression snapshots. **M · 🛠**
- [ ] **Dynamic per-page OG images** generated in the build. **M · 🛠**
- [ ] **Own-site RSS + richer Article JSON-LD + deeper llms.txt**. **S–M · 🛠**

---

### Sequencing logic
Wave 1 makes the site *convert* (and analytics tells you if it's working). Wave 2 is
what differentiates on a hiring committee. Waves 3–4 compound over time. The `🛠` items
ship without waiting on James; the `✍️` items need input but are the highest-impact.

**Recommended start:** Wave 1 — résumé one-pager + analytics.
