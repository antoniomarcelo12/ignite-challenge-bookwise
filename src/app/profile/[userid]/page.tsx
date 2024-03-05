'use client'
import { BookOpen, Bookmarks, User } from 'phosphor-react'
import Image from 'next/image'
import { RatingBookItem } from '../../home/RatingBookItem'
import { Input } from '../../components/Input'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { GetUserAvaliationsResponse } from '@/interfaces/Book'
import { getYear } from 'date-fns'

interface UserDataType {
  userData: {
    createdAt: string
    id: string
    image: string
    name: string
  }
  totalPagesRead: number
  booksRated: number
}

export default function Profile() {
  const session = useSession()
  const router = useRouter()
  const { userid } = useParams()
  const [userData, setUserData] = useState<UserDataType>()
  const [searchString, setSearchString] = useState('')

  const [userRatings, setUserRatings] = useState<GetUserAvaliationsResponse[]>(
    [],
  )
  const [userRatingsFiltered, setUserRatingsFiltered] = useState<
    GetUserAvaliationsResponse[]
  >([])

  async function getProfile() {
    const response = await api.get(`/api/profile/get-profile/${userid}`)
    setUserData(response.data)
  }

  useEffect(() => {
    const newArray = userRatings.filter((rating) => {
      return rating.book.name.includes(searchString)
    })
    setUserRatingsFiltered(newArray)
  }, [searchString])

  useEffect(() => {
    getProfile()
    const userRatingFiltered = userRatings.filter(
      (rating) => rating.user_id === userid,
    )
    setUserRatings(userRatingFiltered)
  }, [userid])

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUserAvaliations()
    }
  }, [session.status])

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

  async function getUserAvaliations() {
    const response = await api.get(
      `/api/books/get-user-recent-avaliations?userid=${userid}`,
    )
    setUserRatings(response.data.recentBookAvaliations)
  }

  return (
    <div className="flex gap-44 h-screen">
      <div id="main" className="max-h-full min-w-[680px]">
        <div className="mt-24">
          <h1 className="mb-14 flex items-center text-gray-100 gap-3 text-3xl font-bold">
            <User className="text-appGreen100" /> Perfil
          </h1>
          <Input
            setSearchString={setSearchString}
            placeholder="Buscar livro avaliado"
          />
        </div>
        <div className="space-y-3">
          {userRatingsFiltered.length === 0 && searchString.length > 0 && (
            <h1>Nada a mostrar aqui</h1>
          )}
          {userRatingsFiltered.length > 0 &&
            userRatingsFiltered.map((rating, idx) => {
              return (
                <RatingBookItem
                  key={idx}
                  bookAvaliation={rating}
                  isProfilePage={true}
                />
              )
            })}
          {userRatingsFiltered.length === 0 &&
            searchString.length === 0 &&
            userRatings.map((rating, idx) => {
              return (
                <RatingBookItem
                  key={idx}
                  bookAvaliation={rating}
                  isProfilePage={true}
                />
              )
            })}
        </div>
      </div>
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
              <h1 className="font-bold text-gray-200">
                {userData?.booksRated}
              </h1>
              <p className="text-gray-300">Livros avaliados</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bookmarks color="#50B2C0" size={32} />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-200">
                {userData?.booksRated}
              </h1>
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
