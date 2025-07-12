import React from 'react';
import { Button } from '@/components/ui/button';
import { User, FileText, Clock, Camera, FileImage, LayoutDashboard } from 'lucide-react';

interface ClientSecureAreaProps {
  userData: {
    name: string;
    cpf: string;
    birthDate: string;
  };
  protocol: string;
  lastAccess: string;
  onResubmitDocument: () => void;
  onUpdateSelfie: () => void;
  onGoToDashboard: () => void;
}

export const ClientSecureArea = ({ 
  userData, 
  protocol, 
  lastAccess,
  onResubmitDocument,
  onUpdateSelfie,
  onGoToDashboard 
}: ClientSecureAreaProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5f0889] to-[#9b30ff] p-6">
      <div className="w-full max-w-md mx-auto">
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Área Segura do Cliente
        </h1>

        {/* Card de boas-vindas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-white/80" />
            <h2 className="text-white font-semibold">Bem-vindo(a), {userData.name}</h2>
          </div>
          <div className="text-white/80 text-sm space-y-1">
            <p>CPF: {userData.cpf}</p>
            <p>Data de Nascimento: {userData.birthDate}</p>
          </div>
        </div>

        {/* Card de última verificação */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-white/80" />
            <h2 className="text-white font-semibold">Última verificação</h2>
          </div>
          <div className="text-white/80 text-sm space-y-1">
            <p>Documento validado com sucesso.</p>
            <p>Protocolo: {protocol}</p>
          </div>
        </div>

        {/* Card de histórico de acessos */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-white/80" />
            <h2 className="text-white font-semibold">Histórico de Acessos</h2>
          </div>
          <div className="text-white/80 text-sm">
            <p>Último acesso em: {lastAccess}</p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <Button
              onClick={onResubmitDocument}
              className="flex-1 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <FileImage className="w-4 h-4" />
              Reenviar Documento
            </Button>
            
            <Button
              onClick={onUpdateSelfie}
              className="flex-1 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Atualizar Selfie
            </Button>
          </div>
        </div>

        {/* Botão principal - Dashboard */}
        <Button
          onClick={onGoToDashboard}
          className="w-full py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-bold text-lg rounded-lg flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-5 h-5" />
          Ir para Dashboard
        </Button>
      </div>
    </div>
  );
};