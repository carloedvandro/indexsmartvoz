
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Settings, Link as LinkIcon, Package, Store, MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ClientConfigurations() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    enableLocation: true,
    allowNameOnPublicPages: true,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Configuração atualizada",
      description: "Sua preferência foi salva com sucesso.",
    });
  };

  const myLinks = [
    {
      title: "Catálogo de Produtos",
      icon: Package,
      href: "/client/products",
    },
    {
      title: "Minha Loja Virtual",
      icon: Store,
      href: "/client/store",
    },
    {
      title: "Link de Indicação",
      icon: LinkIcon,
      href: "/client/network",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">MEUS DADOS</p>
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            ← Voltar
          </Button>
        </div>

        {/* Tabs de navegação */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/change-password")}
            >
              🔐 Alterar Senha
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/security-password")}
            >
              🛡️ Senha de Segurança
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 px-4 py-2"
              onClick={() => navigate("/client/profile/two-factor")}
            >
              🔒 Autenticação de Dois Fatores
            </Button>
            <Button className="bg-teal-500 text-white px-4 py-2 rounded-md">
              ⚙️ Configurações
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <LinkIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Meus Links</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myLinks.map((link) => (
                <Button
                  key={link.title}
                  variant="outline"
                  className="h-12 justify-start gap-3 text-left"
                  onClick={() => navigate(link.href)}
                >
                  <link.icon className="h-5 w-5 text-gray-500" />
                  {link.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Habilitar localização</p>
                  <p className="text-sm text-gray-500">Permitir que o sistema acesse sua localização</p>
                </div>
              </div>
              <Switch
                checked={settings.enableLocation}
                onCheckedChange={() => handleSettingChange('enableLocation')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Permitir exibição do nome em páginas públicas</p>
                  <p className="text-sm text-gray-500">Mostrar seu nome em páginas públicas do sistema</p>
                </div>
              </div>
              <Switch
                checked={settings.allowNameOnPublicPages}
                onCheckedChange={() => handleSettingChange('allowNameOnPublicPages')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
