"use client";

import { useEffect } from "react";

export default function PWASW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("✅ SW zarejestrowany:", reg))
          .catch((err) => console.error("❌ Błąd SW:", err));
      });
    }
  }, []);

  return null;
}
