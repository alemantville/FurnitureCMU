import rows from "@/data/listings.json"

/**
 * Dummy listings database for prototyping (app/data/listings.json).
 * Read-only and in memory: edit the JSON to change the data. Every item is
 * made up; locations are neighbourhoods only, never addresses.
 */

export type Condition = "Like new" | "Good" | "Fair"
export type ListingStatus = "available" | "reserved" | "sold"
export type SellBy = "as-soon-as-possible" | "within-a-week" | "within-a-month" | "no-rush"

export type Listing = {
  id: string
  title: string
  description: string
  /** "Top › Sub", as in the listing's Category field. */
  category: string
  colour: string
  condition: Condition
  conditionNote: string | null
  /** Euros. 0 means the item is given away for free. */
  price: number
  acceptsOffers: boolean
  neighbourhood: string
  status: ListingStatus
  photoCount: number
  sellBy: SellBy
  /** ISO 8601. */
  listedAt: string
}

export const listings = rows as Listing[]

export type ListingQuery = {
  /** Matches title, description, category and colour (case-insensitive). */
  q?: string
  /** Matches the top category, e.g. "Sofas", or the full "Sofas › Corner sofas". */
  category?: string
  maxPrice?: number
  free?: boolean
  /** Defaults to available items only. */
  status?: ListingStatus | "all"
}

export function getListing(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id)
}

/** Newest first. */
export function findListings(query: ListingQuery = {}): Listing[] {
  const q = query.q?.trim().toLowerCase()
  const category = query.category?.trim().toLowerCase()
  const status = query.status ?? "available"

  return listings
    .filter((listing) => status === "all" || listing.status === status)
    .filter((listing) => !category || listing.category.toLowerCase().startsWith(category))
    .filter((listing) => query.maxPrice === undefined || listing.price <= query.maxPrice)
    .filter((listing) => !query.free || listing.price === 0)
    .filter(
      (listing) =>
        !q ||
        [listing.title, listing.description, listing.category, listing.colour]
          .join(" ")
          .toLowerCase()
          .includes(q)
    )
    .toSorted((a, b) => b.listedAt.localeCompare(a.listedAt))
}

/** "€45", or "Free" when the price is 0. */
export function formatPrice(price: number): string {
  return price === 0 ? "Free" : `€${price}`
}
