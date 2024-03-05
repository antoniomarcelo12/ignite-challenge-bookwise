'use client'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default async function Index() {
  const router = useRouter()
  const session = useSession()

  if (session.status === 'authenticated') {
    router.push('/home')
    return
  }
  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  if (session.status === 'unauthenticated') {
    router.push('/login')
  }
}
