"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Background, Composer, TopBar } from "@/components/stoop"
import { cn } from "@/lib/utils"

/**
 * One screen of the selling flow. On a phone it fills the screen; from the
 * md breakpoint it is a centred column up to 720 wide on the ground. Type
 * and page margins follow the Responsive tokens (Mobile, then Desktop at md).
 */
export function SellFrame({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Background type="screen" className="flex justify-center">
      <div className={cn("relative flex h-svh w-full max-w-[720px] flex-col", className)}>
        {children}
      </div>
    </Background>
  )
}

export type ChatScreenProps = {
  /** Where the back button goes. Leave out on the home screen: no back button. */
  backHref?: string
  /** The thread: Assistant messages, Your replies, choices. */
  children: React.ReactNode
  /** Suggested answers shown above the composer ("Bottom" in Figma). */
  suggestions?: React.ReactNode
  /** The composer's placeholder for this step. */
  placeholder: string
  /** What the composer's + does (e.g. add photos). */
  onAttach?: () => void
  /** Called with the typed message when the seller presses Send. */
  onSend?: (text: string) => void
  /** Disable the composer, e.g. while the assistant is thinking. */
  composerDisabled?: boolean
}

/**
 * The chat layout shared by screens 01–11 (Figma: Top bar → Thread →
 * Bottom). The thread is bottom-aligned and scrolls; it opens scrolled to
 * the newest message.
 */
export function ChatScreen({
  backHref,
  children,
  suggestions,
  placeholder,
  onAttach,
  onSend,
  composerDisabled,
}: ChatScreenProps) {
  const router = useRouter()
  const thread = React.useRef<HTMLDivElement>(null)

  // Open on the newest message, and follow new ones as they arrive.
  React.useEffect(() => {
    const el = thread.current
    if (el) el.scrollTop = el.scrollHeight
  }, [children])

  return (
    <SellFrame>
      <TopBar
        showBack={backHref !== undefined}
        onBack={backHref !== undefined ? () => router.push(backHref) : undefined}
      />
      <div ref={thread} className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4 md:px-page">
        <div className="mt-auto flex flex-col gap-4">{children}</div>
      </div>
      <div className="flex flex-col gap-3 px-page pt-2 pb-6">
        {suggestions ? <div className="flex flex-wrap gap-2">{suggestions}</div> : null}
        <Composer
          placeholder={placeholder}
          onAttach={onAttach}
          onSend={onSend}
          disabled={composerDisabled}
        />
      </div>
    </SellFrame>
  )
}

/** Answer chips inside the thread ("Choices" in Figma), wrapped with spacing/sm. */
export function Choices({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}
