
import { Link } from "react-router-dom";
import "@/styles/logo.css";

export function Logo() {
  return (
    <Link to="/client/dashboard" className="logo-container flex items-center justify-center w-full">
      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
        Smartvoz
      </div>
    </Link>
  );
}
