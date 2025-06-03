
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { ProfileWithSponsor } from "@/types/profile";

interface ProfileImageSectionProps {
  profile: ProfileWithSponsor;
}

export function ProfileImageSection({ profile }: ProfileImageSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use the existing profile image or the default placeholder
  const profileImage = profile.profile_image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";

  useEffect(() => {
    if (profile.profile_image) {
      setSelectedImage(profile.profile_image);
    }
  }, [profile.profile_image]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayImage = selectedImage || profileImage;
  const displayName = profile.full_name || "Usuário";

  return (
    <div className="px-2 sm:px-6 space-y-6">
      <div className="flex flex-col items-center space-y-4 py-6">
        <Avatar className="w-32 h-32 border-2 border-gray-200">
          <AvatarImage 
            src={displayImage} 
            alt={displayName}
            className="object-cover"
          />
          <AvatarFallback className="bg-gray-100">
            <Users className="h-16 w-16 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-2 w-full">
          <h3 className="font-medium text-gray-900">{displayName}</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <input
              type="text"
              value="Escolha um arquivo"
              readOnly
              className="flex-1 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700"
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs px-3 py-2 flex-1 sm:flex-none"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Procurar
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-2 flex-1 sm:flex-none"
              >
                Enviar 📤
              </Button>
            </div>
          </div>
          
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="text-xs text-gray-600 space-y-1">
            <p>Tamanho máximo da imagem é de <strong>2MB</strong></p>
            <p>Formatos permitidos: <strong>JPG, JPEG e PNG</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
