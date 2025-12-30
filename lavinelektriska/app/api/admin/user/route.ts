import { NextResponse } from 'next/server'
import { supabaseServerClient } from '@/lib/db/server'

/**
 * GET /api/admin/user
 * - Uses server Supabase client to read the currently authenticated user from the session
 * - Returns 200 with user object if authenticated and present in `admins` table
 * - Returns 401 if no authenticated user
 * - Returns 403 if user is not an admin
 *
 * Adjust role check to your project's schema (roles column, `admins` table, or custom claim).
 */
export async function GET(req: Request) {
  try {
    const supabase = await supabaseServerClient()

    // Get current session user (via server client)
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr) return NextResponse.json({ error: userErr.message }, { status: 500 })
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { data: admins, error: adminsErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .limit(1)

    if (adminsErr) return NextResponse.json({ error: adminsErr.message }, { status: 500 })
    if (!admins || admins.length === 0) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({ user })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
