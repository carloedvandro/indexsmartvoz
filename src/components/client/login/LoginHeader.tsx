
interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="-mt-10 flex justify-center">
        <img 
          src="/lovable-uploads/398f11a2-4319-4170-ac91-a7aedb8e5617.png" 
          alt="Smartvoz" 
          className="h-auto w-[240px]"
        />
      </div>
    </div>
  );
}
