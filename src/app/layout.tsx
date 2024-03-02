'use client'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Sidebar } from './components/Sidebar'

import { cn } from '../lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased dark',
          fontSans.variable,
        )}
      >
        <div className="p-3 flex max-w-screen h-screen gap-20">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
