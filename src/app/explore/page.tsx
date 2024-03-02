'use client'
import { Binoculars } from 'phosphor-react'
import { ExploreBookItem } from './ExploreBookItem'
import { Input } from '../components/Input'

export default function Explore() {
  return (
    <div className="w-[1327px]">
      <div className=" mt-24 flex justify-between items-center">
        <h1 className="mb-14 flex items-center text-gray-100 text-3xl gap-3 font-bold">
          <Binoculars color="#50B2C0" /> Explorar
        </h1>
        <div>
          <Input placeholder="Buscar livro ou autor" className="w-96" />
        </div>
      </div>
      <div className="">
        <p>Avaliações mais recentes:</p>
        <div className="flex gap-4 mt-5 flex-wrap">
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
          <ExploreBookItem />
        </div>
      </div>
    </div>
  )
}
