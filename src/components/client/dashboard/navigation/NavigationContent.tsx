import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NavigationItem } from "../types";

interface NavigationContentProps {
  item: NavigationItem;
}

export const NavigationContent = ({ item }: NavigationContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <p className="text-base">{item.title}</p>
        <p className="text-muted-foreground text-sm">
          {item.description}
        </p>
      </div>
      <div className="flex flex-col text-sm">
        {item.items?.map((subItem) => (
          <NavigationMenuLink asChild key={subItem.title}>
            <Link
              to={subItem.href}
              className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
            >
              <span>{subItem.title}</span>
              <MoveRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
};