'use client'
import { BookOpen, Bookmarks, User } from 'phosphor-react'
import Image from 'next/image'
import { RatingBookItem } from '../home/RatingBookItem'
import { Input } from '../components/Input'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const session = useSession()
  const router = useRouter()
  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  if (session.status === 'unauthenticated') {
    router.push('/login')
    return
  }

  return (
    <div className="flex gap-44 h-screen">
      <div id="main" className="max-h-full">
        <div className="mt-24">
          <h1 className="mb-14 flex items-center text-gray-100 gap-3 text-3xl font-bold">
            <User className="text-appGreen100" /> Perfil
          </h1>
          <Input placeholder="Buscar livro avaliado" />
        </div>
        <div className="space-y-3">
          <RatingBookItem isProfilePage={true} />
          <RatingBookItem isProfilePage={true} />
          <RatingBookItem isProfilePage={true} />
          <RatingBookItem isProfilePage={true} />
        </div>
      </div>
      <div className="flex flex-col w-[324px] mt-48 border-l-[1px] max-h-screen px-10 border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-[72px] h-[72px] border-4 border-blue-200 rounded-full overflow-hidden">
            <Image
              src={session.data?.user?.image ?? ''}
              alt=""
              height={72}
              width={72}
            />
          </div>
          <h1 className="font-bold text-xl mt-6 text-gray-100">
            {session.data?.user?.name}
          </h1>
          <p className="text-gray-400 mt-1">Mebro desde 2049</p>
        </div>
        <div className="ml-auto mr-auto w-10 h-[4px] rounded-lg bg-blue-400 my-10" />
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <BookOpen color="#50B2C0" size={32} />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-200">3800</h1>
              <p className="text-gray-300">Páginas lidas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bookmarks color="#50B2C0" size={32} />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-200">10</h1>
              <p className="text-gray-300">Livros avaliados</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bookmarks color="#50B2C0" size={32} />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-200">8</h1>
              <p className="text-gray-300">Autores lidos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bookmarks color="#50B2C0" size={32} />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-200">Computação</h1>
              <p className="text-gray-300">Categoria mais lida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
