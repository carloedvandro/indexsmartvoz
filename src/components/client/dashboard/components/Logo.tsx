
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/client/dashboard">
      <img 
        src="/lovable-uploads/398f11a2-4319-4170-ac91-a7aedb8e5617.png" 
        alt="Smartvoz" 
        className="logo-image"
      />
    </Link>
  );
}
