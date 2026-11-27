import Link from "next/link"

import { Background } from "@/components/stoop"
import { SELL_SCREENS, sellHref } from "@/components/sell/flow"

/** Team overview: every screen of the selling flow in order, with the service behind it. */
export function FlowIndex() {
  return (
    <Background type="screen">
      <main className="mx-auto flex max-w-[720px] flex-col gap-section px-page py-section">
        <header className="flex flex-col gap-2">
          <p className="type-overline text-fg-secondary">Flow 1 · team overview</p>
          <h1 className="type-h1 text-fg-primary">Selling an item</h1>
          <p className="type-body-md text-fg-secondary">
            Thirteen screens from the Figma file, built with the Stoop Design System. Tap the
            highlighted answer on each screen to move through the flow.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href={sellHref(1)}
              className="type-button-lg inline-flex h-12 w-fit items-center rounded-full bg-action px-6 text-fg-on-ink shadow-button outline-none focus-visible:focus-ring"
            >
              Start the flow
            </Link>
            <Link
              href="/designsystem"
              className="type-label rounded-full text-fg-link underline outline-none focus-visible:focus-ring"
            >
              See the design system
            </Link>
          </div>
        </header>

        <ol className="flex flex-col gap-3">
          {SELL_SCREENS.map((screen, i) => (
            <li key={screen.slug}>
              <Link
                href={sellHref(i + 1)}
                className="flex flex-col gap-3 rounded-xl border border-edge-subtle bg-surface p-card shadow-card outline-none transition-colors hover:bg-chip-hover focus-visible:focus-ring"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="type-label text-fg-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="type-h5 text-fg-primary">{screen.name}</span>
                  <span className="type-tag rounded-full bg-tag-info px-2 py-0.5 text-tag-info-fg">
                    {screen.note.service}
                  </span>
                </div>
                <p className="type-body-md text-fg-primary">{screen.note.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </Background>
  )
}
