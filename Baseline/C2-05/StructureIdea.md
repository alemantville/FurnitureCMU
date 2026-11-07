# [Project Name] - Exercise 1: System Mechanics Spec (`StructureIdea.md`)

## 1. Problem Statement

- **User Friction**: Listing a second-hand item takes too many steps. The user has to type out a title, description, category, colour, condition, price and location by hand, then arrange a pickup separately, and the original flow repeated steps (e.g. asking for photos twice in a row) and ended on "Upload item!" with nowhere to land.
- **Target Outcome**: Post an item for sale and schedule its collection in one short, guided conversation: take a few photos, let the AI assistant draft the listing, check and fix only what is wrong, pick when the item can be collected, and see the listing live.

## 2. Low-Fidelity Interaction Breadboard

![[Attach photo of hand sketch here]]

- **Step 1 (Homepage)**:
  - User sees two entry buttons: **Sell** and **Donate**.
  - User can **Sell**, which opens Step 2 (Upload photos).
  - User can **Donate**, which opens the Donate flow (not mapped in this breadboard).

- **Step 2 (Upload photos)** — *Chat*:
  - User sees the bot message *"Upload the item pictures"*.
  - User can **Add photos** from the camera or gallery; the selected photos appear as thumbnails.
  - User can **Send**, which opens Step 3 (Review listing).

- **Step 3 (Review listing)** — *Chat*:
  - User sees a listing drafted by the AI from the photos (marked **AI suggests**).
  - Information shown, all filled by AI:
    - Title
    - Description
    - Category
    - Color
    - Condition (e.g. damaged)
    - Price
    - Location
  - User can **Edit field** inline on any value; this keeps them on Step 3.
  - User can **Confirm**, which opens Step 4 (Collection days).

- **Step 4 (Collection days)** — *Chat*:
  - User sees the bot message *"What's your availability for collection?"* and a day picker.
  - User picks one or more days and selects **Next**, which opens Step 5 (Timeslots).

- **Step 5 (Timeslots)** — *Chat*:
  - User sees the available time slots for each chosen day.
  - User picks slots and selects **Next**, which opens Step 6 (Post preview).

- **Step 6 (Post preview)**:
  - User sees the listing card: photos + confirmed fields, plus the chosen collection days and slots.
  - User can **Edit**, which goes back to Step 3 (Review listing). *(Added: not in the original flow.)*
  - User can **Upload item**, which opens Step 7 (Item live).

- **Step 7 (Item live)** *(Added: not in the original flow)*:
  - User sees a success message.
  - User can **View post**, which opens the Listing page.
  - User can **Back to home**, which returns to Step 1 (Homepage).

*Changes from the original 15-step flow*: "User selects sell or donate" and "User selects sell" were merged into the Homepage; the duplicated "Upload the item pictures" step was removed; "AI suggests" + "User reviews" + "Confirm" became one place (Review listing); an Edit route from Post preview and the Item live screen were added.

*Open questions*:
1. Where does **Donate** go? Same chat without Price, or a separate flow?
2. Are **Collection days** and **Timeslots** two steps, or one picker with days and slots together?
3. What happens if the AI can't identify the item, or the photo is unusable?
4. Is **Location** suggested by the AI or taken from the user's profile?
5. Can the user add more photos after the AI has made its suggestions?

## 3. Non-Negotiable System Mechanics

- The listing must be drafted by the AI from the photos: the user reviews and corrects suggested fields, never fills a blank form.
- Every AI-suggested field must be visibly marked as AI-filled and editable inline without leaving the review step.
- The flow must run as one guided conversation in a fixed order: photos → review → collection days → timeslots → preview → live.
- Nothing is published until the user sees the full preview (listing + collection slots) and explicitly selects **Upload item**; from the preview they can always go back to edit.
- Every flow must end on a clear landing place (Item live) with a way to view the post or return home.
