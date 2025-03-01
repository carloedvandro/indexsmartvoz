
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { NavigationItem } from "../types";

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  const homeItem = navigationItems.find(item => item.icon === "home");
  const otherItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="justify-start items-center gap-2 lg:flex hidden flex-row pl-2">
      {homeItem && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto border-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 flex items-end -ml-3"
              style={{ pointerEvents: 'auto' }}
            >
              <img 
                src="/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png" 
                alt="Home" 
                className="w-10 h-10 outline-none focus:outline-none active:outline-none" 
                style={{outline: 'none'}}
              />
              <span 
                className="text-base mb-0.5 ml-0 font-bold" 
                style={{
                  marginBottom: '2px', 
                  marginLeft: '-2px', 
                  color: '#5f0889',
                  pointerEvents: 'none'
                }}
              >
                Home
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 bg-white p-2">
            {homeItem.href && (
              <>
                <DropdownMenuItem asChild>
                  <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer focus:outline-none focus:border-0">
                    <img 
                      src="/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png" 
                      alt="Home" 
                      className="w-10 h-10 outline-none focus:outline-none" 
                      style={{outline: 'none'}}
                    />
                    <span className="font-bold" style={{color: '#5f0889'}}>Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            
            {otherItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="w-full whitespace-nowrap">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="font-medium cursor-default whitespace-nowrap">
                    {item.title}
                  </DropdownMenuItem>
                )}
                
                {item.items && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <Link 
                          to={subItem.href || "#"} 
                          className="w-full text-sm py-1 whitespace-nowrap"
                        >
                          {subItem.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
