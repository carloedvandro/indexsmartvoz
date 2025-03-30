
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { NetworkTree } from "@/components/client/network/NetworkTree";

export default function NetworkPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={() => navigate("/client/dashboard")}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Minha Rede</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {profile?.id && <NetworkTree userId={profile.id} />}
      </main>

      <style>
        {`
          [data-user-id="Marcio89"],
          [data-custom-id="Marcio89"],
          [data-member-name="Marcio Bettanzos da Silva"] {
            margin-left: 34px !important; /* Valor original */
          }
          
          [data-custom-id="Marcio88"],
          [data-member-name="Marcio Sales Sousa"] {
            margin-left: 17px !important; /* Movido mais para a direita (era 12px) */
          }
          
          [data-custom-id="Carlo89"],
          [data-member-name="Carlo Edvandro Camera Gonçalves"] {
            margin-left: -1px !important; /* Valor mantido */
            margin-top: 6px !important;
          }
        `}
      </style>
    </div>
  );
}
