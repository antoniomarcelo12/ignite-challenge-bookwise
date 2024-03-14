import Image from 'next/image'
import { Stars } from '../../components/Stars'
import { Check, X } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { BookType } from '@/interfaces/Book'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface NewCommentBoxProps {
  setIsNewCommentBoxVisible: (status: boolean) => void
  selectedBook: BookType
  getBookAvaliations: () => void
}

const ReviewSchema = z.object({
  reviewTextZod: z
    .string()
    .min(5, { message: 'Digite ao menos 5 caracteres.' }),
})

type ReviewSchemaData = z.infer<typeof ReviewSchema>

export function NewCommentBox({
  setIsNewCommentBoxVisible,
  selectedBook,
  getBookAvaliations,
}: NewCommentBoxProps) {
  const session = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchemaData>({
    resolver: zodResolver(ReviewSchema),
  })

  const [starsAmount, setStarsAmount] = useState(0)
  const [reviewText, setReviewText] = useState('')

  async function handleCreateReview() {
    if (starsAmount > 0) {
      try {
        await api.post('/api/books/make-book-avaliation', {
          reviewText,
          starsAmount,
          selectedBookId: selectedBook.id,
          userId: session.data?.user?.id,
        })
        toast.success('Revisão cadastrada com sucesso.', {
          style: { background: 'green' },
        })
        getBookAvaliations()
        setIsNewCommentBoxVisible(false)
      } catch (err) {
        toast.error('Erro ao cadastrar revisão. Tente novamente.')
      }
    } else {
      toast.warning('Clique nas estrelas para avaliar.', {
        style: { background: 'yellow' },
      })
    }
  }

  return (
    <div className="flex flex-col bg-slate-800 p-4 gap-3 rounded-md mt-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={session.data?.user?.image ?? ''}
              alt=""
              height={40}
              width={40}
            />
          </div>
          <span>Antonio Marcelo</span>
        </div>
        <Stars
          type="button"
          starsAmount={starsAmount}
          setStarsAmount={setStarsAmount}
        />
      </div>
      <textarea
        {...register('reviewTextZod')}
        className="bg-background placeholder:text-sm p-4  focus:outline-appGreen100 outline-none rounded-sm"
        placeholder="Escreva sua avaliação"
        onChange={(e) => setReviewText(e.target.value)}
      />
      {errors.reviewTextZod && (
        <p className="text-xs">{errors.reviewTextZod.message}</p>
      )}
      <div className="ml-auto flex gap-2">
        <button
          onClick={() => setIsNewCommentBoxVisible(false)}
          className="w-10 h-10 flex justify-center items-center border bg-gray-700 rounded-md"
        >
          <X />
        </button>
        <button
          onClick={handleSubmit(handleCreateReview)}
          className="w-10 h-10 flex justify-center items-center outline-1 border bg-gray-700 rounded-md"
        >
          <Check />
        </button>
      </div>
    </div>
  )
}
