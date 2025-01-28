export interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: {
    title: string;
    href: string;
  }[];
}