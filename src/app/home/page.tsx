'use client'

import { ChartLineUp } from 'phosphor-react'
import { RatingBookItem } from './RatingBookItem'
import { PopularBooks } from './PopularBooks'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { GetRecentAvaliationsResponse } from '@/interfaces/Book'
import { MyLastReviewTile } from './my-last-review-tile'

export default function Home() {
  const session = useSession()
  const [recentAvaliations, setRecentAvaliations] = useState<
    GetRecentAvaliationsResponse[]
  >([])
  const [myLastReview, setMyLastReview] =
    useState<GetRecentAvaliationsResponse>()

  async function getRecentAvaliations() {
    const response = await api.get('/api/books/get-recent-avaliations')
    setRecentAvaliations(response.data.recentBookAvaliations)
  }

  useEffect(() => {
    function getMyLastAvaliation() {
      if (session.status === 'authenticated') {
        const myLastReview = recentAvaliations.find(
          (item) => item.user_id === session?.data?.user?.id,
        )
        setMyLastReview(myLastReview)
      }
    }
    getMyLastAvaliation()
  }, [session, recentAvaliations])

  useEffect(() => {
    getRecentAvaliations()
  }, [])

  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  console.log('My last review: ', myLastReview)

  return (
    <div className="flex gap-44">
      <div id="main" className="max-h-full">
        <div className="mt-24">
          <h1 className="flex items-center text-gray-100 text-3xl gap-3 font-bold">
            <ChartLineUp className="text-appGreen100" /> Início
          </h1>
        </div>
        {session.status === 'authenticated' && (
          <MyLastReviewTile myLastReview={myLastReview} />
        )}
        <div className="mt-14 space-y-3">
          <p className="mb-6">Avaliações mais recentes</p>
          {recentAvaliations.length === 0 ? (
            <div className="bg-slate-800 w-[800px] rounded-md p-8 h-[200px] flex justify-center items-center">
              <h1>Nenhuma avaliação para mostrar</h1>
            </div>
          ) : (
            recentAvaliations.map((avaliation) => {
              return (
                <RatingBookItem
                  key={avaliation.id}
                  bookAvaliation={avaliation}
                />
              )
            })
          )}
        </div>
      </div>
      <PopularBooks />
    </div>
  )
}
