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
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string
          id?: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string
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
          created_at: string
          custom_id: string | null
          document_id: string | null
          document_validated: boolean | null
          document_validation_date: string | null
          email: string
          external_id: string | null
          full_name: string | null
          gender: string | null
          graduation_type: string | null
          id: string
          license_type: string | null
          mobile: string | null
          monthly_graduation: boolean | null
          person_type: string | null
          phone: string | null
          registration_date: string | null
          role: string
          sponsor_id: string | null
          state: string | null
          status: string | null
          updated_at: string
          voucher: string | null
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
          created_at?: string
          custom_id?: string | null
          document_id?: string | null
          document_validated?: boolean | null
          document_validation_date?: string | null
          email: string
          external_id?: string | null
          full_name?: string | null
          gender?: string | null
          graduation_type?: string | null
          id: string
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
          person_type?: string | null
          phone?: string | null
          registration_date?: string | null
          role?: string
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          voucher?: string | null
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
          created_at?: string
          custom_id?: string | null
          document_id?: string | null
          document_validated?: boolean | null
          document_validation_date?: string | null
          email?: string
          external_id?: string | null
          full_name?: string | null
          gender?: string | null
          graduation_type?: string | null
          id?: string
          license_type?: string | null
          mobile?: string | null
          monthly_graduation?: boolean | null
          person_type?: string | null
          phone?: string | null
          registration_date?: string | null
          role?: string
          sponsor_id?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          voucher?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      [_ in never]: never
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
