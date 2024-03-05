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

  // const newArray = allBooksWithCategories.map((book) => {
  //   for (let i = 0; i <= allBooksWithCategories.length; i++) {
  //     if (book.book_id === allBooksWithCategories[i].book_id) {
  //       return {
  //         ...book,
  //         category: allBooksWithCategories[i].category,
  //       }
  //     }
  //   }
  // })

  const categories = allBooksWithCategories.map((book) => {
    // Encontre todas as categorias correspondentes ao livro atual
    const categories = allBooksWithCategories
      .filter((otherBook) => otherBook.book_id === book.book_id)
      .map((bookWithCategory) => bookWithCategory.category)

    // Retorne um novo objeto com as categorias adicionadas
    return {
      ...book,
      categories,
    }
  })

  console.log('KKKKKKKKKKKKKKKKKKKKKKKKknewArray: ', categories)

  return NextResponse.json(
    { books: allBooksWithRatings, categories },
    { status: 200 },
  )
}
