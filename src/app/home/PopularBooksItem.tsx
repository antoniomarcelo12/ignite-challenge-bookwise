import Image from 'next/image'
import book from '../../assets/book.png'
import { Stars } from '../components/Stars'
export function PopularBooksItem() {
  return (
    <div className="flex gap-3 bg-slate-800 rounded-lg p-4">
      <Image src={book} height={94} width={64} alt="" />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="text-gray-100 font-bold">A revolução dos bichos</h1>
          <p className="text-gray-400">George Orwell</p>
        </div>
        <Stars />
      </div>
    </div>
  )
}
