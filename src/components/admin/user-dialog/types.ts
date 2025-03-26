
export interface User {
  id?: string;
  email?: string;
  full_name?: string;
  birth_date?: string;
  person_type?: string;
  document_id?: string;
  cnpj?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  zip_code?: string;
  city?: string;
  state?: string;
  country?: string;
  status?: string;
  license_type?: string;
  graduation_type?: string;
  voucher?: string;
}

export interface UserEditDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}
