
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
import { ArrowRight, Home, ExternalLink } from "lucide-react";

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  const homeItem = navigationItems.find(item => item.icon === "home");
  const externalItems = navigationItems.filter(item => item.icon === "external");
  const otherItems = navigationItems.filter(item => item.icon !== "home" && item.icon !== "external");

  return (
    <div className="justify-start items-center gap-2 lg:flex hidden flex-row pl-0">
      {homeItem && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto border-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 flex items-center pl-0 gap-2"
              style={{ pointerEvents: 'auto' }}
            >
              <Home className="h-5 w-5" />
              <span 
                className="font-bold text-left" 
                style={{
                  color: '#5f0889',
                  pointerEvents: 'none',
                  fontSize: '1.3rem'
                }}
              >
                Início
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-white p-2">
            {homeItem.href && (
              <>
                <DropdownMenuItem asChild>
                  <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer focus:outline-none focus:border-0 w-full py-3 bg-white rounded-md border border-gray-100">
                    <Home className="h-5 w-5 text-[#5f0889]" />
                    <span className="font-bold self-center text-[#5f0889] text-lg">Início</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            
            {otherItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="w-full whitespace-nowrap flex items-center justify-between">
                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="font-medium cursor-default whitespace-nowrap flex items-center">
                    {/* No arrow for "Loja Virtual" and "Rede" */}
                    {item.title !== "Loja Virtual" && item.title !== "Rede" && (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                )}
                
                {item.items && (
                  <div className="ml-0 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <Link 
                          to={subItem.href || "#"} 
                          className="w-full text-sm py-1 whitespace-nowrap flex items-center"
                        >
                          <div className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            <span>{subItem.title}</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* External links section */}
            {externalItems.length > 0 && (
              <>
                <DropdownMenuSeparator />
                {externalItems.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full whitespace-nowrap flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Display external links directly in the navigation bar */}
      {externalItems.map((item) => (
        <a 
          key={item.title}
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 text-[#5f0889] hover:text-[#7a0cb0] font-bold flex items-center gap-1"
        >
          <span>{item.title}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
};

