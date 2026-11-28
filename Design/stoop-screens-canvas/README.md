# Stoop screens and flows (Claude Design canvas)

**Canvas:** https://claude.ai/artifact/KGK3RByAh9tdwSDsHgaBjB (private until shared from the canvas's Share menu)

A second canvas of the selling flow, kept apart from the one in `Design/claude-design-artifact/` (which comes from the Figma "Flow 1" section and the built app). This one adds a flow diagram with the branches and two fallback states.

The sell-an-item flow from the C2:05 final POC ([[Baseline/C2-05/POC/POC-final.html]]), drawn as phone screens (390 × 844) with the group's tokens from [[Baseline/DesignSystemTokens]]. Every screen is linked, so **Play** on the canvas walks the happy path as a prototype.

## What's on the canvas

| Row | Artboards |
| --- | --- |
| User flows | `Main.dc.html`: the whole flow as a diagram, with branches (Donate, Not quite, Change something, Edit) and fallbacks |
| Photos to price | `Home`, `Photos`, `Identity`, `Condition`, `Price`, `Offer` (lowest offer) |
| Review to live | `Review`, `SellBy`, `Days`, `Slots`, `Preview`, `Live` |
| Fallback states | `PhotosFallback` (photos unclear), `PriceError` (PRICE/error, from [[Baseline/InformationArchSpec]]) |

## Files

- `project/canvas.json`: the canvas index (artboard positions, titles, notes).
- `project/*.dc.html`: one file per artboard.

These files are the canvas's source. They load `./support.js` from the canvas itself, so they don't render when opened straight from this folder: open the canvas link instead. To change a screen, edit it on the canvas (or ask Claude to), then copy the updated files back here.

## Notes

- Photos are labelled placeholders; no real images are uploaded.
- Values (armchair, €45, offers from €41, Sun 29 / Wed 2) follow the POC's example data.
- Screens use the design system's hex values directly; they are not bound to the Figma variables.
