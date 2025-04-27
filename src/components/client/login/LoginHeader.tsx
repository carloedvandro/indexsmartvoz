
import "@/styles/logo.css";

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center min-h-[160px]">
      <div className="login-logo-container">
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
          Smartvoz
        </div>
      </div>
    </div>
  );
}
