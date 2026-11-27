"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, YourReply } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 02 Photos (Figma 22:888). The composer's + adds the photos. */
export default function PhotosScreen() {
  const router = useRouter()
  return (
    <ChatScreen
      backHref={sellHref(1)}
      placeholder="Tap + to add photos"
      onAttach={() => router.push(sellHref(3))}
    >
      <AssistantMessage state="earlier">Hey Marta! What do you want to do today?</AssistantMessage>
      <YourReply showChange>Sell an item</YourReply>
      <AssistantMessage>Great, let&apos;s get it listed.</AssistantMessage>
      <AssistantMessage sub="Show the whole item and any marks: it helps me describe it honestly.">
        Upload the item pictures
      </AssistantMessage>
    </ChatScreen>
  )
}
