import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await prisma.book.findMany({
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

  const booksWithTotalRatings = books.map((book) => {
    const bookSumOfRatings = book.ratings.reduce(
      (acc, rating) => acc + rating.rate,
      0,
    )
    return {
      ...book,
      averageRating: Math.floor(bookSumOfRatings / book.ratings.length),
    }
  }, 0)

  const categoriesArray = booksWithTotalRatings.map((book) => {
    const catArray = book.categories.map((category) => category.category.name)
    const bookWithCategoryAndId = {
      bookId: book.id,
      catArray,
    }

    return bookWithCategoryAndId
  })

  const allBooksWithoutCategories = booksWithTotalRatings.map((item) => {
    const { ratings, categories, ...newArray } = item
    return newArray
  })

  const allBooks = allBooksWithoutCategories.map((book) => {
    let array: string[] = []
    for (let b = 0; b < categoriesArray.length; b++) {
      if (categoriesArray[b].bookId === book.id) {
        array = categoriesArray[b].catArray
      }
    }
    return {
      ...book,
      categoriesArray: array,
    }
  })

  return NextResponse.json({ allBooks }, { status: 200 })
}
