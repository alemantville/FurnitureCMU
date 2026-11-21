import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { CameraIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"

import type { IconComponent } from "./types"

export type PhotoChipProps = ButtonPrimitive.Props & {
  /** Heroicons Outline 24 in the ink tile (`@heroicons/react/24/outline`). */
  icon?: IconComponent
}

/**
 * Stoop Photo chip (Figma "Photo chip", node 31:59). A large answer chip that
 * starts a photo action: "Take a photo", "Choose from library".
 */
export function PhotoChip({
  icon: Icon = CameraIcon,
  className,
  children,
  ...props
}: PhotoChipProps) {
  return (
    <ButtonPrimitive
      data-slot="photo-chip"
      className={cn(
        "type-button-sm inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-lg border border-edge bg-chip px-3 py-2 text-fg-primary shadow-chip transition-colors outline-none hover:bg-chip-hover focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-action text-fg-on-ink">
        <Icon aria-hidden className="size-6" />
      </span>
      {children}
      <span aria-hidden className="size-1 shrink-0" />
    </ButtonPrimitive>
  )
}
