"use client"

import { useRouter } from "next/navigation"

import {
  BottomSheet,
  Button,
  FieldRow,
  Notice,
  SheetSection,
  TopBar,
} from "@/components/stoop"
import { SellFrame } from "@/components/sell/chat-screen"
import { ITEM_PHOTO, sellHref } from "@/components/sell/flow"

/** 12 Preview (Figma 23:1069). The listing as buyers will see it. From md the hero is a rounded 480-tall card. */
export default function PreviewScreen() {
  const router = useRouter()
  return (
    <SellFrame className="overflow-y-auto">
      <div className="relative h-[380px] w-full shrink-0 overflow-clip md:mt-6 md:h-[480px] md:rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- the seller's own photo */}
        <img src={ITEM_PHOTO} alt="The armchair" className="size-full object-cover" />
        <TopBar
          type="over-photo"
          title="Preview"
          onBack={() => router.push(sellHref(11))}
          className="absolute inset-x-0 top-0"
        />
      </div>

      <div className="relative flex flex-col gap-3 px-page pb-6">
        <BottomSheet overlapHero>
          <SheetSection
            type="title"
            showDivider={false}
            title="Wooden armchair with beige cushions"
            price="€45"
            priceNote="Open to offers"
          />
          <SheetSection type="text" heading="Description">
            Solid wood armchair with removable beige cushions. Sturdy frame, light wear on the
            armrests. Some light marks on the back, shown in the photos.
          </SheetSection>
          <SheetSection type="details" heading="Details">
            <FieldRow label="Category" value="Armchairs › Wooden armchairs" />
            <FieldRow label="Colour" value="Brown, beige" />
            <FieldRow label="Condition" value="Good, light marks on the back" />
          </SheetSection>
        </BottomSheet>
        <Notice className="w-full">This is what buyers will see. Nothing is public yet.</Notice>
        <div className="flex w-full gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => router.push(sellHref(8))}>
            Edit
          </Button>
          <Button className="flex-1" onClick={() => router.push(sellHref(13))}>
            Upload item
          </Button>
        </div>
      </div>
    </SellFrame>
  )
}
