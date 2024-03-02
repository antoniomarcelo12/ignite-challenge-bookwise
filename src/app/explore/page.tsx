'use client'
import { Binoculars } from 'phosphor-react'
import { Sidebar } from '../components/Sidebar'
import { ExploreBookItem } from './ExploreBookItem'
import { Input } from '../components/Input'

export default function Explore() {
  return (
    <div className="p-3 flex max-w-screen h-screen gap-44">
      <Sidebar />
      <div className="mt-20 max-w-[1080px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 font-bold text-2xl">
            <Binoculars className="text-app-green-100" size={32} /> Explorar
          </div>
          <div className="w-96">
            <Input placeholder="Buscar livro ou autor" />
          </div>
        </div>
        <div className="flex justify-between mt-20 flex-wrap">
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
