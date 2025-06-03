
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileImageSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto</span>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex gap-2">
              <label htmlFor="image-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Procurar
                </Button>
              </label>
              <Button
                type="button"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Enviar 📤
              </Button>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-xs text-gray-500">
              <p>Tamanho máximo da imagem é de <strong>2MB</strong></p>
              <p>Formatos permitidos: <strong>JPG, JPEG e PNG</strong></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
