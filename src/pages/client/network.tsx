
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { NetworkTree } from "@/components/client/network/NetworkTree";
import { ProfileCard } from "@/components/client/dashboard/ProfileCard";
import "@/styles/network.css";

export default function NetworkPage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  
  useEffect(() => {
    // Força atualização de estilos com timestamp exclusivo
    const timestamp = new Date().getTime();
    document.documentElement.style.setProperty('--network-update-timestamp', `'${timestamp}'`);
    
    // Força recarga do CSS específico
    const linkId = 'network-page-css';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // Atualiza o href para forçar recarga com timestamp exclusivo
    link.href = `/src/styles/network.css?t=${timestamp}`;
    
    console.log(`NetworkPage forçando recarga de CSS: ${timestamp}`);
    
    // Aplica limpeza de cache para os elementos específicos da Gesia
    setTimeout(() => {
      const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
      console.log(`Encontrou ${gesiaNodes.length} nós da Gesia, forçando atualização de estilo`);
      
      gesiaNodes.forEach(node => {
        console.log('Aplicando estilo direto no elemento da Gesia');
        (node as HTMLElement).style.marginLeft = '3.2px';
        (node as HTMLElement).style.maxWidth = '97%';
        (node as HTMLElement).style.transform = 'scale(0.97)';
        
        // Adiciona transformação para mover o texto para cima
        const nameElement = node.querySelector('h3');
        const statusElement = node.querySelector('.text-red-600');
        
        if (nameElement) {
          (nameElement as HTMLElement).style.transform = 'translateY(-2px)';
        }
        
        if (statusElement) {
          (statusElement as HTMLElement).style.transform = 'translateY(-2px)';
        }
        
        // Adiciona atributo para forçar "recálculo" de estilo
        node.setAttribute('data-timestamp', timestamp.toString());
      });
    }, 500);
    
    return () => {
      // Opcional: remove o link ao sair da página
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              {profile ? (
                <ProfileCard profile={profile} />
              ) : (
                <div className="text-center p-4">
                  <p>Carregando perfil...</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Network Tree */}
          <div className="lg:col-span-3">
            {profile?.id && <NetworkTree userId={profile.id} />}
          </div>
        </div>
      </main>
    </div>
  );
}
