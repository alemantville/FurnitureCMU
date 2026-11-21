import { Button as UIButton } from "@/components/ui/button"

import type { IconComponent } from "./types"

type UIButtonProps = React.ComponentProps<typeof UIButton>

export type ButtonProps = Omit<UIButtonProps, "variant" | "size"> & {
  /** Primary = the one main action on a screen (ink). Secondary = every other action. */
  variant?: "primary" | "secondary"
  /** Large 48 at the bottom of screens and sheets; Medium 44 inline and in the composer. */
  size?: "large" | "medium"
  /** Leading icon, Heroicons Mini 20 (`@heroicons/react/20/solid`). */
  icon?: IconComponent
}

/**
 * Stoop Button (Figma "Button", node 23:66). Every tappable action.
 * Hover, focus and disabled are real states; stretch with `className="w-full"`.
 */
export function Button({
  variant = "primary",
  size = "large",
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <UIButton
      variant={variant === "primary" ? "default" : "secondary"}
      size={size === "large" ? "lg" : "default"}
      {...props}
    >
      {Icon ? <Icon aria-hidden data-icon="inline-start" /> : null}
      {children}
    </UIButton>
  )
}
