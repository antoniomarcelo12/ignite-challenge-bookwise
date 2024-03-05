'use client'
import { Binoculars } from 'phosphor-react'
import { ExploreBookItem } from './ExploreBookItem'
import { SheetComponent } from '../components/SheetComponent'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { api } from '@/lib/axios'
import { BookType } from '@/interfaces/Book'
import { Toggle } from '../components/Toggle'

interface booksFilteredByCategoryData {
  book: {
    name: string
    cover_url: string
    author: string
    summary: string
  }
  category: {
    name: string
  }
}

export default function Explore() {
  const session = useSession()

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [allBooksState, setAllBooksState] = useState<BookType>()
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [categoryFilter, setCategoryFilter] = useState('Tudo')
  const [booksFilteredByCategory, setBooksFilteredByCategory] = useState<
    booksFilteredByCategoryData[] | undefined
  >([])

  useEffect(() => {
    const newArray = allBooksState?.categories.filter(
      (book) => book.category.name === categoryFilter,
    )

    setBooksFilteredByCategory(newArray)
  }, [categoryFilter])

  async function getBooks() {
    const allBooks = await api.get('/api/books/get-all-books')
    setAllBooksState(allBooks.data)
  }

  function handleSelectBook(book: BookType) {
    setIsSheetOpen(true)
    setSelectedBook(book)
  }

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    console.log('allBooksState: ', allBooksState)
  }, [allBooksState])

  if (session.status === 'loading') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-[1327px]">
      <div className="flex justify-between items-center">
        <div className="mt-24">
          <h1 className="mb-14 flex items-center text-gray-100 text-3xl gap-3 font-bold">
            <Binoculars className="text-appGreen100" /> Explorar
          </h1>
        </div>
      </div>
      <div className="">
        <Toggle changeCategoryFilter={setCategoryFilter} />
        <div className="flex gap-3 mt-5 flex-wrap">
          {categoryFilter === 'Tudo' &&
            allBooksState?.books.map((book, idx) => {
              return (
                <button key={idx} onClick={() => handleSelectBook(book)}>
                  <ExploreBookItem book={book} />
                </button>
              )
            })}
          {categoryFilter !== 'Tudo' &&
            booksFilteredByCategory &&
            booksFilteredByCategory.map((book, idx) => {
              return (
                <button key={idx} onClick={() => handleSelectBook(book.book)}>
                  <ExploreBookItem book={book.book} />
                </button>
              )
            })}
        </div>
      </div>
      {selectedBook && (
        <SheetComponent
          selectedBook={selectedBook}
          isSheetOpen={isSheetOpen}
          onIsSheetOpenChange={setIsSheetOpen}
        />
      )}
    </div>
  )
}
