---
screen: SELL
auditor: ia
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ia-1 | high | H-07 | 1:406 "Flow 1 - Selling an Item" (all 13 frames, 21:957 "1. Start conversation" … 23:1204 "13 Item live") | Each of the 13 steps has exactly one frame, its normal happy-path state. The Section has no empty, loading or error frame. Missing: a slow image-analysis state (2→3), a failed or unsure analysis state (3, "Or tell me what it is"), a no-price-data state (6), a failed publish state with the draft kept (12→13), and an empty state for skipping collection days (10). | Every key screen defines normal, empty, loading and error states. HappyPathTemplate's Data overview describes the slow, failed and missing-data behaviour for photos, price and publish. |
| ia-2 | high | H-08 | 22:957 "Your reply" (photo thumbnails), 03 Is this it? | The user's photo answer has no **Change** link; every text answer in the flow has one. | HappyPathTemplate edge case: every user answer has a **Change** link, which returns to that question and re-asks the later questions that depend on it. |
| ia-3 | high | H-08 | 22:1083 "Your reply" (back-of-chair photo), 05 Back of the chair | The user's photo answer has no **Change** link. | Same as ia-2: every user answer has a **Change** link. |

**Passed:** H-06 on all 13 frames: each step's main action from the HappyPathTemplate flows table is visible on load without scrolling (1 Sell an item · 2 + in the composer · 3 Yes, that's it · 4 Add a photo of the back · 5 Yes, that's right · 6 €45 suggested · 7 €36 · 8 All good · 9 Within a month · 10 Sat 21 / Sun 22 + Next · 11 slots + See preview · 12 Upload item · 13 View post / Back to home). The rest of H-08 passed against HappyPathTemplate: each frame echoes the previous step's answer in order 1→13, the back arrow is on steps 1–12 and the Draft badge on steps 1–11.

**Not checkable:**
- No screen cards (§2), layouts (§3), state lists (§4), IA rules (§5) or sitemap exist yet for the selling flow; flow, navigation and states were checked against [[Handoff/HappyPathTemplate]] instead.
- Where things lead (the back arrow at each step, **Edit** 23:1192 on 12 Preview, **View post** and **Back to home** on 13 Item live): the frames are not wired as a prototype, and HappyPathTemplate doesn't name targets for Edit or View post.
- Alternative-branch chips (Not quite, Donate an item, Change something, Weekends only, Skip): those branches aren't designed.
