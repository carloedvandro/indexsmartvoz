
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // Se for "all", retorna a estrutura completa sem filtragem
  if (selectedLevel === "all") {
    console.log("Retornando todos os níveis (até o 4º):", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  // Verificar se o nível selecionado é maior que 4
  if (level > 4) {
    console.log("Nível selecionado maior que 4, limitando a 4");
    return []; // Retorna vazio para níveis acima de 4
  }
  
  // Para armazenar os resultados filtrados
  const result: NetworkMember[] = [];
  
  // Função para encontrar membros de um nível específico
  const findMembersByLevel = (members: NetworkMember[], currentLevel: number = 1) => {
    if (!members || members.length === 0) return;
    
    // Não processa além do nível 4
    if (currentLevel > 4) return;
    
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
      if (currentLevel < level && member.children && member.children.length > 0) {
        findMembersByLevel(member.children, currentLevel + 1);
      }
    });
  };
  
  // Inicie a busca a partir do nível 1
  findMembersByLevel(data);
  
  console.log("Dados filtrados para o nível", level, ":", result);
  return result;
};
