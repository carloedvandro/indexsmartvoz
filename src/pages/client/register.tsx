
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
      <div className="flex flex-col justify-center items-center min-h-screen py-10 px-5 sm:px-4 -mt-14">
        <div className="w-full max-w-[400px] mt-4">
          <div className="flex flex-col items-center mb-2 -mt-5">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
                alt="Smartvoz" 
                className="h-auto w-[200px] object-contain" // Reduced from 240px
              />
            </div>
          </div>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
