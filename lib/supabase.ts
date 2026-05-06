import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabaseClient: any = null

if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey) {
  // Only initialize on client-side
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
} else if (!supabaseUrl || !supabaseAnonKey) {
  // Mock client for development/build time
  supabaseClient = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ limit: () => ({ data: [], error: null }) }) }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null }),
    }),
  }
}

export const supabase = supabaseClient

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_color?: string
        }
        Update: {
          username?: string
          avatar_color?: string
        }
      }
      game_scores: {
        Row: {
          id: string
          user_id: string
          mode: 'classic' | 'timed' | 'survival'
          score: number
          final_length: number
          duration_seconds: number
          powerups_used: string[]
          created_at: string
        }
        Insert: {
          user_id: string
          mode: 'classic' | 'timed' | 'survival'
          score: number
          final_length: number
          duration_seconds: number
          powerups_used: string[]
        }
      }
      leaderboard_cache: {
        Row: {
          id: string
          mode: 'classic' | 'timed' | 'survival'
          user_id: string
          username: string
          score: number
          final_length: number
          duration_seconds: number
          rank: number
          updated_at: string
        }
      }
    }
  }
}
