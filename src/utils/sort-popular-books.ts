import { PopularBookInterface } from '@/interfaces/Book'

export function sortPopularBooks(popularBooks: PopularBookInterface[]) {
  return popularBooks.sort((a, b) => {
    if (a.bookRatingsAmount === b.bookRatingsAmount) {
      return b.bookRatingAverage - a.bookRatingAverage
    } else {
      return b.bookRatingsAmount - a.bookRatingsAmount
    }
  })
}
