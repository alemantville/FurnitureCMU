"use client"

import { useRouter } from "next/navigation"

import { AssistantMessage, Chip, Notice, TypingIndicator, YourReply } from "@/components/stoop"
import { ChatScreen } from "@/components/sell/chat-screen"
import { sellHref } from "@/components/sell/flow"
import { useAssistantChat } from "@/components/sell/use-assistant-chat"

/**
 * 01 Start (Figma 21:957). The app's home: the chat opens here, with no back button.
 * Typing in the composer talks to the test Llama assistant (local Ollama).
 */
export function StartScreen() {
  const router = useRouter()
  const { turns, thinking, problem, send, retry } = useAssistantChat()
  const lastAssistant = turns.findLastIndex((turn) => turn.role === "assistant")

  return (
    <ChatScreen
      placeholder="Or tell me what you need"
      onSend={send}
      composerDisabled={thinking}
      suggestions={
        <>
          <Chip onClick={() => router.push(sellHref(2))}>Sell an item</Chip>
          <Chip>Donate an item</Chip>
        </>
      }
    >
      <AssistantMessage state={turns.length > 0 ? "earlier" : "latest"}>
        Hey Marta! What do you want to do today?
      </AssistantMessage>

      {turns.map((turn, index) =>
        turn.role === "user" ? (
          <YourReply key={index}>{turn.content}</YourReply>
        ) : (
          <AssistantMessage key={index} state={index === lastAssistant ? "latest" : "earlier"}>
            {turn.content}
          </AssistantMessage>
        )
      )}

      {thinking ? <TypingIndicator /> : null}

      {problem ? (
        <div className="flex flex-col items-start gap-2">
          <Notice type="error">
            {problem === "unavailable"
              ? "The test assistant isn't running on this computer."
              : "I couldn't answer that just now."}
          </Notice>
          <div className="flex flex-wrap gap-2">
            <Chip onClick={retry}>Try again</Chip>
            <Chip onClick={() => router.push(sellHref(2))}>Sell an item</Chip>
          </div>
        </div>
      ) : null}
    </ChatScreen>
  )
}
