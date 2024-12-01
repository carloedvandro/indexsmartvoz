import { motion } from "framer-motion";
import { User2, ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NetworkMember {
  id: string;
  level: number;
  user: {
    full_name: string | null;
    email: string;
    custom_id: string | null;
  };
  children?: NetworkMember[];
}

interface NetworkNodeProps {
  member: NetworkMember;
  depth?: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const NetworkNode = ({ member, depth = 0, onToggle, expandedNodes }: NetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
      style={{ marginLeft: `${depth * 24}px` }}
    >
      {depth > 0 && (
        <div className="absolute left-[-24px] top-1/2 w-6 h-px bg-gray-300" />
      )}
      <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
        <div className="flex items-center gap-3">
          {hasChildren && (
            <button
              onClick={() => onToggle(member.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          <div className="bg-primary/10 p-2 rounded-full">
            <User2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{member.user.full_name || 'Usuário'}</p>
            <p className="text-sm text-gray-500">{member.user.email}</p>
            {member.user.custom_id && (
              <p className="text-xs text-gray-400">ID: {member.user.custom_id}</p>
            )}
            <p className="text-xs text-primary mt-1">Nível {member.level}</p>
          </div>
        </div>
      </Card>
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2">
          {member.children.map((child) => (
            <NetworkNode
              key={child.id}
              member={child}
              depth={depth + 1}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};