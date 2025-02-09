
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
        title: "Processo de Contratação",
        href: "/client/products",
      },
      {
        title: "Trocar pra eSIM",
        href: "/client/products/esim",
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
