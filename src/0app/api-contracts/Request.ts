export interface Request {
  action: RequestAction
  token?: string
  data: Login | ValidateCredentials | AddBookToUser
}

export enum RequestAction {
  LOGIN = 'login',
  VALIDATE_CREDENTIALS = 'validate_credentials',
  ADD_BOOK_TO_USER = 'add_book_to_user',
  GET_BOOKS_BY_USER = 'get_books_by_user',
  GET_ALL_BOOKS = 'get_all_books'
}

export interface Login {
  email: string
}

export interface ValidateCredentials {
  email: string
  password: string
}

export interface AddBookToUser {
  title: string
}
