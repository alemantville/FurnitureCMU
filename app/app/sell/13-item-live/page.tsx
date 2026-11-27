"use client"

import { useRouter } from "next/navigation"

import { Button, SuccessTick } from "@/components/stoop"
import { SellFrame } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"

/** 13 Item live (Figma 23:1204). The end of the flow. */
export default function ItemLiveScreen() {
  const router = useRouter()
  return (
    <SellFrame className="items-center justify-center px-6 pb-16">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <SuccessTick />
          <h1 className="type-h2 text-fg-primary">Your armchair is live</h1>
          <p className="type-body-md text-fg-secondary">
            Buyers nearby can see it now.
          </p>
          <p className="type-body-sm text-fg-secondary">
            I&apos;ll handle offers from €36 for you and let you know when
            it&apos;s sold.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button className="w-full" onClick={() => router.push(sellHref(12))}>
            View post
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to home
          </Button>
        </div>
      </div>
    </SellFrame>
  )
}
