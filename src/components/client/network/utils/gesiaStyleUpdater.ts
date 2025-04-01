
export const applyGesiaStyles = (selectedLevel: string) => {
  setTimeout(() => {
    if (selectedLevel === "all") {
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
          console.log('Aplicando translateY(-2px) para o status da Gesia');
          (statusElement as HTMLElement).style.setProperty('transform', 'translateY(-2px)', 'important');
          (statusElement as HTMLElement).style.setProperty('position', 'relative', 'important');
          (statusElement as HTMLElement).style.setProperty('z-index', '10', 'important');
        }
        
        node.setAttribute('data-forced-style', 'true');
      });
    }
    
    // Aplicar o estilo APENAS ao texto "Pendente" sem alterar outros elementos
    const pendingStatusElements = document.querySelectorAll('span.text-red-600');
    console.log(`Encontrados ${pendingStatusElements.length} elementos de status pendente`);
    
    pendingStatusElements.forEach(element => {
      // Verifica se o elemento contém o texto "Pendente"
      if (element.textContent?.trim() === 'Pendente') {
        console.log('Aplicando translateY(-2px) para status Pendente');
        (element as HTMLElement).style.setProperty('transform', 'translateY(-2px)', 'important');
        (element as HTMLElement).style.setProperty('position', 'relative', 'important');
        (element as HTMLElement).style.setProperty('z-index', '10', 'important');
      }
    });
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
