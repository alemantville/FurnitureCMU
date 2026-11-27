/**
 * Flow 1 – Selling an Item (Figma file LYeyNdKee4QBklrfyCoEdZ, section 1:406).
 * One entry per screen, in order. `note` is the screen's Service note: the
 * external service behind that step.
 */
export type SellScreen = {
  slug: string
  name: string
  /** Figma frame node id */
  node: string
  note: { service: string; text: string }
}

export const SELL_SCREENS: SellScreen[] = [
  {
    slug: "01-start",
    name: "Start",
    node: "21:957",
    note: {
      service: "Claude API",
      text: "Runs the assistant conversation: understands what the seller types and generates the quick-reply chips (Sell an item / Donate an item).",
    },
  },
  {
    slug: "02-photos",
    name: "Photos",
    node: "22:888",
    note: {
      service: "Cloudinary",
      text: "Receives the uploaded photos, converts HEIC to JPEG, compresses them, strips GPS location data and serves them through a CDN.",
    },
  },
  {
    slug: "03-is-this-it",
    name: "Is this it?",
    node: "22:941",
    note: {
      service: "Claude API",
      text: "Vision: looks at the photos and identifies the item, returning title, category and colour as structured data for the listing.",
    },
  },
  {
    slug: "04-any-damage",
    name: "Any damage?",
    node: "22:1010",
    note: {
      service: "Claude API",
      text: "Vision: checks the photos for damage and detects that the back of the chair isn't visible yet, so it asks for another photo.",
    },
  },
  {
    slug: "05-back-of-the-chair",
    name: "Back of the chair",
    node: "22:1067",
    note: {
      service: "Claude API",
      text: "Vision: analyses the new photo of the back and adds the light marks to the condition description.",
    },
  },
  {
    slug: "06-price",
    name: "Price",
    node: "22:1132",
    note: {
      service: "Supabase",
      text: "Database with pgvector + PostGIS: finds visually similar items sold nearby to suggest €45 and build the price collage.",
    },
  },
  {
    slug: "07-lowest-offer",
    name: "Lowest offer",
    node: "22:1221",
    note: {
      service: "Supabase",
      text: "Stores the lowest offer privately on the server. An Edge Function accepts or declines offers, so the AI chat can never reveal it to buyers.",
    },
  },
  {
    slug: "08-your-listing",
    name: "Your listing",
    node: "22:1279",
    note: {
      service: "Google Maps Geocoding API",
      text: "Turns the seller's location into a neighbourhood name (Gràcia, Barcelona), so buyers see the area but never the exact address.",
    },
  },
  {
    slug: "09-sell-by",
    name: "Sell by",
    node: "22:1428",
    note: {
      service: "Supabase",
      text: "Saves the sell-by date and runs scheduled jobs (pg_cron) to remind the seller or suggest a price drop before the deadline.",
    },
  },
  {
    slug: "10-collection-days",
    name: "Collection days",
    node: "22:1483",
    note: {
      service: "Supabase",
      text: "Stores the days the seller is available for buyers to collect the item.",
    },
  },
  {
    slug: "11-collection-times",
    name: "Collection times",
    node: "22:1590",
    note: {
      service: "Supabase",
      text: "Stores the time slots for each day and makes sure two buyers can't book the same slot.",
    },
  },
  {
    slug: "12-preview",
    name: "Preview",
    node: "23:1069",
    note: {
      service: "Cloudinary",
      text: "Crops and enhances the hero photo so the preview shows the item exactly as buyers will see it.",
    },
  },
  {
    slug: "13-item-live",
    name: "Item live",
    node: "23:1204",
    note: {
      service: "OneSignal",
      text: "Sends push notifications to buyers nearby when the item goes live, and to the seller when offers arrive or it sells.",
    },
  },
]

/** Route of screen `n` (1-based). Screen 01 is the homepage; out of range goes home too. */
export function sellHref(n: number) {
  const screen = SELL_SCREENS[n - 1]
  return screen && n > 1 ? `/sell/${screen.slug}` : "/"
}

/** The seller's item photo, used across the flow. */
export const ITEM_PHOTO = "/sell/item-photo.jpg"
