import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
  },
  {
    title: "Loja Virtual",
    description: "Gerencie seus produtos e acompanhe suas vendas",
    items: [
      {
        title: "Minha Loja",
        href: "/client/store",
      },
      {
        title: "Produtos",
        href: "/client/products",
      }
    ],
  },
  {
    title: "Rede",
    description: "Gerencie sua rede de afiliados",
    items: [
      {
        title: "Visualizar Rede",
        href: "/client/network",
      },
      {
        title: "Liderança",
        href: "/client/leadership",
      },
      {
        title: "Matriz",
        href: "/client/network?view=matrix",
      }
    ],
  },
];