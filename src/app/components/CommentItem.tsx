import Image from 'next/image'
import { Stars } from './Stars'
import { GetBookAvaliationResponse } from '@/interfaces/Book'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface CommentItemProps {
  selectedBookData: GetBookAvaliationResponse
}

export function CommentItem({ selectedBookData }: CommentItemProps) {
  return (
    <div className="flex flex-col bg-slate-800 mt-5 rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Link href={`profile/${selectedBookData.user.id}`}>
              <Image
                alt=""
                src={selectedBookData.user.image}
                height={40}
                width={40}
              />
            </Link>
          </div>
          <div className="">
            <h1 className="text-gray-100">{selectedBookData.user.name}</h1>
            <p className="text-gray-400">
              {formatDistanceToNow(selectedBookData.created_at)}
            </p>
          </div>
        </div>
        <Stars rating={selectedBookData.rate} />
      </div>
      <div className="p-4">
        <p className="text-gray-300">{selectedBookData.description}</p>
      </div>
    </div>
  )
}
