import { NavigationItem } from "../types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
  },
  {
    title: "Atividades",
    description: "Gerencie suas atividades e acompanhe seu progresso",
    items: [
      {
        title: "Para Você",
        href: "/client/activities/personal",
      },
      {
        title: "Para Empresas",
        href: "/client/activities/business",
      },
      {
        title: "Produtos",
        href: "/client/activities/products",
      },
      {
        title: "Serviços",
        href: "/client/activities/services",
      },
      {
        title: "Documentos",
        href: "/client/activities/documents",
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
      }
    ],
  },
];