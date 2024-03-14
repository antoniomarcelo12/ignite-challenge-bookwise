import Image from 'next/image'
import { BookOpen, Bookmarks } from 'phosphor-react'
import { getYear } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { GetProfileResponse } from '@/interfaces/User'

interface ProfileSummaryProps {
  userData: GetProfileResponse | undefined
}

export function ProfileSummary({ userData }: ProfileSummaryProps) {
  const [mostReadCategory, setMostReadCategory] = useState<string[]>([])
  const { userid } = useParams()

  useEffect(() => {
    async function getMostReadCategories() {
      const response = await api.get(
        `/api/profile/get-most-read-category/${userid}`,
      )
      setMostReadCategory(response.data.mostReadCategoriesArray)
    }
    getMostReadCategories()
  }, [userid])

  const mostReadCategoriesString = mostReadCategory
    .toString()
    .replace(',', ', ')

  return (
    <div className="flex flex-col w-[324px] mt-48 border-l-[1px] max-h-screen px-10 border-gray-700">
      <div className="flex flex-col items-center">
        <div className="w-[72px] h-[72px] border-4 border-blue-200 rounded-full overflow-hidden">
          {userData?.userData.image && (
            <Image
              src={userData?.userData.image ?? ''}
              alt=""
              height={72}
              width={72}
            />
          )}
        </div>
        <h1 className="font-bold text-xl mt-6 text-gray-100">
          {userData?.userData.name}
        </h1>
        <p className="text-gray-400 mt-1">
          Mebro desde{' '}
          {userData?.userData.createdAt &&
            getYear(userData?.userData.createdAt)}
        </p>
      </div>
      <div className="ml-auto mr-auto w-10 h-[4px] rounded-lg bg-blue-400 my-10" />
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <BookOpen color="#50B2C0" size={32} />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-200">
              {userData?.totalPagesRead}
            </h1>
            <p className="text-gray-300">Páginas lidas</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bookmarks color="#50B2C0" size={32} />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-200">{userData?.booksRated}</h1>
            <p className="text-gray-300">Livros avaliados</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bookmarks color="#50B2C0" size={32} />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-200">{userData?.booksRated}</h1>
            <p className="text-gray-300">Autores lidos</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Bookmarks color="#50B2C0" size={32} />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-200">
              {mostReadCategoriesString}
            </h1>
            <p className="text-gray-300">
              Categoria{mostReadCategory.length > 1 ? 's' : ''} mais lida
              {mostReadCategory.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
