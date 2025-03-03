
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";

export default function ClientRegister() {
  return (
    <div className="min-h-screen w-full overflow-y-auto scrollbar-hide">
      <div className="relative flex flex-col justify-center items-center min-h-[90vh] py-10 px-5 sm:px-4">
        <div className="w-full max-w-xl mt-4">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
              alt="Smartvoz" 
              className="h-16 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
