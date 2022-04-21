import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { useRouter } from 'next/router'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<any | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
    })

    setInitialLoading(false)
  }, [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredentials.user)
      router.push('/')
    } catch (error: any) {
      console.log(error)
      setError(error?.message || error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredentials.user)
      router.push('/')
    } catch (error: any) {
      console.log(error)
      setError(error?.message || error)
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setUser(null)
    } catch (error: any) {
      console.log(error)
      setError(error?.message || '')
    } finally {
      setLoading(false)
    }
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logOut,
      loading,
      error,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
