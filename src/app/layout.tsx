'use client'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Sidebar } from './components/Sidebar'

import { cn } from '../lib/utils'
import { usePathname } from 'next/navigation'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const location = usePathname()
  return (
    <html lang="en">
      <body
        className={cn(
          ' bg-background font-sans antialiased dark',
          fontSans.variable,
        )}
      >
        <div className="p-3 flex max-w-screen h-screen gap-20">
          {location !== '/login' && <Sidebar />}

          {children}
        </div>
      </body>
    </html>
  )
}
