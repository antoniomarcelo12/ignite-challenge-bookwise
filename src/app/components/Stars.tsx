import { Star } from 'phosphor-react'

interface StarsProps {
  rating?: number
  type?: 'button' | 'show only'
  setStarsAmount?: (starsAmount: number) => void
  starsAmount?: number
}

export function Stars({
  rating = 0,
  type = 'show only',
  setStarsAmount,
  starsAmount = 0,
}: StarsProps) {
  if (type === 'button' && setStarsAmount) {
    return (
      <div className="flex items-center">
        <button onClick={() => setStarsAmount(1)}>
          {starsAmount >= 1 ? (
            <Star
              className="h-6 w-6 text-purple-500 hover:text-purple-700"
              weight="fill"
            />
          ) : (
            <Star className="h-6 w-6 text-purple-500 hover:text-white" />
          )}
        </button>
        <button onClick={() => setStarsAmount(2)}>
          {starsAmount >= 2 ? (
            <Star
              className="h-6 w-6 text-purple-500 hover:text-purple-700"
              weight="fill"
            />
          ) : (
            <Star className="h-6 w-6 text-purple-500 hover:text-white" />
          )}
        </button>
        <button onClick={() => setStarsAmount(3)}>
          {starsAmount >= 3 ? (
            <Star
              className="h-6 w-6 text-purple-500 hover:text-purple-700"
              weight="fill"
            />
          ) : (
            <Star className="h-6 w-6 text-purple-500 hover:text-white" />
          )}
        </button>
        <button onClick={() => setStarsAmount(4)} className="">
          {starsAmount >= 4 ? (
            <Star
              className="h-6 w-6 text-purple-500 hover:text-purple-700"
              weight="fill"
            />
          ) : (
            <Star className="h-6 w-6 text-purple-500 hover:text-white" />
          )}
        </button>
        <button onClick={() => setStarsAmount(5)}>
          {starsAmount === 5 ? (
            <Star
              className="h-6 w-6 text-purple-500 hover:text-purple-700"
              weight="fill"
            />
          ) : (
            <Star className="h-6 w-6 text-purple-500 hover:text-white" />
          )}
        </button>
      </div>
    )
  }

  if (type === 'show only') {
    return (
      <div className="flex items-center">
        {Array.from({ length: rating }).map((star, idx) => {
          return (
            <Star key={idx} className="h-4 w-4 text-purple-500" weight="fill" />
          )
        })}
        {Array.from({ length: 5 - rating }).map((star, idx) => {
          return (
            <Star
              key={idx}
              className="h-4 w-4 text-purple-500"
              weight="light"
            />
          )
        })}
      </div>
    )
  }
}
