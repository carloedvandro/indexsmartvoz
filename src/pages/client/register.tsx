
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ClientRegister() {
  const location = useLocation();

  // Este efeito ajuda a prevenir o reset inesperado do formulário
  useEffect(() => {
    console.log("Register page mounted/updated", location.key);
    
    // Adiciona aviso antes do usuário tentar sair da página com formulário não enviado
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "Suas alterações serão perdidas. Tem certeza que deseja sair?";
      e.returnValue = message;
      return message;
    };
    
    // Adiciona o listener para o evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  return (
    <div className="min-h-screen w-full">
      {/* Header com logotipo */}
      <header className="w-full py-6 px-4">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
            alt="Smartvoz Logo" 
            className="h-[100px] object-contain mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
      </header>

      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] py-10 px-5 sm:px-4">
        <div className="w-full max-w-[400px]">
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
