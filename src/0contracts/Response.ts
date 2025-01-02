import { BooksRow } from "../0data/schemas";

export interface Response {
  status: Status,
  message?: string,
  data?: Session | Books | UserBooks;
}

export interface Session {
  token: string
}

export interface Books {
  books: BooksRow[]
}

export interface UserBooks extends Books { }

export enum Status {
  OK = "ok",
  ERROR = "error"
}
