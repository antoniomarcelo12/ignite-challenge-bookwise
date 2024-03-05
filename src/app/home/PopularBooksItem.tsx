import Image from 'next/image'
import book from '../../assets/book.png'

interface PopularBooksItemProps {
  popularBook: {
    bookId: string
    bookName: string
    bookCover: string
    bookAuthor: string
    bookAmountAcc: number
  }
}

export function PopularBooksItem({ popularBook }: PopularBooksItemProps) {
  return (
    <div className="flex gap-3 bg-slate-800 rounded-lg p-4">
      <Image src={book} height={94} width={64} alt="" />
      <div className="flex flex-col justify-between">
        <div className="">
          <h1 className="text-gray-100 font-bold">{popularBook.bookName}</h1>
          <p className="text-gray-400">{popularBook.bookAuthor}</p>
        </div>
      </div>
    </div>
  )
}
