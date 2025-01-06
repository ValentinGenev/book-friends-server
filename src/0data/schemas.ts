export enum GenericColumns {
  UUID = 0
}

export enum BooksColumns {
  UUID = 0,
  EMAIL = 1
}

export enum UsersColumns {
  UUID = 0,
  EMAIL = 1
}

export enum UsersBooksColumns {
  USER_ID = 0,
  BOOK_ID = 1
}

type UUID = string
type title = string
type email = string
type UserId = UUID
type BookId = UUID

export type BooksRow = [UUID, title]
export type UsersRow = [UUID, email]
export type UsersBooksRow = [UserId, BookId]
