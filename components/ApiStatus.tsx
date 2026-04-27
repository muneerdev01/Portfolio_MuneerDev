"use client";

import { useEffect, useState } from "react";

export default function ApiStatus() {
  const [status, setStatus] = useState<string>("checking...");

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/`
    )
      .then((r) => r.json())
      .then((d) => setStatus(d.message))
      .catch(() => setStatus("API offline"));
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 px-3 py-1.5 rounded-lg border border-surface-2 bg-surface/80 backdrop-blur text-xs font-mono text-text-secondary">
      <span className={status === "API offline" ? "text-red-400" : "text-safe"}>⬤</span>{" "}
      {status}
    </div>
  );
}
