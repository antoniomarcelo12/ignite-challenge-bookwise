export interface BookType {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  averageRating: number
  categoriesArray: string[]
}

export interface GetRecentAvaliationsResponse {
  book: {
    name: string
    cover_url: string
    author: string
  }
  user: {
    name: string | null
    image: string | null
    id: string
  }
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user_id: string
}

export interface GetUserAvaliationsResponse {
  book: {
    author: string
    cover_url: string
    name: string
  }
  user: {
    name: string
    image: string
    id: string
  }

  book_id: string
  created_at: string
  description: string
  id: string
  rate: number
  user_id: string
}

// ______________________________________________________________________________________

export interface GetPopularBooksResponse {
  popularBooks: {
    bookId: string
    bookName: string
    bookCover: string
    bookAuthor: string
    bookRatingsAmount: number
    bookRatingAverage: number
  }[]
}
export interface PopularBookInterface {
  bookId: string
  bookName: string
  bookCover: string
  bookAuthor: string
  bookRatingsAmount: number
  bookRatingAverage: number
}

export interface GetBookAvaliationResponse {
  bookAvaliations: {
    id: string
    rate: number
    description: string
    created_at: string
    book_id: string
    user_id: string
    user: {
      name: string
      image: string
      id: string
    }
    book: {
      categories: {
        category: {
          id: string
          name: string
        }
      }[]
    }
  }[]
}

export interface BookAvaliation {
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user_id: string
  user: {
    name: string
    image: string
    id: string
  }
  book: {
    categories: {
      category: {
        id: string
        name: string
      }
    }[]
  }
}
