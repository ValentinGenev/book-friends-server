export interface Request {
  action: RequestAction
  body?: any
}

export enum RequestAction {
  GET_ALL_BOOKS = "get_all_books"
}
