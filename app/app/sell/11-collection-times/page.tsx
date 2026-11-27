"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { AssistantMessage, Button, Chip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

const SLOTS = ["9–12", "12–15", "15–18", "18–21"]

/** 11 Collection times (Figma 22:1590). At least one slot per day; See preview moves on. */
export default function CollectionTimesScreen() {
  const router = useRouter()
  const [picked, setPicked] = React.useState<Record<string, string[]>>({
    "Sat 21": ["12–15"],
    "Sun 22": ["12–15", "15–18"],
  })
  const toggle = (day: string, slot: string) =>
    setPicked((p) => {
      const current = p[day] ?? []
      return {
        ...p,
        [day]: current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot],
      }
    })
  const everyDayHasASlot = Object.values(picked).every((slots) => slots.length > 0)

  return (
    <ChatScreen backHref={sellHref(10)} placeholder="Type a reply">
      <YourReply showChange>Sat 21, Sun 22</YourReply>
      <AssistantMessage sub="Pick at least one slot per day.">
        Which times suit you on those days?
      </AssistantMessage>
      <div className="flex flex-col items-start gap-3">
        {Object.keys(picked).map((day) => (
          <div key={day} className="flex w-full flex-col gap-2">
            <p className="type-label text-fg-secondary">{day}</p>
            <Choices>
              {SLOTS.map((slot) => (
                <Chip
                  key={slot}
                  selected={picked[day].includes(slot)}
                  onClick={() => toggle(day, slot)}
                >
                  {slot}
                </Chip>
              ))}
            </Choices>
          </div>
        ))}
        <Button
          size="medium"
          disabled={!everyDayHasASlot}
          onClick={() => router.push(sellHref(12))}
        >
          See preview
        </Button>
      </div>
      <Choices>
        <Chip>Any time on those days</Chip>
        <Chip>Evenings only</Chip>
      </Choices>
    </ChatScreen>
  )
}
