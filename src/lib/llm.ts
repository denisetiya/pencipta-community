type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatJSONOptions = {
  temperature?: number;
  maxTokens?: number;
};

type CompletionResponse = {
  choices: { message: { content: string } }[];
};

function stripJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

export async function chatJSON<T>(
  messages: ChatMessage[],
  options: ChatJSONOptions = {}
): Promise<T> {
  const body = {
    model: resolveModel(),
    messages,
    temperature: options.temperature ?? 0.4,
    max_tokens: options.maxTokens,
    response_format: { type: "json_object" },
  };

  const content = await complete(body);
  try {
    return JSON.parse(stripJson(content)) as T;
  } catch {
    throw new Error(`LLM returned non-JSON: ${content.slice(0, 200)}`);
  }
}

export async function chatText(
  messages: ChatMessage[],
  options: ChatJSONOptions = {}
): Promise<string> {
  const body = {
    model: resolveModel(),
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens,
  };

  return complete(body);
}

function resolveModel(): string {
  const model = process.env.AI_MODEL;
  if (!model) throw new Error("Missing LLM config: AI_MODEL");
  return model;
}

async function complete(body: Record<string, unknown>): Promise<string> {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;

  if (!baseUrl) throw new Error("Missing LLM config: AI_BASE_URL");

  const url = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`LLM request failed (${res.status}): ${errBody.slice(0, 300)}`);
  }

  const data = (await res.json()) as CompletionResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("LLM returned empty content");

  return content;
}
