import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/16/solid"

import { cn } from "@/lib/utils"

import type { IconComponent } from "./types"

const notices = {
  info: { className: "bg-tag-info text-tag-info-fg", Icon: LockClosedIcon },
  success: {
    className: "bg-tag-checked text-tag-checked-fg",
    Icon: CheckCircleIcon,
  },
  warning: {
    className: "bg-warning text-warning-fg",
    Icon: ExclamationTriangleIcon,
  },
  error: { className: "bg-error text-error-fg", Icon: ExclamationCircleIcon },
} as const

export type NoticeProps = React.ComponentProps<"div"> & {
  /** Info reassures, Success confirms, Warning asks for a check, Error is the fallback state (PR H-04). */
  type?: keyof typeof notices
  showIcon?: boolean
  /** Swap the default icon (Heroicons Micro 16). */
  icon?: IconComponent
}

/**
 * Stoop Notice (Figma "Notice", node 27:19). A one-line message in the flow.
 * An Error notice must be followed by a Chip or Button that lets the person
 * continue manually (DS-09).
 */
export function Notice({
  type = "info",
  showIcon = true,
  icon,
  className,
  children,
  ...props
}: NoticeProps) {
  const { className: tone, Icon: DefaultIcon } = notices[type]
  const Icon = icon ?? DefaultIcon
  return (
    <div
      data-slot="notice"
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "type-label inline-flex w-fit items-center justify-center gap-1.5 rounded-full px-3 py-2",
        tone,
        className
      )}
      {...props}
    >
      {showIcon ? <Icon aria-hidden className="size-4 shrink-0" /> : null}
      <span>{children}</span>
    </div>
  )
}
