'use client'

import { ChartLineUp } from 'phosphor-react'
import { RatingBookItem } from './RatingBookItem'
import { PopularBooks } from './PopularBooks'
import { useSession } from 'next-auth/react'
import { ChevronRight, Loader2 } from 'lucide-react'

export default function Home() {
  const session = useSession()

  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex gap-44">
      <div id="main" className="max-h-full">
        <div className="mt-24">
          <h1 className="flex items-center text-gray-100 text-3xl gap-3 font-bold">
            <ChartLineUp className="text-appGreen100" /> Início
          </h1>
        </div>
        {session.status === 'authenticated' && (
          <div className="mt-14">
            <div className="flex justify-between mb-5">
              <p>Sua última leitura</p>
              <button className="flex items-center gap-3">
                Ver todas <ChevronRight />
              </button>
            </div>
            <RatingBookItem isProfilePage />
          </div>
        )}
        <div className="mt-14 space-y-3">
          <p className="mb-6">Avaliações mais recentes</p>
          <RatingBookItem />
          <RatingBookItem />
          <RatingBookItem />
          <RatingBookItem />
        </div>
      </div>
      <PopularBooks />
    </div>
  )
}
