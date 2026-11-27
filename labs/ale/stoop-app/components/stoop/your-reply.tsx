import { cn } from "@/lib/utils"

import { LinkButton } from "./link-button"
import { Thumbnail } from "./thumbnail"

const tilts = ["-rotate-4", "rotate-3", "-rotate-4"]

export type YourReplyProps = React.ComponentProps<"div"> & {
  /** Text = a bubble with a tail at the bottom right. Photos = up to three tilted thumbnails. */
  type?: "text" | "photos"
  /** Photo URLs for `type="photos"` (up to three); missing ones show the placeholder. */
  photos?: (string | undefined)[]
  /** Show "Change" only on the latest reply. */
  showChange?: boolean
  onChange?: () => void
}

/** Stoop Your reply (Figma "Your reply", node 31:40). The person's turn, right-aligned. */
export function YourReply({
  type = "text",
  photos = [undefined, undefined, undefined],
  showChange = false,
  onChange,
  className,
  children,
  ...props
}: YourReplyProps) {
  return (
    <div
      data-slot="your-reply"
      className={cn("flex flex-col items-end gap-2", className)}
      {...props}
    >
      {type === "text" ? (
        <div className="type-body-lg rounded-xl rounded-br-xs bg-bubble px-4 py-3 text-fg-primary shadow-bubble">
          {children}
        </div>
      ) : (
        <div className="flex items-start gap-2">
          {photos.slice(0, 3).map((src, i) => (
            <Thumbnail key={i} src={src} className={tilts[i]} />
          ))}
        </div>
      )}
      {showChange ? <LinkButton onClick={onChange}>Change</LinkButton> : null}
    </div>
  )
}
