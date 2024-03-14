import { PopularBookInterface } from '@/interfaces/Book'

export function SortPopularBooks(popularBooks) {
  return popularBooks.sort(function (a, b) {
    if (a.bookRatingsAmount === b.bookRatingsAmount) {
      if (a.bookRatingAverage < b.bookRatingAverage) {
        return 1
      }
      if (a.bookRatingAverage > b.bookRatingAverage) {
        return -1
      }
    }
  })
}
