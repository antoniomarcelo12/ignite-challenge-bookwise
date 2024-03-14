'use client'
import { Binoculars } from 'phosphor-react'
import { ExploreBookItem } from './ExploreBookItem'
import { SheetComponent } from './Sheet/SheetComponent'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { api } from '@/lib/axios'
import { BookType } from '@/interfaces/Book'
import { Toggle } from './Toggle'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

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
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [allBooksState, setAllBooksState] = useState<BookType[]>()
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [categoryFilter, setCategoryFilter] = useState('Tudo')
  const [booksFilteredByCategory, setBooksFilteredByCategory] = useState<
    BookType[] | undefined
  >([])

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const bookId = params.get('bookId')

    if (bookId) {
      const isThereThisBook = allBooksState?.some((book) => book.id === bookId)

      setSelectedBook(allBooksState?.filter((book) => book.id === bookId)[0])
      if (selectedBook) {
        setIsSheetOpen(true)
      } else {
        if (!isThereThisBook) {
          toast.error('Livro com id fornecido não existe.')
          router.push('/explore')
        }
      }
    }
  }, [router])

  useEffect(() => {
    const filteredBooks = allBooksState?.filter((book) =>
      book.categoriesArray.includes(categoryFilter),
    )
    setBooksFilteredByCategory(filteredBooks)
  }, [categoryFilter, allBooksState])

  async function getBooks() {
    const allBooks = await api.get('/api/books/get-all-books')
    setAllBooksState(allBooks.data.allBooks)
  }

  function handleSelectBook(book: BookType) {
    router.push(`/explore?bookId=${book.id}`)
  }

  function changeSheetVisibility(value: boolean) {
    const params = new URLSearchParams(searchParams.toString())

    setIsSheetOpen(value)

    if (value === false) {
      router.push('/explore')
    }
  }

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
            allBooksState?.map((book) => {
              return (
                <button key={book.id} onClick={() => handleSelectBook(book)}>
                  <ExploreBookItem book={book} />
                </button>
              )
            })}
          {categoryFilter !== 'Tudo' &&
            booksFilteredByCategory &&
            booksFilteredByCategory.map((book) => {
              return (
                <button key={book.id} onClick={() => handleSelectBook(book)}>
                  <ExploreBookItem book={book} />
                </button>
              )
            })}
        </div>
      </div>
      {selectedBook && (
        <SheetComponent
          selectedBook={selectedBook}
          isSheetOpen={isSheetOpen}
          onIsSheetOpenChange={changeSheetVisibility}
        />
      )}
    </div>
  )
}
