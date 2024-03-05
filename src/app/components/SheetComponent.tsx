import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import Image from 'next/image'
import { Stars } from './Stars'
import { BookOpen, Bookmark } from 'phosphor-react'
import { CommentItem } from './CommentItem'
import { NewCommentBox } from './NewCommentBox'
import { useEffect, useState } from 'react'
import { LoginDialog } from './LoginDialog'
import { BookType, GetBookAvaliationResponse } from '@/interfaces/Book'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'

interface SheetComponentProps {
  isSheetOpen: boolean
  onIsSheetOpenChange: (status: boolean) => void
  selectedBook: BookType
}

export function SheetComponent({
  isSheetOpen,
  onIsSheetOpenChange,
  selectedBook,
}: SheetComponentProps) {
  const [isNewCommentBoxVisible, setIsNewCommentBoxVisible] = useState(false)
  const [isLoginDialogOpen, onLoginDialogOpenChange] = useState(false)
  const [bookData, setBookData] = useState<GetBookAvaliationResponse[]>()

  async function getBookAvaliations() {
    const response = await api.get(
      `/api/books/get-book-avaliations/${selectedBook.id}`,
    )
    setBookData(response.data.bookAvaliations)
  }
  useEffect(() => {
    if (isSheetOpen) {
      getBookAvaliations()
    }
  }, [isSheetOpen])

  const session = useSession()
  function handleCreateNewComment() {
    if (session.status === 'authenticated') {
      setIsNewCommentBoxVisible(true)
    }
    if (session.status === 'unauthenticated') {
      onLoginDialogOpenChange(true)
      setIsNewCommentBoxVisible(true)
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={onIsSheetOpenChange}>
      <SheetContent
        side="right"
        className="lg:max-w-[660px] py-14 px-10 overflow-auto"
      >
        <SheetHeader className="bg-slate-800 rounded-md p-8">
          <div className="flex gap-5 mb-8">
            <Image
              src={selectedBook.cover_url}
              alt=""
              height={242}
              width={171}
            />
            <div className="flex flex-col justify-between">
              <div className="py-4">
                <h1 className="font-bold text-gray-100">{selectedBook.name}</h1>
                <p className="text-gray-300 text-sm">{selectedBook.author}</p>
              </div>
              <div className="">
                <Stars rating={selectedBook.rating} />
                <p className="text-gray-400 text-xs mt-1">
                  {bookData && bookData?.length > 1
                    ? `${bookData?.length} avaliações`
                    : `${bookData?.length} avaliação`}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t-[1px] border-appGreen100 pt-8 mt-0">
            <div className="flex items-center mt-0 gap-4">
              <Bookmark size={24} className="text-appGreen100" />
              <div className="">
                <p className="text-sm text-gray-300">Categoria</p>
                <p className="font-bold">selectedBook</p>
              </div>
            </div>
            <div className="flex items-center mt-0 gap-4">
              <BookOpen size={24} className="text-appGreen100" />
              <div className="">
                <p className="text-sm text-gray-300">Páginas</p>
                <p className="font-bold">{selectedBook.total_pages}</p>
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="text-sm">Avaliações</p>
            <button
              className="text-sm text-purple-400 font-bold"
              onClick={() => handleCreateNewComment()}
            >
              Avaliar
            </button>
          </div>
          {isNewCommentBoxVisible && session.status === 'authenticated' && (
            <NewCommentBox
              getBookAvaliations={getBookAvaliations}
              selectedBook={selectedBook}
              setIsNewCommentBoxVisible={setIsNewCommentBoxVisible}
            />
          )}

          {bookData?.map((item, idx) => {
            return <CommentItem key={idx} selectedBookData={item} />
          })}
        </div>
        <LoginDialog
          label="Faça login para deixar sua avaliação"
          isLoginDialogOpen={isLoginDialogOpen}
          onLoginDialogOpenChange={onLoginDialogOpenChange}
        />
      </SheetContent>
    </Sheet>
  )
}
