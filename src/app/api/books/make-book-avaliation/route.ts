import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface MakeNewAvaliationBody {
  reviewText: string
  starsAmount: number
  selectedBookId: string
  userId: string
}

export async function POST(request: Request) {
  const body: MakeNewAvaliationBody = await request.json()

  if (!body) {
    return NextResponse.json({ message: 'dados não informados.' })
  }

  try {
    await prisma.rating.create({
      data: {
        created_at: new Date(),
        book_id: body.selectedBookId,
        description: body.reviewText,
        rate: body.starsAmount,
        user_id: body.userId,
      },
    })
    return NextResponse.json({ status: 200 })
  } catch (err) {
    return NextResponse.json({ status: 500 })
  }
}
