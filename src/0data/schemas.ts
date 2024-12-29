export enum GenericColumns {
  UUID = 0
}

export enum UsersColumns {
  UUID = 0,
  EMAIL = 1
}

type UUID = string
type email = string

export type UsersRow = [UUID, email]
