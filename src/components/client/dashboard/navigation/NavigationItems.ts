
import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
    icon: "home",
    iconOnly: true,
  },
  {
    title: "Loja Virtual",
    items: [
      {
        title: "Plano Smartvoz",
        href: "/client/store",
      },
      {
        title: "Processo de Ativação do SIM Card",
        href: "/client/products",
      },
      {
        title: "Processo de Ativação do eSIM",
        href: "/client/esim",
      },
      {
        title: "Relatórios Estoque",
        href: "/client/inventory-reports",
      }
    ],
  },
  {
    title: "Rede",
    items: [
      {
        title: "Minha Rede",
        href: "/client/network",
      }
    ],
  },
];
