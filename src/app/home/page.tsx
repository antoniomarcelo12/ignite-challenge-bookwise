'use client'

import { ChartLineUp } from 'phosphor-react'
import { RatingBookItem } from './RatingBookItem'
import { PopularBooks } from './PopularBooks'

export default function Home() {
  return (
    <div className="flex gap-44">
      <div id="main" className="max-h-full">
        <div className="mt-24">
          <h1 className="mb-14 flex items-center text-gray-100 text-3xl gap-3 font-bold">
            <ChartLineUp className="text-appGreen100" /> Início
          </h1>
        </div>
        <div className="space-y-3">
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
