export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      document_captures: {
        Row: {
          created_at: string
          document_type: string
          id: string
          image_url: string
          side: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          id?: string
          image_url: string
          side: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          id?: string
          image_url?: string
          side?: string
          user_id?: string | null
        }
        Relationships: []
      }
      document_verifications: {
        Row: {
          background_check_date: string | null
          background_check_result: Json | null
          background_check_status: string | null
          cpf: string
          created_at: string | null
          document_image_url: string | null
          document_number: string | null
          document_type: string
          full_name: string
          id: string
          manual_verification: boolean | null
          ocr_service_response: Json | null
          ocr_service_type: string | null
          updated_at: string | null
          user_id: string
          verification_date: string | null
          verification_status: string
        }
        Insert: {
          background_check_date?: string | null
          background_check_result?: Json | null
          background_check_status?: string | null
          cpf: string
          created_at?: string | null
          document_image_url?: string | null
          document_number?: string | null
          document_type: string
          full_name: string
          id?: string
          manual_verification?: boolean | null
          ocr_service_response?: Json | null
          ocr_service_type?: string | null
          updated_at?: string | null
          user_id: string
          verification_date?: string | null
          verification_status?: string
        }
        Update: {
          background_check_date?: string | null
          background_check_result?: Json | null
          background_check_status?: string | null
          cpf?: string
          created_at?: string | null
          document_image_url?: string | null
          document_number?: string | null
          document_type?: string
          full_name?: string
          id?: string
          manual_verification?: boolean | null
          ocr_service_response?: Json | null
          ocr_service_type?: string | null
          updated_at?: string | null
          user_id?: string
          verification_date?: string | null
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      esim_device_models: {
        Row: {
          brand: string
          created_at: string | null
          id: string
          imei_prefix: string[]
          model: string
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          id?: string
          imei_prefix?: string[]
          model: string
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          id?: string
          imei_prefix?: string[]
          model?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      network: {
        Row: {
          created_at: string
          id: string
          level: number
          parent_id: string | null
          plan_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: number
          parent_id?: string | null
          plan_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number
          parent_id?: string | null
          plan_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "network_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "network"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "network_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "network_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      network_commission_history: {
        Row: {
          amount: number
          created_at: string
          id: string
          paid: boolean | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          paid?: boolean | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          paid?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      network_plan_commissions: {
        Row: {
          commission_value: number
          created_at: string
          id: string
          level: number
          plan_id: string
          updated_at: string
        }
        Insert: {
          commission_value: number
          created_at?: string
          id?: string
          level: number
          plan_id: string
          updated_at?: string
        }
        Update: {
          commission_value?: number
          created_at?: string
          id?: string
          level?: number
          plan_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "network_plan_commissions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "network_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      network_plans: {
        Row: {
          active: boolean | null
          code: string
          created_at: string
          id: string
          name: string
          price: number
          spillover_limit: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string
          id?: string
          name: string
          price: number
          spillover_limit?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          price?: number
          spillover_limit?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          asaas_payment_id: string | null
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          id: string
          notes: string | null
          order_date: string
          payment_method: string | null
          plan_id: string
          status: string
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          asaas_payment_id?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_date?: string
          payment_method?: string | null
          plan_id: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          asaas_payment_id?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_date?: string
          payment_method?: string | null
          plan_id?: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_lines: {
        Row: {
          bonus_data: number | null
          bonus_expiration: string | null
          bonus_used: number | null
          client_document: string | null
          client_email: string | null
          client_name: string
          created_at: string
          data_limit: number
          data_used: number
          id: string
          notes: string | null
          owner_id: string
          phone_number: string
          plan_code: string
          plan_name: string
          plan_renewal_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          bonus_data?: number | null
          bonus_expiration?: string | null
          bonus_used?: number | null
          client_document?: string | null
          client_email?: string | null
          client_name: string
          created_at?: string
          data_limit?: number
          data_used?: number
          id?: string
          notes?: string | null
          owner_id: string
          phone_number: string
          plan_code: string
          plan_name: string
          plan_renewal_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          bonus_data?: number | null
          bonus_expiration?: string | null
          bonus_used?: number | null
          client_document?: string | null
          client_email?: string | null
          client_name?: string
          created_at?: string
          data_limit?: number
          data_used?: number
          id?: string
          notes?: string | null
          owner_id?: string
          phone_number?: string
          plan_code?: string
          plan_name?: string
          plan_renewal_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      plan_benefits: {
        Row: {
          benefit_description: string | null
          benefit_title: string
          created_at: string
          display_order: number | null
          id: string
          plan_id: string
        }
        Insert: {
          benefit_description?: string | null
          benefit_title: string
          created_at?: string
          display_order?: number | null
          id?: string
          plan_id: string
        }
        Update: {
          benefit_description?: string | null
          benefit_title?: string
          created_at?: string
          display_order?: number | null
          id?: string
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_benefits_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_cashback_levels: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level: number
          percentage: number
          plan_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level: number
          percentage: number
          plan_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level?: number
          percentage?: number
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_cashback_levels_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          status: string
          title: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_name: string | null
          account_number: string | null
          address: string | null
          approval_date: string | null
          bank_name: string | null
          birth_date: string | null
          block_date: string | null
          block_reason: string | null
          blocked: boolean | null
          city: string | null
          civil_status: string | null
          cnpj: string | null
          country: string | null
          cpf: string | null
          created_at: string
          custom_id: string | null
          document_id: string | null
          document_validated: boolean | null
          document_validation_date: string | null
          document_verification_status: string | null
          email: string
          email_verified: boolean | null
          external_id: string | null
          face_match_verified: boolean | null
          facial_biometry_date: string | null
          facial_biometry_status: string | null
          facial_verification_status: string | null
          full_name: string | null
          gender: string | null
          graduation_type: string | null
          id: string
          ifsc_code: string | null
          kba_verified: boolean | null
          license_type: string | null
          mobile: string | null
          monthly_graduation: boolean | null
          paypal_email: string | null
          person_type: string | null
          phone: string | null
          phone_verified: boolean | null
          registration_date: string | null
          role: string
          secondary_whatsapp: string | null
          sponsor_id: string | null
          state: string | null
          status: string | null
          store_url: string | null
          updated_at: string
          voucher: string | null
          whatsapp: string | null
          zip_code: string | null
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          address?: string | null
          approval_date?: string | null
          bank_name?: string | null
          birth_date?: string | null
          block_date?: string | null
          block_reason?: string | null
          blocked?: boolean | null
          city?: string | null
          civil_status?: string | null
          cnpj?: string | null
          country?: string | null
          cpf?: string | null
          created_at?: string
          custom_id?: string | null
          document_id?: string | null
          document_validated?: boolean | null
          document_validation_date?: string | null
          document_verification_status?: string | null
          email: string
          email_verified?: boolean | null
          external_id?: string | null
          face_match_verified?: boolean | null
          facial_biometry_date?: string | null
          facial_biometry_status?: string | null
          facial_verification_status?: string | null
          full_name?: string | null
          gender?: string | null
          graduation_type?: string | null
          id: string
          ifsc_code?: string | null
          kba_verified?: boolean | null
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
          paypal_email?: string | null
          person_type?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          registration_date?: string | null
          role?: string
          secondary_whatsapp?: string | null
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          store_url?: string | null
          updated_at?: string
          voucher?: string | null
          whatsapp?: string | null
          zip_code?: string | null
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          address?: string | null
          approval_date?: string | null
          bank_name?: string | null
          birth_date?: string | null
          block_date?: string | null
          block_reason?: string | null
          blocked?: boolean | null
          city?: string | null
          civil_status?: string | null
          cnpj?: string | null
          country?: string | null
          cpf?: string | null
          created_at?: string
          custom_id?: string | null
          document_id?: string | null
          document_validated?: boolean | null
          document_validation_date?: string | null
          document_verification_status?: string | null
          email?: string
          email_verified?: boolean | null
          external_id?: string | null
          face_match_verified?: boolean | null
          facial_biometry_date?: string | null
          facial_biometry_status?: string | null
          facial_verification_status?: string | null
          full_name?: string | null
          gender?: string | null
          graduation_type?: string | null
          id?: string
          ifsc_code?: string | null
          kba_verified?: boolean | null
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
          paypal_email?: string | null
          person_type?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          registration_date?: string | null
          role?: string
          secondary_whatsapp?: string | null
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          store_url?: string | null
          updated_at?: string
          voucher?: string | null
          whatsapp?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      terms_acceptance: {
        Row: {
          accepted: boolean
          accepted_at: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          receive_communications: boolean
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accepted?: boolean
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          receive_communications?: boolean
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accepted?: boolean
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          receive_communications?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "terms_acceptance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_addresses: {
        Row: {
          cep: string
          city: string
          complement: string | null
          created_at: string
          id: string
          neighborhood: string
          number: string
          state: string
          street: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cep: string
          city: string
          complement?: string | null
          created_at?: string
          id?: string
          neighborhood: string
          number: string
          state: string
          street: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cep?: string
          city?: string
          complement?: string | null
          created_at?: string
          id?: string
          neighborhood?: string
          number?: string
          state?: string
          street?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      verification_type:
        | "document_ocr"
        | "face_match"
        | "email_verification"
        | "phone_verification"
        | "token_verification"
        | "kba_quiz"
        | "cpf_validation"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      verification_type: [
        "document_ocr",
        "face_match",
        "email_verification",
        "phone_verification",
        "token_verification",
        "kba_quiz",
        "cpf_validation",
      ],
    },
  },
} as const
