
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
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

  // Adicionando log para debug
  console.log("Renderizando membro:", member.user.full_name, "com ID:", member.user.id, "e custom_id:", member.user.custom_id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full overflow-hidden"
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg w-full">
        <div className="flex items-start gap-2">
          {hasChildren && (
            <button
              onClick={() => onToggle(member.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label={isExpanded ? "Recolher" : "Expandir"}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <div className="w-full">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <UserAvatar 
                  name={member.user.full_name} 
                  isActive={isActive} 
                  currentLevel={currentLevel} 
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-black truncate">
                    {member.user.full_name || "Usuário"}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {isActive ? 'Ativo' : 'Pendente'}
                  </span>
                </div>

                <ProfileInfo member={member} isFilteredView={true} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
