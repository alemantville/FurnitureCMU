import { cn } from "@/lib/utils"

import { FieldRow, type FieldRowProps } from "./field-row"
import { Tag, type TagType } from "./tag"

export type ListingCardProps = React.ComponentProps<"article"> & {
  title: React.ReactNode
  price: React.ReactNode
  description: React.ReactNode
  /** e.g. "1 photo" */
  photoCount?: React.ReactNode
  /** The item photo; without it the hero shows the empty photo frame. */
  photo?: string
  titleTag?: TagType
  priceTag?: TagType
  /** Pass `null` to hide the description Tag. */
  descriptionTag?: TagType | null
  details?: Omit<FieldRowProps, "className">[]
}

/**
 * Stoop Listing card (Figma "Listing card", node 33:9). The draft listing in
 * the chat: everything visible, and every field carries its source Tag.
 */
export function ListingCard({
  title,
  price,
  description,
  photoCount,
  photo,
  titleTag = "ai",
  priceTag = "ai",
  descriptionTag = "ai",
  details = [],
  className,
  ...props
}: ListingCardProps) {
  return (
    <article
      data-slot="listing-card"
      className={cn(
        "flex w-full flex-col items-start gap-3 rounded-xl border border-edge-subtle bg-surface p-4 shadow-card",
        className
      )}
      {...props}
    >
      <div className="relative h-32 w-full shrink-0 overflow-clip rounded-lg bg-tile">
        <div className="absolute top-[11px] left-[21px] h-[104px] w-24 -rotate-3 overflow-hidden rounded-md border-4 border-surface bg-chip-soft shadow-bubble">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- user photos come from anywhere
            <img src={photo} alt="" className="size-full object-cover" />
          ) : null}
        </div>
        {photoCount ? (
          <span className="type-caption absolute right-3 bottom-3 rounded-full bg-glass-dark px-2 py-0.5 text-fg-on-photo">
            {photoCount}
          </span>
        ) : null}
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full flex-wrap items-center gap-x-1.5">
          <h3 className="type-h5 text-fg-primary">{title}</h3>
          <Tag type={titleTag} />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="type-h2 text-fg-primary">{price}</p>
          <Tag type={priceTag} />
        </div>
      </div>

      <div className="flex w-full flex-wrap items-end gap-x-1.5 gap-y-1">
        <p className="type-body-md w-full text-fg-primary">{description}</p>
        {descriptionTag ? <Tag type={descriptionTag} /> : null}
      </div>

      {details.length ? (
        <div className="flex w-full flex-col items-start gap-2 border-t border-edge-subtle pt-3">
          {details.map((row, i) => (
            <FieldRow key={i} {...row} />
          ))}
        </div>
      ) : null}
    </article>
  )
}
