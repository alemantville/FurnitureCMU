import { cn } from "@/lib/utils"

export type AssistantMessageProps = React.ComponentProps<"div"> & {
  /** Only the newest message is Latest; older ones fade to 72%. */
  state?: "latest" | "earlier"
  /** Optional hint line under the message. */
  sub?: React.ReactNode
}

/**
 * Stoop Assistant message (Figma "Assistant message", node 31:21).
 * The assistant's turn, with no bubble: it reads like the app speaking.
 */
export function AssistantMessage({
  state = "latest",
  sub,
  className,
  children,
  ...props
}: AssistantMessageProps) {
  const latest = state === "latest"
  return (
    <div
      data-slot="assistant-message"
      className={cn(
        "flex flex-col items-start gap-1",
        !latest && "text-fg-secondary opacity-72",
        className
      )}
      {...props}
    >
      <p className={cn("type-body-xl", latest && "text-fg-primary")}>
        {children}
      </p>
      {sub ? (
        <p className={cn("type-body-sm", latest && "text-fg-note")}>{sub}</p>
      ) : null}
    </div>
  )
}
