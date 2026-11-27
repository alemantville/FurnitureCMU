"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, YourReply } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { ITEM_PHOTO, sellHref } from "@/components/sell/flow"

/** 03 Is this it? (Figma 22:941) */
export default function IsThisItScreen() {
  const router = useRouter()
  return (
    <ChatScreen
      backHref={sellHref(2)}
      placeholder="Or tell me what it is"
      suggestions={
        <>
          <Chip onClick={() => router.push(sellHref(4))}>Yes, that&apos;s it</Chip>
          <Chip>Not quite</Chip>
        </>
      }
    >
      <AssistantMessage state="earlier">Upload the item pictures</AssistantMessage>
      <YourReply type="photos" photos={[ITEM_PHOTO, undefined]} />
      <AssistantMessage sub="First, a few quick questions so I get the important things right.">
        I&apos;ve started your listing.
      </AssistantMessage>
      <AssistantMessage>Is this a wooden armchair with beige cushions?</AssistantMessage>
    </ChatScreen>
  )
}
