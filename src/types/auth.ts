import { User, Session } from '@supabase/supabase-js'

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, options?: SignUpOptions) => Promise<AuthResponse>
  signIn: (email: string, password: string) => Promise<AuthResponse>
  signInWithProvider: (provider: Provider) => Promise<AuthResponse>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<AuthResponse>
  updatePassword: (password: string) => Promise<AuthResponse>
  updateProfile: (updates: ProfileUpdate) => Promise<AuthResponse>
}

export interface AuthResponse {
  data: any
  error: Error | null
  success?: boolean
}

export interface SignUpOptions {
  data?: {
    first_name?: string
    last_name?: string
    full_name?: string
    [key: string]: any
  }
}

export interface ProfileUpdate {
  first_name?: string
  last_name?: string
  full_name?: string
  [key: string]: any
}

export type Provider = 'google' | 'github' | 'facebook' | 'twitter' | 'discord' | 'apple'

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
}

export interface PasswordFormData {
  newPassword: string
  confirmPassword: string
}