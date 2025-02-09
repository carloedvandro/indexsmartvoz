
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

export default function ClientRegister() {
  return (
    <div className="h-screen w-screen overflow-y-auto scrollbar-hide">
      <ParticlesBackground />
      <div className="relative flex flex-col justify-center items-center min-h-[90vh] py-6 px-5 sm:px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg">
          <h1 className="text-4xl font-black text-center bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] mb-0">
            Smartvoz
          </h1>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
