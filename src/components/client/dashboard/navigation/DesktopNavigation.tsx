
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
import { ArrowRight } from "lucide-react";

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
              className="p-0 h-auto border-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 flex items-end -ml-6"
              style={{ pointerEvents: 'auto', transform: 'translateY(19px)' }}
            >
              <img 
                src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
                alt="Home" 
                className="w-10 h-10 outline-none focus:outline-none active:outline-none" 
                style={{outline: 'none'}}
                loading="eager"
                fetchPriority="high"
              />
              <span 
                className="font-bold" 
                style={{
                  marginBottom: '8px',
                  marginLeft: '-9px', 
                  color: '#5f0889',
                  pointerEvents: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Home
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-white p-2">
            {homeItem.href && (
              <>
                <DropdownMenuItem asChild>
                  <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer focus:outline-none focus:border-0 w-full py-3 bg-white rounded-md border border-gray-100">
                    <img 
                      src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
                      alt="Home" 
                      className="w-10 h-10 outline-none focus:outline-none" 
                      style={{outline: 'none'}}
                      loading="eager"
                    />
                    <span className="font-bold self-center text-[#5f0889]">Home</span>
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
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
