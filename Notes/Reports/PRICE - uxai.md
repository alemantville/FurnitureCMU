---
screen: PRICE
auditor: uxai
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| uxai-1 | high | G-02 | 3:505 Price card, Item / Condition rows (PRICE/default); same in 3:579 Price card (PRICE/floor) | The price's reliability is now stated ("An estimate from a simple price guide."). The AI-detected Item and Condition, which set the price, still carry only an "AI" tag with no confidence. | Show how sure the AI is about the item and condition it detected, e.g. "Looks like a sofa (fairly sure)" or a confidence marker on the AI tag. Pending a group decision. |
| uxai-2 | medium | N-02 | 3:505 Price card, Age row "Checked" badge (PRICE/default); same in 3:579 (PRICE/floor) | Age is the user's own answer but is tagged "Checked", which suggests the system verified it. Left as-is, pending a group decision. | A source tag in user language, e.g. "You said" |
| uxai-3 | low | G-16 | 6:224 Feedback chips "Too high" / "Too low" (PRICE/default); 6:236 Feedback chips (PRICE/floor) | Nothing says what tapping the chips does: change this price, open "Set my own price", or only send feedback to the price guide | A short hint of the effect, e.g. "Thanks, I'll note that" or a nudge to set your own price |

**Not checkable:**
- PR §5 product-specific AI states are undefined (unfilled template), so no §5 state could be checked.
- H-03 (streaming / stop): the price comes from a deterministic rule and arrives whole, so progressive output can't be judged from static frames.
- G-07: whether the user can ask for the price again after "Set my own price" needs behaviour over time.
- G-14 and G-18 (adapting and notifying over time) need behaviour over time.
- G-17 (global AI controls) lives at app/settings level, not on this screen.
- N-05: whether the composer blocks invalid prices (below €5, non-numbers) in PRICE/fallback 3:666 and PRICE/error 6:275 needs interaction.
- N-01 / H-02: how long the typing indicator (3:467) runs before PRICE/error appears needs timing.

**Passed since the last audit:** the price guide's scope is named and the age question is skipped in the fallback; ask-age has a "Set my own price" chip; the card has a "Change item or condition" link; the fallback tells the user how to go on; PRICE/error has Try again / Set my own price; the duplicate floor notice is gone; there are per-suggestion feedback chips. Rule output (€185 sofa/good/8y, €5 chair/worn/20y, reason lines) matches `letting_go_price.py`.
