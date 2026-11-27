"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PhotoIcon as PhotoMiniIcon,
  PlusIcon,
} from "@heroicons/react/20/solid"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid"
import { PhotoIcon } from "@heroicons/react/24/outline"

import { Button as UIButton } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AssistantMessage,
  Background,
  Badge,
  BottomSheet,
  Button,
  Chip,
  Composer,
  FieldRow,
  IconButton,
  LinkButton,
  ListingCard,
  Notice,
  PhotoChip,
  Pill,
  SellerBox,
  SheetSection,
  SuccessTick,
  Tag,
  Thumbnail,
  TopBar,
  TypingIndicator,
  YourReply,
  PriceCollage,
} from "@/components/stoop"

/* ---------------------------------------------------------------- layout */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="type-overline text-fg-secondary">{eyebrow}</p>
        <h2 className="type-h2 text-fg-primary">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Panel({
  title,
  note,
  className,
  children,
}: {
  title: string
  note?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-edge-subtle bg-surface p-card shadow-card">
      <div className="flex flex-col gap-0.5">
        <h3 className="type-h6 text-fg-primary">{title}</h3>
        {note ? <p className="type-body-sm text-fg-secondary">{note}</p> : null}
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-t border-edge-subtle py-3 first:border-t-0 first:pt-0 md:flex-row md:items-center md:gap-6">
      <p className="type-caption w-40 shrink-0 text-fg-secondary">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

/* ----------------------------------------------------------- foundations */

const colorGroups: { name: string; tokens: string[] }[] = [
  {
    name: "Text",
    tokens: [
      "text-primary",
      "text-secondary",
      "text-tertiary",
      "text-note",
      "text-link",
      "text-on-ink",
      "text-on-photo",
      "text-disabled",
    ],
  },
  {
    name: "Backgrounds",
    tokens: [
      "bg-page",
      "bg-surface",
      "bg-bubble",
      "bg-chip",
      "bg-chip-hover",
      "bg-chip-soft",
      "bg-plus",
      "bg-tile",
      "bg-disabled",
    ],
  },
  {
    name: "Actions, glass and borders",
    tokens: [
      "action-primary",
      "action-primary-hover",
      "action-primary-disabled",
      "glass-fill",
      "glass-edge",
      "glass-dark",
      "border-subtle",
      "border-default",
      "border-outline",
      "border-focus",
    ],
  },
  {
    name: "Tags and feedback",
    tokens: [
      "tag-ai-bg",
      "tag-ai-text",
      "tag-checked-bg",
      "tag-checked-text",
      "tag-info-bg",
      "tag-info-text",
      "feedback-warning-bg",
      "feedback-warning-text",
      "feedback-error-bg",
      "feedback-error-text",
    ],
  },
]

const typeStyles = [
  ["type-h1", "Heading/H1", "Price it right"],
  ["type-h2", "Heading/H2", "Your listing is live"],
  ["type-h3", "Heading/H3", "Oak armchair"],
  ["type-h4", "Heading/H4", "€40"],
  ["type-h5", "Heading/H5", "What condition is it in?"],
  ["type-h6", "Heading/H6", "Small heading"],
  ["type-body-xl", "Body/XLarge", "Great choice. Add a photo of the item."],
  ["type-body-lg", "Body/Large", "Sell an item"],
  ["type-body-md", "Body/Medium", "Solid oak frame with linen cushions."],
  ["type-body-sm", "Body/Small", "Condition"],
  ["type-label", "Label", "Only you can see the price floor."],
  ["type-caption", "Caption", "1 photo"],
  ["type-overline", "Overline", "Description"],
  ["type-tag", "Tag", "Edited by you"],
  ["type-button-lg", "Button/Large", "Publish listing"],
  ["type-button-sm", "Button/Small", "Send"],
] as const

const radii = [
  ["rounded-xs", "radius/xs · 4"],
  ["rounded-sm", "radius/sm · 8"],
  ["rounded-md", "radius/md · 12"],
  ["rounded-lg", "radius/lg · 16"],
  ["rounded-xl", "radius/xl · 20"],
  ["rounded-2xl", "radius/2xl · 24"],
  ["rounded-3xl", "radius/3xl · 40"],
  ["rounded-full", "radius/full"],
] as const

const shadows = [
  ["shadow-chip", "shadow/chip"],
  ["shadow-bubble", "shadow/bubble"],
  ["shadow-card", "shadow/card"],
  ["shadow-button", "shadow/button"],
  ["shadow-phone", "shadow/phone"],
] as const

function Foundations() {
  return (
    <Section id="foundations" eyebrow="Foundations" title="Tokens">
      <div className="grid gap-gutter lg:grid-cols-2">
        {colorGroups.map((group) => (
          <Panel key={group.name} title={group.name} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {group.tokens.map((token) => (
              <div key={token} className="flex items-center gap-2">
                <span
                  className="size-9 shrink-0 rounded-md border border-edge"
                  style={{ background: `var(--${token})` }}
                />
                <code className="type-caption break-all text-fg-secondary">
                  {token.replace(/^(text|bg|action|glass|border|tag|feedback)-/, "$1/").replace(/^tag\/(ai|checked|info)-/, "tag/$1/").replace(/^feedback\/(warning|error)-/, "feedback/$1/")}
                </code>
              </div>
            ))}
          </Panel>
        ))}
      </div>

      <Panel title="Text styles" note="Plus Jakarta Sans. Sizes switch from Mobile to Desktop at the md breakpoint.">
        <div className="flex flex-col">
          {typeStyles.map(([cls, name, sample]) => (
            <div key={cls} className="flex flex-col gap-1 border-t border-edge-subtle py-2 first:border-t-0 md:flex-row md:items-baseline md:gap-6">
              <code className="type-caption w-40 shrink-0 text-fg-secondary">{name}</code>
              <p className={`${cls} text-fg-primary`}>{sample}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-gutter lg:grid-cols-2">
        <Panel title="Radius" className="flex flex-wrap gap-4">
          {radii.map(([cls, name]) => (
            <div key={cls} className="flex flex-col items-center gap-2">
              <span className={`${cls} size-16 border border-edge bg-tile`} />
              <code className="type-caption text-fg-secondary">{name}</code>
            </div>
          ))}
        </Panel>
        <Panel title="Effects" className="flex flex-wrap gap-6 bg-page p-4">
          {shadows.map(([cls, name]) => (
            <div key={cls} className="flex flex-col items-center gap-3">
              <span className={`${cls} size-16 rounded-lg bg-surface`} />
              <code className="type-caption text-fg-secondary">{name}</code>
            </div>
          ))}
          <div className="flex flex-col items-center gap-3">
            <span className="focus-ring size-16 overflow-clip rounded-lg bg-surface" />
            <code className="type-caption text-fg-secondary">focus/ring</code>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="bg-ground relative size-16 overflow-clip rounded-lg">
              <span className="glass absolute inset-3 rounded-md" />
            </span>
            <code className="type-caption text-fg-secondary">blur/glass</code>
          </div>
        </Panel>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------- base components */

function BaseComponents() {
  const [answer, setAnswer] = React.useState("Good")
  return (
    <Section id="base" eyebrow="Base components" title="Buttons, chips, tags and feedback">
      <Panel title="Button" note="One Primary per screen. Hover and focus (Tab to it) are live states.">
        <Row label="Primary · Large">
          <Button>Publish listing</Button>
          <Button icon={ArrowRightIcon}>Publish listing</Button>
          <Button disabled>Publish listing</Button>
        </Row>
        <Row label="Primary · Medium">
          <Button size="medium">Publish listing</Button>
          <Button size="medium" disabled>
            Publish listing
          </Button>
        </Row>
        <Row label="Secondary · Large">
          <Button variant="secondary">Save as draft</Button>
          <Button variant="secondary" icon={PlusIcon}>
            Add details
          </Button>
          <Button variant="secondary" disabled>
            Save as draft
          </Button>
        </Row>
        <Row label="Secondary · Medium">
          <Button variant="secondary" size="medium">
            Save as draft
          </Button>
          <Button variant="secondary" size="medium" disabled>
            Save as draft
          </Button>
        </Row>
        <Row label="Link button">
          <LinkButton>Change</LinkButton>
        </Row>
        <Row label="Icon button">
          <div className="flex gap-3 rounded-lg bg-tile p-2">
            <IconButton icon={ArrowLeftIcon} label="Back" />
            <IconButton icon={ArrowLeftIcon} label="Back" disabled />
          </div>
          <IconButton variant="soft" icon={PlusIcon} label="Add a photo" />
          <IconButton variant="soft" icon={PlusIcon} label="Add a photo" disabled />
        </Row>
      </Panel>

      <Panel title="Chip" note="Click to select. Selected chips are ink and expose aria-pressed.">
        <Row label="Default">
          {["Like new", "Good", "Fair"].map((label) => (
            <Chip key={label} selected={answer === label} onClick={() => setAnswer(label)}>
              {label}
            </Chip>
          ))}
          <Chip hint="€40">Keep my price</Chip>
          <Chip icon={PhotoMiniIcon}>Add photo</Chip>
        </Row>
        <Row label="Soft">
          <Chip variant="soft">Give it away for free</Chip>
          <Chip variant="soft" selected>
            Give it away for free
          </Chip>
        </Row>
      </Panel>

      <div className="grid gap-gutter lg:grid-cols-2">
        <Panel title="Tag, Badge and Pill">
          <Row label="Tag">
            <Tag type="ai" />
            <Tag type="checked" />
            <Tag type="edited" />
          </Row>
          <Row label="Tag · icon">
            <Tag type="ai" showIcon />
            <Tag type="checked" showIcon />
            <Tag type="edited" showIcon />
          </Row>
          <Row label="Badge">
            <Badge>New</Badge>
            <Badge>Live</Badge>
            <Badge>3</Badge>
          </Row>
          <Row label="Pill">
            <Pill icon={ChatBubbleLeftEllipsisIcon}>Draft listing</Pill>
          </Row>
        </Panel>

        <Panel title="Feedback">
          <Row label="Notice">
            <div className="flex flex-col items-start gap-2">
              <Notice type="info">Only you can see the price floor.</Notice>
              <Notice type="success">Your listing is live.</Notice>
              <Notice type="warning">I&apos;m not sure about the colour. Please check.</Notice>
              <Notice type="error">I couldn&apos;t read that photo.</Notice>
              <div className="flex flex-wrap gap-2">
                <Chip variant="soft">Fill it in myself</Chip>
                <Chip variant="soft">Try another photo</Chip>
              </div>
            </div>
          </Row>
          <Row label="Typing indicator">
            <TypingIndicator />
            <TypingIndicator step={1} />
            <TypingIndicator step={2} />
            <TypingIndicator step={3} />
          </Row>
          <Row label="Success tick">
            <SuccessTick />
          </Row>
        </Panel>
      </div>

      <Panel title="Composer" note="Empty, Typing and Disabled follow from the text and disabled prop." className="flex max-w-md flex-col gap-4 rounded-lg bg-ground p-4">
        <Composer />
        <Composer defaultValue="It's in good shape" />
        <Composer disabled />
      </Panel>
    </Section>
  )
}

/* ----------------------------------------------------- element components */

const details = [
  { label: "Category", value: "Armchairs", tag: "checked" as const },
  { label: "Colour", value: "Natural oak", tag: "ai" as const },
  { label: "Condition", value: "Good", tag: "checked" as const },
  { label: "Location", value: "Leith, Edinburgh", tag: "edited" as const },
]

function ElementComponents() {
  return (
    <Section id="elements" eyebrow="Element components" title="Messages, listing and sheets">
      <div className="grid gap-gutter lg:grid-cols-2">
        <Panel title="Messages" className="flex flex-col gap-5">
          <AssistantMessage state="earlier" sub="A clear photo in daylight works best.">
            Great choice. Add a photo of the item and I&apos;ll fill in the details.
          </AssistantMessage>
          <YourReply>Sell an item</YourReply>
          <YourReply type="photos" showChange />
          <AssistantMessage sub="You can change anything before it goes live.">
            Here&apos;s your draft listing.
          </AssistantMessage>
          <YourReply showChange>It&apos;s in good shape</YourReply>
        </Panel>

        <Panel title="Thumbnail and Photo chip" className="flex flex-col gap-5">
          <Row label="Thumbnail">
            <Thumbnail />
            <Thumbnail size="small" />
            <Thumbnail type="empty" />
            <Thumbnail type="empty" size="small" />
          </Row>
          <Row label="Photo chip">
            <PhotoChip>Take a photo</PhotoChip>
            <PhotoChip icon={PhotoIcon}>Choose from library</PhotoChip>
          </Row>
        </Panel>
      </div>

      <div className="grid gap-gutter lg:grid-cols-2">
        <Panel title="Listing card" className="max-w-[350px]">
          <ListingCard
            title="Oak armchair"
            price="€40"
            description="Solid oak frame with linen cushions. A few light marks on the arms."
            photoCount="1 photo"
            details={details}
          />
        </Panel>
        <Panel title="Price collage" className="max-w-[350px]">
          <PriceCollage low="€35" high="€55" />
        </Panel>
        <Panel title="Field row" className="flex flex-col gap-2">
          {details.map((row) => (
            <FieldRow key={row.label} {...row} />
          ))}
          <FieldRow label="Price floor" value="€35" />
        </Panel>
      </div>

      <div className="grid gap-gutter lg:grid-cols-2">
        <Panel title="Top bar" className="flex flex-col gap-2 rounded-lg bg-tile">
          <TopBar pill={<Pill icon={ChatBubbleLeftEllipsisIcon}>Draft listing</Pill>} />
          <TopBar type="over-photo" title="Preview" />
          <TopBar type="title" title="Preview" badge="Live" />
        </Panel>
        <Panel title="Bottom sheet and Seller box" className="flex max-w-[358px] flex-col gap-4">
          <BottomSheet>
            <SheetSection type="title" title="Oak armchair" price="€40" priceNote="Open to offers" showDivider={false} />
            <SheetSection type="text" heading="Description">
              Solid oak frame with linen cushions. A few light marks on the arms; otherwise like new.
            </SheetSection>
            <SheetSection type="details" heading="Details">
              <FieldRow label="Category" value="Armchairs" />
              <FieldRow label="Colour" value="Natural oak" />
              <FieldRow label="Condition" value="Good" />
            </SheetSection>
          </BottomSheet>
          <SellerBox>
            <FieldRow label="Sell by" value="Within two weeks" />
            <FieldRow label="Collection" value="Weekday evenings" />
            <FieldRow label="Offers" value="From €35, I counter lower ones" />
          </SellerBox>
        </Panel>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ phone demo */

function PhoneDemo() {
  const [replies, setReplies] = React.useState<string[]>([])
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <Section id="background" eyebrow="Background" title="A screen, assembled">
      <div className="flex justify-center overflow-x-auto py-4">
        <Background type="phone" className="flex flex-col">
          <TopBar pill={<Pill icon={ChatBubbleLeftEllipsisIcon}>Draft listing</Pill>} />
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-page pt-4 pb-4">
            <AssistantMessage state="earlier">What would you like to do?</AssistantMessage>
            <YourReply>Sell an item</YourReply>
            <AssistantMessage sub="This helps buyers trust the listing.">
              What condition is your armchair in?
            </AssistantMessage>
            <div className="flex flex-wrap gap-2">
              {["Like new", "Good", "Fair"].map((label) => (
                <Chip key={label} selected={picked === label} onClick={() => setPicked(label)}>
                  {label}
                </Chip>
              ))}
              <Chip variant="soft">I&apos;m not sure</Chip>
            </div>
            {replies.map((text, i) => (
              <YourReply key={i} showChange={i === replies.length - 1}>
                {text}
              </YourReply>
            ))}
            {replies.length ? <TypingIndicator /> : null}
          </div>
          <div className="px-page pb-6">
            <Composer onSend={(text) => setReplies((r) => [...r, text])} />
          </div>
        </Background>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------- shadcn, themed */

function ShadcnThemed() {
  return (
    <Section id="shadcn" eyebrow="shadcn/ui" title="Primitives on Stoop tokens">
      <div className="grid gap-gutter lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Every shadcn primitive reads the same Stoop variables.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-title">Title</Label>
              <Input id="demo-title" placeholder="Oak armchair" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Condition</Label>
              <Select
                defaultValue="good"
                items={[
                  { value: "new", label: "Like new" },
                  { value: "good", label: "Good" },
                  { value: "fair", label: "Fair" },
                ]}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Like new</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="demo-offers" defaultChecked />
              <Label htmlFor="demo-offers">Open to offers</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="demo-collect" />
              <Label htmlFor="demo-collect">Collection only</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs and Dialog</CardTitle>
            <CardDescription>Buttons inside primitives use the restyled ui/button.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Tabs defaultValue="draft">
              <TabsList>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="sold">Sold</TabsTrigger>
              </TabsList>
              <TabsContent value="draft" className="type-body-md pt-2 text-fg-secondary">
                One draft waiting for a photo.
              </TabsContent>
              <TabsContent value="live" className="type-body-md pt-2 text-fg-secondary">
                Oak armchair, live for 2 days.
              </TabsContent>
              <TabsContent value="sold" className="type-body-md pt-2 text-fg-secondary">
                Nothing sold yet.
              </TabsContent>
            </Tabs>
            <div className="flex flex-wrap gap-2">
              <UIButton variant="outline">Outline</UIButton>
              <UIButton variant="ghost">Ghost</UIButton>
              <UIButton variant="destructive">Delete</UIButton>
              <Dialog>
                <DialogTrigger render={<UIButton />}>Open dialog</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Publish listing?</DialogTitle>
                    <DialogDescription>
                      Buyers nearby will see it straight away. You can still edit it later.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="secondary" size="medium" />}>
                      Not yet
                    </DialogClose>
                    <DialogClose render={<Button size="medium" />}>Publish</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ page */

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  // false during SSR, true once hydrated (the theme is only known on the client)
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const dark = mounted && resolvedTheme === "dark"
  return (
    <div className="flex gap-2" role="group" aria-label="Colour mode">
      <Chip variant="soft" selected={mounted && !dark} onClick={() => setTheme("light")}>
        Light
      </Chip>
      <Chip variant="soft" selected={dark} onClick={() => setTheme("dark")}>
        Dark
      </Chip>
    </div>
  )
}

const nav = [
  ["foundations", "Tokens"],
  ["base", "Base"],
  ["elements", "Elements"],
  ["background", "Screen"],
  ["shadcn", "shadcn"],
] as const

export function Showcase() {
  return (
    <Background>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-section px-page py-section">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="type-overline text-fg-secondary">Stoop Design System</p>
            <h1 className="type-h1 text-fg-primary">Components</h1>
            <p className="type-body-lg max-w-xl text-fg-secondary">
              Every component from the Stoop Figma file, built on shadcn/ui and bound to the same
              tokens. Press <kbd className="type-label">d</kbd> to flip Light and Dark.
            </p>
          </div>
          <ThemeSwitch />
        </header>
        <nav className="flex flex-wrap gap-2" aria-label="Sections">
          {nav.map(([id, label]) => (
            <Chip key={id} render={<a href={`#${id}`} />} nativeButton={false}>
              {label}
            </Chip>
          ))}
        </nav>
        <Foundations />
        <BaseComponents />
        <ElementComponents />
        <PhoneDemo />
        <ShadcnThemed />
      </div>
    </Background>
  )
}
