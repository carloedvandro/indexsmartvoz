import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { NetworkMember } from "./types";
import { Users } from "lucide-react";

interface NetworkNodeProps {
  member: NetworkMember;
  depth?: number;
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
}

export const NetworkNode = ({ member, depth = 0, onToggle, expandedNodes }: NetworkNodeProps) => {
  const hasChildren = member.children && member.children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  
  // Placeholder image from Unsplash - using a professional looking photo
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
      style={{ 
        marginLeft: `${depth * 12}px`,
        width: `calc(100% - ${depth * 12}px)`
      }}
    >
      {depth > 0 && (
        <div 
          className="absolute left-[-12px] top-1/2 w-3 h-px bg-gray-300"
          style={{
            transform: "translateY(-50%)"
          }}
        />
      )}
      <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2">
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
            <Avatar className="h-12 w-12">
              <AvatarImage src={profileImage} alt={member.user.full_name || "Profile"} />
              <AvatarFallback>
                <Users className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-0.5">
              {member.user.full_name || "Usuário"}
            </h3>
            <p className="text-sm text-gray-500 break-all mb-1">
              {member.user.email}
            </p>
            <div className="flex flex-col gap-0.5">
              {member.user.custom_id && (
                <p className="text-xs text-gray-400">
                  ID: {member.user.custom_id}
                </p>
              )}
              <p className="text-xs text-primary">
                Nível {member.level}
              </p>
            </div>
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