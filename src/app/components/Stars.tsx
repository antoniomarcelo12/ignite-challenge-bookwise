import { Star } from 'phosphor-react'

interface StarsProps {
  rating: number
}

export function Stars({ rating }: StarsProps) {
  return (
    <div className="flex items-center">
      {Array.from({ length: rating }).map((star, idx) => {
        return (
          <Star key={idx} className="h-4 w-4 text-purple-500" weight="fill" />
        )
      })}
      {Array.from({ length: 5 - rating }).map((star, idx) => {
        return (
          <Star key={idx} className="h-4 w-4 text-purple-500" weight="light" />
        )
      })}
    </div>
  )
}
