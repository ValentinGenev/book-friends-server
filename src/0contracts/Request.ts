export interface Request {
  action: RequestAction
  token?: string
  data: Login | ValidateCredentials
}

export enum RequestAction {
  LOGIN = 'login',
  VALIDATE_CREDENTIALS = 'validate_credentials',
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
