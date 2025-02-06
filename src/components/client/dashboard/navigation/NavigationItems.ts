
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
        title: "Ativação do eSIM",
        href: "/client/esim-activation",
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
