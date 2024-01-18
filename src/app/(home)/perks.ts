import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
  type LucideIcon,
} from "lucide-react";

interface Perk {
  name: string;
  description: string;
  Icon: LucideIcon;
}

export const PERKS: Perk[] = [
  {
    name: "Instant Delivery",
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
    Icon: ArrowDownToLine,
  },
  {
    name: "Guaranteed Quality",
    description:
      "Every asset on out platform is verified by our team to ensure our highest quality stadards. Not happy? We offer a 30-day refund garantee.",
    Icon: CheckCircle,
  },
  {
    name: "For the Planet",
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    Icon: Leaf,
  },
];
