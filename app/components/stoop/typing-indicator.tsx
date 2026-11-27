import { cn } from "@/lib/utils"

export type TypingIndicatorProps = React.ComponentProps<"div"> & {
  /** Freeze on one Figma step instead of looping (for specs and screenshots). */
  step?: 1 | 2 | 3
}

const delays = ["[animation-delay:0ms]", "[animation-delay:300ms]", "[animation-delay:600ms]"]

/**
 * Stoop Typing indicator (Figma "Typing indicator", node 27:32).
 * Assistant thinking (H-02): one dot lights at a time, 300ms per step, looping.
 */
export function TypingIndicator({
  step,
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <div
      data-slot="typing-indicator"
      role="status"
      aria-label="Assistant is typing"
      className={cn("flex h-5 w-9 items-center gap-1 px-0.5", className)}
      {...props}
    >
      {[1, 2, 3].map((dot, i) => (
        <span
          key={dot}
          className={cn(
            "size-2 rounded-full bg-fg-secondary",
            step
              ? step === dot
                ? "opacity-100"
                : "opacity-35"
              : cn("animate-typing opacity-35 motion-reduce:animate-none", delays[i])
          )}
        />
      ))}
    </div>
  )
}
