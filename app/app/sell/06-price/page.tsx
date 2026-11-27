"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, PriceCollage, YourReply } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { ITEM_PHOTO, sellHref } from "@/components/sell/flow"

/** 06 Price (Figma 22:1132). Any price moves on to the lowest offer. */
export default function PriceScreen() {
  const router = useRouter()
  const next = () => router.push(sellHref(7))
  return (
    <ChatScreen backHref={sellHref(5)} placeholder="Or type your own price">
      <AssistantMessage state="earlier">
        There are a few light marks on the back of the frame.
      </AssistantMessage>
      <YourReply showChange>Yes, that&apos;s right</YourReply>
      <AssistantMessage>Great.</AssistantMessage>
      <AssistantMessage>I suggest €45.</AssistantMessage>

      {/* Price card */}
      <section className="flex w-full max-w-[480px] flex-col items-center gap-3 overflow-clip rounded-2xl bg-surface p-4 shadow-card">
        <PriceCollage photo={ITEM_PHOTO} low="€35" high="€55" />
        <p className="type-body-sm text-center text-fg-secondary">
          Similar chairs near you sold for €35–55. You decide.
        </p>
        <div className="flex w-full flex-wrap justify-center gap-2">
          <Chip onClick={next}>€40</Chip>
          <Chip selected hint="suggested" onClick={next}>
            €45
          </Chip>
          <Chip onClick={next}>€50</Chip>
        </div>
        <Chip variant="soft">Give it away for free</Chip>
      </section>
    </ChatScreen>
  )
}
