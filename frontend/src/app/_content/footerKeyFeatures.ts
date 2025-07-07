import { Headset, LucideIcon, PackageCheck, ShieldCheck } from "lucide-react";

export const footerKeyFeatures: {
  title: string;
  Icon: LucideIcon;
  description: string;
}[] = [
  {
    title: "Envío a todo el Perú",
    description: "Llevamos tus productos a tu casa",
    Icon: PackageCheck,
  },
  {
    title: "Compras seguras",
    description: "Tus compras son 100% protegidas",
    Icon: ShieldCheck,
  },
  {
    title: "Equipo especializado",
    description: "Te ayudamos en lo que necesites",
    Icon: Headset,
  },
];
