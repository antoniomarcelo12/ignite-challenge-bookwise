import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    userId: string
  }
}

export async function GET(_request: Request, { params }: Params) {
  const { userId } = params

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!userData) {
    return NextResponse.json({ message: 'Usuário inválido ou não encontrado.' })
  }

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
