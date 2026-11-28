import { formatPrice, type Listing } from "@/lib/listings"

/**
 * Items from the dummy listings database that the assistant found, shown as
 * one compact card under its reply. The details come straight from the
 * data, never from the model, so nothing here can be made up.
 */
export function ListingResults({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) return null
  return (
    <ul
      aria-label="Items for sale"
      className="flex flex-col divide-y divide-edge-subtle rounded-xl bg-surface px-4 shadow-card"
    >
      {listings.map((listing) => (
        <li key={listing.id} className="flex items-start justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="type-body-md text-fg-primary">{listing.title}</p>
            <p className="type-body-sm text-fg-secondary">
              {listing.condition} · {listing.neighbourhood}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="type-label text-fg-primary">{formatPrice(listing.price)}</p>
            {listing.price > 0 ? (
              <p className="type-caption text-fg-secondary">
                {listing.acceptsOffers ? "Open to offers" : "Fixed price"}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
