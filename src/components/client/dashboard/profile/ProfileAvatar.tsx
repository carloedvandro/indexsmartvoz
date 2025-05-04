
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserCheck, UserX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileAvatarProps {
  profileImage: string;
  fullName: string | null;
  isActive: boolean;
}

export const ProfileAvatar = ({ profileImage, fullName, isActive }: ProfileAvatarProps) => {
  const StatusIcon = isActive ? UserCheck : UserX;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative">
            <Avatar className={`h-32 w-32 border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
              <AvatarImage src={profileImage} alt={fullName || "Profile"} />
              <AvatarFallback>
                <Users className="h-14 w-14" />
              </AvatarFallback>
            </Avatar>
            <StatusIcon 
              className={`absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white p-0.5 ${
                isActive ? 'text-green-500' : 'text-red-500'
              }`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isActive ? 'Ativo' : 'Pendente'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
