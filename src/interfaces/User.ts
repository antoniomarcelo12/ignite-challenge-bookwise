export interface GetProfileResponse {
  userData: {
    createdAt: string
    id: string
    image: string
    name: string
  }
  totalPagesRead: number
  booksRated: number
}
