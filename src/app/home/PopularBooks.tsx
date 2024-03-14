import { CaretCircleRight } from 'phosphor-react'
import { PopularBooksItem } from './PopularBooksItem'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { GetPopularBooksResponse } from '@/interfaces/Book'
import Link from 'next/link'

export function PopularBooks() {
  const [popularBooks, setPopularBooks] = useState<GetPopularBooksResponse>()

  async function getPopularBooks() {
    const response = await api.get('/api/books/get-popular-books')

    setPopularBooks(response.data)
  }

  useEffect(() => {
    getPopularBooks()
  }, [])

  return (
    <div className="w-[324px] mt-48 shadow-lg">
      <div className="flex justify-between items-baseline mb-2 text-sm">
        <p className="mb-4">Livros populares</p>
        <Link
          href="/explore"
          className="flex text-xs items-center gap-2 leading-4 text-purple-500"
        >
          Ver todos <CaretCircleRight size={16} weight="fill" />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {popularBooks &&
          popularBooks.popularBooks.map((book) => {
            return <PopularBooksItem key={book.bookId} popularBook={book} />
          })}
      </div>
    </div>
  )
}
