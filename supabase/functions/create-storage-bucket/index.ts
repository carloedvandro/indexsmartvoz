
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Create storage bucket if it doesn't exist
const { data: bucket, error } = await supabase
  .storage
  .createBucket('documents', {
    public: false,
    allowedMimeTypes: ['image/jpeg', 'image/png'],
    fileSizeLimit: 5242880 // 5MB
  });

if (error) {
  console.error('Error creating bucket:', error);
} else {
  console.log('Bucket created successfully:', bucket);
}

