import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import Image from 'next/image'
import { Stars } from './Stars'
import bookCover from '../../assets/book.png'
import { BookOpen, Bookmark } from 'phosphor-react'

interface SheetComponentProps {
  isSheetOpen: boolean
  onIsSheetOpenChange: (status: boolean) => void
}

export function SheetComponent({
  isSheetOpen,
  onIsSheetOpenChange,
}: SheetComponentProps) {
  return (
    <Sheet open={isSheetOpen} onOpenChange={onIsSheetOpenChange}>
      <SheetContent side="right" className="lg:max-w-[660px] py-14 px-10">
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
                <p className="text-gray-400 text-sm mt-1">3 avaliações</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t-[1px] border-appGreen100 pt-8 mt-0">
            <div className="flex items-center mt-0 gap-4">
              <Bookmark size={24} />
              <div className="">
                <p className="text-sm text-gray-300">Categoria</p>
                <p className="font-bold text-appGreen100">Ficção</p>
              </div>
            </div>
            <div className="flex items-center mt-0 gap-4">
              <BookOpen size={24} />
              <div className="">
                <p className="text-sm text-gray-300">Páginas</p>
                <p className="font-bold text-appGreen100">360</p>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
