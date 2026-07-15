const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data.message === "string") return data.message;
    if (Array.isArray(data.message)) return data.message.join(" ");
  } catch {
    // response body wasn't JSON — fall through to statusText
  }
  return response.statusText || "Une erreur est survenue.";
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(0, "VITE_API_BASE_URL n'est pas configuré.");
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await extractErrorMessage(response));
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

interface PaginatedResponse<T> {
  data: T[];
}

function isPaginatedResponse<T>(value: T[] | PaginatedResponse<T>): value is PaginatedResponse<T> {
  return !Array.isArray(value);
}

// Some collection endpoints (e.g. /cities, /tourist-sites, /historical-figures) wrap
// results in a { data, page, limit, total } pagination envelope instead of a bare array.
export async function apiFetchList<T>(path: string, options: ApiFetchOptions = {}): Promise<T[]> {
  const result = await apiFetch<T[] | PaginatedResponse<T>>(path, options);
  return isPaginatedResponse(result) ? result.data : result;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Une erreur est survenue. Réessayez.";
}
