import { Badge as UIBadge } from "@/components/ui/badge"

export type BadgeProps = Omit<React.ComponentProps<typeof UIBadge>, "variant">

/**
 * Stoop Badge (Figma "Badge", node 26:15). Ink status or count ("Live", "3").
 * Keep it to one word or a number.
 */
export function Badge(props: BadgeProps) {
  return <UIBadge variant="default" {...props} />
}
