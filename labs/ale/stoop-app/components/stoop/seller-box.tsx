import { LockClosedIcon } from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"

export type SellerBoxProps = React.ComponentProps<"section"> & {
  heading?: React.ReactNode
}

/**
 * Stoop Seller box (Figma "Seller box", node 35:98). Seller-only settings
 * under the preview; the dashed outline says "not public". Children are Field rows.
 */
export function SellerBox({
  heading = "Only you see this",
  className,
  children,
  ...props
}: SellerBoxProps) {
  return (
    <section
      data-slot="seller-box"
      className={cn(
        "flex w-full flex-col items-start gap-2 rounded-2xl border-[1.5px] border-dashed border-edge-outline bg-glass px-5 py-4",
        className
      )}
      {...props}
    >
      <h3 className="type-overline flex items-center gap-1.5 text-fg-secondary">
        <LockClosedIcon aria-hidden className="size-3 shrink-0" />
        {heading}
      </h3>
      {children}
    </section>
  )
}
