"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

type Line = {
  id: number;
  status: "intact" | "broken";
};

export default function Home() {
  const [lines, setLines] = useState<Line[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      status: "intact",
    }))
  );

  useEffect(() => {
    // Simulate random breakages every 5 seconds
    const interval = setInterval(() => {
      setLines((prev) =>
        prev.map((line) =>
          Math.random() > 0.8
            ? { ...line, status: line.status === "intact" ? "broken" : "intact" }
            : line
        )
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Line Breakage Detection System
      </header>

      {/* Map / Dashboard */}
      <section className="flex flex-1 items-center justify-center p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-5xl">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center ${
                line.status === "intact" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {line.status === "intact" ? (
                <CheckCircle className="w-12 h-12 text-green-600 mb-2" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-red-600 mb-2" />
              )}
              {/* ✅ Fix: force text-black for label */}
              <p className="font-bold text-lg text-black">Line {line.id}</p>
              <p
                className={`font-medium ${
                  line.status === "intact" ? "text-green-700" : "text-red-700"
                }`}
              >
                {line.status === "intact"
                  ? "✅ Intact"
                  : "⚠️ Break Detected"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        © {new Date().getFullYear()} Line Breakage Detection System
      </footer>
    </main>
  );
}
