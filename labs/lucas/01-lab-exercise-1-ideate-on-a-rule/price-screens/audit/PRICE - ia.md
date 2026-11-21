---
screen: PRICE
auditor: ia
verdict: pass
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |

**Passed:** H-06 (main action visible on load in all 10 frames). H-07 (normal: default 89:719, own-entry 91:1045, own-fair/low/high, review 89:1321; empty: fallback 89:1212; loading: thinking 89:672; error: error 91:964, plus own-invalid 91:1113 for bad input). H-08: Back on all 10 frames; thinking advances to default after 1.5s, with fallback and error named on the typing indicator 89:681; own-entry reaches all four verdicts (keys 1–4) and its composer 91:1098 is named with the rule; fallback and error composers go to own-entry; every main action is named with its destination and matches its link; "Confirm → Collection days" (89:1436) accepted via its layer name (links can't cross pages). IA-01, IA-02, IA-03 (listing confirmed once, in PRICE/review), IA-04. The price rule in letting_go_price.py is followed.

**Not checkable:** no screen card, layout, states or §5 rules (InformationArchSpec.md is the unfilled template; StructureIdea.md and letting_go_price.py used instead). No wireframe; the section is on page "Lucas". Where "Back → previous step" should go. Whether PRICE is a key screen. Whether the age question belongs inside the price step (the "Ale" section has a separate ask-age frame 84:712). IA-05 doesn't apply.
