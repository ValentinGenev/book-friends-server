export interface Request {
  action: RequestAction
  token?: string
  data?: Login
}

export interface Login {
  email: string
}

export enum RequestAction {
  LOGIN = "login",
  GET_ALL_BOOKS = "get_all_books"
}
