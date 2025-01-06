import { BooksRow } from "../0data/schemas";

export interface Response {
  status: Status,
  message?: string,
  data?: Session | Books;
}

export interface Session {
  token: string
}

export interface Books {
  books: BooksRow[]
}

export enum Status {
  OK = "ok",
  ERROR = "error"
}
