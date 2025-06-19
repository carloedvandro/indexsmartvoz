import { User, ChevronDown, Building2, FileText, KeyRound, Shield, ChevronRight, UserCircle, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { navigationItems } from '../navigation/NavigationItems';
import { UserAvatar } from './UserAvatar';
import { ProfileWithSponsor } from '@/types/profile';
interface UserMenuDropdownProps {
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
  onLogout: () => Promise<void>;
  profile?: ProfileWithSponsor | null;
}
export function UserMenuDropdown({
  showUserMenu,
  onToggleUserMenu,
  onLogout,
  profile
}: UserMenuDropdownProps) {
  const navigate = useNavigate();
  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/client/navigation');
  };
  return <div className="relative">
      <button onClick={handleUserMenuClick} title="Menu completo" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
        <UserAvatar profileImage={profile?.profile_image} fullName={profile?.full_name} isActive={profile?.status === 'active'} size="sm" />
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
    </div>;
}