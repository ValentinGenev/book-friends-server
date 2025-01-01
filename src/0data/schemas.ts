export enum GenericColumns {
  UUID = 0
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

export type BooksRow = [UUID, title]
export type UsersRow = [UUID, email]
