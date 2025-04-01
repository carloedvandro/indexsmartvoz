
export const applyGesiaStyles = (selectedLevel: string) => {
  setTimeout(() => {
    if (selectedLevel === "all") {
      // Adiciona classe para identificar visualização "Todos os níveis"
      document.querySelector('.network-tree')?.classList.add('view-all-levels');
      document.querySelector('.network-tree')?.classList.remove('view-individual-level');
      
      const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
      console.log(`Encontrados ${gesiaNodes.length} nós da Gesia no modo "Todos os Níveis"`);
      
      gesiaNodes.forEach(node => {
        console.log('Forçando margem exata de 3.2px para Gesia');
        (node as HTMLElement).style.setProperty('margin-left', '3.2px', 'important');
        (node as HTMLElement).style.setProperty('max-width', '97%', 'important');
        (node as HTMLElement).style.setProperty('transform', 'scale(0.97)', 'important');
        
        // Adicionando força para mover o texto para cima
        const nameElement = node.querySelector('h3');
        const statusElement = node.querySelector('.text-red-600');
        
        if (nameElement) {
          console.log('Aplicando translateY(-2px) para o nome da Gesia');
          (nameElement as HTMLElement).style.setProperty('transform', 'translateY(-2px)', 'important');
          (nameElement as HTMLElement).style.setProperty('position', 'relative', 'important');
          (nameElement as HTMLElement).style.setProperty('z-index', '10', 'important');
        }
        
        if (statusElement) {
          console.log('Aplicando translateY(1.8px) para o status da Gesia no modo "Todos os Níveis"');
          (statusElement as HTMLElement).style.setProperty('transform', 'translateY(1.8px)', 'important'); // ALTERADO: 1.8px para baixo (era 2px)
          (statusElement as HTMLElement).style.setProperty('position', 'relative', 'important');
          (statusElement as HTMLElement).style.setProperty('z-index', '10', 'important');
        }
        
        node.setAttribute('data-forced-style', 'true');
      });
      
      // Mover APENAS texto "Pendente" 1.8px para BAIXO em "Todos os níveis"
      const pendingStatusElements = document.querySelectorAll('span.text-red-600');
      console.log(`Encontrados ${pendingStatusElements.length} elementos de status pendente no modo "Todos os Níveis"`);
      
      pendingStatusElements.forEach(element => {
        if (element.textContent?.trim() === 'Pendente') {
          console.log('Aplicando translateY(1.8px) para status Pendente em "Todos os Níveis"'); // ALTERADO: 1.8px para baixo (era 2px)
          (element as HTMLElement).style.setProperty('transform', 'translateY(1.8px)', 'important'); // ALTERADO: 1.8px para baixo (era 2px)
          (element as HTMLElement).style.setProperty('position', 'relative', 'important');
          (element as HTMLElement).style.setProperty('z-index', '10', 'important');
        }
      });
    } else {
      // Níveis individuais - remover transformação para texto "Pendente"
      document.querySelector('.network-tree')?.classList.remove('view-all-levels');
      document.querySelector('.network-tree')?.classList.add('view-individual-level');
      
      console.log(`Modo nível individual ${selectedLevel} - mantendo texto "Pendente" na posição original`);
      
      // Remover transformação para texto "Pendente" nos níveis individuais
      const pendingStatusElements = document.querySelectorAll('span.text-red-600');
      pendingStatusElements.forEach(element => {
        if (element.textContent?.trim() === 'Pendente') {
          console.log('Removendo transformações para status Pendente em nível individual');
          (element as HTMLElement).style.removeProperty('transform');
          (element as HTMLElement).style.removeProperty('position');
          (element as HTMLElement).style.removeProperty('z-index');
        }
      });
    }
  }, 300);
};

export const logNodePositions = () => {
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
        
        // Verificação especial para Gesia
        if (customId === 'Gesia89' || memberName === 'Gesia Almeida Dos Santos') {
          console.log(`Nó da Gesia: marginLeft=${styles.marginLeft}, marginTop=${styles.marginTop}`);
          
          // Verificando estilos dos elementos de texto
          const nameElement = node.querySelector('h3');
          const statusElement = node.querySelector('.text-red-600');
          
          if (nameElement) {
            const nameStyles = window.getComputedStyle(nameElement as Element);
            console.log(`Estilo do texto do nome: transform=${nameStyles.transform}`);
          }
          
          if (statusElement) {
            const statusStyles = window.getComputedStyle(statusElement as Element);
            console.log(`Estilo do texto do status: transform=${statusStyles.transform}`);
          }
        }
      }
    });
    
    console.log('Posições atualizadas de todos os nós:', allPositions);
    
    // Verificação específica dos status "Pendente"
    const pendingStatusElements = document.querySelectorAll('.text-red-600.pending-status, span.text-red-600');
    console.log(`Verificando ${pendingStatusElements.length} elementos de status pendente`);
    
    pendingStatusElements.forEach(element => {
      if (element.textContent?.trim() === 'Pendente') {
        const styles = window.getComputedStyle(element as Element);
        console.log(`Status Pendente: transform=${styles.transform}, position=${styles.position}, zIndex=${styles.zIndex}`);
      }
    });
  }, 1000);
};
