import Image from 'next/image'
import bookCover from '../../assets/book.png'
import { Stars } from '../components/Stars'

export function ExploreBookItem() {
  return (
    <div className="flex gap-3 w-[318px] bg-slate-800 rounded-lg p-5">
      <Image src={bookCover} alt="" height={152} width={108} />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="font-bold text-gray-300">A revolução dos bichos</h1>
          <p className="text-gray-400">George Orwell</p>
        </div>
        <Stars />
      </div>
    </div>
  )
}
