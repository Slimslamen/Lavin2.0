'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/db/browser'
import type { Session, User } from '@supabase/supabase-js'

function normalizeTextKey(input: string) {
  return String(input ?? '')
    .replace(/[^\w]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
}

type SupabaseContextType = {
  db: typeof db
  user: User | null
  session: Session | null
  isAdmin: boolean
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
  serverTextsMap?: Record<string, string>
  textsMap?: Record<string, string>
  draftTextsMap?: Record<string, string>
  setDraftText?: (textKey: string, text: string) => void
  clearDraftText?: (textKey: string) => void
  clearAllDraftTexts?: () => void
  saveDraftTexts?: () => Promise<{ success: true; saved: number } | { success: false; error: string }>
  refreshTexts?: () => Promise<void>
  signInWithPassword: (email: string, password: string) => ReturnType<typeof db.auth.signInWithPassword>
  signOut: () => ReturnType<typeof db.auth.signOut>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [serverTextsMap, setServerTextsMap] = useState<Record<string, string>>({})
  const [draftTextsMap, setDraftTextsMap] = useState<Record<string, string>>({})

  const textsMap = { ...serverTextsMap, ...draftTextsMap }

  const setDraftText = (textKey: string, text: string) => {
    const normalizedKey = normalizeTextKey(textKey)
    setDraftTextsMap((prev) => ({ ...prev, [normalizedKey]: text }))
  }

  const clearDraftText = (textKey: string) => {
    const normalizedKey = normalizeTextKey(textKey)
    setDraftTextsMap((prev) => {
      if (!(normalizedKey in prev)) return prev
      const next = { ...prev }
      delete next[normalizedKey]
      return next
    })
  }

  const clearAllDraftTexts = () => {
    setDraftTextsMap({})
  }

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
      setServerTextsMap(data ?? {})
    } catch (e) {
      console.error('Failed to load page texts', e)
    }
  }

  const saveDraftTexts = async () => {
    try {
      const drafts = draftTextsMap ?? {}
      const keys = Object.keys(drafts)
      if (keys.length === 0) return { success: true as const, saved: 0 }

      const res = await fetch('/api/texts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: drafts, published: true }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        const message = typeof data?.error === 'string' ? data.error : 'Failed to save'
        return { success: false as const, error: message }
      }

      const saved = typeof data?.saved === 'number' ? data.saved : keys.length
      clearAllDraftTexts()
      await fetchTexts()
      return { success: true as const, saved }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      return { success: false as const, error: message }
    }
  }

  const refreshAdmin = async (hasSession: boolean) => {
    if (!hasSession) {
      setIsAdmin(false)
      return
    }

    try {
      const res = await fetch('/api/admin/user', { cache: 'no-store' })
      setIsAdmin(res.ok)
    } catch {
      setIsAdmin(false)
    }
  }

  useEffect(() => {

    let isMounted = true

    ;(async () => {
      const { data } = await db.auth.getSession()
      if (!isMounted) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      await refreshAdmin(!!data.session)
      await fetchTexts()
    })()

    const { data: sub } = db.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      refreshAdmin(!!newSession)
      // refresh texts after login/logout
      fetchTexts()
    })

    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider
      value={{
        db,
        user,
        session,
        isAdmin,
        setIsAdmin,
        serverTextsMap,
        textsMap,
        draftTextsMap,
        setDraftText,
        clearDraftText,
        clearAllDraftTexts,
        saveDraftTexts,
        refreshTexts: fetchTexts,
        signInWithPassword,
        signOut,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext)
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider')
  return ctx
}