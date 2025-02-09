
export interface VerificationRequest {
  imageBase64: string;
  documentType: string;
  userId: string;
}

export interface VerificationResponse {
  success: boolean;
  verified: boolean;
  message: string;
  error?: string;
}

export interface ProfileData {
  full_name: string;
  cpf: string;
}

export interface VerificationData {
  error?: string;
  matchFound?: boolean;
}
