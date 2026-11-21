---
screen: PRICE
auditor: ds
verdict: fail
---

| id | severity | rule | location | found | expected |
| --- | --- | --- | --- | --- | --- |
| ds-1 | medium | DS-04 | 3:505 "Price card", PRICE/default | instance of "Price card" (2:124), a component that exists only in this file, not a Stoop Design System §3 component | a §3 component instance, or "Price card" added to the Stoop library and documented in DesignSystemTokens §3 |
| ds-2 | medium | DS-04 | 3:579 "Price card", PRICE/floor | instance of "Price card" (2:124), a component that exists only in this file, not a Stoop Design System §3 component | a §3 component instance, or "Price card" added to the Stoop library and documented in DesignSystemTokens §3 |

**Not checkable:** none

**Passed:**
- **DS-01:** Price card (2:124) internals are clean. Header 2:125 and Details 2:132 have no fills; the card's fill, stroke and effect use `bg/surface`, `border/subtle` and `shadow/card`. No frame layer in the six frames has an unbound colour.
- **DS-02:** every text layer outside library instances uses a library text style.
- **DS-03:** every auto-layout padding and gap and every non-zero radius is bound, including the new "Feedback chips" rows and the PRICE/error Chips row.
- **DS-05:** no vectors or pasted icons outside library instances.
- **DS-06:** all six frames (ask-age, thinking, default, floor, fallback, error) set Color=Light and Responsive=Mobile; no child node or instance sets its own mode.
- **DS-07:** PRICE/default and PRICE/floor each have exactly one Primary/Default Button ("Use €185", "Use €5"); the other frames have none.
- **DS-08:** in both Price card instances the price has an AI Tag, Item and Condition have AI tags, and Age has a Checked tag.
- **DS-09:** PRICE/fallback's Error Notice (3:649) is followed by the Soft Chip "It's a different item" (3:660) and an Empty Composer "Type your price…". PRICE/error's Error Notice (6:290) is followed by the Chips "Try again" (6:295) and "Set my own price" (6:301).
- **DS-10:** no Focus states, so it does not apply.
- Library instances have only content or size overrides, no style overrides. The new Link button 6:220 "Change item or condition" is a Stoop library instance.
