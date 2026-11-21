# FurnitureCMU - Design System Tokens Spec (`DesignSystemTokens.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents the **Figma variables, styles and components** of the product's design system: colors, typography, spacing and ready-made components. The Figma file is the source of truth; this file explains what each variable and component is for. It is enforced strictly.

- **Figma file**: [Design System](https://www.figma.com/design/1UcV9Q72u1nnwHBD1vYlEZ/Design-System). Foundations pages (`↳ Typography`, `↳ Colors`, `↳ Effects`, `↳ Icons`, `↳ Grids`, `↳ Spacing and Radius`), then `❖ BASE COMPONENTS`, then `❖ ELEMENT COMPONENTS`. Every page has a doc sheet with an "Example of use".
- **Source**: the C2:05 final POC (`Baseline/C2-05/POC/POC-final.html`). Notes like "(POC --ink)" name the CSS variable a token replaces.

**How an LLM should use this file**

1. Treat the variables in sections 1 and 2 and the components in section 3 as the **only allowed styling vocabulary**.
2. The `ui-design` skill styles screens by binding these variables and using these components; the `ds-linter` subagent checks every screen against them.
3. **Token binding**: every fill, stroke, text style, spacing value and radius in a screen is bound to a variable or style in sections 1 and 2, and every button, card, input and badge is an instance of a section 3 component.
4. The guardrails in section 4 override any other interpretation of this file.

**Variable collections and modes**

| Collection | Modes | What it holds | Pick it directly? |
| --- | --- | --- | --- |
| `Primitives` | Value | Raw palette (`color/gray/900`…), `spacing/*`, `radius/*`, `font/*` | Only `spacing/*` and `radius/*`. Colours and fonts are hidden: use semantic tokens. |
| `Color` | **Light / Dark** | Semantic colours (section 1) | Yes |
| `Responsive` | **Mobile / Desktop** | Type sizes, line heights and `layout/*` (section 2) | Through text styles and `layout/*` |

A screen frame sets two modes: **Color** (Light or Dark) and **Responsive** (Mobile for the 390 phone, Desktop for 1440). Everything inside follows. Never style a node differently per mode by hand.

---

## 1. Color Variables

Values are shown as primitive → hex. Light mode is the POC; Dark mode was designed for this system.

### 1.1 Text (`TEXT_FILL` only)

| Token Name | Figma Variable | Value (Light / Dark) | Usage / Boundary |
| --- | --- | --- | --- |
| **Text Primary** | `text/primary` | gray/900 `#1C1F26` / gray/25 `#FCFCFB` | Headings, body, primary labels, latest assistant message |
| **Text Secondary** | `text/secondary` | gray/600 `#5D6577` / gray/300 `#CFD2DA` | Earlier assistant messages, field labels, hints |
| **Text Tertiary** | `text/tertiary` | gray/500 `#6E7585` / gray/400 `#9AA0AD` | Placeholders only |
| **Text Note** | `text/note` | gray/700 `#3B4252` / gray/300 `#CFD2DA` | Sub-line under the latest assistant message |
| **Text Link** | `text/link` | gray/600 `#5D6577` / gray/300 `#CFD2DA` | Link button ("Change") |
| **Text On Ink** | `text/on-ink` | white `#FFFFFF` / gray/900 `#1C1F26` | Text and icons on `action/primary` (Primary button, selected chip) |
| **Text On Photo** | `text/on-photo` | white / white | Text on photos and `glass/dark`. Same in both modes |
| **Text Disabled** | `text/disabled` | gray/400 `#9AA0AD` / gray/600 `#5D6577` | Disabled labels (exempt from contrast rules) |

### 1.2 Backgrounds (fills)

| Token Name | Figma Variable | Value (Light / Dark) | Usage / Boundary |
| --- | --- | --- | --- |
| **Page** | `bg/page` | gray/200 `#E6E9EC` / gray/950 `#121419` | Screen background behind everything |
| **Surface** | `bg/surface` | white / gray/850 `#22262F` | Cards, sheets, listing card |
| **Bubble** | `bg/bubble` | gray/25 `#FCFCFB` / gray/800 `#2A2F3A` | "Your reply" bubbles |
| **Chip** | `bg/chip` | white / gray/850 | Unselected chips, Secondary button |
| **Chip Hover** | `bg/chip-hover` | gray/50 `#F4F6F9` / gray/800 | Hover on chips and Secondary button |
| **Chip Soft** | `bg/chip-soft` | mist/100 `#F1F0F2` / gray/800 | Soft chip (the secondary way out) |
| **Plus** | `bg/plus` | gray/100 `#F1F4F8` / gray/800 | Attach icon button, add-photo tile |
| **Tile** | `bg/tile` | gray/150 `#E9EDF2` / gray/800 | Photo placeholders, hero area |
| **Disabled** | `bg/disabled` | gray/200 `#E6E9EC` / gray/800 | Disabled Secondary button |
| **Ground** | `bg/ground-top` · `-mid` · `-end` | white · mist/200 · mist/50 / gray/950 · gray/900 · gray/950 | Phone background gradient stops (0% · 45% · 100%) |
| **Ground glow** | `bg/ground-glow-1` · `-2` | mist/400 · mist/300 / gray/850 | Soft radial glows on the ground |
| **Ground glow fade** | `bg/ground-glow-1-fade` · `-2-fade` | the glow colour at 0% / gray/850 at 0% | Transparent end of each glow. Gradients only (hidden from pickers) |

The ground tokens are combined in the **`background/ground`** paint style (section 2.3) and the **`Background`** component (section 3.2). Use those rather than rebuilding the gradient.

### 1.3 Actions, glass and borders

| Token Name | Figma Variable | Value (Light / Dark) | Usage / Boundary |
| --- | --- | --- | --- |
| **Primary Action** | `action/primary` | gray/900 `#1C1F26` / gray/25 `#FCFCFB` | Primary button, selected chip, Badge. One Primary action per screen |
| **Primary Hover** | `action/primary-hover` | gray/800 `#2A2F3A` / gray/150 `#E9EDF2` | Hover on Primary button |
| **Primary Disabled** | `action/primary-disabled` | gray/200 / gray/800 | Disabled Primary button (Send when empty) |
| **Glass Fill** | `glass/fill` | white 50% / gray/800 60% | Glass back button, composer, pill, seller box |
| **Glass Edge** | `glass/edge` | white 75% / white 10% | Edge of every glass surface (stroke) |
| **Glass Dark** | `glass/dark` | ink 60% / ink 60% | Title chip and photo count over photos |
| **Border Subtle** | `border/subtle` | black 7% / white 6% | Dividers, table lines, card hairlines |
| **Border Default** | `border/default` | black 10% / white 10% | Chip, button and card edges |
| **Border Outline** | `border/outline` | gray/300 `#CFD2DA` / gray/700 `#3B4252` | Status pill, dashed seller box |
| **Border Focus** | `border/focus` | gray/900 / gray/25 | Focus ring (via `focus/ring` effect) |

### 1.4 Tags and feedback

| Token Name | Figma Variable | Value (Light / Dark) | Usage / Boundary |
| --- | --- | --- | --- |
| **AI** | `tag/ai/bg` · `tag/ai/text` | purple/100 `#E2D3F6` · purple/900 `#461B7E` / purple/950 · purple/300 | AI tag: field filled by the assistant |
| **Checked** | `tag/checked/bg` · `/text` | green/100 `#CEF3CD` · green/900 `#2E4A40` / green/950 · green/300 | Checked tag, Success notice, success tick |
| **Info** | `tag/info/bg` · `/text` | blue/100 `#D8E8FA` · blue/900 `#145399` / blue/950 · blue/300 | Info notice (reassurance), empty photo slot |
| **Warning** | `feedback/warning/bg` · `/text` | amber/100 `#FBEBC6` · amber/900 `#7A4E00` / amber/950 · amber/300 | Warning notice: AI unsure, please check |
| **Error / Fallback** | `feedback/error/bg` · `/text` | red/100 `#FBDCDA` · red/900 `#8E1F18` / red/950 · red/300 | Error notice: the **fallback state** (PR H-04) |
| **Shadow Soft** | `shadow/soft` | black 5% / black 40% | Colour of chip, bubble and card shadows (effects only) |
| **Shadow Strong** | `shadow/strong` | black 20% / black 60% | Colour of the Primary button glow (effects only) |

Contrast: every text token passes 4.5:1 on its background in both modes, except `text/disabled` (exempt).

---

## 2. Typography & Spacing

### 2.1 Text Styles

One family: **Plus Jakarta Sans**. Sizes are bound to the `Responsive` collection, so text resizes when the frame switches between Mobile and Desktop. Sizes read size/line height.

| Style | Figma Text Style | Weight · Mobile · Desktop | Usage |
| --- | --- | --- | --- |
| **H1** | `Heading/H1` | Bold · 28/36 · 40/48 | Screen titles, price hero |
| **H2** | `Heading/H2` | Bold · 24/32 · 32/40 | Success screen title, big prices |
| **H3** | `Heading/H3` | SemiBold · 22/28 · 28/36 | Listing title in the preview sheet |
| **H4** | `Heading/H4` | SemiBold · 20/28 · 24/32 | Price in the preview sheet |
| **H5** | `Heading/H5` | SemiBold · 18/24 · 20/28 | Card titles, questions |
| **H6** | `Heading/H6` | SemiBold · 16/24 · 18/26 | Small headings |
| **Body XL** | `Body/XLarge` | Medium · 18/24 · 20/28 | Assistant messages |
| **Body L** | `Body/Large` | Medium · 16/24 · 18/28 | Your reply bubbles, lead text |
| **Body M** | `Body/Medium` | Regular · 15/22 · 16/24 | Default body text, descriptions, field values |
| **Body S** | `Body/Small` | Regular · 13/18 · 14/20 | Field labels, meta, hint lines |
| **Label** | `Label` | SemiBold · 13/18 · 14/20 | Pills, notices, link button |
| **Caption** | `Caption` | Medium · 12/16 · 12/16 | Chip hints, photo count |
| **Overline** | `Overline` | SemiBold, UPPERCASE, +8% · 11/14 · 12/16 | Section headings in sheets, eyebrows |
| **Tag** | `Tag` | Bold · 11/14 · 11/14 | Tags and badges |
| **Button L** | `Button/Large` | SemiBold · 16/20 · 16/24 | Large buttons, chips |
| **Button S** | `Button/Small` | SemiBold · 15/20 · 15/20 | Medium buttons, Send, soft chips, photo chip |

Headings H1–H3 use −0.4px letter spacing, H4–H5 −0.2px.

### 2.2 Spacing & Radius Variables

Spacing follows a 4px rhythm with 2px and 6px steps for tight details. Scope: gaps and padding.

| Token Name | Figma Variable | Value | Usage |
| --- | --- | --- | --- |
| **None** | `spacing/none` | 0 | |
| **3XS** | `spacing/3xs` | 2 | Tag vertical padding, hairline offsets |
| **2XS** | `spacing/2xs` | 4 | Badge vertical padding, assistant text-to-sub gap |
| **XS** | `spacing/xs` | 6 | Icon-to-label gap in pills, notices, tags |
| **SM** | `spacing/sm` | 8 | Gap between chips and tags, button icon gap, composer padding |
| **MD** | `spacing/md` | 12 | Gap inside cards, notice padding, composer gap |
| **LG** | `spacing/lg` | 16 | Card padding, chip horizontal padding |
| **XL** | `spacing/xl` | 20 | Medium button padding, sheet section padding, top bar padding |
| **2XL** | `spacing/2xl` | 24 | Large button padding |
| **3XL** | `spacing/3xl` | 32 | Desktop page margin |
| **4XL** | `spacing/4xl` | 40 | Desktop section gap |
| **5XL / 6XL** | `spacing/5xl` · `spacing/6xl` | 48 · 64 | Large desktop gaps |

**Layout tokens** (`Responsive` collection, Mobile / Desktop). Use these for screen-level spacing so it adapts:

| Token Name | Figma Variable | Value (Mobile / Desktop) | Usage |
| --- | --- | --- | --- |
| **Page margin** | `layout/page-margin` | 16 / 32 | Screen side padding |
| **Gutter** | `layout/gutter` | 12 / 24 | Gap between columns and card grids |
| **Card padding** | `layout/card-padding` | 16 / 24 | Padding inside cards and sheets at screen level |
| **Section gap** | `layout/section-gap` | 24 / 40 | Gap between page sections |

**Radius** (scope: corner radius):

| Token Name | Figma Variable | Value | Usage |
| --- | --- | --- | --- |
| **None** | `radius/none` | 0 | Full-bleed images, dividers |
| **XS** | `radius/xs` | 4 | Bubble tail corner, tiny badges |
| **SM** | `radius/sm` | 8 | Inline labels |
| **MD** | `radius/md` | 12 | Notes, thumbnails, photo tiles |
| **LG** | `radius/lg` | 16 | Photo chip, hero area |
| **XL** | `radius/xl` | 20 | Cards, listing card, reply bubble |
| **2XL** | `radius/2xl` | 24 | Bottom sheet, seller box |
| **3XL** | `radius/3xl` | 40 | Phone frame |
| **Full** | `radius/full` | 999 | Buttons, chips, tags, pills, notices, composer, icon buttons |

### 2.3 Effect and Grid Styles

| Style | Figma Style | Value | Usage |
| --- | --- | --- | --- |
| **Ground** | `background/ground` (paint style) | Vertical gradient `bg/ground-top` → `-mid` (45%) → `-end`, plus four soft radial glows (`bg/ground-glow-1/-2` fading to their `-fade` tokens) | The app background (POC `--ground`) behind every screen and the cover. Every stop is a token, so it follows Light/Dark |
| **Chip shadow** | `shadow/chip` | 0 1 2 + 0 4 10, `shadow/soft` | Chips, Secondary button, attach button |
| **Bubble shadow** | `shadow/bubble` | 0 1 2 + 0 6 16, `shadow/soft` | Reply bubbles, thumbnails |
| **Card shadow** | `shadow/card` | 0 12 32, `shadow/soft` | Cards, listing card, bottom sheet |
| **Button glow** | `shadow/button` | inner white 18% + 0 8 18, `shadow/strong` | Primary button, selected chip, success tick |
| **Phone shadow** | `shadow/phone` | 0 24 60, `shadow/strong` | Phone frame in presentations |
| **Glass blur** | `blur/glass` | background blur 22 | Every `glass/fill` surface |
| **Focus ring** | `focus/ring` | 2px `bg/surface` gap + 2px `border/focus` ring | Focus state. The node must clip content or the ring won't render |
| **Mobile grid** | `grid/mobile` | 390: 4 columns, margin 16, gutter 12 | Phone screens (Responsive = Mobile) |
| **Desktop grid** | `grid/desktop` | 1440: 12 × 78 columns, gutter 24, 1200 centred | Desktop screens (Responsive = Desktop) |

### 2.4 Icons

**Heroicons** (Tailwind Labs, MIT): 316 local components named `icon/<heroicon-name>`, each with a `Style` variant. Colour is bound to `text/primary`; recolour an instance only with another text token.

| Style | Size | Use for |
| --- | --- | --- |
| `Outline` | 24, 1.5px stroke | Standalone icons, photo chip tile, success tick (at 28) |
| `Solid` | 24, filled | Selected or active versions of an Outline icon |
| `Mini` | 20, filled | Inside buttons, chips, icon buttons, composer |
| `Micro` | 16, filled | Inside tags (at 12), pills, notices, seller box |

---

## 3. Components

Change content through **properties**, never by detaching. Instance-swap icons from `icon/*`. "Exposed" means a nested instance whose properties you can change from the parent.

### 3.1 Base components

| Component | Variants | Properties | Usage |
| --- | --- | --- | --- |
| **`Button`** | `Style=Primary / Secondary`, `Size=Large (48) / Medium (44)`, `State=Default / Hover / Focus / Disabled` | Label, Show icon, Icon (Mini) | Every tappable action. One Primary per screen; Large at the bottom of screens and sheets |
| **`Link button`** | `State=Default / Hover` | Label | Quiet text action ("Change") |
| **`Icon button`** | `Style=Glass / Soft`, `State=Default / Focus / Disabled` | Icon (Mini) | 44px round button: Glass = back over content; Soft = attach |
| **`Chip`** | `Style=Default / Soft`, `State=Default / Hover / Selected / Focus` | Label, Show hint, Hint, Show icon, Icon (Mini) | Answer choices and suggestions; wrap with `spacing/sm` |
| **`Tag`** | `Type=AI / Checked / Edited by you` | Show icon | Source of a listing field. Text is fixed per type |
| **`Badge`** | none | Label | Ink status or count ("Live", "3") |
| **`Pill`** | none | Label, Show icon, Icon (Micro) | Status of the whole listing or chat, 40px |
| **`Notice`** | `Type=Info / Success / Warning / Error` | Label, Show icon | One-line message. Error = the fallback state |
| **`Typing indicator`** | `Step=1 / 2 / 3` | none | Assistant thinking (H-02); loop with Smart animate |
| **`Success tick`** | none | none | End of a flow |
| **`Composer`** | `State=Empty / Typing / Disabled` | Text | The only text input: attach + field + Send |

### 3.2 Element components

| Component | Variants | Properties | Usage |
| --- | --- | --- | --- |
| **`Background`** | `Type=Phone (390×844, radius/3xl, shadow/phone) / Screen (1440×900)` | none | The bottom layer of a screen or device mockup; fill = `background/ground`. On the `↳ Colors` page |
| **`Assistant message`** | `State=Latest / Earlier` | Text, Show sub, Sub | The assistant's turn, no bubble. Only the newest is Latest |
| **`Your reply`** | `Type=Text / Photos` | Text, Show change | The person's turn, right-aligned. Show change only on the latest reply |
| **`Thumbnail`** | `Type=Photo / Empty`, `Size=Large (56) / Small (48)` | none | Added photos; replace the fill with the image |
| **`Photo chip`** | `State=Default / Hover / Focus` | Label, Icon (Outline) | "Take a photo", "Choose from library" |
| **`Field row`** | none | Label, Value, Show tag; Tag exposed | One listing detail with its source Tag |
| **`Listing card`** | none | Title, Price, Description, Photo count; tags and Field rows exposed | Draft listing in the chat |
| **`Top bar`** | `Type=Chat / Over photo / Title` | Title, Show back; Pill and Badge exposed | Top of every screen, 390 wide |
| **`Sheet section`** | `Type=Title / Text / Details` | Show divider, Title, Price, Price note, Heading, Body | Blocks of the preview sheet |
| **`Bottom sheet`** | none | Sections exposed | Listing as buyers see it; overlaps the hero photo by 88 |
| **`Seller box`** | none | Heading; Field rows exposed | Seller-only settings, dashed outline |

Text properties share one default across variants: after placing a `Notice`, `Sheet section` (Details) or `Top bar` (Title), set its text.

---

## 4. Design System Guardrails (Linter Rules)

Each rule is phrased as the target, with a yes/no check the `ds-linter` can run on the Figma file. Severity uses the same scale as the Product Requirements rules library (`high`, `medium`, `low`).

| ID | Rule | Check | Severity |
| --- | --- | --- | --- |
| DS-01 | Colors are variables | Is every fill, stroke and effect colour bound to a section 1 variable (or a `glass`/`shadow` token)? Fails on any unbound colour or on a hidden `color/*` primitive. | high |
| DS-02 | Text uses text styles | Does every text layer use a section 2.1 text style? Fails on local font settings. | medium |
| DS-03 | Spacing is on-scale | Is every auto-layout padding, gap and corner radius bound to a `spacing/*`, `layout/*` or `radius/*` variable? Fails on unbound numbers. | medium |
| DS-04 | Components are instances | Is every button, chip, tag, notice, message, card, top bar and sheet an instance of a section 3 component? Fails on detached or hand-drawn copies. | medium |
| DS-05 | Icons come from the library | Is every icon an instance of an `icon/*` component in the right Style for its size (section 2.4)? Fails on pasted SVGs or other icon sets. | medium |
| DS-06 | Modes, not overrides | Does each screen frame set its Color mode (Light/Dark) and Responsive mode (Mobile/Desktop), with no node overriding colours per mode by hand? | medium |
| DS-07 | One Primary action | Does the screen show at most one `Button` with `Style=Primary` in the Default state? | high |
| DS-08 | AI fields are tagged | Does every value the AI filled carry a `Tag` (AI, Checked or Edited by you)? Fails on untagged AI values. | high |
| DS-09 | Fallback offers a way forward | Is every `Notice` with `Type=Error` followed by at least one Chip or Button that lets the person continue manually (PR H-04)? | high |
| DS-10 | Focus is visible | Do Focus states use the `focus/ring` effect on a node that clips content? | low |
