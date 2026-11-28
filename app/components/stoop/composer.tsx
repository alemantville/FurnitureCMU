"use client"

import * as React from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import { animate, press } from "motion"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import { IconButton } from "./icon-button"

export type ComposerProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed text; the field clears when uncontrolled. */
  onSend?: (text: string) => void
  onAttach?: () => void
  /** While the assistant is busy. */
  disabled?: boolean
  placeholder?: string
}

/** Settles without bounce: press-down and label swaps. */
const ui = { type: "spring", stiffness: 305, damping: 33 } as const
/** A little overshoot: release and the sent ring. */
const lively = { type: "spring", stiffness: 622, damping: 17 } as const
const outEase = [0.2, 0, 0, 1] as const
/** How long Send shows "Sent" before going back. */
const SENT_MS = 1200

/**
 * Stoop Composer (Figma "Composer", node 28:41). The only text input:
 * attach + field + Send. Empty, Typing and Disabled follow from the value
 * and `disabled`. Stretch to the screen width minus layout/page-margin.
 *
 * Send motion: springs down on press, and on send a ring sweeps round the
 * button and fades out while the label swaps to "Sent" in the Checked
 * colour. Sending still happens on a tap or Enter. Reduced motion keeps
 * only the colour and label change.
 */
export function Composer({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  onAttach,
  disabled = false,
  placeholder = "Type a message…",
  className,
  ...props
}: ComposerProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const text = value ?? inner
  const empty = text.trim() === ""

  const [sent, setSent] = React.useState(false)
  const [label, setLabel] = React.useState("Send")
  const reduceMotion = useReducedMotion() ?? false

  const sendRef = React.useRef<HTMLSpanElement>(null)
  const ringRef = React.useRef<SVGSVGElement>(null)
  const sweepRef = React.useRef<SVGRectElement>(null)
  const labelRef = React.useRef<HTMLSpanElement>(null)
  const resetTimer = React.useRef<number | undefined>(undefined)

  function update(next: string) {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }

  // Press-down spring on the Send button.
  React.useEffect(() => {
    const button = sendRef.current?.querySelector("button")
    if (!button || reduceMotion) return
    return press(button, (element) => {
      animate(element, { scale: 0.92 }, ui)
      return () => {
        animate(element, { scale: 1 }, lively)
      }
    })
  }, [reduceMotion])

  React.useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  /** Blur-fade the label out, swap the word, spring it back in. */
  function swapLabel(next: string) {
    const element = labelRef.current
    if (!element || reduceMotion) {
      setLabel(next)
      return
    }
    animate(
      element,
      { opacity: 0, filter: "blur(4px)", y: -4 },
      { duration: 0.12 }
    ).then(() => {
      setLabel(next)
      animate(
        element,
        { opacity: [0, 1], filter: ["blur(4px)", "blur(0px)"], y: [4, 0] },
        ui
      )
    })
  }

  function celebrate() {
    window.clearTimeout(resetTimer.current)
    setSent(true)
    navigator.vibrate?.(12)
    swapLabel("Sent")

    const ring = ringRef.current
    const sweep = sweepRef.current
    if (ring && sweep && !reduceMotion) {
      animate(ring, { opacity: 1, scale: 1 }, { duration: 0 })
      animate(sweep, { strokeDashoffset: [1, 0] }, { duration: 0.35, ease: outEase }).then(() =>
        animate(ring, { scale: [1, 1.1], opacity: [1, 0] }, { duration: 0.5, ease: outEase })
      )
    }

    resetTimer.current = window.setTimeout(() => {
      setSent(false)
      swapLabel("Send")
    }, SENT_MS)
  }

  return (
    <form
      data-slot="composer"
      className={cn("glass flex w-full items-center gap-3 rounded-full p-2", className)}
      onSubmit={(event) => {
        event.preventDefault()
        if (empty || disabled) return
        onSend?.(text.trim())
        update("")
        celebrate()
      }}
      {...props}
    >
      <IconButton
        variant="soft"
        icon={PlusIcon}
        label="Add a photo"
        disabled={disabled}
        onClick={onAttach}
      />
      <input
        aria-label="Message"
        className="type-body-md min-w-0 flex-1 truncate bg-transparent text-fg-primary outline-none placeholder:text-fg-tertiary disabled:text-fg-disabled disabled:placeholder:text-fg-disabled"
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        onChange={(event) => update(event.target.value)}
      />
      <span ref={sendRef} className="relative inline-flex shrink-0">
        <svg
          ref={ringRef}
          aria-hidden
          className="pointer-events-none absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-visible opacity-0"
        >
          <rect
            ref={sweepRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="25"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            className="fill-none stroke-tag-checked-fg"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
        <Button
          type="submit"
          size="medium"
          disabled={disabled || empty}
          data-sent={sent ? "" : undefined}
          className="data-sent:bg-tag-checked! data-sent:text-tag-checked-fg! data-sent:shadow-none!"
        >
          <span ref={labelRef} className="inline-block">
            {label}
          </span>
        </Button>
      </span>
      <span className="sr-only" aria-live="polite">
        {sent ? "Message sent" : ""}
      </span>
    </form>
  )
}
