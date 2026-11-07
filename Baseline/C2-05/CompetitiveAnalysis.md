> [!info] Who fills what
> - **The group**: §1 Project Context, §2 Competitors, every **SWOT** in §3 and §4 Key Lessons.
> - **AI**: only the three bullets of each competitor in §3 (interaction loop, UI patterns, friction). Leave every SWOT block empty: the group fills it.

> [!note] Focus of this analysis
> Only the **publishing flow**: how a seller goes from "I want to sell this" to a live listing (photos, listing details, price, pickup / delivery, publish). Buying, messaging and payment are out of scope.

## 1. Project Context

- **Market / Area**: [ Insert Market Area, e.g., EdTech / FinTech / Creative Tools ]
- **Target Users**: [ Insert Target User Persona, e.g., College Students / Senior Designers ]
- **Target Platform**: [ Web / Mobile / Desktop / VR ]
- **One-Liner Project Summary**: [ Insert product summary from Exercise 01 ]

---

## 2. Competitors (4)

### Direct Competitors

1. **Wallapop**: A mobile-first second-hand marketplace for selling almost anything locally, with optional shipping.
2. **OLX**: A general classifieds platform where sellers post ads for items (and cars, property, jobs) and buyers contact them to meet.

### Indirect / Analogous Solutions

3. **uRecycle**: An AI-first second-hand marketplace launching in Riyadh, where a seller snaps one photo and the AI identifies the item, writes the listing and suggests a price (not publicly released yet: in stealth with a waitlist).
4. **IKEA Marketplace (IKEA Preowned)**: IKEA's peer-to-peer marketplace for reselling used IKEA furniture, where AI fills in product images, measurements and details from IKEA's catalogue (piloted in Madrid and Oslo since 2024, with a wider European roll-out announced).

---

## 3. Deep-Dive Audit

### Competitor 1: Wallapop

- **Primary Interaction Loop**: Tap the central **Upload** button in the tab bar → choose what to sell (a product, a car, property, etc.) → take or pick photos → fill title, category, description, condition and price (recent versions can suggest the title and category from the photo) → decide whether to offer **shipping** (pick a weight band) or in-person only → confirm location on a map → **Upload**, and the item is live right away.
- **Key UI Patterns & Mechanics**: A single scrolling form after a photo-first start; a persistent central "+" upload button; category picker as a drill-down list; a shipping on/off toggle with weight bands; a map pin for location; instant publish with no review step; optional paid "boost" offered after publishing.
- **Friction & Cognitive Load Points**: The seller must guess the parcel weight band and price with little guidance; the category drill-down is easy to get wrong; the long single form feels like admin work; nothing about **when** the item can be collected is captured, so pickup is negotiated later in chat, one buyer at a time.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: It has shipping options
- **Weaknesses**: Very manual
- **Opportunities**: Confirm location on a map
- **Threats**: AI filled information from a picture

### Competitor 2: OLX

- **Primary Interaction Loop**: Tap **Sell / Post ad** → choose a category from a multi-level tree → enter a title and add photos → fill the description and category-specific attributes (brand, condition, size…) → set a price (or mark as free / swap) → confirm location and contact details (often with phone verification) → **Post**; the ad may then be moderated before it goes live, and a paid promotion offer is shown.
- **Key UI Patterns & Mechanics**: Category-first classifieds form; dynamic attribute fields that change with the category; contact-details block (name, phone, show / hide number); publish followed by a moderation status; upsell screen for featured / promoted ads; limits on free ads in some categories and markets.
- **Friction & Cognitive Load Points**: Choosing a category before showing photos makes the seller classify the item up front; many category-specific fields feel mandatory; phone verification and account steps interrupt the flow; the promotion upsell lands right at the moment of publishing; moderation delay means the seller doesn't know when the ad is actually live; pickup is arranged by phone or chat afterwards.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: The ability to negotiate
- **Weaknesses**: Choosing category before uploading pictures
- **Opportunities**: Having the ability to have a max. negotiation price
- **Threats**: It generates AI description of the item 

### Competitor 3: uRecycle

> Based on uRecycle's public site and photo demo: the app is not released yet, so the full in-app flow can't be checked.

- **Primary Interaction Loop**: Open the app and point the camera at the item ("0 typing required") → the AI recognises the item and writes the listing in Arabic and English → the AI suggests a fair price in SAR from category, visible condition, brand signals and comparable sales → the item is listed and nearby interested buyers get an instant notification → pickup is matched locally.
- **Key UI Patterns & Mechanics**: Camera-first capture instead of a form; AI-generated listing (title, description, category) from a single photo; AI price estimate; bilingual auto-written copy; hyper-local matching with push alerts to nearby buyers; no listing fees or commission during launch.
- **Friction & Cognitive Load Points**: The public material doesn't show a step where the seller reviews or corrects what the AI wrote, so trust depends on the AI being right; it's unclear what happens when the item isn't recognised or the photo is poor; a single photo may not show condition or defects well; pickup is promised to be "faster", but there's no visible way for the seller to set when the item can be collected.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: Interested buyers get instant notifications 
- **Weaknesses**: User can't correct what AI wrote
- **Opportunities**: Having pickup matched locally
- **Threats**: Good AI recognition

### Competitor 4: IKEA Marketplace (IKEA Preowned)

> Based on press coverage of the 2024 pilot: the current flow may differ.

- **Primary Interaction Loop**: Start a listing for a used IKEA product → upload your own photos → AI identifies the IKEA product and adds official product images, measurements and details from IKEA's catalogue (some reports say it also suggests a selling price) → seller sets the price → publish → buyer and seller arrange the handover → seller is paid by bank transfer (100% of the price) or chooses an IKEA voucher (115%).
- **Key UI Patterns & Mechanics**: Catalogue-backed listing: product data comes from the retailer instead of the seller; official product images shown next to the seller's own photos; AI-filled dimensions; optional AI price suggestion; payout choice that rewards staying in the IKEA ecosystem; free listing during the pilot.
- **Friction & Cognitive Load Points**: It only works for IKEA products, so anything else needs another platform; the seller still has to describe condition and wear themselves, since catalogue data shows the item as new; the price suggestion isn't consistently offered, so pricing can still be a guess; collection of bulky furniture is left for buyer and seller to sort out between themselves, with no way to set pickup times while listing; as a pilot, it's only available in a few cities.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: AI identifies the Ikea product
- **Weaknesses**: It only works for Ikea products
- **Opportunities**: Seller is paid by bank transfer
- **Threats**: AI filled information by a picture

---

## 4. Key Lessons & Behavioral Directives for Our Design

Use the audit and the 4 SWOTs.

1. **Friction to Avoid**: [ What interaction flaw we saw in competitors that we will prohibit ]
2. **Opportunity Gap**: [ What unaddressed user need or mental model misalignment we will solve ]
3. **Behavioral Rule**: [ Non-negotiable interaction dynamic we will enforce in our prompt stack ]
