
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NetworkMember {
  id: string;
  full_name: string;
  avatar_url: string | null;
  level: number;
  status: string;
  username: string;
  created_at: string;
  direct_members: number;
  team_members: number;
}

interface NetworkNodeProps {
  member: NetworkMember;
  onToggle: (id: string) => void;
  expandedNodes: Set<string>;
}

export const NetworkNode = ({ member, onToggle, expandedNodes }: NetworkNodeProps) => {
  const isExpanded = expandedNodes.has(member.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Button
        variant="outline"
        className="w-full md:w-[240px] text-left flex flex-col items-start p-4 space-y-2 hover:bg-gray-100"
        onClick={() => onToggle(member.id)}
      >
        <div className="flex items-center w-full gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar_url || undefined} />
            <AvatarFallback>{member.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{member.full_name}</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {member.status}
              </span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="w-full space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Nvl. {member.level}</span>
            </div>
            <div>Meu ID: {member.username}</div>
            <div>
              Cadastro:{" "}
              {new Date(member.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div>Diretos: {member.direct_members}</div>
            <div>Equipe: {member.team_members}</div>
          </div>
        )}
      </Button>
    </motion.div>
  );
};
