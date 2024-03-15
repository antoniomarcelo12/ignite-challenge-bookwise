import Link from 'next/link'
import { Binoculars, ChartBar, SignIn, SignOut } from 'phosphor-react'
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LoginDialog } from './LoginDialog'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

export function Sidebar() {
  const pathName = usePathname()
  const [isLoginDialogOpen, onLoginDialogOpenChange] = useState(false)

  const session = useSession()

  if (session.status === 'loading') {
    return
  }

  return (
    <div
      id="sidebar"
      className="w-[calc(100vw - 12px)] gap-10 justify-between h-16 lg:h-[calc(100vh-20px)] lg:w-56 lg:min-w-56 bg-slate-800 rounded-xl flex lg:flex-col lg:items-center p-2 shadow-lg"
    >
      <h1 className="flex items-center lg:mb-20 lg:mt-5 gap-2">
        <Image src={logo} alt="" /> Bookwise
      </h1>

      <div className="flex lg:flex-col gap-3">
        <Link href="/home" className="flex items-center gap-2 relative">
          {pathName === '/home' && (
            <div className="h-[3px] w-full bottom-0 left-0 right-0 lg:h-full lg:w-[3px] bg-slate-600 absolute lg:top-0 lg:-left-3" />
          )}
          <ChartBar /> Início
        </Link>
        <Link href="/explore" className="flex items-center gap-2 relative">
          {pathName === '/explore' && (
            <div className="h-[3px] w-full bottom-0 lg:h-full lg:w-[3px] bg-slate-600 absolute lg:top-0 lg:-left-3" />
          )}
          <Binoculars /> Explorar
        </Link>
      </div>

      {session.status === 'authenticated' && (
        <div className="lg:mt-auto flex lg:justify-between items-center lg:mb-4 gap-3 px-2 lg:w-full">
          <Image
            className="rounded-full w-8 h-8 border-2 border-gray-100"
            src={session.data.user?.image ?? ''}
            width={32}
            height={32}
            alt=""
          />
          <Link
            href={`/profile/${session.data.user?.id}`}
            className="max-w-[60%] truncate text-sm"
          >
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
        label="Faça login para utilizar todas as nossas funcionalidades!"
        isLoginDialogOpen={isLoginDialogOpen}
        onLoginDialogOpenChange={onLoginDialogOpenChange}
      />
    </div>
  )
}
