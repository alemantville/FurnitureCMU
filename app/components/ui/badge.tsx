import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge type-tag inline-flex w-fit shrink-0 items-center justify-center gap-0.5 overflow-hidden rounded-full border border-transparent px-2 py-[3px] whitespace-nowrap transition-all focus-visible:focus-ring has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        // Stoop Badge (Figma node 26:15)
        default: "bg-action text-fg-on-ink [a]:hover:bg-action-hover",
        secondary: "border-edge bg-chip text-fg-primary [a]:hover:bg-chip-hover",
        destructive: "bg-error text-error-fg [a]:hover:bg-error/80",
        outline:
          "border-edge bg-surface text-fg-secondary [a]:hover:bg-chip-hover",
        ghost: "text-fg-secondary hover:bg-chip-hover",
        link: "text-fg-link underline underline-offset-2 hover:text-fg-primary",
        // Stoop Tag colours (Figma node 26:14)
        ai: "bg-tag-ai text-tag-ai-fg",
        checked: "bg-tag-checked text-tag-checked-fg",
        info: "bg-tag-info text-tag-info-fg",
        warning: "bg-warning text-warning-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
