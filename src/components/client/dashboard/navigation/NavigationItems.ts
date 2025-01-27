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
        title: "1° Nível",
        href: "/client/network?level=1",
      },
      {
        title: "2° Nível",
        href: "/client/network?level=2",
      },
      {
        title: "3° Nível",
        href: "/client/network?level=3",
      },
      {
        title: "4° Nível",
        href: "/client/network?level=4",
      },
      {
        title: "Liderança",
        href: "/client/leadership",
      }
    ],
  },
];