import { NextResponse } from 'next/server'
import { supabaseServerClient } from '@/lib/db/server'

export async function GET() {
	const supabase = await supabaseServerClient()

	const { data, error } = await supabase.auth.getUser()
	if (error) return NextResponse.json({ error: error.message }, { status: 401 })

	const user = data.user
	if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

	const { data: admins, error: adminsErr } = await supabase
		.from('profiles')
		.select('user_id')
		.eq('user_id', user.id)
		.limit(1)
	if (adminsErr) return NextResponse.json({ error: adminsErr.message }, { status: 500 })
	if (!admins || admins.length === 0) {
		if (process.env.NODE_ENV !== 'production') {
			return NextResponse.json(
				{
					error: 'Forbidden',
					uid: user.id,
					checked: {
						table: 'profiles',
						where: { user_id: user.id },
					},
				},
				{ status: 403 }
			)
		}
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
	}

	return NextResponse.json({ user })
}