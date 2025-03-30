
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { NetworkMember } from "./types";
import { UserAvatar } from "./components/UserAvatar";
import { ProfileInfo } from "./components/ProfileInfo";

interface FilteredNetworkNodeProps {
  member: NetworkMember;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const FilteredNetworkNode = ({ member, onToggle, expandedNodes }: FilteredNetworkNodeProps) => {
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
  
  if (isMarcioSilva) {
    marginLeft = '4.5px'; // Movido 2px mais para esquerda (era 6.5px)
    marginTop = '2px'; // Mantido em 2px
  } else if (isMarcioSales) {
    marginLeft = '4px'; // Movido 2px mais para esquerda (era 6px)
    marginTop = '2px'; // Mantido em 2px
  } else if (isCarloGoncalves) {
    marginLeft = '2px'; // Mantido em 2px
    marginTop = '8px'; // Mantido em 8px
  } else if (isDomingosPinto) {
    marginLeft = '0px'; // Mantido em 0px
    marginTop = '2px'; // Mantido em 2px
  } else if (isVandoMacedo) {
    marginLeft = '1px'; // Mantido em 1px
    marginTop = '2px'; // Mantido em 2px
  } else if (isDierroLeal) {
    marginLeft = '-1px'; // Mantido em -1px
    marginTop = '2px'; // Mantido em 2px
  } else if (isRudneyNobrega) {
    marginLeft = '30px'; // Mantido em 30px
    marginTop = '2px'; // Mantido em 2px
  } else if (isGesiaAlmeida) {
    marginTop = '2px'; // Mantido em 2px
  }

  // Log for debugging
  console.log("Renderizando membro:", member.user.full_name, "com ID:", member.user.id, "e custom_id:", member.user.custom_id);
  console.log("Margin aplicada:", marginLeft, "marginTop:", marginTop);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full overflow-hidden mb-6"
      style={{ 
        marginLeft: marginLeft !== '0px' ? marginLeft : undefined,
        marginTop: marginTop !== '0px' ? marginTop : undefined
      }}
      data-user-id={member.user.custom_id}
      data-member-name={member.user.full_name}
      data-node-id={member.id}
      data-custom-id={member.user.custom_id}
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
              <h3 className="text-base font-semibold text-black truncate">
                {member.user.full_name || "Usuário"}
              </h3>
              <span className={`text-xs font-semibold ${
                isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isActive ? 'Ativo' : 'Pendente'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProfileInfo member={member} isFilteredView={true} />
      
      {hasChildren && isExpanded && (
        <div className="mt-6 space-y-6 mb-6 ml-[25.5px]">
          {member.children.map((child) => (
            <FilteredNetworkNode
              key={child.id}
              member={child}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
