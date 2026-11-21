---
screen: SELL
auditor: ds
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ds-1 | high | DS-01 | 22:1160 "Price collage" (local component 4:84), e.g. I22:1160;4:88 "Vector", I22:1160;4:89 "Vector", I22:1160;4:85 "Your photo"; SELL/06 Price | 11 fills and strokes not bound to any variable: #4A3326 ×3, #9A7B55 ×3, #E9D2A8 ×2, #7A5A45 ×2, #FFFFFF ×1 | every fill and stroke bound to one of the group's color variables |
| ds-2 | medium | DS-02 | 22:1160 "Price collage", I22:1160;4:91 "€35", I22:1160;4:97 "€55", I22:1160;4:104 "€"; SELL/06 Price | 3 text layers with no text style: local Plus Jakarta Sans 13 SemiBold ×2 and 18 Bold ×1 | each text layer uses one of the group's text styles |
| ds-3 | medium | DS-03 | 22:1160 "Price collage", e.g. I22:1160;4:85 "Your photo" (radius 14), I22:1160;4:86 "Comparable €35" (itemSpacing 2); SELL/06 Price | 6 unbound values inside the collage: radius 14 ×2, 12 ×1, 19 ×1, plus itemSpacing 2 | radius and gap bound to the group's spacing/radius variables |
| ds-4 | medium | DS-03 | "Top bar" instances of the library component "Type=Chat" (26:1021), e.g. 26:1332, 22:889, 22:1133; frames 01 to 11 (21:957, 22:888, 22:941, 22:1010, 22:1067, 22:1132, 22:1221, 22:1279, 22:1428, 22:1483, 22:1590) | itemSpacing 12 not bound in the main component, so every one of the 11 instances has it unbound (its padding is bound) | itemSpacing bound to a spacing variable (fix once in the library component) |
| ds-5 | medium | DS-04 | 22:1159 "Price card"; SELL/06 Price | a hand-built FRAME card (radius 24, padding 16; its fills, padding and radius are bound) and not an instance | an instance of the group's card component, such as the library "Listing card" |

**Not checkable:** Colors, text, spacing and radius in the other 12 frames are bound to variables, styles and components from a remote library (the local "Sky chat" collection has 0 variables and the file has 0 local text styles), so any binding was counted as passing; it could not be confirmed that the remote library is the group's own, since DesignSystemTokens.md does not yet list the group's real variables, styles or components. Image fills were not checked against DS-01. The audit used read-only scripts and no screenshots, so the visual look was not checked. "Day chips" (22:1511) holds only Chip instances, so it is not a violation; every other button, chip, tag, input and notice is a library component instance.
