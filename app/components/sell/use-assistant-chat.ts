"use client"

import * as React from "react"

export type ChatTurn = { role: "user" | "assistant"; content: string }

/** What the chat shows when the assistant can't answer (PR H-04 fallback). */
export type AssistantProblem = "unavailable" | "failed"

/**
 * Test-only chat with the local Llama assistant (`/api/assistant`, backed by
 * Ollama). Keeps the typed conversation, the "thinking" state and the last
 * problem, so a screen can show replies, a typing indicator and a fallback.
 */
export function useAssistantChat() {
  const [turns, setTurns] = React.useState<ChatTurn[]>([])
  const [thinking, setThinking] = React.useState(false)
  const [problem, setProblem] = React.useState<AssistantProblem | null>(null)

  const ask = React.useCallback(async (history: ChatTurn[]) => {
    setThinking(true)
    setProblem(null)
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })
      const data = (await response.json().catch(() => null)) as { reply?: string } | null
      if (!response.ok || !data?.reply) {
        setProblem(response.status === 503 ? "unavailable" : "failed")
        return
      }
      setTurns([...history, { role: "assistant", content: data.reply }])
    } catch {
      setProblem("unavailable")
    } finally {
      setThinking(false)
    }
  }, [])

  const send = React.useCallback(
    (text: string) => {
      const history: ChatTurn[] = [...turns, { role: "user", content: text }]
      setTurns(history)
      void ask(history)
    },
    [turns, ask]
  )

  /** Ask again for the last unanswered message. */
  const retry = React.useCallback(() => {
    if (turns.at(-1)?.role === "user") void ask(turns)
  }, [turns, ask])

  return { turns, thinking, problem, send, retry }
}
