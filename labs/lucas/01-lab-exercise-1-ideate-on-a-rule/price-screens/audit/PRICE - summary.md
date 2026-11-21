---
screen: PRICE
---

# PRICE: audit summary (after the high fixes)

Reports: [[PRICE - ds]] · [[PRICE - ia]] · [[PRICE - uxai]]

## Violations per severity

| Severity | ds | ia | uxai | Total | First run |
| --- | --- | --- | --- | --- | --- |
| high | 0 | 0 | 0 | **0** | 5 |
| medium | 2 | 0 | 3 | **5** | 6 |
| low | 0 | 0 | 1 | **1** | 1 |

## Fixed in this round (high)

- PRICE/error 91:964 added (price check fails: Try again / Set my own price / Back).
- PRICE/own-entry 91:1045 and PRICE/own-invalid 91:1113 added (typing a price; "€18.50 isn't a whole number of euros").
- One confirmation: "Looks right" removed from PRICE/thinking; PRICE/listing became PRICE/review with "Confirm → Collection days".
- Prototype wired: Back on every frame, thinking → default after 1.5s, own-entry → the four verdicts (keys 1–4), every main action named with its destination. Flow starts on PRICE/thinking.

## Still open (medium first)

| # | Severity | Found by | What | Fix I'd make |
| --- | --- | --- | --- | --- |
| 1 | medium | uxai-2 (N-04, N-06) | own-low 89:1102 and own-high 89:1208 can't return to the €185 suggestion in one step | Chip `Style=Default` "Back to €185" in both, as in own-fair |
| 2 | medium | uxai-3 (N-08) | Same explanation repeated up to three times per screen | Hide the Sub on 89:815; remove the Notices that only repeat the headline (89:984, 89:1093, 89:1200, 91:1017, 91:1166) |
| 3 | medium | uxai-1 (N-04) | Lock icon on the "No price guide" notice 89:1291 | Swap to an info icon (or Notice `Type=Warning`) |
| 4 | medium | ds-1 (DS-03) | Chips row 89:1295 gap 8 / wrap gap 8 unbound | Bind both to `spacing/sm` |
| 5 | medium | ds-2 (DS-03) | Range meter set wrapper 88:716: padding/gap 24 and radius 5 unbound | Bind padding and gap to `layout/section-gap`, radius to 0 |
| 6 | low | uxai-4 (G-15) | No feedback on the suggested price itself | Link button "Seems off?" under the card, opening "Too high" / "Too low" chips |

## Not checkable

- The three Baseline specs are unfilled templates (also in the new `vault/Design/` copies); the auditors used the Stoop library, `StructureIdea.md` and `letting_go_price.py`.
- No Wireframes page or PRICE wireframe; the section is on page "Lucas".
- Back targets (no sitemap); whether PRICE is a key screen; whether the age question belongs here.
- H-01 idle, H-03 streaming/stop, G-12–G-14, G-17, G-18, N-01 over time; H-05/G-16 (Collection days is not on this page).
