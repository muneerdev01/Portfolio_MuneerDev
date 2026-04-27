const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function fetchApiStatus(): Promise<{ message: string; status: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
