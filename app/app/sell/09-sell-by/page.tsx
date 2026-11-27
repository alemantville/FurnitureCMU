"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 09 Sell by (Figma 22:1428). "Within a month" is the happy path. */
export default function SellByScreen() {
  const router = useRouter()
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <ChatScreen backHref={sellHref(8)} placeholder="Or tell me when">
      <AssistantMessage state="earlier">Thanks! Here&apos;s your listing.</AssistantMessage>
      <YourReply showChange>All good</YourReply>
      <AssistantMessage sub="This helps me plan collection and how I handle offers.">
        When do you want to sell this by?
      </AssistantMessage>
      <Choices>
        {["As soon as possible", "Within a week"].map((label) => (
          <Chip key={label} selected={picked === label} onClick={() => setPicked(label)}>
            {label}
          </Chip>
        ))}
        <Chip onClick={() => router.push(sellHref(10))}>Within a month</Chip>
        <Chip selected={picked === "No rush"} onClick={() => setPicked("No rush")}>
          No rush
        </Chip>
      </Choices>
    </ChatScreen>
  )
}
