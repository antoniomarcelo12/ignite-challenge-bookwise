import Image from 'next/image'
import { Star } from 'phosphor-react'
import book from '../../assets/book.png'
export function PopularBooksItem() {
  return (
    <div className="flex gap-3 bg-slate-800 rounded-lg p-4">
      <Image src={book} height={94} width={64} alt="" />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="text-gray-100 font-bold">A revolução dos bichos</h1>
          <p className="text-gray-400">George Orwell</p>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-purple-500" weight="fill" />
          <Star className="h-4 w-4 text-purple-500" weight="fill" />
          <Star className="h-4 w-4 text-purple-500" weight="fill" />
          <Star className="h-4 w-4 text-purple-500" weight="fill" />
          <Star className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
