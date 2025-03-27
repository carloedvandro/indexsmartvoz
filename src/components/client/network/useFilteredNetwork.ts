
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // Se for "all", retorna a estrutura completa sem filtragem
  if (selectedLevel === "all") {
    console.log("Retornando todos os níveis:", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  // Para armazenar os resultados filtrados
  const result: NetworkMember[] = [];
  
  // Função para encontrar membros de um nível específico
  const findMembersByLevel = (members: NetworkMember[], currentLevel: number = 1) => {
    if (!members || members.length === 0) return;
    
    members.forEach(member => {
      // Se estamos no nível desejado, adicione o membro ao resultado
      if (currentLevel === level) {
        // Verificação para evitar duplicação de membros com mesmo user.id
        if (!result.some(m => m.user.id === member.user.id)) {
          // Importante: Preserve os children para calcular o tamanho da equipe
          const memberCopy = { ...member };
          result.push(memberCopy);
        }
      }
      
      // Continue procurando nos filhos se ainda não atingimos o nível desejado
      if (currentLevel < level && member.children && member.children.length > 0) {
        findMembersByLevel(member.children, currentLevel + 1);
      }
    });
  };
  
  // Inicie a busca a partir do nível 1
  findMembersByLevel(data);
  
  console.log("Dados filtrados por nível:", selectedLevel, "resultado:", result);
  // Verifique e log detalhes dos membros filtrados
  if (result.length > 0) {
    result.forEach((member, index) => {
      console.log(`Membro filtrado ${index + 1}:`, member.user.full_name);
      console.log(`- Tem filhos: ${member.children ? 'Sim, ' + member.children.length + ' filhos' : 'Não'}`);
    });
  }
  
  return result;
};
