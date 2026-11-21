import { CheckIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"

/**
 * Stoop Success tick (Figma "Success tick", node 27:33). The end of a flow;
 * centre it above the H2 on a success screen.
 */
export function SuccessTick({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="success-tick"
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-tag-checked text-tag-checked-fg shadow-button",
        className
      )}
      {...props}
    >
      <CheckIcon aria-hidden className="size-7" />
    </div>
  )
}
