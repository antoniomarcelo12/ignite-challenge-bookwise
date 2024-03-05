import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const allBooks = await prisma.book.findMany()
  return NextResponse.json({ books: allBooks }, { status: 200 })
}
