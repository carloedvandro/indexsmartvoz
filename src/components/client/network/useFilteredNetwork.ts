
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
          // Preservamos os children para que a contagem de "Diretos" e "Equipe" funcione corretamente
          result.push({ ...member });
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
  
  console.log("Dados filtrados:", result);
  return result;
};
