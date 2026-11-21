# Happy path: Selling an item

Figma handoff page: [Open in Figma](https://www.figma.com/design/FyDHYBk2Hn43vgoGmwZp35/Selling-Furniture?node-id=1-406)

## Context

A chat-based assistant that helps a private seller (e.g. Marta, in Gràcia, Barcelona) list a used piece of furniture without filling in a form: she sends photos, answers a few quick questions, and the AI turns them into a checked listing with a price, a lowest acceptable offer and collection times. It exists because writing listings, pricing and arranging pickups is the effort that makes people give up on selling.

## Flows

| Step | Screen                    | What the user does                                                                  | Goes to |
| ---- | ------------------------- | ----------------------------------------------------------------------------------- | ------- |
| 1    | [[1. Start conversation]] | Taps **Sell an item** (or types what they need)                                     | 2       |
| 2    | [[2. Photos]]             | Taps the plus button, adds photos of the item and sends them                        | 3       |
| 3    | [[3. Is this it?]]        | Confirms the AI's guess ("wooden armchair with beige cushions"): **Yes, that's it** | 4       |
| 4    | [[4. Any damage?]]        | Taps **Add a photo of the back** and sends it                                       | 5       |
| 5    | [[5. Back of the chair]]  | Confirms the marks the AI found: **Yes, that's right**                              | 6       |
| 6    | [[6. Price]]              | Picks the suggested price **€45** (range €35–55 from similar chairs nearby)         | 7       |
| 7    | [[7. Lowest offer]]       | Picks the lowest price the AI may accept: **€36**                                   | 8       |
| 8    | [[8. Your listing]]       | Reviews the listing card (fields marked Checked / AI) and taps **All good**         | 9       |
| 9    | [[9. Sell by]]            | Picks **Within a month**                                                            | 10      |
| 10   | [[10. Collection days]]   | Selects **Sat 21** and **Sun 22**, taps **Next**                                    | 11      |
| 11   | [[11. Collection times]]  | Picks at least one slot per day (Sat 12–15; Sun 12–15, 15–18), taps **See preview** | 12      |
| 12   | [[12. Preview]]           | Checks what buyers will see and taps **Upload item**                                | 13      |
| 13   | [[13. Item live]]         | Sees "Your armchair is live", taps **View post** or **Back to home**                | End     |

## Data overview

Nothing about the back end is specified in Figma; this is what the screens need.

- **User profile**: first name (greeting on step 1) and approximate location (listing location "Gràcia, Barcelona" and nearby price comparisons). If missing: greet without name and ask for the area before pricing.
- **Photo upload + image analysis (AI)**: item type, material, colours, visible condition and missing angles (e.g. "couldn't see the back"). If slow: show a typing/working state in the thread. If it fails or is unsure: ask the user to describe the item in the composer ("Or tell me what it is").
- **Price suggestion**: recent sale prices of similar items near the user (shown as "€35–55") and a suggested price. If missing: hide the range and ask the user to type their own price.
- **Listing draft**: title, price, description, category, colour, condition, location, photos, and per-field status (Checked = confirmed by the user, AI = not yet confirmed). Saved as a private draft after every answer ("Draft · only you can see it").
- **Selling preferences**: sell-by window, lowest acceptable offer (private, never shown to buyers), offers on/off.
- **Collection availability**: days in the next 2 weeks and time slots (9–12, 12–15, 15–18, 18–21). Private: only shared when a buyer asks when they can collect.
- **Publish**: creates the live listing and returns its status/link for **View post**. If publishing fails, the draft must be kept and the user told to retry.
- APIs and endpoints: not defined yet (see Open questions).

## Edge cases and acceptance criteria

- Nothing is public until the user taps **Upload item**: the top badge reads "Draft · only you can see it" and the preview shows "This is what buyers will see. Nothing is public yet."
- Leaving with the back arrow at any step keeps the draft and the answers given so far.
- Every user answer has a **Change** link; changing it updates the listing and re-asks any later question that depends on it.
- Every question can also be answered by typing in the composer instead of tapping a chip.
- Damage: if the user doesn't add a photo of the back, they must still pick a condition (good shape / light marks / visible damage). Marks found or reported are added to both condition and description.
- Price: the user can pick a chip, type their own price or give the item away for free. The lowest offer must be equal to or lower than the asking price and is never shown to buyers.
- Listing card: fields the user confirmed show **Checked**; fields only guessed by the AI show **AI** until confirmed or changed.
- Collection days are optional; **Skip, I'll arrange it with buyers** goes straight on. **See preview** stays disabled until each selected day has at least one time slot.
- After **Upload item**, the success screen confirms the item is visible to buyers nearby and states the lowest offer the assistant will accept (e.g. "from €36").

## Open questions

- Alternative branches are not designed: **Donate an item**, **Not quite** (wrong guess), **Visible damage** / **There's more damage**, **It's in better shape**, **Give it away for free**, **No offers, fixed price**, **Change something**, **Weekends only**, **Evenings only**, **Any time on those days** and **Skip** on collection.
- Loading, error and empty states (slow AI, failed upload, no price data, failed publish) are not designed.
- Back-end services and APIs for image analysis, price suggestions, listing storage, publishing and offer handling are not defined.
- Mismatch to check: the photos show a green sofa, but the text says "wooden armchair with beige cushions" and "Your armchair is live".
- Colour stays marked **AI** on the listing card: should the user confirm it before publishing?
- Collection days are hard-coded (Sat 21–Sat 28) in the design: confirm they come from the real calendar (next 2 weeks from today).
- The **View post** destination (listing page) is not in this flow.
