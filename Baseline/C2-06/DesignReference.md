# [Project Name] - C2:06: Design Reference (`DesignReference.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file records the **design decisions** the group took from its style proposal: which colors, typography and patterns the product uses, where each one goes, and why. The Figma file is the source of truth for values; this file explains the decisions behind them.

**How an LLM should use this file**

1. The decisions in §1 Colors, §2 Typography and §3 Patterns are the **only allowed styling vocabulary**.
2. The **anchor screen** linked in §0 is the worked example of these decisions applied: when this file and the anchor disagree, follow the anchor.
3. Every decision has a **Where** (when to use it) and a **Why** (the reason behind it). When a new screen meets a situation no decision covers, choose the option that best serves the Why column, and flag it.
4. The checks in §4 are how a finished screen is judged.

> [!info] Who fills what
> 1. **Group:** fill §0 by hand (links to your style proposal and your anchor screen).
> 2. **AI:** ask your AI to analyse the style proposal and the anchor screen in §0 (`get_design_context`, `get_variable_defs`, `get_screenshot`) and draft §1–3: every color, text style and recurring pattern it finds, with where it's used. The rows below are examples: replace them.
> 3. **Group:** go through every row together and decide: keep it, change it or remove it. Then write the **Why** column yourselves, using your feelings from [[Baseline/C2-05/AestheticsEmotionalSpec]]: the AI can read what's there, only you know why you chose it.

---

## 0. Source

| What                                                       | Figma link                                                                  | Notes                                                                                                                                                    |
| ---------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Style proposal** (your design system / visual direction) | [POC](https://www.figma.com/design/UZze8prvV01dMIxp0pFJYb/POC?node-id=3-23) | Node 3:23. Same `Screens` page also has the style frame "Nohemi + satoshi" (1:297), the palette `Paleta de tom · #00CCB7` (1:574) and `Components` (3:2) |
| **Anchor screen** (reworked by hand in E1)                 | [POC](https://www.figma.com/design/UZze8prvV01dMIxp0pFJYb/POC?node-id=3-23) | Node 3:23 (same node as the as-is screens)                                                                                                               |
| **As-is screens** (C2:05 POC-final)                        | [POC](https://www.figma.com/design/UZze8prvV01dMIxp0pFJYb/POC?node-id=3-23) | `Screens` page (node 3:23); the file has no `Reference` page yet                                                                                         |

---

## 1. Colors

Read from the POC Figma file (page `Screens`: `Chat / options` 3:23, `Preview` 4:12, `Components` 3:2, palette `Paleta de tom · #00CCB7` 1:574) on 7 Nov 2026.

> [!warning] No variables yet
> The file has **no local color variables or color styles**. The only bound variable is `Labels - Vibrant/Secondary` (from an external library) on the chat input placeholder. Every other color is a raw hex value, so the **Figma Variable** column below says *none* and DR-01 cannot pass until the group creates them.

| Role | Figma Variable | Value | Where | Why |
| --- | --- | --- | --- | --- |
| **Chat background** | none | `#FFFCF8` (screen frame `#F6FDFC`) | Chat thread behind the conversation | *(group)* |
| **Surface** | none | `#FFFFFF` | Preview background, top bar, chat input bar, secondary button, back button | *(group)* |
| **Soft surface** | none | `#F6F6F6` | "Only you see this" box, "Nothing is public yet" note | *(group)* |
| **Primary action** | none | `#1F7A6B` | Primary button fill (`Upload item`), `Edit` links, assistant avatar icon, suggestion chip outline in the component | *(group)* |
| **Accent strong** | none | `#008072` (palette 700) | Suggestion chip text and outline on the chat screen, price (`€45`), `+` add-photo icon, send button | *(group)* |
| **Accent tint** | none | `#EBFBF9` (palette 50) | Add-photo button background | *(group)* |
| **Assistant avatar** | none | `#E7F2EF` | Circle behind the assistant's ✦ icon | *(group)* |
| **Text primary** | none | `#1E1E1E` | Bot messages, body text, detail values, screen title | *(group)* |
| **Text title** | none | `#072C2B` | Listing title on the preview | *(group)* |
| **Text secondary** | none | `#6B6B6B` (`#666666` on "Open to offers") | Section labels (`DESCRIPTION`, `DETAILS`), detail labels | *(group)* |
| **Text note** | none | `#444444` | "This is what buyers will see. Nothing is public yet." | *(group)* |
| **Placeholder** | `Labels - Vibrant/Secondary` (library) | `#727272` | Chat input placeholder "Tell me what you need" | *(group)* |
| **Divider** | none | `#E3E3E3` | Top bar bottom line, lines between preview sections, back button outline | *(group)* |
| **Border** | none | `#C9C9C9` | Phone frame, secondary button, "Only you see this" box | *(group)* |
| **Input border** | none | `#F3F3F3` | Chat input pill | *(group)* |

The **accent palette** (`#00CCB7` base) is drawn as swatches, not variables: 50 `#EBFBF9` · 100 `#CCF5F1` · 200 `#9EECE4` · 300 `#6BE1D5` · 400 `#33D6C5` · 500 `#00CCB7` · 600 `#00A392` · 700 `#008072` · 800 `#005C52` · 900 `#003832`.

**Color decisions** (found in Figma; the group confirms or changes each one):
- *One teal accent; greys and warm off-white for everything else.*
- *To decide:* two teals do the same job: `#1F7A6B` (buttons, Edit links) and `#008072` (chips, price, send). `#1F7A6B` is not in the palette; `#008072` is palette 700. Pick one for "primary".
- *To decide:* `#6B6B6B` and `#666666` are near-duplicates for secondary text.
- *Next step:* create the variables above in Figma and bind them (DR-01).

---

## 2. Typography

> [!warning] No text styles yet
> The file has **no local text styles**: every text layer sets its font directly. The **Figma Text Style** column says *none* and DR-02 cannot pass until the group creates them. The style-proposal frame is named "Nohemi + satoshi", but the screens use **DM Sans** (with some Inter); Nohemi isn't used, and Satoshi only appears in the proposal frame (1:297).

| Style | Figma Text Style | Font / Size / Weight | Where | Why |
| --- | --- | --- | --- | --- |
| **Price** | none | DM Sans / 22 / Bold, `#008072` | Price on the preview | *(group)* |
| **Listing title** | none | DM Sans / 20 / Bold, `#072C2B` | Item title on the preview | *(group)* |
| **Screen title** | none | DM Sans / 16 / Bold | Top bar title ("Preview") | *(group)* |
| **Bot message** | none | DM Sans / 16 / Medium | Everything the assistant says in the chat | *(group)* |
| **Body large** | none | DM Sans / 15 / Regular | Listing description | *(group)* |
| **Button** | none | DM Sans / 15 / SemiBold | Button labels (`Edit`, `Upload item`) | *(group)* |
| **Body** | none | DM Sans / 14 / Regular | Detail rows, `Edit` links | *(group)* |
| **Chip** | none | DM Sans / 14 / Medium | Suggestion chip labels ("Sell an item") | *(group)* |
| **Section label** | none | DM Sans / 13 / SemiBold, uppercase, `#6B6B6B` | `DESCRIPTION`, `DETAILS` | *(group)* |
| **Meta** | none | DM Sans / 13 / Medium (Regular for notes) | "Open to offers", "Nothing is public yet" note | *(group)* |
| **Input** | none | Inter / 14 / Regular | Chat input placeholder | *(group)* |
| **Seller label** | none | Inter / 13 / Semi Bold, uppercase | `ONLY YOU SEE THIS` | *(group)* |
| **Caption** | none | Inter / 12 / Regular | "Shared with a buyer only when they ask…" | *(group)* |
| **Icons** | none | Font Awesome 6 Pro / 14 / Regular | `xmark` (close), `add`, `microphone` | *(group)* |

**Typography decisions** (found in Figma; the group confirms or changes each one):
- *DM Sans for the product; hierarchy comes from size and weight, not colour.*
- *Sentence case everywhere, except uppercase section labels.*
- *To decide:* Inter appears in 4 places (input placeholder, `ONLY YOU SEE THIS`, Collection rows, caption). Switch them to DM Sans, or keep Inter on purpose.
- *To decide:* the proposal's name says Nohemi + Satoshi, but the screens use DM Sans. Confirm which typeface is final.

---

## 3. Patterns

Read from the chat screens (3:23, 5:340, 6:654), the `Preview` screen (4:12) and the `Components` frame (3:2). Components in the file: `Suggestion chip`, `Back button`, `Bot message`, `Button` (`Variant=Primary`, `Variant=Secondary`), `Detail row`.

| Pattern | How it's built | Where | Why |
| --- | --- | --- | --- |
| **Screen frame** | 375 × 760, `#C9C9C9` 1px border; chat thread padding 22 / 16 / 24 / 16 on `#FFFCF8` | Every screen | *(group)* |
| **Chat header** | No title bar and no stepper: only a close `xmark` icon top right | Chat screens | *(group)* |
| **Bot message** | `Bot message` instance: 28 circle avatar (`#E7F2EF`, teal ✦) + Bot message text, 10 gap | Every assistant turn | *(group)* |
| **Suggested answers** | Row of `Suggestion chip` instances, 12 gap, under the bot message: pill (radius 20), 1px `#008072` outline, Chip text in teal, padding 4 / 12 | Short answers that fit on one line | *(group)* |
| **Composer** | White pill input (radius 100, `#F3F3F3` border, padding 11 / 14): left round `+` button (36, `#EBFBF9`), placeholder, right round send button (36, teal fill, white arrow). Variant with a `microphone` button before send (5:340, 6:654) | Bottom of every chat screen | *(group)* |
| **Top bar** | `Back button` (36 circle, white, `#E3E3E3` border) + Screen title, padding 12 / 16, `#E3E3E3` line below | Preview and any non-chat screen | *(group)* |
| **Listing photo** | Full-width image, radius 24, 22 side margin | Top of the preview | *(group)* |
| **Listing section** | Section label (uppercase) + teal `Edit` link on the right, content below; padding 14 / 20; `#E3E3E3` line between sections | Title & price, Description, Details | *(group)* |
| **Detail row** | `Detail row` instance: label in text secondary + value in text primary, Body text, rows 8 apart | Details, "Only you see this" box | *(group)* |
| **Seller-only box** | `#F6F6F6` box, `#C9C9C9` border, radius 14, padding 13 / 15: lock icon + Seller label + `Edit`, then Detail rows | Anything only the seller sees (sell-by, collection, offers) | *(group)* |
| **Reassurance note** | `#F6F6F6`, radius 10, lock icon + Meta text in `#444444` | Above the actions on the preview | *(group)* |
| **Actions** | Two `Button` instances side by side, 10 gap, height 50, radius 14: Secondary (white, `#C9C9C9` border) left, Primary (`#1F7A6B` fill, white text) right | Bottom of the preview | *(group)* |

**Pattern gaps to fix** (found while reading):
- Most frames keep default names (`Frame 660`, `Frame 661`…), and the composer's `+` and send buttons are named `Back button`. Rename them before the screens become the reference.
- The `Suggestion chip` component uses padding 8 / 14 and `#1F7A6B`; the chips on the chat screen are 4 / 12 and `#008072`. Make the screen match the component, or update the component.
- The `Button` component's corner radius is 14 on the variants but 5 on the wrapper frame; only the variants matter.

---

## 4. Checks

Each check is a yes/no question to ask of a finished screen.

| ID | Check | Severity |
| --- | --- | --- |
| DR-01 | Is every color one of the §1 roles, bound to its Figma variable and used where §1 says? | high |
| DR-02 | Does every text layer use a §2 text style, used where §2 says? | medium |
| DR-03 | Does the screen use the §3 patterns for its layout, hierarchy and actions? | medium |
| DR-04 | Could the screen sit next to the anchor screen as part of the same product? | medium |
