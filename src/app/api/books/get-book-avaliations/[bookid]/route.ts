import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const bookId = request.url.split('get-book-avaliations/')[1]

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
      book: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return NextResponse.json({ bookAvaliations }, { status: 200 })
}
