import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = request.url
  const data = url.split('?')
  const dataParsed = data[1].split('=')
  const userId = dataParsed[1]

  const recentBookAvaliations = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      book: {
        select: {
          name: true,
          cover_url: true,
          author: true,
        },
      },
    },
  })
  return NextResponse.json({ recentBookAvaliations }, { status: 200 })
}
