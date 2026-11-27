import { ArrowLeftIcon } from "@heroicons/react/20/solid"

import { cn } from "@/lib/utils"

import { Badge } from "./badge"
import { IconButton } from "./icon-button"

export type TopBarProps = React.ComponentProps<"header"> & {
  /** Chat = back + status Pill. Over photo = glass back + dark title chip. Title = title chip + Badge. */
  type?: "chat" | "over-photo" | "title"
  title?: React.ReactNode
  showBack?: boolean
  onBack?: () => void
  /** Chat type: the status Pill (exposed in Figma). */
  pill?: React.ReactNode
  /** Title type: the Badge label, e.g. "Live". */
  badge?: React.ReactNode
}

function TitleChip({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="type-button-lg flex h-9 shrink-0 items-center rounded-full border border-glass-edge bg-glass-dark px-3 text-fg-on-photo backdrop-blur-[11px]">
      {children}
    </h1>
  )
}

/** Stoop Top bar (Figma "Top bar", node 35:26). The top of every screen. */
export function TopBar({
  type = "chat",
  title,
  showBack = true,
  onBack,
  pill,
  badge,
  className,
  ...props
}: TopBarProps) {
  const back =
    showBack && type !== "title" ? (
      <IconButton variant="glass" icon={ArrowLeftIcon} label="Back" onClick={onBack} />
    ) : null

  return (
    <header
      data-slot="top-bar"
      className={cn(
        "flex w-full items-center px-5 pt-5 pb-2",
        type === "over-photo" ? "gap-3" : "justify-between gap-3",
        className
      )}
      {...props}
    >
      {type === "chat" ? (
        <>
          {back ?? <span />}
          {pill}
        </>
      ) : type === "over-photo" ? (
        <>
          {back}
          {title ? <TitleChip>{title}</TitleChip> : null}
        </>
      ) : (
        <>
          {title ? <TitleChip>{title}</TitleChip> : <span />}
          {badge ? <Badge>{badge}</Badge> : null}
        </>
      )}
    </header>
  )
}
