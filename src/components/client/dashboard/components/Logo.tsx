
import { Link } from "react-router-dom";
import "@/styles/logo.css";

export function Logo() {
  return (
    <Link to="/client/dashboard" className="logo-container flex items-center justify-center w-full">
      <span className="logo-text text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F36B44] via-[#8E44AD] to-[#2980B9]">
        SMARTVOZ
      </span>
    </Link>
  );
}
