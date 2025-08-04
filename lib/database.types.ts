
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          artworkName: string | null
          artworkUrl: string | null
          bagType: string
          businessAddress: string
          color: string
          date: string
          handleType: string
          height: number
          id: string
          material: string
          quantity: number
          status: Database["public"]["Enums"]["order_status"]
          totalPrice: number
          userId: string
          width: number
        }
        Insert: {
          artworkName?: string | null
          artworkUrl?: string | null
          bagType: string
          businessAddress: string
          color: string
          date: string
          handleType: string
          height: number
          id?: string
          material: string
          quantity: number
          status?: Database["public"]["Enums"]["order_status"]
          totalPrice: number
          userId: string
          width: number
        }
        Update: {
          artworkName?: string | null
          artworkUrl?: string | null
          bagType?: string
          businessAddress?: string
          color?: string
          date?: string
          handleType?: string
          height?: number
          id?: string
          material?: string
          quantity?: number
          status?: Database["public"]["Enums"]["order_status"]
          totalPrice?: number
          userId?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          business_address: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
        }
        Insert: {
          business_address?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          business_address?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      order_status: "Pending" | "Completed" | "Cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
