'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/db/browser'
import type { Session, User } from '@supabase/supabase-js'

type SupabaseContextType = {
  db: typeof db
  user: User | null
  session: Session | null
  textsMap?: Record<string, string>
  refreshTexts?: () => Promise<void>
  signInWithPassword: (email: string, password: string) => ReturnType<typeof db.auth.signInWithPassword>
  signOut: () => ReturnType<typeof db.auth.signOut>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [textsMap, setTextsMap] = useState<Record<string, string>>({})

  const signInWithPassword = (email: string, password: string) =>
    db.auth.signInWithPassword({ email, password })

  const signOut = () => db.auth.signOut()

  // fetch page texts once and expose as a map keyed by `text_key`
  const fetchTexts = async () => {
    try {
      const res = await fetch('/api/texts', { cache: 'no-store' })
      if (!res.ok) return
      // API now returns a map keyed by normalized text_key -> text
      const data = await res.json()
      setTextsMap(data ?? {})
    } catch (e) {
      console.error('Failed to load page texts', e)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchTexts()
    })()
  }, [])

  return (
    <SupabaseContext.Provider value={{ db, user, session, textsMap, refreshTexts: fetchTexts, signInWithPassword, signOut }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext)
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider')
  return ctx
}