"use client"

import * as React from "react"
import { PlusIcon } from "@heroicons/react/20/solid"

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

/**
 * Stoop Composer (Figma "Composer", node 28:41). The only text input:
 * attach + field + Send. Empty, Typing and Disabled follow from the value
 * and `disabled`. Stretch to the screen width minus layout/page-margin.
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

  function update(next: string) {
    if (value === undefined) setInner(next)
    onValueChange?.(next)
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
      <Button type="submit" size="medium" disabled={disabled || empty}>
        Send
      </Button>
    </form>
  )
}
