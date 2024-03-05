import { MagnifyingGlass } from 'phosphor-react'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  placeholder?: string
  setSearchString: (searchString: string) => void
}

export function Input({ placeholder, setSearchString }: InputProps) {
  return (
    <div className="flex w-full px-5 py-4 items-center border-gray-500 border-2 mb-10 rounded-md">
      <input
        onChange={(e) => setSearchString(e.target.value)}
        className="w-full bg-transparent focus:outline-none"
        placeholder={placeholder}
      />
      <MagnifyingGlass size={20} />
    </div>
  )
}
