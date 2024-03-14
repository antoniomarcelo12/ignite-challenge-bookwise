import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    userId: string
  }
}

export async function GET(_request: Request, { params }: Params) {
  const { userId } = params

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!userData) {
    return NextResponse.json({ message: 'Usuário inválido ou não encontrado.' })
  }

  const userRatings = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    include: {
      book: {
        include: {
          categories: true,
        },
      },
    },
  })

  const categoriesUserHaveReadArray = userRatings.map(
    (item) => item.book.categories,
  )

  const categoriesParsed = categoriesUserHaveReadArray.map((cat) => {
    const arr = cat.map((item) => {
      return item.categoryId
    })
    return arr
  })

  const catArrayUnsorted: string[] = []
  categoriesParsed.forEach((arr) => {
    arr.forEach((categ) => {
      catArrayUnsorted.push(categ)
    })
    return null
  })

  const catArray = catArrayUnsorted.sort()
  const objCounter: { catId: string; occ: number }[] = []

  let occurrences = 1
  let highestOccurrency = 1
  for (let catId = 0; catId < catArray.length; catId++) {
    if (catArray[catId] === catArray[catId + 1]) {
      occurrences = occurrences + 1
      highestOccurrency = occurrences
    } else {
      objCounter.push({ catId: catArray[catId], occ: occurrences })
      occurrences = 1
    }
  }
  const mostReadCategoriesArray: string[] = []

  const mostReadCategories = objCounter.filter(
    (cat) => cat.occ === highestOccurrency,
  )

  const allCategories = await prisma.category.findMany()

  allCategories.forEach((category) => {
    mostReadCategories.forEach((mostRead) => {
      if (category.id === mostRead.catId) {
        mostReadCategoriesArray.push(category.name)
      }
    })
  })

  return NextResponse.json({ mostReadCategoriesArray }, { status: 200 })
}
