import { Star } from 'phosphor-react'

export function Stars() {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 text-purple-500" weight="fill" />
      <Star className="h-4 w-4 text-purple-500" weight="fill" />
      <Star className="h-4 w-4 text-purple-500" weight="fill" />
      <Star className="h-4 w-4 text-purple-500" weight="fill" />
      <Star className="h-4 w-4" />
    </div>
  )
}
