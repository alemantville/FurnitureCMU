import { cn } from "@/lib/utils"

import type { IconComponent } from "./types"

export type PillProps = React.ComponentProps<"p"> & {
  /** Heroicons Micro 16 (`@heroicons/react/16/solid`). */
  icon?: IconComponent
}

/**
 * Stoop Pill: status of the whole listing or chat, 40px tall.
 * Documented in Baseline/DesignSystemTokens.md §3.1 and the C2:05 POC; the
 * Figma file has no Pill component yet (Top bar's Chat type expects one).
 */
export function Pill({ icon: Icon, className, children, ...props }: PillProps) {
  return (
    <p
      data-slot="pill"
      className={cn(
        "type-label inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-edge-outline bg-glass px-4 text-fg-primary",
        className
      )}
      {...props}
    >
      {Icon ? <Icon aria-hidden className="size-4 shrink-0" /> : null}
      {children}
    </p>
  )
}
