
import React from 'react';

interface LoginHeaderProps {
  itemVariants?: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="text-center mb-4">
      {/* Logo reposicionado no topo */}
      <div className="mb-4">
        <img
          src="/lovable-uploads/ca9fe349-3552-4ecd-afe8-524e1980b362.png"
          alt="Smartvoz Logo"
          className="h-[60px] w-auto mx-auto object-contain"
        />
      </div>
      
      <p className="text-center text-gray-700 text-sm mt-2 px-2 leading-relaxed">
        Otimize o uso de Voz e Dados da sua empresa e potencialize seus negócios.
      </p>
      <hr className="my-2 border-gray-300" />
      <p className="text-center text-gray-700 text-sm mt-2 px-2 leading-relaxed">
        Serviço de controle e acompanhamento com a praticidade e segurança de que você precisa!
      </p>
    </div>
  );
}
