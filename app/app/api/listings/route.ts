import { findListings, getListing, type ListingQuery } from "@/lib/listings"

const STATUSES = ["available", "reserved", "sold", "all"] as const

/**
 * GET /api/listings — the dummy listings database (app/data/listings.json).
 *
 *   ?id=lst_001          one listing (404 if unknown)
 *   ?q=sofa              text search
 *   ?category=Tables     top category or full "Top › Sub"
 *   ?maxPrice=50         euros
 *   ?free=1              free items only
 *   ?status=all          available (default), reserved, sold or all
 */
export function GET(request: Request) {
  const params = new URL(request.url).searchParams

  const id = params.get("id")
  if (id) {
    const listing = getListing(id)
    return listing
      ? Response.json({ listing })
      : Response.json({ error: "not_found" }, { status: 404 })
  }

  const query: ListingQuery = {}
  const q = params.get("q")
  if (q) query.q = q
  const category = params.get("category")
  if (category) query.category = category

  const maxPrice = params.get("maxPrice")
  if (maxPrice !== null) {
    const value = Number(maxPrice)
    if (!Number.isFinite(value) || value < 0)
      return Response.json({ error: "bad_max_price" }, { status: 400 })
    query.maxPrice = value
  }

  if (params.get("free") === "1") query.free = true

  const status = params.get("status")
  if (status !== null) {
    if (!(STATUSES as readonly string[]).includes(status))
      return Response.json({ error: "bad_status" }, { status: 400 })
    query.status = status as ListingQuery["status"]
  }

  const results = findListings(query)
  return Response.json({ count: results.length, listings: results })
}
