---
screen: SELL
file: https://www.figma.com/design/oDbSiFkM8KI3hZ0Xen3Kn5/Selling-Furniture--Copy-
date: 2026-11-21
---

# SELL · high-item fixes (in the Figma copy)

Applied to the editable copy; the original file (`FyDHYBk2Hn43vgoGmwZp35`) is unchanged. Item numbers refer to [[Notes/Reports/SELL - summary]].

| # | Found by | What changed | Nodes |
| --- | --- | --- | --- |
| 1 | ia-1, uxai-1, uxai-3, uxai-4 | New Section **Flow 1 - States** with 15 frames: `02 Photos/uploading`, `02 Photos/error`, `03 Is this it?/thinking`, `/fallback`, `/offline`, `05 Back of the sofa/thinking`, `/fallback`, `06 Price/thinking`, `/fallback` (no price data), `07 Lowest offer/error`, `08 Your listing/thinking`, `10 Collection days/empty`, `11 Collection times/disabled`, `12 Preview/publishing`, `12 Preview/error` | Section 2037:729 |
| 2 | uxai-6 | Copy now matches the photographed **green two-seater sofa** (question, damage prompts, "Similar sofas", listing title/description/category/colour, preview, "Your sofa is live"); frame renamed "05 Back of the sofa" | 22:985, 22:1021, 22:1031, 22:1078, 22:1181, 22:1301, 23:1089, 23:1210, 22:1067 |
| 3 | ia-2, ia-3, uxai-8 | Change link shown on both photo answers and the €36 answer | 22:957, 22:1083, 22:1290 |
| 4 | uxai-10 | The AI asks the seller before accepting any offer from €36 | 22:1242, 22:1295, 23:1212 |
| 5 | uxai-5 | Upload and publish progress (state frames) | 2037:730, 2037:1539 |
| 6 | uxai-11 | Floor-above-asking error; See preview / Next disabled with hints | 2037:1242, 2037:1381, 2037:1461 |
| 7 | uxai-7 | Confidence cues: "That's my guess from your photos", "Fairly sure from your photo" | 22:985, 22:1103 |
| 8 | uxai-9 | "Edit or pause listing" button on 13 Item live | 2037:675 |
| 9 | uxai-16 | Scope line on the opening message: AI can be wrong, you check everything before it goes live | 21:977 |
| 10 | ds-1 | Price collage colours bound to library variables (text/primary, text/secondary, text/tertiary, bg/tile, bg/surface) in its main component | 4:84 |

**Open:** [[Handoff/HappyPathTemplate]] still says "armchair"; update it (or swap the photos) so spec and screens agree. The re-audit could not run: the Figma MCP Starter-plan tool-call limit was reached.
