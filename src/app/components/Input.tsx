import { MagnifyingGlass } from 'phosphor-react'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  placeholder?: string
}

export function Input({ placeholder }: InputProps) {
  return (
    <div className="flex w-full px-5 py-4 items-center border-gray-500 border-2 mb-10 rounded-md">
      <input
        className="w-full bg-transparent focus:outline-none"
        placeholder={placeholder}
      />
      <MagnifyingGlass size={20} />
    </div>
  )
}
