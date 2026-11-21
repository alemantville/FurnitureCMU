import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cn } from "@/lib/utils"

import type { IconComponent } from "./types"

export type IconButtonProps = Omit<ButtonPrimitive.Props, "children"> & {
  /** Glass = over content (back button). Soft = attach in the composer. */
  variant?: "glass" | "soft"
  /** Heroicons Mini 20 (`@heroicons/react/20/solid`). */
  icon: IconComponent
  /** Accessible name; the button has no visible text. */
  label: string
}

/** Stoop Icon button (Figma "Icon button", node 23:96). Round, 44px, one icon. */
export function IconButton({
  variant = "glass",
  icon: Icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="icon-button"
      aria-label={label}
      className={cn(
        "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-fg-primary transition-colors outline-none focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-40",
        variant === "glass"
          ? "glass"
          : "border border-edge bg-plus shadow-chip hover:bg-chip-hover",
        className
      )}
      {...props}
    >
      <Icon aria-hidden className="size-5" />
    </ButtonPrimitive>
  )
}
