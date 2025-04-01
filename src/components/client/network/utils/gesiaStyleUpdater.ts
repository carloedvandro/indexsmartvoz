
// Esta função é usada para aplicar estilos específicos para usuária Gesia
// e ajustar o texto do status "Pendente"
export const applyGesiaStyles = (selectedLevel: string) => {
  // Forçar estilo para Gesia apenas no modo "Todos os Níveis"
  const isAllLevels = selectedLevel === 'all';
  console.log(`Aplicando estilos de Gesia para modo: ${selectedLevel}`);
  
  setTimeout(() => {
    if (isAllLevels) {
      // Buscar nós da Gesia
      const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
      console.log(`Encontrados ${gesiaNodes.length} nós da Gesia no modo "Todos os Níveis"`);
      
      gesiaNodes.forEach(node => {
        console.log('Aplicando estilos para Gesia: margin-left: 3.2px, scale: 0.97');
        (node as HTMLElement).style.setProperty('margin-left', '3.2px', 'important');
        (node as HTMLElement).style.setProperty('max-width', '97%', 'important');
        (node as HTMLElement).style.setProperty('transform', 'scale(0.97)', 'important');
        
        // Ajustes para o nome e status da Gesia
        const nameElement = node.querySelector('h3');
        const statusElement = node.querySelector('.text-red-600');
        
        if (nameElement) {
          console.log('Aplicando translateY(-2px) para o nome da Gesia');
          (nameElement as HTMLElement).style.setProperty('transform', 'translateY(-2px)', 'important');
          (nameElement as HTMLElement).style.setProperty('position', 'relative', 'important');
          (nameElement as HTMLElement).style.setProperty('z-index', '5', 'important');
        }
        
        if (statusElement) {
          console.log('Aplicando translateY(1.8px) para o status da Gesia no modo "Todos os Níveis"');
          (statusElement as HTMLElement).style.setProperty('transform', 'translateY(1.8px)', 'important'); 
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
          console.log('Aplicando translateY(1.8px) para status Pendente em "Todos os Níveis"');
          (element as HTMLElement).style.setProperty('transform', 'translateY(1.8px)', 'important');
          (element as HTMLElement).style.setProperty('position', 'relative', 'important');
          (element as HTMLElement).style.setProperty('z-index', '10', 'important');
        }
      });
      
      // Aplicar ajuste uniforme para todos os containers de informações de perfil - MOVIDO 10PX PARA BAIXO
      const profileInfoContainers = document.querySelectorAll('.profile-info-container');
      console.log(`Encontrados ${profileInfoContainers.length} containers de informações de perfil`);
      
      profileInfoContainers.forEach(container => {
        console.log('Aplicando distância uniforme para todos os conjuntos de informações');
        (container as HTMLElement).style.setProperty('margin-top', 'calc(8mm + 16px)', 'important'); // Aumentado de 6px para 16px (adicional de 10px)
      });
      
    } else {
      // Para níveis individuais, não aplicamos o movimento do status "Pendente"
      console.log('Modo de visualização de nível individual - não movendo status "Pendente"');
    }
  }, 100);
};

// Função para registrar posições de nós importantes para depuração
export const logNodePositions = () => {
  setTimeout(() => {
    // Registrando posições atuais de nós importantes
    ['Marcio88', 'Marcio89', 'Carlo89', 'Domingos89', 'Vando89', 'Dierro89', 'Rudney89', 'Gesia89'].forEach(id => {
      const node = document.querySelector(`[data-custom-id="${id}"]`);
      if (node) {
        const rect = (node as HTMLElement).getBoundingClientRect();
        console.log(`Posição de ${id}: x=${rect.left.toFixed(1)}, y=${rect.top.toFixed(1)}, width=${rect.width.toFixed(1)}, height=${rect.height.toFixed(1)}`);
      }
    });
  }, 1000);
};
