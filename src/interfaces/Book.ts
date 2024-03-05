export interface BookType {
  author: string
  cover_url: string
  created_at: string
  name: string
  summary: string
  total_pages: number
  id: string
  rating: number
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

export interface GetBookAvaliationResponse {
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user: {
    image: string
    name: string
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
