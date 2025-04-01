
interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="-mt-10 flex justify-center items-center">
        <img 
          src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png" 
          alt="Smartvoz" 
          className="logo-image"
        />
      </div>
    </div>
  );
}
