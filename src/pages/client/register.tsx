
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";

export default function ClientRegister() {
  return (
    <div className="min-h-screen w-full overflow-y-auto scrollbar-hide">
      <div className="relative flex flex-col justify-center items-center min-h-[90vh] py-10 px-5 sm:px-4">
        <div className="w-full max-w-xl mt-4">
          <h1 className="text-[2.4rem] leading-[3.6rem] tracking-wide font-black text-center bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-4 mb-6">
            Smartvoz
          </h1>
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}
