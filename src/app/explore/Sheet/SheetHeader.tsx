import { Stars } from '@/app/components/Stars'
import { SheetHeader } from '@/components/ui/sheet'
import { BookType, GetBookAvaliationResponse } from '@/interfaces/Book'
import Image from 'next/image'
import { BookOpen, Bookmark } from 'phosphor-react'

interface SheetHeaderComponentProps {
  selectedBook: BookType
  bookData: GetBookAvaliationResponse | undefined
}

export function SheetHeaderComponent({
  bookData,
  selectedBook,
}: SheetHeaderComponentProps) {
  const categoriesConcatenedString = selectedBook.categoriesArray
    .toString()
    .replace(',', ', ')

  return (
    <SheetHeader className="bg-slate-800 rounded-md p-8">
      <div className="flex gap-5 mb-8">
        <Image src={selectedBook.cover_url} alt="" height={242} width={171} />
        <div className="flex flex-col justify-between">
          <div className="py-4">
            <h1 className="font-bold text-gray-100">{selectedBook.name}</h1>
            <p className="text-gray-300 text-sm">{selectedBook.author}</p>
          </div>
          <div className="">
            <Stars rating={selectedBook.averageRating} />
            <p className="text-gray-400 text-xs mt-1">
              {bookData && bookData?.bookAvaliations.length > 1
                ? `${bookData?.bookAvaliations.length} avaliações`
                : `${bookData?.bookAvaliations.length} avaliação`}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t-[1px] border-appGreen100 pt-8 mt-0">
        <div className="flex items-center mt-0 gap-4">
          <Bookmark size={24} className="text-appGreen100" />
          <div className="">
            <p className="text-sm text-gray-300">Categoria</p>
            <p className="font-bold">{categoriesConcatenedString}</p>
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
  )
}
