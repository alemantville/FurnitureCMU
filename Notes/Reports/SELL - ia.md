---
screen: SELL
auditor: ia
verdict: fail
run: 2 (after fixes, Figma copy oDbSiFkM8KI3hZ0Xen3Kn5)
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ia-1 | high | H-07 | 2037:729 "Flow 1 - States" with 1:406 "Flow 1 - Selling an Item" | Most key steps now have their states. Gaps remain: **04 Any damage?** (22:1010) has no uploading/error state for the back photo and no "skipped the photo, pick a condition" state; **05 Back of the sofa** has no failed-upload error; **08 Your listing** (22:1279) has thinking but no error/fallback if the draft can't be built or saved; **01 Start conversation** (21:957) has no missing-profile state (greet without a name, ask for the area before pricing); only 03 has an offline state. | Every key screen defines normal, empty, loading and error states, as HappyPathTemplate's Data overview describes (slow/failed analysis, missing price data, failed publish keeps the draft, missing profile). |

**Passed:** H-07 for steps 02, 03, 06, 07 (validation error), 10 (empty), 11 (See preview disabled until each day has a slot) and 12 (publishing, publish error keeping the draft). State frames follow `<step>/<state>` naming and the 1→13 order of the flows table (H-08). "05 Back of the sofa" vs "5. Back of the chair" in [[Handoff/HappyPathTemplate]] is the sofa/armchair copy mismatch, not a navigation violation.

**Not checkable:**
- The Figma MCP Starter-plan tool-call limit was hit after one call, so these are unverified in the current file: H-06 on the 13 happy-path frames; whether the Change links on 22:957, 22:1083 and 22:1290 now show; the back arrow, Draft badge and Notice/Chip copy in the state frames.
- No screen cards, sitemap or IA rules for the selling flow; judged against [[Handoff/HappyPathTemplate]].
- Control targets (back arrow, Edit, View post, Back to home, Retry): frames aren't wired as a prototype.
- Alternative branches (Not quite, Donate an item, Change something, Weekends only, Skip) aren't designed.
