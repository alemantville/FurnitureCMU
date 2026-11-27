"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, PhotoChip, YourReply } from "@/components/stoop"
import { ChatScreen, Choices } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 04 Any damage? (Figma 22:1010). Adding a photo of the back moves on. */
export default function AnyDamageScreen() {
  const router = useRouter()
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <ChatScreen backHref={sellHref(3)} placeholder="Or describe any damage">
      <AssistantMessage state="earlier">
        Is this a wooden armchair with beige cushions?
      </AssistantMessage>
      <YourReply showChange>Yes, that&apos;s it</YourReply>
      <AssistantMessage sub="You can add a photo of the back, so I can see for myself. Being upfront protects you from disputes later.">
        I couldn&apos;t see the back of the chair. Is there any damage?
      </AssistantMessage>
      <div>
        <PhotoChip onClick={() => router.push(sellHref(5))}>Add a photo of the back</PhotoChip>
      </div>
      <Choices>
        {["No, it's in good shape", "Some light marks", "Visible damage"].map((label) => (
          <Chip key={label} selected={picked === label} onClick={() => setPicked(label)}>
            {label}
          </Chip>
        ))}
      </Choices>
    </ChatScreen>
  )
}
