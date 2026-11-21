import { PhotoIcon, PlusIcon } from "@heroicons/react/20/solid"

import { cn } from "@/lib/utils"

export type ThumbnailProps = React.ComponentProps<"div"> & {
  /** Photo = an added photo; Empty = a slot still to fill. */
  type?: "photo" | "empty"
  /** Large 56 in replies; Small 48 in the tray above the composer. */
  size?: "large" | "small"
  /** The photo. Without it a Photo thumbnail shows its placeholder icon. */
  src?: string
  alt?: string
}

/** Stoop Thumbnail (Figma "Thumbnail", node 31:14). */
export function Thumbnail({
  type = "photo",
  size = "large",
  src,
  alt = "",
  className,
  ...props
}: ThumbnailProps) {
  return (
    <div
      data-slot="thumbnail"
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border-3 border-surface shadow-bubble",
        size === "large" ? "size-14" : "size-12",
        type === "empty" ? "bg-tag-info text-tag-info-fg" : "bg-tile text-fg-tertiary",
        className
      )}
      {...props}
    >
      {type === "photo" && src ? (
        // eslint-disable-next-line @next/next/no-img-element -- user photos come from anywhere
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : type === "empty" ? (
        <PlusIcon aria-hidden className="size-5" />
      ) : (
        <PhotoIcon aria-hidden className="size-5" />
      )}
    </div>
  )
}
