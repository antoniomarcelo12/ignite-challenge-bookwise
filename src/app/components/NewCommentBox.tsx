import Image from 'next/image'
import profilePic from '../../assets/profile.jpeg'
import { Stars } from './Stars'
import { Check, X } from 'phosphor-react'

export function NewCommentBox() {
  return (
    <div className="flex flex-col bg-slate-800 p-4 gap-3 rounded-md mt-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image src={profilePic} alt="" height={40} width={40} />
          </div>
          <span>Antonio Marcelo</span>
        </div>
        <Stars />
      </div>
      <textarea
        className="bg-background placeholder:text-sm p-4  focus:outline-appGreen100 outline-none rounded-sm"
        placeholder="Escreva sua avaliação"
      />
      <div className="ml-auto flex gap-2">
        <button className="w-10 h-10 flex justify-center items-center border bg-gray-700 rounded-md">
          <X />
        </button>
        <button className="w-10 h-10 flex justify-center items-center outline-1 border bg-gray-700 rounded-md">
          <Check />
        </button>
      </div>
    </div>
  )
}
