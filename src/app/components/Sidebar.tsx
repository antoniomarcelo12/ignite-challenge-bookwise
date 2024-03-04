import Link from 'next/link'
import { Binoculars, ChartBar, SignIn, SignOut } from 'phosphor-react'
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LoginDialog } from './LoginDialog'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export function Sidebar() {
  const pathName = usePathname()
  const [isLoginDialogOpen, onLoginDialogOpenChange] = useState(false)

  const session = useSession()

  return (
    <div
      id="sidebar"
      className="w-56 min-w-56 bg-slate-800 rounded-xl flex flex-col items-center p-2"
    >
      <h1 className="flex items-center mb-20 mt-5 gap-2">
        <Image src={logo} alt="" /> Bookwise
      </h1>
      <div className="flex flex-col gap-3">
        <Link href="/home" className="flex items-center gap-2 relative">
          {pathName === '/home' && (
            <div className="h-full w-[3px] bg-slate-600 absolute top-0 -left-3" />
          )}
          <ChartBar /> Início
        </Link>
        <Link href="/explore" className="flex items-center gap-2 relative">
          {pathName === '/explore' && (
            <div className="h-full w-[3px] bg-slate-600 absolute top-0 -left-3" />
          )}
          <Binoculars /> Explorar
        </Link>
      </div>

      {session.status === 'authenticated' && (
        <div className="mt-auto flex justify-between items-center mb-4 px-2 w-full">
          <Image
            className="rounded-full w-8 h-8 border-2 border-gray-100"
            src={session.data.user?.image ?? ''}
            width={32}
            height={32}
            alt=""
          />
          <Link href="/profile" className="max-w-[60%] truncate text-sm">
            {session.data.user?.name}
          </Link>
          <button
            onClick={() => signOut()}
            className="font-bold flex items-center"
          >
            <SignOut className="text-red-600" height={24} width={24} />
          </button>
        </div>
      )}

      {session.status === 'loading' && (
        <Loader2 className="mt-auto mb-4 animate-spin" />
      )}
      {session.status === 'unauthenticated' && (
        <button
          onClick={() => onLoginDialogOpenChange(true)}
          className="font-bold mt-auto flex items-center gap-4 mb-4"
        >
          Fazer login
          <SignIn className="text-appGreen100" height={24} width={24} />
        </button>
      )}

      <LoginDialog
        isLoginDialogOpen={isLoginDialogOpen}
        onLoginDialogOpenChange={onLoginDialogOpenChange}
      />
    </div>
  )
}
