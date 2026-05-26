import { useEffect, useState } from "react";
import {
  Apple,
  Chrome,
  Download,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import PageShell from "../components/PageShell";

type Platform = "ios" | "android" | "desktop";

const platformContent: Record<
  Platform,
  { label: string; icon: typeof Chrome; steps: string[] }
> = {
  ios: {
    label: "iPhone / iPad",
    icon: Apple,
    steps: [
      'Tap the Share button at the bottom of the screen (square with arrow).',
      'Scroll down and tap "Add to Home Screen".',
      'Tap "Add" in the top-right corner.',
      "Find MOI DOCTOR on your home screen like any other app.",
    ],
  },
  android: {
    label: "Android",
    icon: Smartphone,
    steps: [
      'Tap the menu icon (three dots) in the top-right of Chrome.',
      'Tap "Add to Home Screen" or "Install app".',
      'Tap "Install" in the pop-up.',
      "MOI DOCTOR will appear on your home screen.",
    ],
  },
  desktop: {
    label: "Desktop (Chrome / Edge)",
    icon: Monitor,
    steps: [
      'Look for the install icon in the address bar (or menu > "Install MOI DOCTOR").',
      'Click "Install" in the browser prompt.',
      "MOI DOCTOR will open in its own window like a desktop app.",
      "Launch it any time from your Start menu, Dock, or applications list.",
    ],
  },
};

function InstallPromptInline({ onInstalled }: { onInstalled: () => void }) {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    const onAppInstalled = () => {
      setInstalled(true);
      onInstalled();
    };
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [onInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    const result = await (deferredPrompt as any).userChoice;
    if (result.outcome === "accepted") {
      setInstalled(true);
      onInstalled();
    }
    setDeferredPrompt(null);
  };

  if (installed) {
    return (
      <div className="rounded-2xl bg-green-50 px-6 py-5 text-center ring-1 ring-green-200">
        <p className="text-sm font-semibold text-green-800">
          ✓ MOI DOCTOR has been installed!
        </p>
        <p className="mt-1 text-xs text-green-600">
          You can now access it from your home screen or applications menu.
        </p>
      </div>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <div className="rounded-2xl bg-clinical-soft px-6 py-5 text-center ring-1 ring-clinical/20">
      <p className="text-sm font-semibold text-clinical">
        Ready to install MOI DOCTOR?
      </p>
      <p className="mt-1 text-xs text-muted">
        Install for offline access and a faster experience.
      </p>
      <button
        onClick={handleInstall}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-clinical px-6 text-xs font-semibold text-white shadow-soft transition hover:bg-clinical-deep"
      >
        <Download size={14} /> Install Now
      </button>
    </div>
  );
}

function PlatformCard({
  platform,
  onInstalled,
}: {
  platform: Platform;
  onInstalled: () => void;
}) {
  const content = platformContent[platform];
  const Icon = content.icon;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-clinical-soft text-clinical">
          <Icon size={20} />
        </span>
        <h3 className="text-sm font-semibold text-ink">{content.label}</h3>
      </div>
      <ol className="mt-5 space-y-3">
        {content.steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-xs text-muted">
            <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-ink">
              {i + 1}
            </span>
            <span className="pt-0.5 leading-5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function DownloadPage() {
  const [justInstalled, setJustInstalled] = useState(false);

  return (
    <PageShell>
      <section className="px-6 py-14 sm:px-12 md:px-16">
        <div className="mx-auto max-w-4xl">
          <Badge>Download</Badge>
          <h1 className="mt-4 text-[32px] font-semibold leading-tight text-ink sm:text-[38px]">
            Get MOI DOCTOR <br className="hidden sm:block" />
            on Your Device
          </h1>
          <p className="mt-3 max-w-[480px] text-xs leading-6 text-muted">
            MOI DOCTOR is a Progressive Web App — no app store needed. Install it
            on your device for one-tap access, offline support, and a
            native-app experience.
          </p>

          <div className="mt-8 max-w-md">
            <InstallPromptInline
              onInstalled={() => setJustInstalled(true)}
            />
          </div>

          {justInstalled && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-700 ring-1 ring-blue-200">
              <span>💡</span>
              <span>
                Tip: You can install on multiple devices. Follow the guide below
                for each platform.
              </span>
            </div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(["ios", "android", "desktop"] as Platform[]).map((platform) => (
              <PlatformCard
                key={platform}
                platform={platform}
                onInstalled={() => setJustInstalled(true)}
              />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-page-soft px-6 py-8 ring-1 ring-slate-100">
            <h2 className="text-sm font-semibold text-ink">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-5">
              {[
                {
                  q: "Is MOI DOCTOR free to use?",
                  a: "Yes, the triage service is completely free. No downloads or sign-ups required to start.",
                },
                {
                  q: "Does installing use storage on my device?",
                  a: "Minimal — typically under 5 MB. It's a fraction of what a native app would use.",
                },
                {
                  q: "Will I get updates automatically?",
                  a: "Yes. The app updates itself whenever you open it while online — no manual updates needed.",
                },
                {
                  q: "Can I use it offline after installing?",
                  a: "Yes, once installed, the core triage interface works offline so you can access it anytime.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <p className="text-xs font-medium text-ink">{faq.q}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button to="/how-it-works">
              Start Triage <Download size={13} />
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
