
import { Users, UserCheck, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSignal } from "./AnimatedSignal";

interface UserAvatarProps {
  name: string | null;
  isActive: boolean;
  currentLevel: number;
}

export const UserAvatar = ({ name, isActive, currentLevel }: UserAvatarProps) => {
  const StatusIcon = isActive ? UserCheck : UserX;
  


  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  return (
    <div className="relative">
      <Avatar className={`h-14 w-14 border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
        <AvatarImage src={profileImage} alt={name || "Profile"} />
        <AvatarFallback>
          <Users className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      <StatusIcon 
        className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 ${
          isActive ? 'text-green-500' : 'text-red-500'
        }`}
      />
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2">
        <AnimatedSignal />
        <span className="text-xs" style={{ color: '#660099', transform: 'translateY(0.5mm)' }}>
          Nvl. <span className="font-semibold">{currentLevel}</span>
        </span>
      </div>
    </div>
  );
};
