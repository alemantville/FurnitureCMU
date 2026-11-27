"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 07 Lowest offer (Figma 22:1221). €36 is the happy path. */
export default function LowestOfferScreen() {
  const router = useRouter()
  const next = () => router.push(sellHref(8))
  return (
    <ChatScreen backHref={sellHref(6)} placeholder="Or type your lowest price">
      <AssistantMessage state="earlier">I suggest €45.</AssistantMessage>
      <YourReply showChange>€45</YourReply>
      <AssistantMessage sub="I'll handle offers for you: I accept any offer from your lowest price, and counter lower ones. Buyers never see this number.">
        How low are you willing to go?
      </AssistantMessage>
      <Choices>
        <Chip onClick={next}>€41</Chip>
        <Chip onClick={next}>€36</Chip>
        <Chip onClick={next}>€32</Chip>
        <Chip variant="soft" onClick={next}>
          No offers, fixed price
        </Chip>
      </Choices>
    </ChatScreen>
  )
}
