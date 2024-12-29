import { ValidateCredentials } from "../0contracts/Request"
import { Status, Response } from "../0contracts/Response"
import { SALT } from "../env"
import { Cache, Utilities } from "../interfaces"
import { TempPassword } from "./TempPassword"

interface Mail {
  sendEmail(MailData): void
}

type MailData = {
  to: string
  subject: string
  body: string
}

export class Session {
  constructor(
    private readonly tempPassword: TempPassword,
    private readonly cache: Cache,
    private readonly utils: Utilities
  ) { }

  validateCredentials(data: ValidateCredentials): Response {
    const { email, password } = data
    if (!email || !password) {
      return { status: Status.ERROR, message: 'Credentials not provided.' }
    }

    if (this.tempPassword.isPasswordValid(email, password)) {
      this.tempPassword.removePassword(email)
      return { status: Status.OK };
    } else {
      return { status: Status.ERROR, message: "Credentials don't match." }
    }
  }

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
