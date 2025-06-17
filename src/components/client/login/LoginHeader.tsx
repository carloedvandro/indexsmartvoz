import React from 'react';
interface LoginHeaderProps {
  itemVariants?: any;
}
export function LoginHeader({
  itemVariants
}: LoginHeaderProps) {
  const titleStyle = "text-3xl font-extrabold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-1";
  return <div className="">
      <img src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" alt="Smartvoz Logo" className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm" />
      <p className="text-center text-gray-700 text-sm mt-3 px-2 leading-relaxed">
        Otimize o uso de Voz e Dados da sua empresa e potencialize seus negócios.
      </p>
      <hr className="my-3 border-gray-300" />
      <p className="text-center text-gray-700 text-sm mt-2 px-2 leading-relaxed">
        Serviço de controle e acompanhamento com a praticidade e segurança de que você precisa!
      </p>
    </div>;
}