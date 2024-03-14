import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const allBooks = await prisma.book.findMany({
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  const booksWithTotalRatings = allBooks.map((book) => {
    const bookSumOfRatings = book.ratings.reduce(
      (acc, rating) => acc + rating.rate,
      0,
    )
    return {
      ...book,
      averageRating: Math.floor(bookSumOfRatings / book.ratings.length),
    }
  }, 0)

  const newArray = booksWithTotalRatings.map((item) => {
    const { ratings, ...newArray } = item
    return newArray
  })

  return NextResponse.json({ newArray, booksWithTotalRatings }, { status: 200 })
}
