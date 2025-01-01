import { BooksRow } from "../0data/schemas";

export interface Response {
  status: Status,
  message?: string,
  data?: Session | UserBooks;
}

export interface Session {
  token: string
}

export interface UserBooks {
  books: BooksRow[]
}

export enum Status {
  OK = "ok",
  ERROR = "error"
}
