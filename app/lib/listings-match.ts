import { findListings, formatPrice, type Listing } from "@/lib/listings"

/**
 * Reads a chat message and finds listings from the dummy database that fit
 * it, so the test assistant can recommend real items instead of inventing
 * them. Plain keyword matching: no model involved.
 */

export type ListingMatch = {
  /** The message is about finding or buying something. */
  browsing: boolean
  listings: Listing[]
  /** What was understood, for the assistant and for debugging. */
  filters: { words: string[]; maxPrice?: number; free?: boolean }
}

const MAX_RESULTS = 5

const STOPWORDS = new Set(
  "the and for with any are you have has can could would there some looking want need find show buy get cheap item items thing things something under below less than near around from that this have please hello help me my our your what which who how much one two old new good nice".split(
    " "
  )
)

/** Everyday words for the database's own terms. */
const SYNONYMS: Record<string, string> = {
  couch: "sofa",
  settee: "sofa",
  bookcase: "bookshelf",
  shelving: "bookshelf",
  shelf: "bookshelf",
  dresser: "drawer",
  drawers: "drawer",
  seat: "chair",
  stool: "chair",
  light: "lamp",
  bunk: "bunk",
  kids: "bunk",
}

const BROWSE_WORDS = /\b(buy|buying|looking for|look for|find|any|available|for sale|shop|recommend|show me|have you got|do you have|cheap|cheaper|under|below|free)\b/i
const SELL_WORDS = /\b(sell|selling|donate|donating|give away|giving away|get rid of|list my|post my)\b/i

/** "sofas" → "sofa", "benches" → "bench". */
function singular(word: string): string {
  if (word.endsWith("ves")) return `${word.slice(0, -3)}f`
  if (/(ches|shes|xes|ses)$/.test(word)) return word.slice(0, -2)
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1)
  return word
}

function wordsOf(text: string): string[] {
  return (text.toLowerCase().match(/[a-zà-ÿ]+/g) ?? []).map(singular)
}

function readFilters(text: string): ListingMatch["filters"] {
  const price = text.match(
    /(?:under|below|less than|up to|max(?:imum)?|cheaper than|no more than|<)\s*€?\s*(\d+)|€\s*(\d+)\s*(?:or less|max|tops)/i
  )
  const words = [
    ...new Set(
      wordsOf(text)
        .filter((word) => word.length >= 3 && !STOPWORDS.has(word))
        .map((word) => SYNONYMS[word] ?? word)
    ),
  ]
  return {
    words,
    maxPrice: price ? Number(price[1] ?? price[2]) : undefined,
    free: /\bfree\b|\bfor nothing\b/i.test(text) || undefined,
  }
}

function score(listing: Listing, words: string[]): number {
  const strong = new Set(wordsOf(`${listing.title} ${listing.category}`))
  const weak = new Set(wordsOf(`${listing.description} ${listing.colour} ${listing.neighbourhood}`))
  let total = 0
  for (const word of words) {
    if ([...strong].some((w) => w === word || (word.length >= 4 && w.includes(word)))) total += 3
    else if (weak.has(word)) total += 1
  }
  return total
}

export function matchListings(text: string): ListingMatch {
  const filters = readFilters(text)
  const selling = SELL_WORDS.test(text)
  const asksToBrowse = BROWSE_WORDS.test(text)

  // "Help me sell my sofa" is about the seller's own item, not shopping.
  if (selling && !/\b(buy|buying|looking for|for sale)\b/i.test(text)) {
    return { browsing: false, listings: [], filters }
  }

  const candidates = findListings({ maxPrice: filters.maxPrice, free: filters.free })
  const scored = candidates
    .map((listing) => ({ listing, score: score(listing, filters.words) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)

  const hasPriceFilter = filters.maxPrice !== undefined || filters.free === true
  const listings =
    scored.length > 0
      ? scored.slice(0, MAX_RESULTS).map((entry) => entry.listing)
      : hasPriceFilter
        ? candidates.slice(0, MAX_RESULTS)
        : []

  return {
    browsing: asksToBrowse || listings.length > 0,
    listings,
    filters,
  }
}

/** One line per listing, for the assistant's instructions. */
export function describeListing(listing: Listing): string {
  const price =
    listing.price === 0
      ? "Free"
      : `${formatPrice(listing.price)}${listing.acceptsOffers ? " (open to offers)" : " (fixed price)"}`
  return `- ${listing.title}: ${price}, condition ${listing.condition}${
    listing.conditionNote ? ` (${listing.conditionNote})` : ""
  }, in ${listing.neighbourhood}`
}
