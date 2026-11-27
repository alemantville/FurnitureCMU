"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { AssistantMessage, Button, Chip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

const DAYS = ["Sat 21", "Sun 22", "Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27", "Sat 28"]

/** 10 Collection days (Figma 22:1483). Days are a multi-select; Next moves on. */
export default function CollectionDaysScreen() {
  const router = useRouter()
  const [days, setDays] = React.useState<string[]>(["Sat 21", "Sun 22"])
  const toggle = (day: string) =>
    setDays((d) => (d.includes(day) ? d.filter((x) => x !== day) : [...d, day]))

  return (
    <ChatScreen backHref={sellHref(9)} placeholder="Type a reply">
      <AssistantMessage state="earlier">When do you want to sell this by?</AssistantMessage>
      <YourReply showChange>Within a month</YourReply>
      <AssistantMessage>Got it. There&apos;s time to wait for a good offer.</AssistantMessage>
      <AssistantMessage sub="Optional. Pick the days that suit you in the next 2 weeks. They won't be on the listing: I only share them when a buyer asks when they can collect. If you skip, I'll ask each buyer for a time and check it with you.">
        When can buyers collect it?
      </AssistantMessage>
      <div className="flex flex-col items-start gap-3">
        <Choices>
          {DAYS.map((day) => (
            <Chip key={day} selected={days.includes(day)} onClick={() => toggle(day)}>
              {day}
            </Chip>
          ))}
        </Choices>
        <Button size="medium" disabled={!days.length} onClick={() => router.push(sellHref(11))}>
          Next
        </Button>
      </div>
      <Choices>
        <Chip>Weekends only</Chip>
        <Chip variant="soft">Skip, I&apos;ll arrange it with buyers</Chip>
      </Choices>
    </ChatScreen>
  )
}
