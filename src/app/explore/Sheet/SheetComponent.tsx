import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import Image from 'next/image'
import { Stars } from '../../components/Stars'
import { BookOpen, Bookmark } from 'phosphor-react'
import { CommentItem } from './CommentItem'
import { NewCommentBox } from './NewCommentBox'
import { useEffect, useState } from 'react'
import { LoginDialog } from '../../components/LoginDialog'
import { BookType, GetBookAvaliationResponse } from '@/interfaces/Book'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { SheetHeaderComponent } from './SheetHeader'

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
  const [bookData, setBookData] = useState<GetBookAvaliationResponse>()

  async function getBookAvaliations() {
    const response = await api.get(
      `/api/books/get-book-avaliations/${selectedBook.id}`,
    )
    setBookData(response.data)
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
        <SheetHeaderComponent selectedBook={selectedBook} bookData={bookData} />

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

          {bookData?.bookAvaliations.map((item, idx) => {
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
