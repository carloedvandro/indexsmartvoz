
import { supabase } from "@/integrations/supabase/client";

export const uploadFacialImage = async (imageSrc: string): Promise<void> => {
  // Check authentication
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session?.user) {
    throw new Error("Usuário não está autenticado. Por favor, faça login novamente.");
  }
  
  console.log("💾 Salvando imagem facial validada para usuário:", sessionData.session.user.id);
  
  // Save image to Supabase Storage
  const userId = sessionData.session.user.id;
  const blob = await fetch(imageSrc).then(res => res.blob());
  const file = new File([blob], `facial-${Date.now()}.jpg`, { type: 'image/jpeg' });
  const filePath = `${userId}/facial/${Date.now()}.jpg`;
  
  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, file);
    
  if (uploadError) {
    console.error('❌ Erro ao fazer upload da imagem facial:', uploadError);
    throw uploadError;
  }
  
  console.log("✅ Imagem facial validada enviada com sucesso");
};
