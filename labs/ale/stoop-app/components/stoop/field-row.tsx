import { cn } from "@/lib/utils"

import { Tag, type TagType } from "./tag"

export type FieldRowProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** The value's source. Leave out to hide the Tag. */
  tag?: TagType
}

/**
 * Stoop Field row (Figma "Field row", node 33:2). One listing detail:
 * label on the left (92px), value and its source Tag on the right.
 */
export function FieldRow({
  label,
  value,
  tag,
  className,
  ...props
}: FieldRowProps) {
  return (
    <div
      data-slot="field-row"
      className={cn("flex w-full items-start gap-3", className)}
      {...props}
    >
      <p className="type-body-sm w-[92px] shrink-0 text-fg-secondary">{label}</p>
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-1">
        <p className="type-body-md text-fg-primary">{value}</p>
        {tag ? <Tag type={tag} /> : null}
      </div>
    </div>
  )
}
