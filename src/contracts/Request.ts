export interface Request {
  action: RequestAction
  token?: string
  data: Login | ValidateCredentials
}

export interface Login {
  email: string
}

export interface ValidateCredentials {
  email: string
  password: string
}

export enum RequestAction {
  LOGIN = "login",
  VALIDATE_CREDENTIALS = "validate_credentials",
  GET_ALL_BOOKS = "get_all_books"
}
