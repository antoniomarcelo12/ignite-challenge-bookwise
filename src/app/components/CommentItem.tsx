import profilePic from '../../assets/profile.jpeg'
import Image from 'next/image'
import { Stars } from './Stars'

export function CommentItem() {
  return (
    <div className="flex flex-col bg-slate-800 mt-5 rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image alt="" src={profilePic} height={40} width={40} />
          </div>
          <div className="">
            <h1 className="text-gray-100">Antonio Marcelo</h1>
            <p className="text-gray-400">Há 2 dias</p>
          </div>
        </div>
        <Stars />
      </div>
      <div className="p-4">
        <p className="text-gray-300">
          Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
          Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
          eget nec vitae sit vulputate eget
        </p>
      </div>
    </div>
  )
}
