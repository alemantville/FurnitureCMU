import {
  CheckIcon,
  PencilIcon,
  SparklesIcon,
} from "@heroicons/react/16/solid"

import { Badge as UIBadge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TagType = "ai" | "checked" | "edited"

const tags = {
  ai: { text: "AI", variant: "ai", Icon: SparklesIcon },
  checked: { text: "Checked", variant: "checked", Icon: CheckIcon },
  edited: { text: "Edited by you", variant: "outline", Icon: PencilIcon },
} as const

export type TagProps = Omit<
  React.ComponentProps<typeof UIBadge>,
  "variant" | "children"
> & {
  /** Where a listing field came from. The text is fixed per type. */
  type?: TagType
  showIcon?: boolean
}

/** Stoop Tag (Figma "Tag", node 26:14). The source of a listing field. */
export function Tag({
  type = "ai",
  showIcon = false,
  className,
  ...props
}: TagProps) {
  const { text, variant, Icon } = tags[type]
  return (
    <UIBadge
      variant={variant}
      className={cn("py-px", className)}
      {...props}
    >
      {showIcon ? <Icon aria-hidden /> : null}
      {text}
    </UIBadge>
  )
}
