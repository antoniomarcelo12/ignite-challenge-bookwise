import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ status: 404, message: 'User not found.' })
  }

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
