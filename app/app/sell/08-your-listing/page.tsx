"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, ListingCard, YourReply } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { ITEM_PHOTO, sellHref } from "@/components/sell/flow"

/** 08 Your listing (Figma 22:1279). The draft listing; every field shows its source. */
export default function YourListingScreen() {
  const router = useRouter()
  return (
    <ChatScreen
      backHref={sellHref(7)}
      placeholder="Or tell me what to change"
      suggestions={
        <>
          <Chip onClick={() => router.push(sellHref(9))}>All good</Chip>
          <Chip>Change something</Chip>
        </>
      }
    >
      <YourReply>€36</YourReply>
      <AssistantMessage>Done. I&apos;ll accept offers from €36 and counter anything lower.</AssistantMessage>
      <AssistantMessage sub="Check the rest of the details. Everything marked AI came from your photos.">
        Thanks! Here&apos;s your listing.
      </AssistantMessage>
      <ListingCard
        className="max-w-[480px]"
        photo={ITEM_PHOTO}
        photoCount="2 photos"
        title="Wooden armchair with beige cushions"
        titleTag="checked"
        price="€45"
        priceTag="checked"
        description="Solid wood armchair with removable beige cushions. Sturdy frame, light wear on the armrests. Some light marks on the back, shown in the photos."
        descriptionTag={null}
        details={[
          { label: "Category", value: "Armchairs › Wooden armchairs", tag: "checked" },
          { label: "Colour", value: "Brown, beige", tag: "ai" },
          { label: "Condition", value: "Good, light marks on the back", tag: "checked" },
          { label: "Location", value: "Gràcia, Barcelona" },
        ]}
      />
    </ChatScreen>
  )
}
