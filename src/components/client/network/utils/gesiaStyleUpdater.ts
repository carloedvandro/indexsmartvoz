
// Esta função aplica estilos específicos para a usuária Gesia
export const applyGesiaStyles = (selectedLevel: string) => {
  setTimeout(() => {
    const gesiaElements = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
    
    gesiaElements.forEach(node => {
      // Aplicar estilos para corrigir a exibição
      (node as HTMLElement).style.maxWidth = '97%';
      (node as HTMLElement).style.transform = 'scale(0.97)';
      
      // Garantir que o nome correto seja exibido
      const nameElement = node.querySelector('h3');
      if (nameElement) {
        // Verificar se o nome exibido está incorreto
        if (nameElement.textContent !== 'Gesia Almeida Dos Santos') {
          nameElement.textContent = 'Gesia Almeida Dos Santos';
        }
        (nameElement as HTMLElement).style.transform = 'translateY(-2px)';
      }
      
      // Aplicar margem específica baseada no nível selecionado
      if (selectedLevel === 'all') {
        (node as HTMLElement).style.marginLeft = '3.2px';
      } else {
        (node as HTMLElement).style.marginLeft = '3.2px';
      }
      
      // Forçar atualização do timestamp para garantir que os estilos sejam aplicados
      node.setAttribute('data-timestamp', new Date().getTime().toString());
    });
  }, 100);
};

// Log das posições dos nós para debugging
export const logNodePositions = () => {
  setTimeout(() => {
    const nodes = document.querySelectorAll('[data-member-name]');
    console.log(`Encontrados ${nodes.length} nós de membros na rede`);
    
    nodes.forEach(node => {
      const name = node.getAttribute('data-member-name');
      const customId = node.getAttribute('data-custom-id');
      if (name === 'Gesia Almeida Dos Santos' || customId === 'Gesia89') {
        console.log(`Nó da Gesia encontrado: nome=${name}, id=${customId}`);
        console.log(`Posição: ${(node as HTMLElement).style.marginLeft}`);
      }
    });
  }, 500);
};
