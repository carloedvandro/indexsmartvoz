import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";

export default function ClientRegister() {
  return (
    <div className="h-screen w-screen overflow-y-auto">
      {/* Content container */}
      <div className="relative flex flex-col justify-center items-center min-h-screen py-8 px-2">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl">
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}