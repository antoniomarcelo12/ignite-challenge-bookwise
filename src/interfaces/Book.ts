export interface BookType {
  author: string
  cover_url: string
  created_at: string
  name: string
  summary: string
  total_pages: number
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
  }
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
}
