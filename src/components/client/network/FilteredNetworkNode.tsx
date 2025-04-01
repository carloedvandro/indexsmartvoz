
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { NetworkMember } from "./types";
import { UserAvatar } from "./components/UserAvatar";
import { ProfileInfo } from "./components/ProfileInfo";

interface FilteredNetworkNodeProps {
  member: NetworkMember;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  isAllLevels?: boolean;
}

export const FilteredNetworkNode = ({ 
  member, 
  onToggle, 
  expandedNodes,
  isAllLevels = false
}: FilteredNetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isActive = member.user.status === 'active';
  const currentLevel = 1; // For filtered views, we show everything at level 1
  
  // Verificando se é o usuário específico
  const isMarcioSilva = member.user.full_name === 'Marcio Bettanzos da Silva';
  const isMarcioSales = member.user.full_name === 'Marcio Sales Sousa';
  const isCarloGoncalves = member.user.full_name === 'Carlo Edvandro Camera Gonçalves';
  const isDomingosPinto = member.user.full_name === 'Domingos Ferreira Pinto';
  const isVandoMacedo = member.user.full_name === 'Vando Araujo Macedo';
  const isDierroLeal = member.user.full_name === 'Dierro Santana Leal';
  const isRudneyNobrega = member.user.full_name === 'Rudney de Souza Nobrega';
  const isGesiaAlmeida = member.user.full_name === 'Gesia Almeida Dos Santos';
  
  let marginLeft = '0px';
  let marginTop = '0px';
  let maxWidth = undefined;
  let transform = undefined;
  
  if (isMarcioSilva) {
    marginLeft = '29px'; // Movido 0.5px para esquerda (era 29.5px)
    marginTop = '2px';
  } else if (isMarcioSales) {
    marginLeft = '29.2px'; // Movido 0.2px para direita (era 29px)
    marginTop = '2px';
  } else if (isCarloGoncalves) {
    marginLeft = '0.1px'; // Movido 0.2px para esquerda (era 0.3px)
    marginTop = '8px';
  } else if (isDomingosPinto) {
    marginLeft = '-0.1px'; // Movido 0.1px para esquerda (era 0px)
    marginTop = '2px';
  } else if (isVandoMacedo) {
    marginLeft = '-0.5px'; // Movido 0.5px para esquerda (era 0px)
    marginTop = '2px';
  } else if (isDierroLeal) {
    marginLeft = '-1.3px'; // Movido 0.7px para direita (era -2px)
    marginTop = '2px';
  } else if (isRudneyNobrega) {
    marginLeft = '30px'; // Movido 1px para direita (era 29px)
    marginTop = '2px';
  } else if (isGesiaAlmeida) {
    marginLeft = '3.2px'; // Movido 0.2px para esquerda (era 3.4px)
    marginTop = '2px';
    maxWidth = '97%'; // Reduzido de 98% para 97%
    transform = 'scale(0.97)'; // Reduzido de 0.98 para 0.97
  }

  // Adicionando timestamp para forçar atualização de estilo
  const styleTimestamp = new Date().getTime();
  
  // Estilos específicos para o texto de Gesia
  const gesiaTextStyle: React.CSSProperties = isGesiaAlmeida ? {
    transform: 'translateY(-2px)',
    position: 'relative',
    zIndex: 5
  } : {};
  
  // Estilo específico para o status "Pendente" - AGORA Move 1.8px para BAIXO em "Todos os Níveis"
  const pendingStatusStyle: React.CSSProperties = (!isActive && isAllLevels) ? {
    transform: 'translateY(1.8px)', // ALTERADO: 1.8px para baixo (era 2px) - movido 0.2px para cima
    position: 'relative',
    zIndex: 5
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full overflow-hidden mb-12" // Aumentei o mb de 6 para 12 para mais espaço vertical
      style={{ 
        marginLeft: marginLeft !== '0px' ? marginLeft : undefined,
        marginTop: marginTop !== '0px' ? marginTop : undefined,
        maxWidth: maxWidth,
        transform: transform
      }}
      data-user-id={member.user.custom_id}
      data-member-name={member.user.full_name}
      data-node-id={member.id}
      data-custom-id={member.user.custom_id}
      data-style-timestamp={styleTimestamp}
    >
      <div className="flex items-start w-full">
        {hasChildren && (
          <button
            onClick={() => onToggle(member.id)}
            className="p-1 hover:text-primary rounded-full flex-shrink-0"
            style={{ marginTop: '4mm', marginLeft: '-0.5mm' }}
            aria-label={isExpanded ? "Recolher" : "Expandir"}
          >
            {isExpanded ? (
              <Minus
                className="h-4 w-4"
                style={{ color: '#660099', strokeWidth: 3 }}
              />
            ) : (
              <Plus
                className="h-4 w-4"
                style={{ color: '#660099', strokeWidth: 3 }}
              />
            )}
          </button>
        )}
        
        <div className="flex items-start gap-3 flex-1">
          <UserAvatar 
            name={member.user.full_name} 
            isActive={isActive} 
            currentLevel={currentLevel} 
          />

          <div className="flex-col min-w-0">
            <div className="flex flex-col" style={{ marginTop: '4mm', marginBottom: '2mm' }}>
              <h3 
                className="text-base font-semibold text-black truncate"
                style={gesiaTextStyle}
              >
                {member.user.full_name || "Usuário"}
              </h3>
              <span 
                className={`text-xs font-semibold ${
                  isActive ? 'text-green-600' : 'text-red-600 pending-status'
                }`}
                style={pendingStatusStyle}
              >
                {isActive ? 'Ativo' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProfileInfo member={member} isFilteredView={true} />
      
      {hasChildren && isExpanded && (
        <div className="mt-8 space-y-12 mb-8 ml-[25.5px]"> // Aumentei o mt, space-y e mb para mais espaço
          {member.children.map((child) => (
            <FilteredNetworkNode
              key={child.id}
              member={child}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
              isAllLevels={isAllLevels}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
