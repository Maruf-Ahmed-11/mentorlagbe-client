import { getTokenFromClient } from "./getTokenFromClient";

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URI || "").replace(/\/$/, "");

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  if (!token && typeof window !== "undefined") {
    token = await getTokenFromClient();
  }

  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.error || `Request failed with status ${res.status}`
    );
  }

  return res.json();
}
