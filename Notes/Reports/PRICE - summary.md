---
screen: PRICE
reports: "[[Notes/Reports/PRICE - ds]] · [[Notes/Reports/PRICE - ia]] · [[Notes/Reports/PRICE - uxai]]"
date: 2026-11-21
round: 2 (after fixes 1–6)
---

# PRICE - summary

Figma: [FurnitureCMU · Screens](https://www.figma.com/design/CjTfdaB1HPQnAZItQNanua), Section `PRICE` (3:380), six frames: ask-age, thinking, default, floor, fallback, error.

## Violations per severity

| Severity | ds | ia | uxai | Total | Round 1 |
| --- | --- | --- | --- | --- | --- |
| high | 0 | 0 | 1 | **1** | 8 |
| medium | 2 | 0 | 1 | **3** | 4 |
| low | 0 | 0 | 1 | **1** | 1 |

## What's fixed since round 1

All six summary items: unbound Price card fills cleared; the price is called an estimate; "Change item or condition" link; the fallback skips the age question and names the four covered items; "Set my own price" on ask-age; the fallback says how to go on; new `PRICE/error` frame; the duplicate floor notice is gone; Too high / Too low chips. Every auditor confirmed these now pass.

## What's left (high first)

Items that point to the same node are merged. **Group decision** marks fixes that change the design system or the product's rules.

### 1. Price card: no confidence on the AI's item and condition. high · uxai-1 (G-02)
Location: Item / Condition rows in Price card 3:505 (PRICE/default) and 3:579 (PRICE/floor).
Fix: **Group decision.** Stoop has no confidence component. Options: (a) put the confidence in the value text, e.g. Value "Sofa (fairly sure)", no DS change; (b) when the AI is unsure, add a `Notice` Type=Warning under the card ("Check the item and condition, I'm not sure."), which is what Warning is for in [[Baseline/DesignSystemTokens]] §1.4; (c) add a confidence variant to `Tag` in the Stoop library.

### 2. Price card is a local component. medium · ds-1, ds-2 (DS-04)
Location: 3:505 (PRICE/default), 3:579 (PRICE/floor); main component 2:124.
Fix: **Group decision.** Move "Price card" into the Stoop Design System file, publish it, and add it to [[Baseline/DesignSystemTokens]] §3.2.

### 3. "Checked" tag on the user's own age answer. medium · uxai-2 (N-02)
Location: Age row Tag in 3:505 and 3:579.
Fix: **Group decision.** Stoop defines Checked as "the person confirmed it". Changing the wording means a new `Tag` type (e.g. "You said") in the library.

### 4. Too high / Too low don't say what they do. low · uxai-3 (G-16)
Location: 6:224 (PRICE/default), 6:236 (PRICE/floor).
Fix: give each `Chip` a hint (Show hint on, Hint "helps me learn"), or show the result as a next frame: an `Assistant message` "Thanks. Want to set your own price?" with a "Set my own price" chip.

## Not checkable

- **Navigation (H-08):** the IA sitemap (§1) is still the template and the file has no prototype links, so no control's target can be checked (back, Use €…, Change item or condition, Too high/low, It's a different item, Try again).
- **Flow order:** [[Baseline/C2-05/StructureIdea]] §3 has no price step. **Group decision:** keep PRICE as its own step and update StructureIdea, or fold it into Review.
- **IA rules and layout:** InformationArchSpec §3 and §5 are templates. H-06 was checked on the frames and passes.
- **Wireframe:** there is no `Wireframes` page.
- **AI states:** ProductRequirementsSpec §2 and §5 are templates. The auditors assumed the product has AI.
- **Behaviour over time:** H-03 streaming, G-07, G-14, G-18, typing-indicator timing (N-01 / H-02), and invalid-price blocking in the composer (N-05).
- **App level:** G-17 (global AI controls).

The IA auditor also found a spec gap: the PRICE card's Secondary Actions didn't list the new controls. That line in [[Baseline/InformationArchSpec]] §2 has been updated.
