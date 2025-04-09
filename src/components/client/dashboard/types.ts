
export interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: NavigationItem[];
  icon?: string;
  iconOnly?: boolean;
}

