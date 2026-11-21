# PRICE screens · Lab 01

The price step of the sell flow, drawn in Figma from `../letting-go-of-furniture/letting_go_price.py`.

- **Figma:** [Selling Furniture → page "Lucas" → Section PRICE](https://www.figma.com/design/FyDHYBk2Hn43vgoGmwZp35/Selling-Furniture?node-id=89-671)
- **Built with:** the Stoop Design System library (the same components as page "Ale"), plus one local component, **Range meter** (section "Local components" on page "Lucas"), built from Stoop tokens.
- **Prototype:** starts on `PRICE/thinking`. On `PRICE/own-entry`, keys 1–4 go to the too-low, fair, too-high and invalid replies.

## How the rule shows up

| Rule in the code | Screen |
| --- | --- |
| `suggest()`: the middle of the expected range (sofa, good, 8 years: €150–220 → €185) | `PRICE/default` |
| `why()`: the sentence next to the price | Price card: "€500 new. A good sofa after 8 years sells for €150–220, so I ask the middle." |
| `set_my_price()` inside the range | `PRICE/own-fair` (€200) |
| below the range: "sells fast, but you may feel cheated" | `PRICE/own-low` (€120) |
| above the range: "may sit unsold for a long time" | `PRICE/own-high` (€250) |
| no expectation for this item | `PRICE/fallback` (7 years) |
| price isn't a whole number of euros | `PRICE/own-invalid` (€18.50) |
| `listing()`: the listing sentence, area only | `PRICE/review` |

Also `PRICE/thinking` (loading), `PRICE/error` (price check fails) and `PRICE/own-entry` (typing a price): 10 frames in all.

## Audit

The vault's three auditors ran on PRICE twice: before and after the high fixes. See `audit/`.

| Severity | First audit | After fixes |
| --- | --- | --- |
| high | 5 | 0 |
| medium | 6 | 5 |
| low | 1 | 1 |

Open items are in `audit/PRICE - summary.md`. The Baseline specs are still unfilled templates, so the auditors used the Stoop library, `Baseline/C2-05/StructureIdea.md` and the lab file instead.
