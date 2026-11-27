---
screen: SELL
reports: [[Notes/Reports/SELL - ds]] · [[Notes/Reports/SELL - ia]] · [[Notes/Reports/SELL - uxai]]
---

# SELL · Flow 1 - Selling an Item · summary

> **Update (run 2, after fixes):** the high items were fixed in the Figma copy (see [[Notes/Reports/SELL - fixes]]). The re-audit was cut short by the Figma MCP Starter-plan tool-call limit: ds and uxai could not read the file; ia confirmed states now exist for steps 02, 03, 06, 07, 10, 11, 12 and found remaining H-07 gaps (04 upload/error, 05 upload error, 08 error/fallback, 01 missing profile, offline beyond 03). Correction: uxai-6 is rule G-04, which is **medium**, not high. Re-run the audits when the limit resets.

Section `1:406`, 13 frames (01 Start conversation → 13 Item live). Audited as the furniture happy path ([[Handoff/HappyPathTemplate]]); the Baseline specs are not filled yet, so the library components already used in the file are the styling vocabulary.

## Violations

| Severity | ds | ia | uxai | Total |
| --- | --- | --- | --- | --- |
| high | 1 | 3 | 11 | **15** |
| medium | 4 | 0 | 5 | **9** |
| low | 0 | 0 | 0 | **0** |

## What to fix (high first)

| # | Sev | Found by | Location | Problem | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | high | ia-1, uxai-1, uxai-3, uxai-4 | Section 1:406 (all 13 frames) | Only the happy-path frame exists per step: no thinking, fallback, error, loading or empty states | Add frames `<step>/thinking` (3, 5, 6, 8, 13), `/fallback` (3 "Tell me what it is", 5 unreadable back photo, 6 no price data → typed price, offline), `/error` (2, 4 upload failed; 12 publish failed, draft kept + Retry), `/empty` (10 skip days). Build them from the existing `Assistant message`, `Notice` and `Button` instances |
| 2 | high | uxai-6 | 22:985 (03), 22:1301 (08), 22:1160 + 22:1181 (06), 23:1089 (12), 23:1210 (13) | The photos show a green sofa but every AI output says "wooden armchair, brown/beige", "similar chairs", "Your armchair is live" | Swap the photos for the armchair, or rewrite the copy for a green sofa, so item, colour, comparables and success copy match |
| 3 | high | ia-2, ia-3, uxai-8 | 22:957 (03), 22:1083 (05), 22:1290 €36 (08) | Photo answers and the €36 answer have no Change link | Add the same `Change` link the text replies use to each `Your reply` instance |
| 4 | high | uxai-10, uxai-15 (medium) | 22:1242 (07), 23:1212 (13) | The AI accepts any offer ≥ €36 on its own; no control afterwards | Change copy to "I'll send you offers from €36 to accept" (or an opt-in auto-accept `Chip`), and add a "Pause offer handling" control on 13 |
| 5 | high | uxai-5 | 22:926 (02), 22:1034 (04), 23:1200 Upload item (12) | No upload or publish progress | Upload progress on the `Photo chip`; busy variant of the `Button` on Upload item |
| 6 | high | uxai-11 | 22:1270 (07), 22:1665 See preview (11) | No input validation shown | Inline error for a floor above €45; disabled `Button` See preview with hint "Pick a time for Sun 22" |
| 7 | high | uxai-7 | 22:985 (03), 22:1103 (05) | AI guess and damage finding show no confidence | "I think it's…" / "fairly sure" with the reason; low confidence → fallback frame (item 1) |
| 8 | high | uxai-9 | 23:1214 / 23:1218 (13) | No way to edit or pause the live listing | Add a third `Button` "Edit or pause listing" |
| 9 | high | uxai-16 | 21:977 (01) | Scope never says what the AI can't do | One line in the opening `Assistant message`: "I guess from your photos and nearby sales; you confirm everything before it goes live" |
| 10 | high | ds-1 | 22:1160 "Price collage" (06) | 11 fills/strokes unbound (#4A3326, #9A7B55, #E9D2A8, #7A5A45, #FFFFFF) | Bind to the library colour variables the rest of the file uses |
| 11 | medium | ds-2, ds-3 | 22:1160 "Price collage" (06) | 3 text layers without text style; 5 unbound radius/gap values | Apply the library text styles and radius/spacing variables |
| 12 | medium | ds-5 | 22:1159 "Price card" (06) | Hand-built frame card | Replace with an instance of the library card component (as `Listing card`) |
| 13 | medium | ds-4 | Top bar component 26:1021 (11 instances, 01–11) | itemSpacing 12 unbound | Bind the gap once in the library component |
| 14 | medium | uxai-12 | 23:1089 Bottom sheet (12) | Preview hides AI/Checked badges, Location and photo count | Keep the badges (or ask to confirm Colour) and show Location |
| 15 | medium | uxai-13 | 22:1301 Location row (08), 22:1414, 23:1192 | Location has no badge; editing called Change / Change something / Edit | Badge on Location; one verb ("Change") everywhere |
| 16 | medium | uxai-14 | 22:1246–22:1256 €41/€36/€32 (07) | Floor options have no reason | Add the reason, e.g. "€36 is 20% below your price, typical for quick sales nearby" (see [[Notes/Labs/Lab 01 - A fair asking price]]) |
| 17 | medium | uxai-2 | 22:982, 22:985, 22:1103, 22:1156, 22:1298 | No streaming state | A streaming frame with a Stop control for steps 3, 5, 6, 8 |

## Not checkable

- **ds:** whether the remote library is the group's own (DesignSystemTokens.md doesn't list it yet); image fills; visual look.
- **ia:** no screen cards, sitemap or IA rules for the flow yet (checked against the happy path instead); targets of back arrow, Edit, View post, Back to home (frames not wired); undesigned branches (Not quite, Donate an item, Change something, Weekends only, Skip).
- **uxai:** G-14, G-18, G-12 across sessions; whether the draft survives leaving; timing of thinking/streaming; real calendar data for collection days; G-06 beyond the copy shown.
