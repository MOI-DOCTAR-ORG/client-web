import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, X } from "lucide-react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    const result = await (deferredPrompt as any).userChoice;
    if (result.outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#111318] px-5 py-3.5 text-white shadow-2xl">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-clinical">
        <Download size={18} />
      </div>
      <div>
        <p className="text-[13px] font-semibold">Install MOI DOCTOR</p>
        <p className="text-[10px] text-white/70">Add to your home screen</p>
      </div>
      <button
        onClick={handleInstall}
        className="ml-2 rounded-full bg-clinical px-4 py-1.5 text-[11px] font-semibold transition hover:bg-blue-700"
      >
        Install
      </button>
      <Link
        to="/download"
        className="ml-1 grid h-7 w-7 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        aria-label="Learn more about installing"
      >
        <ExternalLink size={12} />
      </Link>
      <button
        onClick={() => setShow(false)}
        className="ml-1 grid h-7 w-7 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
