export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calendar_styles: {
        Row: {
          active: boolean | null
          border_radius: string
          created_at: string
          date_font_size: string
          hover_color: string
          id: string
          name: string
          theme_color: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          border_radius: string
          created_at?: string
          date_font_size: string
          hover_color: string
          id?: string
          name: string
          theme_color: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          border_radius?: string
          created_at?: string
          date_font_size?: string
          hover_color?: string
          id?: string
          name?: string
          theme_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      camera_capabilities: {
        Row: {
          created_at: string | null
          device_id: string | null
          facing_mode: string | null
          id: string
          max_height: number | null
          max_width: number | null
          min_height: number | null
          min_width: number | null
          supported_constraints: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          facing_mode?: string | null
          id?: string
          max_height?: number | null
          max_width?: number | null
          min_height?: number | null
          min_width?: number | null
          supported_constraints?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          facing_mode?: string | null
          id?: string
          max_height?: number | null
          max_width?: number | null
          min_height?: number | null
          min_width?: number | null
          supported_constraints?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
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
      earnings_settings: {
        Row: {
          active_earnings_color: string
          active_earnings_label: string
          created_at: string
          id: string
          pending_earnings_color: string
          pending_earnings_label: string
          total_earnings_color: string
          total_earnings_label: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active_earnings_color?: string
          active_earnings_label?: string
          created_at?: string
          id?: string
          pending_earnings_color?: string
          pending_earnings_label?: string
          total_earnings_color?: string
          total_earnings_label?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active_earnings_color?: string
          active_earnings_label?: string
          created_at?: string
          id?: string
          pending_earnings_color?: string
          pending_earnings_label?: string
          total_earnings_color?: string
          total_earnings_label?: string
          updated_at?: string
          user_id?: string
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
      office_access_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          password_action: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          password_action?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          password_action?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          approval_date: string | null
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
          kba_verified: boolean | null
          license_type: string | null
          mobile: string | null
          monthly_graduation: boolean | null
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
          address?: string | null
          approval_date?: string | null
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
          kba_verified?: boolean | null
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
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
          address?: string | null
          approval_date?: string | null
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
          kba_verified?: boolean | null
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
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
      store_orders: {
        Row: {
          amount: number
          buyer_email: string
          buyer_name: string
          created_at: string | null
          currency: string
          id: string
          product_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_email: string
          buyer_name: string
          created_at?: string | null
          currency: string
          id?: string
          product_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_email?: string
          buyer_name?: string
          created_at?: string | null
          currency?: string
          id?: string
          product_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "store_products"
            referencedColumns: ["id"]
          },
        ]
      }
      store_products: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          order: number
          price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          order: number
          price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          order?: number
          price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_verifications: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          id: string
          last_attempt_at: string | null
          status: string
          updated_at: string | null
          user_id: string | null
          verification_data: Json | null
          verification_type: Database["public"]["Enums"]["verification_type"]
          verified_at: string | null
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          id?: string
          last_attempt_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
          verification_data?: Json | null
          verification_type: Database["public"]["Enums"]["verification_type"]
          verified_at?: string | null
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          id?: string
          last_attempt_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
          verification_data?: Json | null
          verification_type?: Database["public"]["Enums"]["verification_type"]
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_set_user_password: {
        Args: {
          admin_user_id: string
          target_user_id: string
          new_password: string
        }
        Returns: undefined
      }
      delete_user_and_profile: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      get_all_network_members: {
        Args: {
          root_network_id: string
        }
        Returns: {
          id: string
          user_id: string
          parent_id: string
          level: number
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
