import Image from 'next/image'
import { Stars } from '../components/Stars'
import { BookType } from '@/interfaces/Book'

interface ExploreBookItemProps {
  book: BookType
}

export function ExploreBookItem({ book }: ExploreBookItemProps) {
  return (
    <div className="flex gap-3 w-[318px] bg-slate-800 rounded-lg p-5">
      <Image src={book.cover_url} alt="" height={152} width={108} />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="font-bold text-gray-300">{book.name}</h1>
          <p className="text-gray-400">{book.author}</p>
        </div>
        <Stars />
      </div>
    </div>
  )
}
