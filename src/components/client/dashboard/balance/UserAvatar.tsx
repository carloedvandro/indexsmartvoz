
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  profileImage?: string | null;
  fullName?: string | null;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

export const UserAvatar = ({ 
  profileImage, 
  fullName, 
  isActive = true, 
  size = "sm" 
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <Avatar className={`${sizeClasses[size]} border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
      <AvatarImage src={profileImage || undefined} alt={fullName || "Profile"} />
      <AvatarFallback className="bg-blue-500">
        <User className={`${iconSizes[size]} text-white`} />
      </AvatarFallback>
    </Avatar>
  );
};
