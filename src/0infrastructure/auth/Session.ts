import { SALT } from "../../env"
import { Cache, Utilities } from "../interfaces"

export class Session {
  constructor(
    private readonly cache: Cache,
    private readonly utils: Utilities
  ) { }

  createSession(userId: string): string {
    const token = this.createToken(userId)
    this.cache.put(token, userId, 86400)
    return token
  }

  private createToken(email: string): string {
    return this.utils.computeHmacSha256Signature(`${Date.now()}${email}`, SALT)
      .map(function (chr) { return (chr + 256).toString(16).slice(-2) })
      .join('')
  }

  getCurrentUserId(token: string): string | null {
    return this.cache.get(token)
  }
}
