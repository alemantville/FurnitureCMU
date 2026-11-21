---
screen: PRICE
auditor: uxai
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| uxai-1 | medium | N-04 | PRICE/fallback 89:1212 "Notice" 89:1291, icon I89:1291;27:3 | "No price guide for this item yet" still uses a lock icon, which reads as locked or private; the other Notices (error 91:1017, own-invalid 91:1166) use an alert icon | Info or question icon, matching the other Notice variants |
| uxai-2 | medium | N-04 | PRICE/own-low 89:999 "Button" 89:1102, PRICE/own-high 89:1106 "Button" 89:1208, vs PRICE/own-fair 89:890 "Button" 89:995 | own-fair offers "Back to €185"; own-low and own-high only offer the range edge, so the €185 suggestion can't be restored in one step there (also N-06) | Keep a "Back to €185" option in own-low and own-high too |
| uxai-3 | medium | N-08 | PRICE/default 89:719 "Assistant message" 89:815 Sub; "Notice" 89:984, 89:1093, 89:1200, 91:1017, 91:1166 | The same message appears up to three times per screen; the Notice banners repeat the assistant headline | One explanation per screen: drop the 89:815 Sub and the Notices that only repeat the headline |
| uxai-4 | low | G-15 | PRICE/default 89:719 "Price card" 89:818 | No way to give feedback on the suggested price itself | A light feedback control on the card (e.g. "Seems off?" with a quick reason) |

**Not checkable:** PR §5 is unfilled, so H-01 to H-04 were judged from the frames. H-04 now passes (error 91:964 and fallback 89:1212 offer a manual option and a way back). N-05 and N-09 now pass (own-entry 91:1045, own-invalid 91:1113). The "AI vs Checked" tag issue no longer applies. H-01 (no idle frame; §5 silent), H-03 (no stop control on thinking 89:672; needs behaviour over time), G-12, G-13, G-14, G-18, G-17, N-01 over time. H-05 and G-16: "Confirm" 89:1436 goes to Collection days, not on this page. Prototype reactions were read, not run.
