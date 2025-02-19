
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NavigationItem } from "../types";

interface NavigationContentProps {
  item: NavigationItem;
}

export const NavigationContent = ({ item }: NavigationContentProps) => {
  const renderItems = (items: NavigationItem[]) => {
    return items.map((subItem) => {
      if (subItem.items) {
        return (
          <div key={subItem.title} className="space-y-2">
            {renderItems(subItem.items)}
          </div>
        );
      }

      return (
        <NavigationMenuLink asChild key={subItem.title}>
          <Link
            to={subItem.href || "#"}
            className="flex flex-row justify-between items-center py-2 pl-0 pr-4 rounded text-left hover:bg-muted"
          >
            <span className="text-left">{subItem.title}</span>
            <MoveRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </NavigationMenuLink>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col text-sm">
        {item.items && renderItems(item.items)}
      </div>
    </div>
  );
};
