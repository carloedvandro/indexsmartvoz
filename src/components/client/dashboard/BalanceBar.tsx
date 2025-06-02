
import { EyeOff, Eye, Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { navigationItems } from './navigation/NavigationItems';

export function BalanceBar() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { toast } = useToast();

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error);
        toast({
          title: "Erro",
          description: "Não foi possível fazer logout. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.replace("/client/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Filter out the home item and get other navigation items
  const menuItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        {/* Saldo - lado esquerdo com margem para alinhar com conteúdo */}
        <div className="flex items-center gap-4 flex-1 md:flex-initial ml-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Saldo em conta</span>
            <span className="text-lg font-semibold text-green-600">
              {isBalanceVisible ? 'R$ 269,18' : '***,**'}
            </span>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleBalanceVisibility}
            title={isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {isBalanceVisible ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        
        {/* Logotipo Smartvoz no centro - hidden no mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <Link to="/client/dashboard">
            <img
              src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
              alt="Smartvoz Logo"
              className="h-[80px] object-contain mix-blend-multiply opacity-90 contrast-125"
            />
          </Link>
        </div>
        
        {/* Ícones - lado direito */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative" style={{ marginRight: '17px' }}>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              onClick={toggleNotifications}
              title="Notificações"
            >
              <Bell className="h-5 w-5 text-gray-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            
            {showNotifications && (
              <div className="absolute -right-4 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Notificações</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">Nova venda realizada - R$ 45,00</p>
                      <span className="text-xs text-gray-500">Há 2 minutos</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">Bonificação creditada - R$ 12,50</p>
                      <span className="text-xs text-gray-500">Há 1 hora</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleUserMenu}
              title="Menu do usuário"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <Link
                    to="/client/dashboard"
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <img 
                      src="/lovable-uploads/d6d0cfaa-60fb-4950-9674-400bbfc06650.png" 
                      alt="Home" 
                      className="h-[30px] w-auto" 
                    />
                    <span className="text-base font-bold text-black">Home</span>
                  </Link>
                  
                  <hr className="my-1" />
                  
                  {/* Menu Items */}
                  {menuItems.map((item) => (
                    <div key={item.title}>
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                      </div>
                      {item.items && (
                        <div className="ml-4 mb-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href || "#"}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <hr className="my-1" />
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Meu Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Configurações
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay para fechar menus ao clicar fora */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
}
