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
            <p className="font-medium text-sm">{subItem.title}</p>
            <div className="pl-2 space-y-1">
              {renderItems(subItem.items)}
            </div>
          </div>
        );
      }

      return (
        <NavigationMenuLink asChild key={subItem.title}>
          <Link
            to={subItem.href || "#"}
            className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded text-left"
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
      <div className="flex flex-col">
        <p className="text-base">{item.title}</p>
        <p className="text-muted-foreground text-sm">
          {item.description}
        </p>
      </div>
      <div className="flex flex-col text-sm">
        {item.items && renderItems(item.items)}
      </div>
    </div>
  );
};