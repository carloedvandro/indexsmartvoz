
import { NetworkMember } from "./types";

export const useFilteredNetwork = (data: NetworkMember[], selectedLevel: string) => {
  if (!data) return [];
  
  // Se for "all", retorna a estrutura completa sem filtragem
  if (selectedLevel === "all") {
    console.log("Retornando todos os níveis:", data);
    return data;
  }
  
  const level = parseInt(selectedLevel);
  
  // Manter registro de IDs de usuários já processados para evitar duplicações
  const processedUserIds = new Set<string>();
  
  const filterByLevel = (members: NetworkMember[], currentLevel: number = 1): NetworkMember[] => {
    if (!members || members.length === 0) return [];
    
    if (currentLevel === level) {
      // Filtrar membros para incluir apenas aqueles cujos user_ids não foram processados ainda
      const filteredMembers = members.filter(member => !processedUserIds.has(member.user.id));
      
      // Adicionar os IDs de usuário ao conjunto de processados
      filteredMembers.forEach(member => processedUserIds.add(member.user.id));
      
      return filteredMembers.map(member => ({
        ...member,
        children: [] // Remove os filhos quando encontra o nível desejado
      }));
    }
    
    return members.reduce<NetworkMember[]>((acc, member) => {
      // Verificar se este usuário já foi processado
      if (processedUserIds.has(member.user.id)) {
        return acc; // Pular este membro se já foi processado
      }
      
      const filteredChildren = filterByLevel(member.children || [], currentLevel + 1);
      
      if (filteredChildren.length > 0) {
        // Adicionar este usuário ao conjunto de processados
        processedUserIds.add(member.user.id);
        
        acc.push({
          ...member,
          children: filteredChildren
        });
      }
      
      return acc;
    }, []);
  };

  const filteredData = filterByLevel(data);
  console.log("Dados filtrados:", filteredData);
  return filteredData;
};
