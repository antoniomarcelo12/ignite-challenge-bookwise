'use client'
import { Binoculars } from 'phosphor-react'
import { ExploreBookItem } from './ExploreBookItem'
import { Input } from '../components/Input'
import { SheetComponent } from '../components/SheetComponent'
import { useState } from 'react'

export default function Explore() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div className="w-[1327px]">
      <div className=" mt-24 flex justify-between items-center">
        <h1 className="mb-14 flex items-center text-gray-100 text-3xl gap-3 font-bold">
          <Binoculars className="text-appGreen100" /> Explorar
        </h1>
        <div>
          <Input placeholder="Buscar livro ou autor" className="w-96" />
        </div>
      </div>
      <div className="">
        <p>Avaliações mais recentes:</p>
        <div className="flex gap-4 mt-5 flex-wrap">
          {Array.from({ length: 12 }).map((item, idx) => {
            return (
              <button key={idx} onClick={() => setIsSheetOpen(true)}>
                <ExploreBookItem />
              </button>
            )
          })}
        </div>
      </div>
      <SheetComponent
        isSheetOpen={isSheetOpen}
        onIsSheetOpenChange={setIsSheetOpen}
      />
    </div>
  )
}
