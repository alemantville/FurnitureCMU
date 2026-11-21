import { Button as UIButton } from "@/components/ui/button"

export type LinkButtonProps = Omit<
  React.ComponentProps<typeof UIButton>,
  "variant" | "size"
>

/**
 * Stoop Link button (Figma "Link button", node 23:71).
 * A quiet text action such as "Change" under your reply.
 */
export function LinkButton(props: LinkButtonProps) {
  return <UIButton variant="link" {...props} />
}
