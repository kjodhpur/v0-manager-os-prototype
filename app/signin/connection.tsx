import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://sollwbnyltjcdcosdovi.supabase.co',
  'sb_publishable_d-uBm3JKWWsRNi97pW4wig_JGkdAjQJ'
)

export async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}

export async function logout() {
  await supabase.auth.signOut()
}

export async function getAccessToken() {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token
}

// Use this to get any data needed
export async function fetchUserData() {
  const token = await getAccessToken()

  const res = await fetch('http://localhost:5000/api/index', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await res.json()
}