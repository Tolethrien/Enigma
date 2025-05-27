"use client";

import { useEffect } from "react";

export default function PWASW() {
  useEffect(() => {
    console.log("hee");
    if ("serviceWorker" in navigator) {
      console.log("he1");
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
