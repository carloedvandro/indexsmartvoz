
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationContent } from "@/components/client/navigation/NavigationContent";

export default function ClientNavigation() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header simples apenas com logo */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-center max-w-7xl mx-auto">
            <img
              src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
              alt="Smartvoz Logo"
              className="h-[80px] object-contain mix-blend-multiply opacity-90 contrast-125"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-2xl mx-auto pt-8 px-4 pb-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-white p-0 h-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </div>
            <NavigationContent />
          </div>
        </div>
      </main>
    </div>
  );
}
