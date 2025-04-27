
import { Link } from "react-router-dom";

export function Logo() {
  const titleStyle = "text-3xl font-bold bg-gradient-to-r from-[#9C27B0] via-[#E91E63] to-[#FF5722] bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-1";

  return (
    <Link to="/client/dashboard" className="flex items-center justify-center w-full">
      <h1 className={titleStyle}>
        Smartvoz
      </h1>
    </Link>
  );
}
