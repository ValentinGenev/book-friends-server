export interface Response {
  status: Status,
  message?: string,
  data?: Session;
}

export interface Session {
  token: string
}

export enum Status {
  OK = "ok",
  ERROR = "error"
}
