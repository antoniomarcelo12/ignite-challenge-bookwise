'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    router.push('/login')
  }, [router])

  return <h1>loading...</h1>
}
