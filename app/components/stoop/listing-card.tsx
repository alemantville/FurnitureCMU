"use client"

import { MotionConfig, motion, stagger, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

import { FieldRow, type FieldRowProps } from "./field-row"
import { Tag, type TagType } from "./tag"

/** These HTML handlers clash with motion's own drag and animation events. */
type MotionClashingProps = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"

export type ListingCardProps = Omit<React.ComponentProps<"article">, MotionClashingProps> & {
  title: React.ReactNode
  price: React.ReactNode
  description: React.ReactNode
  /** e.g. "1 photo" */
  photoCount?: React.ReactNode
  /** The item photo; without it the hero shows the empty photo frame. */
  photo?: string
  titleTag?: TagType
  priceTag?: TagType
  /** Pass `null` to hide the description Tag. */
  descriptionTag?: TagType | null
  details?: Omit<FieldRowProps, "className">[]
}

/*
 * Entrance: the card fades and rises in, then each row (photo, title and
 * price, description, every detail row) follows it in turn, sliding up out
 * of a blur. Modelled on motion.dev's "FX: Deeper elements" example.
 * With reduced motion on, only the fades play (no movement).
 */
const ROW_STAGGER = 0.07

const card: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0,
      delayChildren: stagger(ROW_STAGGER, { startDelay: 0.08 }),
    },
  },
}

const row: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.5, bounce: 0 },
  },
}

/** The details block: its divider fades in, then its rows carry on the cascade. */
const details: Variants = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: { duration: 0.3, delayChildren: stagger(ROW_STAGGER) },
  },
}

/**
 * Stoop Listing card (Figma "Listing card", node 33:9). The draft listing in
 * the chat: everything visible, and every field carries its source Tag.
 */
export function ListingCard({
  title,
  price,
  description,
  photoCount,
  photo,
  titleTag = "ai",
  priceTag = "ai",
  descriptionTag = "ai",
  details: detailRows = [],
  className,
  ...props
}: ListingCardProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        data-slot="listing-card"
        className={cn(
          "flex w-full flex-col items-start gap-3 rounded-xl border border-edge-subtle bg-surface p-4 shadow-card",
          className
        )}
        variants={card}
        initial="hidden"
        animate="shown"
        {...props}
      >
        <motion.div
          variants={row}
          className="relative h-32 w-full shrink-0 overflow-clip rounded-lg bg-tile"
        >
          <div className="absolute top-[11px] left-[21px] h-[104px] w-24 -rotate-3 overflow-hidden rounded-md border-4 border-surface bg-chip-soft shadow-bubble">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- user photos come from anywhere
              <img src={photo} alt="" className="size-full object-cover" />
            ) : null}
          </div>
          {photoCount ? (
            <span className="type-caption absolute right-3 bottom-3 rounded-full bg-glass-dark px-2 py-0.5 text-fg-on-photo">
              {photoCount}
            </span>
          ) : null}
        </motion.div>

        <motion.div variants={row} className="flex w-full flex-col items-start gap-1">
          <div className="flex w-full flex-wrap items-center gap-x-1.5">
            <h3 className="type-h5 text-fg-primary">{title}</h3>
            <Tag type={titleTag} />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="type-h2 text-fg-primary">{price}</p>
            <Tag type={priceTag} />
          </div>
        </motion.div>

        <motion.div
          variants={row}
          className="flex w-full flex-wrap items-end gap-x-1.5 gap-y-1"
        >
          <p className="type-body-md w-full text-fg-primary">{description}</p>
          {descriptionTag ? <Tag type={descriptionTag} /> : null}
        </motion.div>

        {detailRows.length ? (
          <motion.div
            variants={details}
            className="flex w-full flex-col items-start gap-2 border-t border-edge-subtle pt-3"
          >
            {detailRows.map((detail, i) => (
              <motion.div key={i} variants={row} className="w-full">
                <FieldRow {...detail} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </motion.article>
    </MotionConfig>
  )
}
