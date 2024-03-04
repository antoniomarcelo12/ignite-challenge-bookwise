import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import Image from 'next/image'
import { Stars } from './Stars'
import bookCover from '../../assets/book.png'
import { BookOpen, Bookmark } from 'phosphor-react'
import { CommentItem } from './CommentItem'
import { NewCommentBox } from './NewCommentBox'
import { useState } from 'react'
import { LoginDialog } from './LoginDialog'

interface SheetComponentProps {
  isSheetOpen: boolean
  onIsSheetOpenChange: (status: boolean) => void
}

export function SheetComponent({
  isSheetOpen,
  onIsSheetOpenChange,
}: SheetComponentProps) {
  const [isNewCommentBoxVisible, setIsNewCommentBoxVisible] = useState(false)
  const [isLoginDialogOpen, onLoginDialogOpenChange] = useState(false)

  const session = null
  function handleCreateNewComment() {
    if (!session) {
      // onLoginDialogOpenChange(true)
      setIsNewCommentBoxVisible(!isNewCommentBoxVisible)
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
            <Image src={bookCover} alt="" height={242} width={171} />
            <div className="flex flex-col justify-between">
              <div className="py-4">
                <h1 className="font-bold text-gray-100">
                  A revolução dos bichos
                </h1>
                <p className="text-gray-300 text-sm">George Orwell</p>
              </div>
              <div className="">
                <Stars />
                <p className="text-gray-400 text-xs mt-1">3 avaliações</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t-[1px] border-appGreen100 pt-8 mt-0">
            <div className="flex items-center mt-0 gap-4">
              <Bookmark size={24} className="text-appGreen100" />
              <div className="">
                <p className="text-sm text-gray-300">Categoria</p>
                <p className="font-bold">Ficção</p>
              </div>
            </div>
            <div className="flex items-center mt-0 gap-4">
              <BookOpen size={24} className="text-appGreen100" />
              <div className="">
                <p className="text-sm text-gray-300">Páginas</p>
                <p className="font-bold">360</p>
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
          {isNewCommentBoxVisible && (
            <NewCommentBox
              setIsNewCommentBoxVisible={setIsNewCommentBoxVisible}
            />
          )}

          <CommentItem />
          <CommentItem />
          <CommentItem />
        </div>
        <LoginDialog
          setIsNewCommentBoxVisible={setIsNewCommentBoxVisible}
          isLoginDialogOpen={isLoginDialogOpen}
          onLoginDialogOpenChange={onLoginDialogOpenChange}
        />
      </SheetContent>
    </Sheet>
  )
}
