
import "@/styles/logo.css"; // Ensuring CSS is imported

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center min-h-[160px]">
      <div className="logo-container">
        <img 
          src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png" 
          alt="Smartvoz" 
          className="logo-image"
        />
      </div>
    </div>
  );
}
