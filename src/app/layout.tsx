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
      <body className={cn('p-3 bg-background font-sans antialiased dark')}>
        <SessionWrapper>
          <div className="flex-col flex lg:flex-row max-w-screen gap-20">
            {location !== '/login' && location !== '/' && <Sidebar />}

            {children}
          </div>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  )
}
