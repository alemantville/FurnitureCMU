import { cn } from "@/lib/utils"

type Base = Omit<React.ComponentProps<"section">, "title"> & {
  /** Turn off on the first section of a sheet. */
  showDivider?: boolean
}

export type SheetSectionProps = Base &
  (
    | {
        type: "title"
        title: React.ReactNode
        price?: React.ReactNode
        priceNote?: React.ReactNode
      }
    | {
        /** Text = an overline and a paragraph; Details = an overline and Field rows (children). */
        type: "text" | "details"
        heading: React.ReactNode
      }
  )

/** Stoop Sheet section (Figma "Sheet section", node 35:68). One block of the listing sheet. */
export function SheetSection(props: SheetSectionProps) {
  const { showDivider = true, className, children } = props
  let content: React.ReactNode

  if (props.type === "title") {
    const { title, price, priceNote } = props
    content = (
      <>
        <h2 className="type-h3 w-full text-fg-primary">{title}</h2>
        {price ? (
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <p className="type-h4 text-fg-primary">{price}</p>
            {priceNote ? (
              <p className="type-body-sm text-fg-secondary">{priceNote}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </>
    )
  } else {
    content = (
      <>
        <h3 className="type-overline text-fg-secondary">{props.heading}</h3>
        {props.type === "text" ? (
          <div className="type-body-md w-full text-fg-primary">{children}</div>
        ) : (
          children
        )}
      </>
    )
  }

  return (
    <section
      data-slot="sheet-section"
      className={cn(
        "flex w-full flex-col items-start gap-2 px-5 py-4",
        showDivider && "border-t border-edge-subtle",
        className
      )}
    >
      {content}
    </section>
  )
}
