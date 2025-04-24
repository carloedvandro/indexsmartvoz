
import "@/styles/logo.css";

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center min-h-[160px] w-full">
      <div className="logo-container flex items-center justify-center w-full">
        <img 
          src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png" 
          alt="Smartvoz" 
          className="w-auto h-[90px] object-contain mx-auto"
        />
      </div>
    </div>
  );
}
