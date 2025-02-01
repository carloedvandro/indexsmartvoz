import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Loja Virtual",
    items: [
      {
        title: "Minha Loja",
        href: "/client/store",
      },
      {
        title: "Processo de Contratação",
        href: "/client/products",
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