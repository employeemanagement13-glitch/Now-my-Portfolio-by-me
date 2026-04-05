// lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface AttachedLink {
  url: string
  label: string
}

export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          company: string
          description: string
          profile_image_url: string | null
          logo_image_url: string | null
          order_index: number
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          company: string
          description: string
          profile_image_url?: string | null
          logo_image_url?: string | null
          order_index?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          company?: string
          description?: string
          profile_image_url?: string | null
          logo_image_url?: string | null
          order_index?: number
          is_active?: boolean
        }
      }
      works: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          category: string
          image_url: string | null
          icon_svg: string | null
          link: string | null
          order_index: number
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          category: string
          image_url?: string | null
          icon_svg?: string | null
          link?: string | null
          order_index?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          category?: string
          image_url?: string | null
          icon_svg?: string | null
          link?: string | null
          order_index?: number
          is_active?: boolean
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
          is_read: boolean
          replied_at: string | null
          reply_message: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
          is_read?: boolean
          replied_at?: string | null
          reply_message?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
          is_read?: boolean
          replied_at?: string | null
          reply_message?: string | null
          metadata?: Json | null
        }
      }
    }
  }
}

export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type Work = Database['public']['Tables']['works']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
