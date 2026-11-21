---
screen: SELL
auditor: uxai
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| uxai-1 | high | H-02 | Section SELL (1:406): no thinking state frames | No frame shows the AI working; steps go straight from input to answer: photo analysis (02→03, 04→05), price lookup (05→06), listing draft (07→08), publish (12→13) | A thinking state for steps 3, 5, 6, 8 and 13 (typing indicator or "Looking at your photos…" / "Checking prices nearby…" in the thread) |
| uxai-2 | medium | H-03 | Section SELL (1:406): no streaming state frames | AI messages (22:982, 22:985, 22:1103, 22:1156, 22:1298 'Assistant message') only appear fully written; no Stop control | A streaming state for the longer AI replies (steps 3, 5, 6, 8), with a way to stop it |
| uxai-3 | high | H-04 | Section SELL (1:406): no fallback frame | No low-confidence, analysis-failure, no-price-data or offline frame, although the handoff says the AI should ask the user to describe the item and hide the price range | Fallback frames for step 3 (banner + "Tell me what it is"), step 5 (back photo unreadable), step 6 (hide €35–55, ask for a typed price) and offline; each with a manual option, a way back, draft kept |
| uxai-4 | high | N-09 | Section SELL (1:406): no error frames | No error state for a failed photo upload (steps 2, 4) or a failed publish (23:1200 'Upload item', step 12) | Error frames that say what failed in plain words, offer Retry and confirm the draft is kept |
| uxai-5 | high | N-01 | 22:926 'Composer' (02), 22:1034 'Photo chip' (04), 23:1200 'Button' Upload item (12) | No photo upload progress and no publishing progress; 12 jumps straight to 13 | Per-photo upload progress and a busy state on Upload item until the listing is live |
| uxai-6 | high | G-04 | 22:985 'Assistant message' (03), 22:1301 'Listing card' (08), 22:1181 + 22:1160 'Price collage' (06), 23:1089 'Bottom sheet' (12), 23:1210 'Your armchair is live' (13) | The uploaded photos show a green sofa, but the AI calls it a "wooden armchair with beige cushions", colour "Brown, beige", prices it against "Similar chairs" and says "Your armchair is live" | AI output that matches the photographed item: type, colour, comparables and success copy |
| uxai-7 | high | G-02 | 22:985 'Assistant message' (03), 22:1103 'Assistant message' (05) | The item guess and the "few light marks" finding show no confidence | A confidence cue with the reason ("I think…", "fairly sure / not sure"); low confidence leads to the fallback state |
| uxai-8 | high | N-03 | Thread 22:951 photo bubbles (03), photo bubble 22:1083 (05), 22:1290 'Your reply' €36 (08) | Photo answers and the €36 lowest-offer answer have no Change link | A Change (or remove/replace) control on every user answer |
| uxai-9 | high | N-03 | 23:1214 / 23:1218 'Button' View post / Back to home (13) | Once live, nothing lets the user unpublish, pause or edit the listing | A one-step "Edit or pause listing" from the success screen |
| uxai-10 | high | H-05 | 22:1242 'Assistant message' (07), 23:1212 "I'll handle offers from €36…" (13) | The AI accepts any offer ≥ €36 on its own, committing the seller with no per-offer confirmation | The seller confirms each accepted offer, or opts in to auto-accept with a notification and a way to cancel before the buyer is committed |
| uxai-11 | high | N-05 | 22:1270 'Composer' (07), 22:1665 'Button' See preview (11) | No typed-input validation (a lowest price above the €45 asking price isn't flagged); the disabled See preview state isn't drawn | An inline error for a floor above the asking price, and a disabled See preview with a hint ("Pick a time for Sun 22") |
| uxai-12 | medium | N-06 | 23:1089 'Bottom sheet' (12) vs 22:1301 'Listing card' (08) | The preview drops the AI / Checked badges (unconfirmed Colour is hidden at publish) and leaves out Location and the photo count | The preview keeps unconfirmed AI fields marked (or asks to confirm them) and shows every field buyers see |
| uxai-13 | medium | N-04 | 22:1301 'Listing card' Location row (08); 'Change' links vs 22:1414 'Chip' Change something (08) vs 23:1192 'Button' Edit (12) | Location is the only field without a status badge; editing is called Change, Change something and Edit | Every field has a status badge, and one verb for editing across the flow |
| uxai-14 | medium | G-11 | 22:1246 / 22:1251 / 22:1256 'Chip' €41 / €36 / €32 (07) | The lowest-offer options give no reason, unlike the price step's "Similar chairs near you sold for €35–55" | A short reason for the suggested floors (e.g. "€36 is 20% below your price, typical for quick sales nearby") |
| uxai-15 | medium | G-17 | 23:1212 "I'll handle offers…" (13) | No visible control over how much the AI acts for the seller after publishing | A control to pause AI offer handling or change the floor |
| uxai-16 | high | G-01 | 21:977 'Assistant message' (01) | The opening says what the assistant can do (Sell / Donate) but nowhere says what it can't do or where it may be wrong | A short scope line: what it does, what it can't, and that the user confirms everything before publishing |

**Not checkable:**
- G-14 and G-18: behaviour over time and across sessions.
- G-12 across sessions, and whether the draft survives leaving with the back arrow: live behaviour.
- Timing of N-01 / H-02 / H-03 (thinking duration, streaming speed); the missing frames are reported above.
- Whether collection days come from the real calendar rather than hard-coded Sat 21–Sat 28: needs real data.
- G-06 beyond the copy shown: no bias in the frames, but other users or items can't be judged.
