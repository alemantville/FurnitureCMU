---
screen: PRICE
auditor: ds
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ds-1 | medium | DS-03 | 89:1295 "Chips", PRICE/fallback | auto-layout itemSpacing 8 and counterAxisSpacing 8 (wrap), both unbound | both bound to spacing/sm (8), as on "Chips" 91:1022 in PRICE/error |
| ds-2 | medium | DS-03 | 88:716 "Range meter" (component set container, Local components 88:717) | padding 24/24/24/24, itemSpacing 24, corner radius 5, all unbound (default variant-wrapper frame, not drawn in the screens) | padding and gap bound to a spacing token, e.g. layout/section-gap (24); radius bound to a radius/* token or set to 0 |

**Not checkable:** Baseline/DesignSystemTokens.md §1–§3 are the unfilled template, so the group's vocabulary was taken to be the subscribed Stoop Design System library plus the local components built on it (Range meter 88:716, Price card 84:700). Instance overrides across the 10 frames are only name, reactions, width, height and primaryAxisSizingMode.

Scope and passes: all 10 frames (388 nodes, 70 instances) plus the Range meter set. DS-01, DS-02 and DS-04 pass; DS-03 passes except the two rows above.
