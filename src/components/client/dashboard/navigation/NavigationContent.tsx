
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
          <div key={subItem.title} className="space-y-1">
            {renderItems(subItem.items)}
          </div>
        );
      }

      return (
        <NavigationMenuLink asChild key={subItem.title}>
          <Link
            to={subItem.href || "#"}
            className="flex flex-row justify-between items-center py-2 px-3 rounded text-left hover:bg-gray-50 text-gray-800 text-sm font-medium w-full whitespace-nowrap"
          >
            <span className="text-left">{subItem.title}</span>
            <MoveRight className="w-3.5 h-3.5 text-gray-500 ml-1.5" />
          </Link>
        </NavigationMenuLink>
      );
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col text-sm w-full">
        {item.items && renderItems(item.items)}
      </div>
    </div>
  );
};
