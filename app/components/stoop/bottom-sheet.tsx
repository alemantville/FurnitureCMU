import { cn } from "@/lib/utils"

export type BottomSheetProps = React.ComponentProps<"div"> & {
  /** Pull the sheet up over the hero photo by 88px, as in the listing preview. */
  overlapHero?: boolean
}

/**
 * Stoop Bottom sheet (Figma "Bottom sheet", node 35:69). The listing as
 * buyers see it; children are Sheet sections (first one without a divider).
 */
export function BottomSheet({
  overlapHero = false,
  className,
  ...props
}: BottomSheetProps) {
  return (
    <div
      data-slot="bottom-sheet"
      className={cn(
        "relative flex w-full flex-col items-start overflow-clip rounded-2xl border border-glass-edge bg-surface shadow-card",
        overlapHero && "-mt-22",
        className
      )}
      {...props}
    />
  )
}
