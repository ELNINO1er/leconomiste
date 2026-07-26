"use client";

import { useEffect, useState } from "react";

export function SiteTools() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("FR");
  const [alerts, setAlerts] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const d = localStorage.getItem("eco-theme") === "dark";
    const l = localStorage.getItem("eco-lang") || "FR";
    const a = localStorage.getItem("eco-alerts") === "on";
    setDark(d); setLang(l); setAlerts(a);
    document.documentElement.classList.toggle("dark-mode", d);
    document.documentElement.lang = l === "FR" ? "fr" : "en";
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <>
      <div className="site-tools" aria-label="Préférences du site">
        <button
          onClick={() => {
            const next = !dark; setDark(next);
            document.documentElement.classList.toggle("dark-mode", next);
            localStorage.setItem("eco-theme", next ? "dark" : "light");
          }}
          aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
          title="Mode d’affichage"
        >{dark ? "☀" : "☾"}</button>
        <button
          onClick={() => {
            const next = lang === "FR" ? "EN" : "FR"; setLang(next);
            document.documentElement.lang = next === "FR" ? "fr" : "en";
            localStorage.setItem("eco-lang", next);
            notify(next === "FR" ? "Langue : Français" : "Language: English");
          }}
          aria-label="Changer de langue"
          title="Langue"
        >{lang}</button>
        <button
          className={alerts ? "active" : ""}
          onClick={() => {
            const next = !alerts; setAlerts(next);
            localStorage.setItem("eco-alerts", next ? "on" : "off");
            notify(next ? "Alertes Breaking News activées" : "Alertes désactivées");
          }}
          aria-label="Activer les alertes"
          title="Alertes"
        >♢</button>
      </div>
      {toast && <div className="site-toast" role="status">{toast}</div>}
    </>
  );
}
