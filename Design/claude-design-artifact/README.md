# Stoop · Selling flow screens (Claude Design canvas)

The 13 screens of **Flow 1 – Selling an item** and its user flow, as a Claude Design canvas.

- **Canvas:** https://claude.ai/artifact/W1Nhz5b3LH3AabCs2iiVgw (private to its owner until shared from the page's Share menu)
- **Source:** the Figma section "Flow 1 - Selling an Item" (`LYeyNdKee4QBklrfyCoEdZ`, node `1:406`) and the built screens in `app/app/sell/`.

## What's on the canvas

| Part | Where | What it shows |
|---|---|---|
| Screens 01–07 | top row | Start → Photos → Is this it? → Any damage? → Back of the chair → Price → Lowest offer |
| Screens 08–13 | second row | Your listing → Sell by → Collection days → Collection times → Preview → Item live |
| Service notes | sticky under each screen | The external service behind that step (Claude API, Cloudinary, Supabase, Google Maps Geocoding, OneSignal) |
| User flow | bottom | Happy path with what the seller taps, the ways back (Edit, View post, Back to home), and the other answers each screen offers that are not designed yet |

The screens are 390×844 and linked to each other: press **Play** on 01 Start and tap the highlighted answer on each screen to walk the flow. The day and time chips on 10 and 11 can be toggled.

Styling follows the Stoop tokens in `Baseline/DesignSystemTokens.md` (colours, Plus Jakarta Sans, radii and shadows), written as plain values because the canvas has no Stoop design system installed.

## Files

`project/` is the canvas exactly as published:

- `project/canvas.json`: the layout (artboards, titles, sticky notes)
- `project/Main.dc.html`: 01 Start (the entry)
- `project/S02-Photos.dc.html` … `project/S13-Item-live.dc.html`: screens 02–13
- `project/User-flow.dc.html`: the user-flow diagram

Images (the armchair photo, chair drawings, price tag, sparkle) are uploaded to the canvas and referenced as `/_blob/…`; their source files are in `app/public/sell/`.

## Updating

Edit the files here and republish them to the same canvas link, or edit on the canvas and copy the changed files back here, so the repo and the canvas stay the same.
