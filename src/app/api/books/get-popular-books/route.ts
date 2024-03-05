import { prisma } from '@/lib/prisma'
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
  })

  const array = []

  const books = await prisma.book.findMany({
    select: {
      author: true,
      name: true,
      cover_url: true,
      summary: true,
      id: true,
    },
  })

  for (let book = 0; book < books.length; book++) {
    for (let rating = 0; rating < popularBooks.length; rating++) {
      if (popularBooks[rating].book_id === books[book].id) {
        const temp = {
          bookId: books[book].id,
          bookName: books[book].name,
          bookCover: books[book].cover_url,
          bookAuthor: books[book].author,
          bookAmountAcc: popularBooks[rating]._count.book_id,
        }

        array.push(temp)
      }
    }
  }

  const popularBooksParsed = array

  return NextResponse.json({ popularBooksParsed }, { status: 200 })
}
