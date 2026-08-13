type ApiErrorBody = {
  error: { code: string; message: string; issues?: unknown[] };
};

export class ApiClientError extends Error {
  readonly code: string;
  readonly status: number;
  readonly issues?: unknown[];

  constructor(status: number, code: string, message: string, issues?: unknown[]) {
    super(message);
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as ApiErrorBody | null;
    throw new ApiClientError(
      res.status,
      body?.error?.code ?? "UNKNOWN",
      body?.error?.message ?? `Request failed (${res.status})`,
      body?.error?.issues
    );
  }

  return (await res.json()) as T;
}

function post<T>(path: string, data: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(data) });
}

export type OnboardingResult = {
  id: string;
  userId: string;
  summary: string;
  skills: string[];
  interests: string[];
  keywords: string[];
  experienceYears: number | null;
};

export type SearchMatch = {
  profileId: string;
  name: string;
  handle: string;
  headline: string | null;
  summary: string;
  skills: string[];
  score: number;
  reason: string;
  evidence: string;
};

export type ConnectionResult = {
  id: string;
  mentorId: string;
  menteeId: string;
  requestContext: string;
  icebreaker: string;
  status: string;
};

export type AskResult = {
  answer: string;
  citedProfiles: { profile_id: string; name: string; why: string }[];
};

export const api = {
  onboarding: (chat: string, userId: string) =>
    post<{ data: OnboardingResult }>("/api/onboarding", { chat, userId }),

  search: (query: string) =>
    post<{ data: { query: string; matches: SearchMatch[] } }>("/api/search", { query }),

  connect: (mentorId: string, requestContext: string, userId: string) =>
    post<{ data: ConnectionResult }>("/api/connect", { mentorId, requestContext, userId }),

  decide: (connectionId: string, status: "ACCEPTED" | "DECLINED", userId: string) =>
    request<{ data: ConnectionResult }>("/api/connect", {
      method: "PATCH",
      body: JSON.stringify({ connectionId, status, userId }),
    }),

  ask: (question: string) =>
    post<{ data: AskResult }>("/api/ask", { question }),
};
