import { cn } from "@/lib/utils"

export type PriceCollageProps = React.ComponentProps<"div"> & {
  /** The seller's photo of the item. */
  photo?: string
  /** The lowest and highest price of similar items sold nearby. */
  low: React.ReactNode
  high: React.ReactNode
}

/**
 * Stoop Price collage (Figma "Price collage", node 4:84). The price
 * suggestion visual: your photo next to similar items that sold nearby.
 * The 318×150 composition keeps its Figma positions and is centred in the
 * tile when the card is wider.
 */
export function PriceCollage({
  photo,
  low,
  high,
  className,
  ...props
}: PriceCollageProps) {
  return (
    <div
      data-slot="price-collage"
      className={cn("h-[150px] w-full shrink-0 overflow-clip rounded-lg bg-tile", className)}
      {...props}
    >
      <div aria-hidden className="relative mx-auto h-full w-[318px]">
        {/* Your photo */}
        <div className="absolute top-1 left-8 h-[132px] w-[124px] -rotate-3 overflow-hidden rounded-md border-4 border-surface bg-chip-soft shadow-bubble">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- user photos come from anywhere
            <img src={photo} alt="" className="size-full object-cover" />
          ) : null}
        </div>
        {/* Comparable, low */}
        <div className="absolute top-3 left-[132px] flex size-20 rotate-3 flex-col items-center justify-center gap-0.5 rounded-md bg-surface shadow-bubble">
          {/* eslint-disable-next-line @next/next/no-img-element -- static illustration */}
          <img src="/sell/chair-35.svg" alt="" width={30} height={36} />
          <span className="type-label text-fg-primary">{low}</span>
        </div>
        {/* Comparable, high */}
        <div className="absolute top-[90px] left-[156px] flex h-[52px] w-20 -rotate-2 items-center justify-center gap-1.5 rounded-md bg-surface shadow-bubble">
          {/* eslint-disable-next-line @next/next/no-img-element -- static illustration */}
          <img src="/sell/chair-55.svg" alt="" width={23} height={27} />
          <span className="type-label text-fg-primary">{high}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static illustration */}
        <img
          src="/sell/price-tag.svg"
          alt=""
          width={48}
          height={44}
          className="absolute top-[9px] left-[250px] -rotate-[14deg]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static illustration */}
        <img
          src="/sell/sparkle.svg"
          alt=""
          width={18}
          height={18}
          className="absolute top-20 left-[226px]"
        />
        <span className="type-h5 absolute top-[98px] left-[254px] flex size-[38px] items-center justify-center rounded-full bg-action font-bold text-fg-on-ink shadow-button">
          €
        </span>
      </div>
    </div>
  )
}
