
import { Link } from "react-router-dom";
import { Building2, FileText, KeyRound, Shield } from "lucide-react";

export function ProfileMenuSection() {
  const menuItems = [
    {
      title: "Conta Bancária",
      icon: Building2,
      href: "/client/profile/banking",
    },
    {
      title: "Termos",
      icon: FileText,
      href: "/client/profile/terms",
    },
    {
      title: "Alterar Senha",
      icon: KeyRound,
      href: "/client/profile/change-password",
    },
    {
      title: "Senha de Segurança",
      icon: Shield,
      href: "/client/profile/security-password",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <item.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
