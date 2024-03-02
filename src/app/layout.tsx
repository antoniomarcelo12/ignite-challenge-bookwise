'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-3 flex max-w-screen h-screen gap-20">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
