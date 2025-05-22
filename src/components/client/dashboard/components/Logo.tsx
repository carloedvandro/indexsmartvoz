
import { Link } from "react-router-dom";
import Image from "@/components/ui/image";

export function Logo() {
  return (
    <Link to="/client/dashboard" className="flex items-center justify-center w-full">
      <Image 
        src="/lovable-uploads/76260bd0-7526-47c9-b4c1-38599c646779.png" 
        alt="Smartvoz Logo" 
        className="h-14 w-auto" 
      />
    </Link>
  );
}
