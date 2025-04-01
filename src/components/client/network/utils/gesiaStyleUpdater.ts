
export const applyGesiaStyles = (selectedLevel: string) => {
  setTimeout(() => {
    if (selectedLevel === "all") {
      const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
      console.log(`Encontrados ${gesiaNodes.length} nós da Gesia no modo "Todos os Níveis"`);
      
      gesiaNodes.forEach(node => {
        console.log('Forçando margem exata de 3.2px para Gesia');
        (node as HTMLElement).style.setProperty('margin-left', '3.2px', 'important');
        (node as HTMLElement).style.setProperty('max-width', '98%', 'important');
        (node as HTMLElement).style.setProperty('transform', 'scale(0.98)', 'important');
        node.setAttribute('data-forced-style', 'true');
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
        }
      }
    });
    
    console.log('Posições atualizadas de todos os nós:', allPositions);
  }, 1000);
};
