import Link from 'next/link'
import { RatingBookItem } from './RatingBookItem'
import { CaretCircleRight } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { GetRecentAvaliationsResponse } from '@/interfaces/Book'

interface MyLastReviewTileProps {
  myLastReview: GetRecentAvaliationsResponse | undefined
}

export function MyLastReviewTile({ myLastReview }: MyLastReviewTileProps) {
  const session = useSession()

  if (!myLastReview) {
    return
  }

  return (
    <div className="mt-14">
      <div className="flex justify-between items-baseline mb-5">
        <p>Sua última leitura</p>
        <Link
          href={`/profile/${session.data?.user?.id}`}
          className="flex text-xs items-center gap-2 leading-4 text-purple-500"
        >
          Ver todos <CaretCircleRight size={16} weight="fill" />
        </Link>
      </div>
      <RatingBookItem bookAvaliation={myLastReview} isProfilePage />
    </div>
  )
}
