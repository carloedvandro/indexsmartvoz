export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      esim_device_models: {
        Row: {
          brand: string | null
          created_at: string
          id: string
          imei_prefix: string | null
          model: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string
          id?: string
          imei_prefix?: string | null
          model?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string
          id?: string
          imei_prefix?: string | null
          model?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string | null
          read: boolean | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          read?: boolean | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          read?: boolean | null
          type?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          confirmed_by: string | null
          created_at: string
          ddd: string | null
          ddd_provisorio: string | null
          eid: string | null
          id: string
          imei: string | null
          plan_id: string | null
          profile_id: string | null
          qr_codigo: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          confirmed_by?: string | null
          created_at?: string
          ddd?: string | null
          ddd_provisorio?: string | null
          eid?: string | null
          id?: string
          imei?: string | null
          plan_id?: string | null
          profile_id?: string | null
          qr_codigo?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          confirmed_by?: string | null
          created_at?: string
          ddd?: string | null
          ddd_provisorio?: string | null
          eid?: string | null
          id?: string
          imei?: string | null
          plan_id?: string | null
          profile_id?: string | null
          qr_codigo?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
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
            foreignKeyName: "orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_lines: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          CCID: string | null
          created_at: string
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          CCID?: string | null
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          CCID?: string | null
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_lines_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_benefits: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          plan_id: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          plan_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          plan_id?: string | null
          title?: string | null
          updated_at?: string | null
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
          amount: number | null
          created_at: string
          description: string | null
          id: string
          level: number | null
          percentage: number | null
          plan_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          percentage?: number | null
          plan_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          percentage?: number | null
          plan_id?: string | null
          updated_at?: string | null
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
          first_purchase_cashback: number | null
          id: string
          status: string | null
          title: string | null
          updated_at: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          first_purchase_cashback?: number | null
          id?: string
          status?: string | null
          title?: string | null
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          first_purchase_cashback?: number | null
          id?: string
          status?: string | null
          title?: string | null
          updated_at?: string | null
          value?: number | null
        }
        Relationships: []
      }
      profile_addresses: {
        Row: {
          cep: string | null
          city: string | null
          complement: string | null
          created_at: string
          id: string
          neighborhood: string | null
          number: string | null
          profile_id: string | null
          state: string | null
          street: string | null
          updated_at: string | null
        }
        Insert: {
          cep?: string | null
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          neighborhood?: string | null
          number?: string | null
          profile_id?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Update: {
          cep?: string | null
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          neighborhood?: string | null
          number?: string | null
          profile_id?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_bank_accounts: {
        Row: {
          created_at: string
          id: string
          key_pix: string | null
          profile_id: string | null
          type_key_pix: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key_pix?: string | null
          profile_id?: string | null
          type_key_pix?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key_pix?: string | null
          profile_id?: string | null
          type_key_pix?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_bank_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_document: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          profile_id: string | null
          side: string | null
          state: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          profile_id?: string | null
          side?: string | null
          state?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          profile_id?: string | null
          side?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_document_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_payments: {
        Row: {
          amount: number | null
          bank_account_id: string | null
          created_at: string
          id: string
          payment_at: string | null
          profile_id: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          bank_account_id?: string | null
          created_at?: string
          id?: string
          payment_at?: string | null
          profile_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          bank_account_id?: string | null
          created_at?: string
          id?: string
          payment_at?: string | null
          profile_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_payments_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "profile_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_referrals: {
        Row: {
          created_at: string
          id: string
          plan_id: string | null
          referred_at: string | null
          referred_profile_id: string | null
          sponsor_profile_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          plan_id?: string | null
          referred_at?: string | null
          referred_profile_id?: string | null
          sponsor_profile_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          plan_id?: string | null
          referred_at?: string | null
          referred_profile_id?: string | null
          sponsor_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_referrals_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_referrals_referred_profile_id_fkey"
            columns: ["referred_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_referrals_sponsor_profile_id_fkey"
            columns: ["sponsor_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean | null
          biometria_verified: boolean | null
          birth_date: string | null
          cpf_cnpj: string | null
          created_at: string
          document_verified: boolean | null
          email: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          phone: string | null
          phone_verified: boolean | null
          referred_code: string | null
          role: string | null
        }
        Insert: {
          active?: boolean | null
          biometria_verified?: boolean | null
          birth_date?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          document_verified?: boolean | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          phone?: string | null
          phone_verified?: boolean | null
          referred_code?: string | null
          role?: string | null
        }
        Update: {
          active?: boolean | null
          biometria_verified?: boolean | null
          birth_date?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          document_verified?: boolean | null
          email?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          phone?: string | null
          phone_verified?: boolean | null
          referred_code?: string | null
          role?: string | null
        }
        Relationships: []
      }
      referrals_commissions: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          plan_cashback_level_id: string | null
          profile_id: string | null
          referral_id: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          plan_cashback_level_id?: string | null
          profile_id?: string | null
          referral_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          plan_cashback_level_id?: string | null
          profile_id?: string | null
          referral_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_commissions_plan_cashback_level_id_fkey"
            columns: ["plan_cashback_level_id"]
            isOneToOne: false
            referencedRelation: "plan_cashback_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_commissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_commissions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "profile_referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription: {
        Row: {
          canceled_at: string | null
          created_at: string
          expires_at: string | null
          external_subscrition_id: string | null
          gateway: string | null
          id: string
          ordem_id: string | null
          plan_id: string | null
          profile_id: string | null
          renewed_at: string | null
          started_at: string | null
          status: string | null
          update_at: string | null
        }
        Insert: {
          canceled_at?: string | null
          created_at?: string
          expires_at?: string | null
          external_subscrition_id?: string | null
          gateway?: string | null
          id?: string
          ordem_id?: string | null
          plan_id?: string | null
          profile_id?: string | null
          renewed_at?: string | null
          started_at?: string | null
          status?: string | null
          update_at?: string | null
        }
        Update: {
          canceled_at?: string | null
          created_at?: string
          expires_at?: string | null
          external_subscrition_id?: string | null
          gateway?: string | null
          id?: string
          ordem_id?: string | null
          plan_id?: string | null
          profile_id?: string | null
          renewed_at?: string | null
          started_at?: string | null
          status?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_ordem_id_fkey"
            columns: ["ordem_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_profile_id_fkey"
            columns: ["profile_id"]
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
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
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
