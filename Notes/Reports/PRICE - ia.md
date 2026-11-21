---
screen: PRICE
auditor: ia
verdict: pass
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |

**Not checkable:**
- **H-08 back target and transitions.** §1 Sitemap is still the template placeholder, and the file has no prototype connections. Not checkable: the back arrow in every frame ("Top bar" 3:437, 3:486, 3:560, 3:630, 3:682, 6:265) against "Back Goes To: Review listing"; Use €<price> ("Button" 3:549, 3:621) against Collection days; and the destinations of "Change item or condition" (Price card 3:505, 3:579), "Too high"/"Too low" (6:225/6:231, 6:237/6:242), "It's a different item" (3:660) and "Try again" (6:295).
- **Spec gap (not a screen failure):** the §2 card's Secondary Actions line didn't list the controls the states table now specifies (Too high / Too low, Change item or condition, It's a different item, Try again). *Fixed in the spec after this audit.*
- **Flow order.** `Baseline/C2-05/StructureIdea.md` §3 has no price step ("photos → review → collection days → …").
- **IA-xx rules.** §5 is still the template placeholder.
- **§3 layout.** Unfilled. H-06 was checked on the frames instead: Use €<price> sits at y=712 in the 844px frame in PRICE/default 3:559 and PRICE/floor 3:629.
- **Wireframe.** No `Wireframes` page (only `Screens` 0:1).

**Passed — H-07, all six frames match the §2 states table:**
- PRICE/ask-age 3:436: age chips plus a "Set my own price" chip 6:247, and the composer to type the years.
- PRICE/thinking 3:485: the age answer, typing indicator, composer disabled.
- PRICE/default 3:559: €185 card with reason, AI tag, Item/Condition/Age rows and their tags, "Change item or condition", "An estimate from a simple price guide.", Too high / Too low, Use €185, Set my own price.
- PRICE/floor 3:629: €5, the reason ends "but never below €5." once, no Notice.
- PRICE/fallback 3:681: follows the draft directly with no age question, names the four covered items, Error notice 3:649, "It's a different item" chip, empty composer "Type your price, e.g. €25".
- PRICE/error 6:264: Error notice 6:290, "Try again" and "Set my own price" chips, price composer.

Prices and reasons match `letting_go_price.py`: sofa/good/8y gives €185, and chair/worn/20y gives €5 with the floor clause.
