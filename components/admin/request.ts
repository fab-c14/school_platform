export async function adminRequest<T>(url: string, options: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error("Could not connect to the server. Check your connection and try again.");
  }
  const body = await response.json().catch(() => null);
  if (response.status === 401 && url !== "/api/admin/login") {
    throw new Error("Your session expired. Sign in again in another tab, then retry here.");
  }
  if (response.status === 413 && (url === "/api/admin/upload" || url.startsWith("/api/admin/documents/"))) {
    throw new Error("This file exceeds the hosting upload limit. Choose a smaller file.");
  }
  if (!response.ok || body === null) {
    throw new Error(body?.error || "The server could not complete the request. Try again.");
  }
  return body as T;
}
