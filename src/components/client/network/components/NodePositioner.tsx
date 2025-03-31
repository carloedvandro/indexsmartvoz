
import React, { ReactNode } from "react";
import { NetworkMember } from "../types";

interface NodePositionerProps {
  member: NetworkMember;
  children: ReactNode;
}

export const NodePositioner: React.FC<NodePositionerProps> = ({ member, children }) => {
  // Verificando se é o usuário específico
  const isMarcioSilva = member.user.full_name === 'Marcio Bettanzos da Silva';
  const isMarcioSales = member.user.full_name === 'Marcio Sales Sousa';
  const isCarloGoncalves = member.user.full_name === 'Carlo Edvandro Camera Gonçalves';
  const isDomingosPinto = member.user.full_name === 'Domingos Ferreira Pinto';
  const isVandoMacedo = member.user.full_name === 'Vando Araujo Macedo';
  const isDierroLeal = member.user.full_name === 'Dierro Santana Leal';
  const isRudneyNobrega = member.user.full_name === 'Rudney de Souza Nobrega';
  const isGesiaAlmeida = member.user.full_name === 'Gesia Almeida Dos Santos';
  
  let marginLeft = '0px';
  let marginTop = '0px';
  
  // Aplicando margens específicas apenas para os níveis individuais (não "Todos os Níveis")
  if (isMarcioSilva) {
    marginLeft = '30.5px';
    marginTop = '2px';
  } else if (isMarcioSales) {
    marginLeft = '30px';
    marginTop = '2px';
  } else if (isCarloGoncalves) {
    marginLeft = '2px';
    marginTop = '8px';
  } else if (isDomingosPinto) {
    marginLeft = '0px';
    marginTop = '2px';
  } else if (isVandoMacedo) {
    marginLeft = '1px';
    marginTop = '2px';
  } else if (isDierroLeal) {
    marginLeft = '-1px';
    marginTop = '2px';
  } else if (isRudneyNobrega) {
    marginLeft = '30px';
    marginTop = '2px';
  } else if (isGesiaAlmeida) {
    marginLeft = '-2px';
    marginTop = '2px';
  }

  return (
    <div
      style={{ 
        marginLeft: marginLeft !== '0px' ? marginLeft : undefined,
        marginTop: marginTop !== '0px' ? marginTop : undefined
      }}
    >
      {children}
    </div>
  );
};
