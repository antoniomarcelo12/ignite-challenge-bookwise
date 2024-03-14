import { prisma } from '@/lib/prisma'
import { sortPopularBooks } from '@/utils/sort-popular-books'
import { NextResponse } from 'next/server'

export async function GET() {
  const popularBooks = await prisma.rating.groupBy({
    by: ['book_id'],
    _count: {
      book_id: true,
    },
    orderBy: {
      _count: {
        book_id: 'desc',
      },
    },
    take: 5,
  })

  const popularBooksWithInfo = []

  const books = await prisma.book.findMany({
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  for (let book = 0; book < books.length; book++) {
    for (let rating = 0; rating < popularBooks.length; rating++) {
      const bookSumOfRatings = books[book].ratings.reduce(
        (acc, rating) => acc + rating.rate,
        0,
      )

      if (popularBooks[rating].book_id === books[book].id) {
        const temp = {
          bookId: books[book].id,
          bookName: books[book].name,
          bookCover: books[book].cover_url,
          bookAuthor: books[book].author,
          bookRatingsAmount: popularBooks[rating]._count.book_id,
          bookRatingAverage: Math.floor(
            bookSumOfRatings / popularBooks[rating]._count.book_id,
          ),
        }

        popularBooksWithInfo.push(temp)
      }
    }
  }

  const sortedPopularBooksWithInfo = sortPopularBooks(popularBooksWithInfo)

  return NextResponse.json(
    { popularBooks: sortedPopularBooksWithInfo },
    { status: 200 },
  )
}
