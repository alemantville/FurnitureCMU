import type { Metadata } from "next"
import Link from "next/link"

import { Showcase } from "@/components/showcase"

export const metadata: Metadata = {
  title: "Design system · Stoop",
  description: "Stoop Design System components, built on shadcn/ui",
}

/** The Stoop Design System showcase: tokens, components and a sample screen. */
export default function DesignSystemPage() {
  return (
    <>
      <nav className="flex flex-wrap justify-center gap-6 bg-surface px-page py-3">
        <Link
          href="/"
          className="type-label rounded-full text-fg-link underline outline-none focus-visible:focus-ring"
        >
          ← Back to the app
        </Link>
        <Link
          href="/flow"
          className="type-label rounded-full text-fg-link underline outline-none focus-visible:focus-ring"
        >
          Flow overview
        </Link>
      </nav>
      <Showcase />
    </>
  )
}
