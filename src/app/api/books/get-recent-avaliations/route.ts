import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const recentBookAvaliations = await prisma.rating.findMany({
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
