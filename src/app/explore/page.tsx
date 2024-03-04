'use client'
import { Binoculars } from 'phosphor-react'
import { ExploreBookItem } from './ExploreBookItem'
import { SheetComponent } from '../components/SheetComponent'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export default function Explore() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const session = useSession()

  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-[1327px]">
      <div className="flex justify-between items-center">
        <div className="mt-24">
          <h1 className="mb-14 flex items-center text-gray-100 text-3xl gap-3 font-bold">
            <Binoculars className="text-appGreen100" /> Explorar
          </h1>
        </div>
      </div>
      <div className="">
        <p>Avaliações mais recentes:</p>
        <div className="flex gap-3 mt-5 flex-wrap">
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
