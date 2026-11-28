/**
 * Test-only assistant: forwards the chat to a Llama model running locally in
 * Ollama (https://ollama.com). Works on the machine that runs Ollama only;
 * on Vercel there is no Ollama, so it answers 503 and the chat shows the
 * fallback notice.
 *
 * Settings (optional, in app/.env.local):
 *   OLLAMA_URL    default http://localhost:11434
 *   OLLAMA_MODEL  default llama3.2
 */

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2"

/** Keep requests small: the last few turns, each cut to a sane length. */
const MAX_TURNS = 12
const MAX_CHARS = 2000
/** Small local models on a laptop can be slow on the first reply. */
const TIMEOUT_MS = 60_000

const SYSTEM_PROMPT = `You are the assistant in Stoop, an app for selling or donating second-hand furniture.
You talk with the seller in a chat. Reply in one or two short, friendly sentences in plain words.
If the seller wants to sell an item, ask them to add photos of the whole item.
If you are not sure what they mean, ask one short question. Never invent prices or facts about their item.`

type ChatTurn = { role: "user" | "assistant"; content: string }

function readTurns(body: unknown): ChatTurn[] | null {
  if (!body || typeof body !== "object" || !("messages" in body)) return null
  const { messages } = body as { messages: unknown }
  if (!Array.isArray(messages)) return null
  const turns: ChatTurn[] = []
  for (const message of messages) {
    if (
      !message ||
      typeof message !== "object" ||
      !("role" in message) ||
      !("content" in message)
    )
      return null
    const { role, content } = message as { role: unknown; content: unknown }
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null
    turns.push({ role, content: content.slice(0, MAX_CHARS) })
  }
  const recent = turns.slice(-MAX_TURNS)
  return recent.length > 0 && recent[recent.length - 1].role === "user" ? recent : null
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 })
  }
  const turns = readTurns(body)
  if (!turns) return Response.json({ error: "bad_request" }, { status: 400 })

  let response: Response
  try {
    response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...turns],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    // Ollama isn't running, isn't installed, or took too long.
    return Response.json({ error: "unavailable" }, { status: 503 })
  }

  if (!response.ok) {
    // Most often: the model hasn't been pulled (`ollama pull llama3.2`).
    return Response.json({ error: "model_error" }, { status: 502 })
  }

  const data = (await response.json().catch(() => null)) as
    | { message?: { content?: unknown } }
    | null
  const reply = typeof data?.message?.content === "string" ? data.message.content.trim() : ""
  if (!reply) return Response.json({ error: "empty" }, { status: 502 })

  return Response.json({ reply })
}
