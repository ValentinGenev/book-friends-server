export interface Cache {
  put(key: string, value: string, expirationInSeconds: number): void
  get(key: string): string | null
  remove(key: string): void
}

export interface Utilities {
  computeHmacSha256Signature(value: string, key: string): number[]
  getUuid(): string
}

export interface Table {
  add(data: any[]): void
  update(id: string, data: any[]): void
  findById(id: string): any
  findAllById(value: string): any[][]
  findByValue(value: string): any[] | undefined
  getAll(): any[]
}

export type SendEmail = (data: { to: string, subject: string, body: string }) => void
