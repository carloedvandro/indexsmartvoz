
import { toast } from "sonner";

export const forceCssReload = () => {
  // Força atualização de estilos com timestamp exclusivo
  const timestamp = new Date().getTime();
  document.documentElement.style.setProperty('--network-update-timestamp', `'${timestamp}'`);
  
  // Atualiza o CSS específico
  const linkId = 'network-page-css';
  let link = document.getElementById(linkId) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  
  // Atualiza o href para forçar recarga com timestamp exclusivo
  link.href = `/src/styles/network.css?t=${timestamp}`;
  
  console.log(`Forçando recarga de CSS: ${timestamp}`);
  
  return () => {
    if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
  };
};

export const applyGesiaStyles = (selectedLevel: string) => {
  setTimeout(() => {
    const gesiaNodes = document.querySelectorAll('[data-custom-id="Gesia89"], [data-member-name="Gesia Almeida Dos Santos"]');
    console.log(`Encontrou ${gesiaNodes.length} nós da Gesia, aplicando estilos`);
    
    gesiaNodes.forEach(node => {
      console.log('Aplicando estilo direto no elemento da Gesia');
      (node as HTMLElement).style.marginLeft = '3.2px';
      (node as HTMLElement).style.maxWidth = '97%';
      (node as HTMLElement).style.transform = 'scale(0.97)';
      
      // Adiciona transformação para mover o texto para cima
      const nameElement = node.querySelector('h3');
      const statusElement = node.querySelector('.text-red-600');
      
      if (nameElement) {
        (nameElement as HTMLElement).style.transform = 'translateY(-2px)';
      }
      
      if (statusElement) {
        (statusElement as HTMLElement).style.transform = 'translateY(-2px)';
      }
      
      // Expandir o nó da Gesia automaticamente
      const nodeId = node.getAttribute('data-node-id');
      if (nodeId) {
        const expandButton = node.querySelector('button');
        if (expandButton && !node.querySelector('.network-node-expanded')) {
          console.log('Expandindo nó da Gesia automaticamente');
          node.classList.add('network-node-expanded');
          // O botão de expansão será clicado apenas na primeira carga
          // expandButton.click();
        }
      }
    });
    
    // Aplicar estilo específico para status "Pendente" em vista "Todos os níveis"
    if (selectedLevel === "all") {
      const pendingStatusElements = document.querySelectorAll('.view-all-levels span.text-red-600:not([class*="background"]):not([class*="border"])');
      pendingStatusElements.forEach(element => {
        (element as HTMLElement).style.transform = 'translateY(1.8px)';
        (element as HTMLElement).style.position = 'relative';
        (element as HTMLElement).style.zIndex = '5';
      });
    }
  }, 500);
};

export const logNodePositions = () => {
  setTimeout(() => {
    const allNodes = document.querySelectorAll('[data-member-name]');
    console.log(`Total de nós: ${allNodes.length}`);
    
    allNodes.forEach(node => {
      const name = node.getAttribute('data-member-name');
      const nodeId = node.getAttribute('data-node-id');
      console.log(`Nó: ${name}, ID: ${nodeId}, Posição: ${(node as HTMLElement).style.marginLeft}`);
    });
    
    // Verifica se Rafael já está como filho da Gesia
    const gesiaNode = document.querySelector('[data-member-name="Gesia Almeida Dos Santos"]');
    if (gesiaNode) {
      const gesiaChildren = gesiaNode.querySelectorAll('.mt-6.space-y-6.mb-6 [data-member-name]');
      const rafaelNode = Array.from(gesiaChildren).find(node => 
        node.getAttribute('data-member-name')?.includes('Rafael')
      );
      
      if (rafaelNode) {
        console.log('Rafael já está posicionado como filho da Gesia');
        toast.success('Rafael já está posicionado como filho da Gesia');
      } else {
        console.log('Rafael não está posicionado como filho da Gesia');
      }
    }
  }, 1000);
};
