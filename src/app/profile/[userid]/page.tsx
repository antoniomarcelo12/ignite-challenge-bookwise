'use client'
import { User } from 'phosphor-react'
import { RatingBookItem } from '../../home/RatingBookItem'
import { Input } from '../../components/Input'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { GetUserAvaliationsResponse } from '@/interfaces/Book'
import { ProfileSummary } from './profileSummary'
import { GetProfileResponse } from '@/interfaces/User'

export default function Profile() {
  const session = useSession()
  const router = useRouter()
  const { userid } = useParams()
  const [userData, setUserData] = useState<GetProfileResponse>()
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

  async function getUserAvaliations() {
    const response = await api.get(
      `/api/books/get-user-recent-avaliations/${userid}`,
    )
    setUserRatings(response.data.recentBookAvaliations)
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

      <ProfileSummary userData={userData} />

      <ProfileSummary userData={userData} />
    </div>
  )
}
