export interface Request {
  action: RequestAction
  token?: string
  data: Login | ValidateCredentials
}

export enum RequestAction {
  LOGIN = 'login',
  VALIDATE_CREDENTIALS = 'validate_credentials',
  GET_BOOKS = 'get_books',
  GET_ALL_BOOKS = 'get_all_books'
}

export interface Login {
  email: string
}

export interface ValidateCredentials {
  email: string
  password: string
}
