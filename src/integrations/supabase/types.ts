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
      asaas_account_logs: {
        Row: {
          asaas_account_id: string | null
          asaas_account_token: string | null
          created_at: string | null
          creation_status: string
          error_message: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          asaas_account_id?: string | null
          asaas_account_token?: string | null
          created_at?: string | null
          creation_status?: string
          error_message?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          asaas_account_id?: string | null
          asaas_account_token?: string | null
          created_at?: string | null
          creation_status?: string
          error_message?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asaas_account_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      customer_lines: {
        Row: {
          cpf: string | null
          created_at: string
          customer_name: string
          data_limit: number | null
          data_used: number | null
          email: string | null
          id: string
          phone_number: string
          plan_name: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          customer_name: string
          data_limit?: number | null
          data_used?: number | null
          email?: string | null
          id?: string
          phone_number: string
          plan_name?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cpf?: string | null
          created_at?: string
          customer_name?: string
          data_limit?: number | null
          data_used?: number | null
          email?: string | null
          id?: string
          phone_number?: string
          plan_name?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      data_usage: {
        Row: {
          active_plan_code: string | null
          active_plan_name: string | null
          bonus_expiration_date: string | null
          bonus_package_mb: number | null
          bonus_usage_mb: number | null
          created_at: string
          id: string
          last_updated: string
          notification_sent: boolean | null
          phone_number: string
          plan_renewal_date: string | null
          total_package_mb: number
          usage_mb: number
          user_id: string | null
        }
        Insert: {
          active_plan_code?: string | null
          active_plan_name?: string | null
          bonus_expiration_date?: string | null
          bonus_package_mb?: number | null
          bonus_usage_mb?: number | null
          created_at?: string
          id?: string
          last_updated?: string
          notification_sent?: boolean | null
          phone_number: string
          plan_renewal_date?: string | null
          total_package_mb?: number
          usage_mb?: number
          user_id?: string | null
        }
        Update: {
          active_plan_code?: string | null
          active_plan_name?: string | null
          bonus_expiration_date?: string | null
          bonus_package_mb?: number | null
          bonus_usage_mb?: number | null
          created_at?: string
          id?: string
          last_updated?: string
          notification_sent?: boolean | null
          phone_number?: string
          plan_renewal_date?: string | null
          total_package_mb?: number
          usage_mb?: number
          user_id?: string | null
        }
        Relationships: []
      }
      device_eid_patterns: {
        Row: {
          brand: string
          created_at: string | null
          device_type: string
          eid_pattern: string
          id: string
          model: string
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          device_type: string
          eid_pattern: string
          id?: string
          model: string
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          device_type?: string
          eid_pattern?: string
          id?: string
          model?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      device_identifiers: {
        Row: {
          created_at: string | null
          device_type: string
          eid_pattern: string
          id: string
          imei_pattern: string
          updated_at: string | null
          valid_eids: string[] | null
          valid_imeis: string[] | null
        }
        Insert: {
          created_at?: string | null
          device_type: string
          eid_pattern: string
          id?: string
          imei_pattern: string
          updated_at?: string | null
          valid_eids?: string[] | null
          valid_imeis?: string[] | null
        }
        Update: {
          created_at?: string | null
          device_type?: string
          eid_pattern?: string
          id?: string
          imei_pattern?: string
          updated_at?: string | null
          valid_eids?: string[] | null
          valid_imeis?: string[] | null
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
      esim_activations: {
        Row: {
          activation_type: string | null
          created_at: string | null
          device_type: string | null
          eid: string | null
          help_instructions: Json | null
          id: string
          imei: string | null
          phone_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activation_type?: string | null
          created_at?: string | null
          device_type?: string | null
          eid?: string | null
          help_instructions?: Json | null
          id?: string
          imei?: string | null
          phone_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activation_type?: string | null
          created_at?: string | null
          device_type?: string | null
          eid?: string | null
          help_instructions?: Json | null
          id?: string
          imei?: string | null
          phone_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      esim_compatible_devices: {
        Row: {
          brand: string
          created_at: string | null
          device_type: string
          esim_support: boolean | null
          id: string
          model: string
          release_year: number | null
          updated_at: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          device_type: string
          esim_support?: boolean | null
          id?: string
          model: string
          release_year?: number | null
          updated_at?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          device_type?: string
          esim_support?: boolean | null
          id?: string
          model?: string
          release_year?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      imei_device_info: {
        Row: {
          brand: string | null
          check_digit: string
          device_specs: Json | null
          device_type: string | null
          id: number
          imei: string
          is_valid: boolean | null
          last_updated: string | null
          model: string | null
          serial_number: string
          tac: string
        }
        Insert: {
          brand?: string | null
          check_digit: string
          device_specs?: Json | null
          device_type?: string | null
          id?: number
          imei: string
          is_valid?: boolean | null
          last_updated?: string | null
          model?: string | null
          serial_number: string
          tac: string
        }
        Update: {
          brand?: string | null
          check_digit?: string
          device_specs?: Json | null
          device_type?: string | null
          id?: number
          imei?: string
          is_valid?: boolean | null
          last_updated?: string | null
          model?: string | null
          serial_number?: string
          tac?: string
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
      phone_verifications: {
        Row: {
          created_at: string
          id: string
          phone_number: string
          updated_at: string
          user_id: string | null
          verification_code: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          phone_number: string
          updated_at?: string
          user_id?: string | null
          verification_code?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          phone_number?: string
          updated_at?: string
          user_id?: string | null
          verification_code?: string | null
          verified?: boolean | null
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
          fixed_value: number | null
          id: string
          level: number
          percentage: number | null
          plan_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fixed_value?: number | null
          id?: string
          level: number
          percentage?: number | null
          plan_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fixed_value?: number | null
          id?: string
          level?: number
          percentage?: number | null
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
          asaas_account_created_at: string | null
          asaas_account_id: string | null
          asaas_account_token: string | null
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
          asaas_account_created_at?: string | null
          asaas_account_id?: string | null
          asaas_account_token?: string | null
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
          asaas_account_created_at?: string | null
          asaas_account_id?: string | null
          asaas_account_token?: string | null
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
      terms_acceptance: {
        Row: {
          accepted: boolean
          accepted_at: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          receive_communications: boolean
          user_id: string
        }
        Insert: {
          accepted?: boolean
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          receive_communications?: boolean
          user_id: string
        }
        Update: {
          accepted?: boolean
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          receive_communications?: boolean
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
      usage_history: {
        Row: {
          bonus_used: number | null
          created_at: string
          data_used: number
          id: string
          phone_line_id: string | null
          recorded_at: string
        }
        Insert: {
          bonus_used?: number | null
          created_at?: string
          data_used: number
          id?: string
          phone_line_id?: string | null
          recorded_at?: string
        }
        Update: {
          bonus_used?: number | null
          created_at?: string
          data_used?: number
          id?: string
          phone_line_id?: string | null
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_history_phone_line_id_fkey"
            columns: ["phone_line_id"]
            isOneToOne: false
            referencedRelation: "phone_lines"
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
      user_groups: {
        Row: {
          created_at: string | null
          group_name: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          group_name: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          group_name?: string
          id?: string
          user_id?: string | null
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
      check_device_compatibility: {
        Args: { p_brand: string; p_model: string; p_device_type: string }
        Returns: {
          is_compatible: boolean
          device_brand: string
          device_model: string
          release_year: number
        }[]
      }
      delete_user_and_profile: {
        Args: { user_id: string }
        Returns: undefined
      }
      delete_user_and_related_data: {
        Args: { user_id: string }
        Returns: undefined
      }
      get_all_network_members: {
        Args: { root_network_id: string }
        Returns: {
          id: string
          user_id: string
          parent_id: string
          level: number
        }[]
      }
      parse_imei: {
        Args: { p_imei: string }
        Returns: {
          is_valid: boolean
          tac: string
          serial_number: string
          check_digit: string
          brand: string
          model: string
        }[]
      }
      validate_device_identifier: {
        Args: {
          p_device_type: string
          p_identifier_type: string
          p_value: string
        }
        Returns: {
          is_valid: boolean
          brand: string
          model: string
          device_info: Json
        }[]
      }
      validate_esim_device: {
        Args: { p_imei: string }
        Returns: {
          is_valid: boolean
          brand: string
          model: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
