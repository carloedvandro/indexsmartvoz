
interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="-mt-10 flex justify-center">
        <img 
          src="/lovable-uploads/5bded3e2-dd4c-4996-9027-b3a0abbb766c.png" 
          alt="Smartvoz" 
          className="h-auto w-[240px]"
        />
      </div>
    </div>
  );
}
