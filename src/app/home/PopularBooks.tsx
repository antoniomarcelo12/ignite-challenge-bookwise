import { CaretCircleRight } from 'phosphor-react'
import { PopularBooksItem } from './PopularBooksItem'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

interface PopularBooksResponse {
  popularBooksParsed: {
    bookId: string
    bookName: string
    bookCover: string
    bookAuthor: string
    bookAmountAcc: number
  }[]
}

export function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState<PopularBooksResponse>([])

  async function getPopularBooks() {
    const response = await api.get('/api/books/get-popular-books')

    setPopularBooks(response.data)
  }

  useEffect(() => {
    getPopularBooks()
  }, [])

  console.log('popularBooks: ', popularBooks)

  return (
    <div className="w-[324px] mt-48">
      <div className="flex justify-between mb-2 text-sm">
        <p className="mb-4">Livros populares</p>
        <button className="flex text-xs items-center gap-2 leading-4 text-purple-500">
          Ver todos <CaretCircleRight size={16} weight="fill" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {popularBooks.popularBooksParsed &&
          popularBooks.popularBooksParsed.map((book, idx) => {
            if (idx < 5) {
              return <PopularBooksItem key={book.bookId} popularBook={book} />
            }
            return null
          })}
      </div>
    </div>
  )
}
