export interface Cache {
  put(key: string, value: string, expirationInSeconds: number): void
  get(key: string): string | null
  remove(key: string): void
}

export interface Utilities {
  computeHmacSha256Signature(value: string, key: string): number[]
  getUuid(): string
}

export interface Logger {
  log(any): void
}
