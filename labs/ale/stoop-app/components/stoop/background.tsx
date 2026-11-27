import { cn } from "@/lib/utils"

export type BackgroundProps = React.ComponentProps<"div"> & {
  /** Phone = 390×844 device mockup (radius/3xl, shadow/phone, Mobile type). Screen = full-viewport layer. */
  type?: "phone" | "screen"
}

/**
 * Stoop Background (Figma "Background", node 48:244). The bottom layer of a
 * screen, filled with background/ground so it follows Light/Dark.
 */
export function Background({
  type = "screen",
  className,
  ...props
}: BackgroundProps) {
  return (
    <div
      data-slot="background"
      // A phone frame always uses the Mobile mode of the Responsive collection
      data-responsive={type === "phone" ? "mobile" : undefined}
      className={cn(
        "relative bg-ground",
        type === "phone"
          ? "h-[844px] w-[390px] shrink-0 overflow-clip rounded-3xl shadow-phone"
          : "min-h-svh w-full",
        className
      )}
      {...props}
    />
  )
}
