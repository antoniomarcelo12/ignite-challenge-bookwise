import Link from 'next/link'
import { Binoculars, ChartBar, SignIn } from 'phosphor-react'
import logo from '../../assets/logo.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathName = usePathname()
  return (
    <div
      id="sidebar"
      className="min-w-56 bg-slate-800 rounded-xl flex flex-col items-center p-2"
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

      <button className="font-bold mt-auto flex items-center gap-4 mb-4">
        Fazer login{' '}
        <SignIn className="text-appGreen100" height={24} width={24} />
      </button>
    </div>
  )
}
