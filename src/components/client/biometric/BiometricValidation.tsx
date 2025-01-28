import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';

const BiometricValidation = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();
  const { data: profile, refetch } = useProfile();

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;
    
    try {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (!imageSrc) {
        throw new Error('Não foi possível capturar a imagem');
      }

      // Convert base64 to blob
      const base64Response = await fetch(imageSrc);
      const blob = await base64Response.blob();

      // Upload to Supabase Storage
      const fileName = `${profile?.id}-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('biometrics')
        .upload(fileName, blob);

      if (uploadError) {
        throw uploadError;
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          biometric_validated: true,
          biometric_validation_date: new Date().toISOString(),
        })
        .eq('id', profile?.id);

      if (updateError) {
        throw updateError;
      }

      await refetch();

      toast({
        title: 'Sucesso!',
        description: 'Validação biométrica realizada com sucesso.',
      });

    } catch (error: any) {
      console.error('Error capturing biometric:', error);
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: error.message || 'Ocorreu um erro ao validar sua biometria.',
      });
    } finally {
      setIsCapturing(false);
    }
  }, [profile?.id, refetch, toast]);

  if (profile?.biometric_validated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Validação Biométrica</CardTitle>
          <CardDescription>Sua biometria já foi validada.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validação Biométrica</CardTitle>
        <CardDescription>
          Capture uma foto do seu rosto para validação biométrica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <Button 
          onClick={capture} 
          disabled={isCapturing}
          className="w-full"
        >
          {isCapturing ? 'Capturando...' : 'Capturar Foto'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BiometricValidation;