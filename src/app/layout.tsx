'use client'
import './globals.css'
import { Sidebar } from './components/Sidebar'
import { cn } from '../lib/utils'
import { usePathname } from 'next/navigation'
import SessionWrapper from './components/auth/SessionProvider'
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const location = usePathname()

  return (
    <html lang="en">
      <body className={cn(' bg-background font-sans antialiased dark')}>
        <SessionWrapper>
          <div className="p-3 flex max-w-screen h-screen gap-20">
            {location !== '/login' && location !== '/' && <Sidebar />}

            {children}
          </div>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  )
}
