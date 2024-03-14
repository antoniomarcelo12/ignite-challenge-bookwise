import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params

  const isThereABookWithThisId = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
  })

  if (!isThereABookWithThisId) {
    return NextResponse.json({ status: 404, message: 'Livro não encontrado.' })
  }

  const bookAvaliations = await prisma.rating.findMany({
    where: {
      book_id: bookId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return NextResponse.json({ bookAvaliations }, { status: 200 })
}
