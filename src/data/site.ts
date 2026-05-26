import {
  Bot,
  Clock3,
  type LucideIcon,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Tell us how you feel",
    description:
      "Just tell us what’s going on & we’ll guide you with a few simple questions.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "AI reviews your symptoms",
    description:
      "Our AI reviews your responses using medical knowledge and patterns.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Get guidance + next steps",
    description:
      "You’ll receive possible explanations, helpful next steps on what to do next.",
    icon: ShieldCheck,
  },
];

export const features: Feature[] = [
  {
    title: "Interactive Body Map",
    description:
      "Pinpoint exact locations of discomfort visually for more accurate symptom reporting.",
    icon: UserRound,
  },
  {
    title: "24/7 Availability",
    description:
      "Medical uncertainty doesn’t keep business hours. Our triage assistant is always awake.",
    icon: Clock3,
    featured: true,
  },
  {
    title: "Nearby Care Integration",
    description:
      "Seamlessly locate and route to the nearest appropriate care facility based on your triage result.",
    icon: MapPinned,
  },
];

export const trustItems = [
  {
    title: "Not a replacement for doctors",
    description:
      "We provide guidance, not medical diagnosis. If your symptoms are serious, we always point you to qualified healthcare professionals.",
  },
  {
    title: "Your data stays private",
    description:
      "Your health information is handled with secure, privacy-first standards from the first question onward.",
  },
  {
    title: "Backed by medical knowledge",
    description:
      "Every response is structured around clinical patterns and cautious next-step recommendations.",
  },
];

export const storyCards = [
  {
    title: "Democratizing Expertise",
    description:
      "Our mission is to bring the analytical power of top-tier medical professionals to the palm of your hand. We process complex symptoms with clinical precision, offering empathetic, understandable guidance regardless of where you are in the world.",
    icon: Sparkles,
  },
  {
    title: "Safety as the Foundation",
    description:
      "Every algorithmic decision is rooted in established, peer-reviewed medical protocols. We prioritize user safety above all, erring on the side of caution and always recommending professional medical intervention when acuity demands it.",
    icon: ShieldCheck,
  },
];

export const avatars = ["DA", "AM", "JO", "SN"];
