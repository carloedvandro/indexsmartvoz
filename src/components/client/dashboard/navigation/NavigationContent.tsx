
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
            className="flex flex-row justify-between items-center py-3 px-4 rounded text-left hover:bg-gray-50 text-gray-800 text-sm font-medium w-full"
          >
            <span className="text-left">{subItem.title}</span>
            <MoveRight className="w-4 h-4 text-gray-500" />
          </Link>
        </NavigationMenuLink>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col text-sm w-full">
        {item.items && renderItems(item.items)}
      </div>
    </div>
  );
};
