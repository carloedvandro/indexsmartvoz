
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/client/dashboard">
      <img 
        src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png" 
        alt="Smartvoz" 
        className="w-[400px] h-auto object-contain"
      />
    </Link>
  );
}
