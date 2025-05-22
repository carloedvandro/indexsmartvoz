
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // Se for "all", retorna a estrutura completa sem filtragem, mas limitada a 4 níveis
  if (selectedLevel === "all") {
    // Limitar a profundidade máxima a 4 níveis
    const limitDepth = (members: NetworkMember[], currentDepth: number = 1): NetworkMember[] => {
      if (currentDepth > 4 || !members) return [];
      
      return members.map(member => ({
        ...member,
        children: currentDepth < 4 ? limitDepth(member.children || [], currentDepth + 1) : []
      }));
    };
    
    const limitedData = limitDepth(data);
    console.log("Retornando todos os níveis (limitados a 4):", limitedData);
    return limitedData;
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
          result.push({
            ...member,
            children: [] // Remover filhos ao encontrar o nível desejado
          });
        }
      }
      
      // Continue procurando nos filhos se ainda não atingimos o nível desejado
      // e se o nível desejado for menor ou igual a 4
      if (currentLevel < level && level <= 4 && member.children && member.children.length > 0) {
        findMembersByLevel(member.children, currentLevel + 1);
      }
    });
  };
  
  // Inicie a busca a partir do nível 1
  findMembersByLevel(data);
  
  console.log("Dados filtrados:", result);
  return result;
};
