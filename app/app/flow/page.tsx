import type { Metadata } from "next"

import { FlowIndex } from "@/components/sell/flow-index"

export const metadata: Metadata = {
  title: "Flow overview · Stoop",
  description: "Team overview of Flow 1 – Selling an item: every screen and the service behind it.",
}

/** Team overview of the selling flow (not linked from the app itself). */
export default function FlowPage() {
  return <FlowIndex />
}
