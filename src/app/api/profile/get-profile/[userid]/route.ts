import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = request.url

  const data = url.split('get-profile/')

  const dataParsed = data[1]
  const userId = dataParsed

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  const userRatings = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    include: {
      book: true,
    },
  })

  const totalPagesRead = userRatings.reduce(
    (acc, current) => acc + current.book.total_pages,
    0,
  )

  const booksRated = userRatings.length

  return NextResponse.json(
    { userData, totalPagesRead, booksRated },
    { status: 200 },
  )
}
