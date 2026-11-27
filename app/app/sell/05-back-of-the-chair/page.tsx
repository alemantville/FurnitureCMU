"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 05 Back of the chair (Figma 22:1067) */
export default function BackOfTheChairScreen() {
  const router = useRouter()
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <ChatScreen backHref={sellHref(4)} placeholder="Or describe it yourself">
      <AssistantMessage state="earlier">
        I couldn&apos;t see the back of the chair. Is there any damage?
      </AssistantMessage>
      <YourReply type="photos" photos={[undefined]} />
      <AssistantMessage>Thanks, I can see the back now.</AssistantMessage>
      <AssistantMessage sub="I've added them to the condition and description. Is that right?">
        There are a few light marks on the back of the frame.
      </AssistantMessage>
      <Choices>
        <Chip onClick={() => router.push(sellHref(6))}>Yes, that&apos;s right</Chip>
        {["It's in better shape", "There's more damage"].map((label) => (
          <Chip key={label} selected={picked === label} onClick={() => setPicked(label)}>
            {label}
          </Chip>
        ))}
      </Choices>
    </ChatScreen>
  )
}
