
import { Link } from 'react-router-dom';

export function LogoSection() {
  return (
    <div className="hidden md:flex flex-1 justify-center">
      <Link to="/client/dashboard">
        <img
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
          alt="Smartvoz Logo"
          className="h-[80px] object-contain mix-blend-multiply opacity-90 contrast-125"
        />
      </Link>
    </div>
  );
}
