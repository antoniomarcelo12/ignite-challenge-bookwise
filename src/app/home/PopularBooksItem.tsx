import Image from 'next/image'
import { PopularBookInterface } from '@/interfaces/Book'
import { Stars } from '../components/Stars'

interface PopularBooksItemProps {
  popularBook: PopularBookInterface
}

export function PopularBooksItem({ popularBook }: PopularBooksItemProps) {
  return (
    <div className="flex gap-3 bg-slate-800 rounded-lg p-4">
      <Image
        src={popularBook.bookCover}
        height={94}
        width={64}
        alt=""
        className="w-[64px] h-[94px]"
      />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="text-gray-100 font-bold line-clamp-2">
            {popularBook.bookName}
          </h1>
          <p className="text-gray-400">{popularBook.bookAuthor}</p>
        </div>
        <Stars rating={popularBook.bookRatingAverage} />
      </div>
    </div>
  )
}
