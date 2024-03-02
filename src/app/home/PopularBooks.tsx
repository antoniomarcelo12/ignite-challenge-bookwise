import { CaretCircleRight } from 'phosphor-react'
import { PopularBooksItem } from './PopularBooksItem'

export function PopularBooks() {
  return (
    <div className="w-[324px] mt-48">
      <div className="flex justify-between mb-2 text-sm">
        <p className="mb-4">Livros populares</p>
        <button className="flex text-xs items-center gap-2 leading-4 text-purple-500">
          Ver todos <CaretCircleRight size={16} weight="fill" />
        </button>
      </div>
      <div className="space-y-3">
        <PopularBooksItem />
        <PopularBooksItem />
        <PopularBooksItem />
        <PopularBooksItem />
        <PopularBooksItem />
      </div>
    </div>
  )
}
