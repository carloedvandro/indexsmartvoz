
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ClientRegister() {
  const location = useLocation();

  // This effect helps prevent unexpected form reset by logging navigation events
  useEffect(() => {
    console.log("Register page mounted/updated", location.key);
    
    // Add warning before user tries to leave the page with unsubmitted form
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "Suas alterações serão perdidas. Tem certeza que deseja sair?";
      e.returnValue = message;
      return message;
    };
    
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
                className="h-auto w-[240px] object-contain"
              />
            </div>
          </div>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
