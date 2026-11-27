import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cn } from "@/lib/utils"

import type { IconComponent } from "./types"

export type ChipProps = ButtonPrimitive.Props & {
  /** Default for answers; Soft for the secondary way out ("Give it away for free"). */
  variant?: "default" | "soft"
  /** The person's pick (ink). When set (true or false) it is exposed as `aria-pressed`. */
  selected?: boolean
  /** Small secondary text after the label, e.g. a price. */
  hint?: React.ReactNode
  /** Leading icon, Heroicons Mini 20. */
  icon?: IconComponent
}

/**
 * Stoop Chip (Figma "Chip", node 25:42). Answer choices and quick replies.
 * Wrap a group with `flex flex-wrap gap-2` (spacing/sm).
 */
export function Chip({
  variant = "default",
  selected,
  hint,
  icon: Icon,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <ButtonPrimitive
      data-slot="chip"
      aria-pressed={selected}
      className={cn(
        "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border px-[15px] whitespace-nowrap transition-colors outline-none focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 [&_svg]:shrink-0",
        variant === "default" ? "type-button-lg" : "type-button-sm",
        selected
          ? "border-transparent bg-action text-fg-on-ink shadow-button"
          : cn(
              "border-edge text-fg-primary shadow-chip hover:bg-chip-hover",
              variant === "default" ? "bg-chip" : "bg-chip-soft"
            ),
        className
      )}
      {...props}
    >
      {Icon ? <Icon aria-hidden /> : null}
      {children}
      {hint ? (
        <span
          className={cn(
            "type-caption",
            selected ? "text-fg-on-ink opacity-80" : "text-fg-secondary"
          )}
        >
          {hint}
        </span>
      ) : null}
    </ButtonPrimitive>
  )
}
