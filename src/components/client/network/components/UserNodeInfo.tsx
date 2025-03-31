
import React from "react";
import { NetworkMember } from "../types";
import { UserAvatar } from "./UserAvatar";

interface UserNodeInfoProps {
  member: NetworkMember;
  isActive: boolean;
  currentLevel: number;
}

export const UserNodeInfo: React.FC<UserNodeInfoProps> = ({ 
  member, 
  isActive, 
  currentLevel 
}) => {
  return (
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
            isActive ? 'text-green-600' : 'text-red-600 pending-status'
          }`} style={{ position: 'relative', top: isActive ? '0' : '2px' }}>
            {isActive ? 'Ativo' : 'Pendente'}
          </span>
        </div>
      </div>
    </div>
  );
};
