
import { Link } from "react-router-dom";
import "@/styles/logo.css";

export function Logo() {
  return (
    <Link to="/client/dashboard" className="logo-container ml-0 lg:ml-4">
      <img 
        src="/lovable-uploads/a4a911e3-a6ea-47f3-a5c0-a855aa60803b.png" 
        alt="Smartvoz" 
        className="logo-image"
      />
    </Link>
  );
}
