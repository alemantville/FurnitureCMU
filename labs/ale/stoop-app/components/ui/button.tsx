import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/*
 * Restyled with the Stoop Design System (Figma "Button", node 23:66).
 *   default   = Stoop Primary   (ink, shadow/button)
 *   secondary = Stoop Secondary (bg/chip, border/default, shadow/chip)
 *   link      = Stoop Link button (Label style, underlined)
 *   size default = Medium 44, lg = Large 48
 * The other variants and sizes stay because other shadcn primitives use them.
 */
const buttonCva = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding whitespace-nowrap transition-colors outline-none select-none focus-visible:focus-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none data-disabled:pointer-events-none aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-action text-fg-on-ink shadow-button hover:bg-action-hover disabled:bg-action-disabled disabled:text-fg-secondary disabled:shadow-none",
        secondary:
          "border-edge bg-chip text-fg-primary shadow-chip hover:bg-chip-hover aria-expanded:bg-chip-hover disabled:border-edge-subtle disabled:bg-disabled disabled:text-fg-disabled disabled:shadow-none",
        outline:
          "border-edge bg-transparent text-fg-primary hover:bg-chip-hover aria-expanded:bg-chip-hover disabled:text-fg-disabled",
        ghost:
          "text-fg-primary hover:bg-chip-hover aria-expanded:bg-chip-hover disabled:text-fg-disabled",
        destructive:
          "bg-error text-error-fg hover:bg-error/80 disabled:opacity-50",
        link: "type-label rounded-sm text-fg-link underline decoration-from-font underline-offset-2 hover:text-fg-primary",
      },
      size: {
        default: "type-button-sm h-11 px-5",
        lg: "type-button-lg h-12 px-6",
        sm: "type-button-sm h-9 gap-1.5 px-4",
        xs: "type-caption h-7 gap-1 px-3 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-11",
        "icon-lg": "size-12",
        "icon-sm": "size-9",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariantProps = VariantProps<typeof buttonCva>

/** Link buttons ignore size so their Label text style and auto height win. */
function buttonVariants(props: Parameters<typeof buttonCva>[0] = {}) {
  return buttonCva({
    ...props,
    size: props?.variant === "link" ? null : props?.size,
  })
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & ButtonVariantProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
