import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabasepublishablekey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''

if (!supabaseUrl || !supabasepublishablekey) {
  console.warn('Supabase credentials missing. Check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabasepublishablekey)
