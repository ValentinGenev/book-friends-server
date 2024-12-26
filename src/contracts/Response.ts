export interface Response {
  status: Status,
  message?: string
}

export enum Status {
  OK = "ok",
  ERROR = "error"
}
