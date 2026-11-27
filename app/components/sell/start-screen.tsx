"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 01 Start (Figma 21:957). The app's home: the chat opens here, with no back button. */
export function StartScreen() {
  const router = useRouter()
  return (
    <ChatScreen
      placeholder="Or tell me what you need"
      suggestions={
        <>
          <Chip onClick={() => router.push(sellHref(2))}>Sell an item</Chip>
          <Chip>Donate an item</Chip>
        </>
      }
    >
      <AssistantMessage>Hey Marta! What do you want to do today?</AssistantMessage>
    </ChatScreen>
  )
}
