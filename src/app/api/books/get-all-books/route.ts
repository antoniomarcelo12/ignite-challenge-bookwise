import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const allBooks = await prisma.book.findMany()

  const booksRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  const allBooksWithRatings = allBooks.map((item) => {
    let temp
    for (let i = 0; i < booksRatings.length; i++) {
      if (booksRatings[i].book_id === item.id) {
        temp = {
          ...item,
          rating: Math.floor(booksRatings[i]._avg.rate!),
        }
      }
    }
    return temp
  })

  const allBooksWithCategories = await prisma.categoriesOnBooks.findMany({
    include: {
      category: true,
      book: {
        select: {
          name: true,
          author: true,
          cover_url: true,
          summary: true,
        },
      },
    },
  })

  const categories = allBooksWithCategories.map((book) => {
    const categories = allBooksWithCategories
      .filter((otherBook) => otherBook.book_id === book.book_id)
      .map((bookWithCategory) => bookWithCategory.category)

    return {
      ...book,
      categories,
    }
  })


  return NextResponse.json(
    { books: allBooksWithRatings, categories },
    { status: 200 },
  )
}
