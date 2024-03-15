import Image from 'next/image'
import { Stars } from '../components/Stars'
import { GetRecentAvaliationsResponse } from '@/interfaces/Book'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface RatingBookItemProps {
  isProfilePage?: boolean
  bookAvaliation: GetRecentAvaliationsResponse | undefined
}

export function RatingBookItem({
  bookAvaliation,
  isProfilePage = false,
}: RatingBookItemProps) {
  return (
    <div className="bg-slate-800 w-[800px] rounded-md p-8">
      {!isProfilePage && (
        <div
          id="header"
          className="flex justify-between items-start w-full mb-8"
        >
          <div className="flex gap-4">
            <div className="w-[40px] h-[40px] overflow-hidden object-contain rounded-full border-slate-100 border-[2px]">
              <Link href={`profile/${bookAvaliation?.user.id}` ?? ''}>
                {bookAvaliation?.user.image && (
                  <Image
                    src={bookAvaliation?.user.image}
                    width={40}
                    height={40}
                    alt=""
                  />
                )}
              </Link>
            </div>
            <div className="">
              <h1 className="text-gray-100">{bookAvaliation?.user.name}</h1>
              <p className="text-gray-400">
                {bookAvaliation?.created_at &&
                  formatDistanceToNow(bookAvaliation.created_at)}
              </p>
            </div>
          </div>
          <Stars rating={bookAvaliation?.rate ?? 0} />
        </div>
      )}
      <div id="content" className="flex gap-4">
        {bookAvaliation?.book.cover_url && (
          <Image
            src={bookAvaliation?.book.cover_url}
            height={152}
            width={108}
            alt=""
            className="h-[152px] w-[108px]"
            priority={true}
          />
        )}
        <div className="flex flex-col justify-around">
          <div className="mb-10">
            <h1 className="font-bold text-gray-100">
              {bookAvaliation?.book.name}
            </h1>
            <h2 className="text-gray-400 text-sm mb-4">
              {bookAvaliation?.book.author}
            </h2>
          </div>
          {isProfilePage && <Stars rating={bookAvaliation?.rate ?? 0} />}
          {!isProfilePage && (
            <p className=" text-gray-300 max-h-[90px] line-clamp-4">
              {bookAvaliation?.description}
            </p>
          )}
        </div>
      </div>
      {isProfilePage && (
        <p className=" text-gray-300 mt-5 max-h-[90px] line-clamp-4 ">
          {bookAvaliation?.description}
        </p>
      )}
    </div>
  )
}
