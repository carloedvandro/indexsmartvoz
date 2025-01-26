import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";

export default function ClientRegister() {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-gray-50">
      {/* Background container with animated gradient overlay */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/30 before:via-primary/20 before:to-accent/30 before:animate-gradient"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        {/* Dark overlay with reduced opacity */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col justify-center items-center min-h-screen py-8 px-2">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl">
          <RegisterFormContainer />
        </div>
      </div>
    </div>
  );
}