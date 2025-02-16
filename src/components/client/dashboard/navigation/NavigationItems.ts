
import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
  },
  {
    title: "Loja Virtual",
    items: [
      {
        title: "Plano Smartvoz",
        href: "/client/store",
      },
      {
        title: "Processo de Contratação do Sim Card",
        href: "/client/products",
      },
      {
        title: "Processo de Contratação do eSim",
        href: "/client/esim",
      }
    ],
  },
  {
    title: "Rede",
    items: [
      {
        title: "Minha Rede",
        href: "/client/network",
      },
      {
        title: "Matriz Fechada",
        href: "/client/matrix",
      }
    ],
  },
];
