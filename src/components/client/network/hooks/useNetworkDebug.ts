
import { useEffect } from "react";

export const useNetworkDebug = (filteredData: any[], selectedLevel: string) => {
  useEffect(() => {
    setTimeout(() => {
      const allNodes = document.querySelectorAll('[data-custom-id]');
      console.log(`Found ${allNodes.length} network nodes in DOM`);
      
      // Verificando as posições após as mudanças
      const allPositions = {};
      allNodes.forEach(node => {
        const customId = node.getAttribute('data-custom-id');
        const memberName = node.getAttribute('data-member-name');
        if (customId && memberName) {
          const styles = window.getComputedStyle(node);
          allPositions[customId] = {
            name: memberName,
            marginLeft: styles.marginLeft,
            marginTop: styles.marginTop
          };
          console.log(`Nó ${memberName} (${customId}): marginLeft=${styles.marginLeft}, marginTop=${styles.marginTop}`);
        }
      });
      
      console.log('Posições atualizadas de todos os nós:', allPositions);
      
      // Verificando a aplicação dos novos espaçamentos
      const spaceY6 = document.querySelector('.network-tree .space-y-6');
      if (spaceY6) {
        console.log('Espaçamento vertical aplicado:', window.getComputedStyle(spaceY6).marginBottom);
      }

      // Aplicar atributo de nível selecionado a todos os nós
      document.querySelectorAll('.network-tree').forEach(tree => {
        tree.setAttribute('data-selected-level', selectedLevel);
      });
      
      // Verificar status pendente
      const pendingStatuses = document.querySelectorAll('.text-red-600');
      console.log(`Found ${pendingStatuses.length} pending status elements`);
      pendingStatuses.forEach(status => {
        console.log('Pending status computed style:', window.getComputedStyle(status).transform);
        console.log('Pending status top:', window.getComputedStyle(status).top);
        console.log('Pending status margin-top:', window.getComputedStyle(status).marginTop);
      });
    }, 1000);
  }, [filteredData, selectedLevel]);
};
