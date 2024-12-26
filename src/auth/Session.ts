import { Login, ValidateCredentials } from "../contracts/Request"
import { Status, Response } from "../contracts/Response"
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
  private readonly tempPassword
  private readonly mail: Mail

  constructor(tempPassword: TempPassword, mail: Mail) {
    this.mail = mail
    this.tempPassword = tempPassword
  }

  login(data: Login): Response {
    const { email } = data
    if (!email) {
      return { status: Status.ERROR, message: 'Email not provided.' }
    }

    this.mail.sendEmail({
      to: email,
      subject: 'Book Friends: Login',
      body: `Your password is code is ${this.tempPassword.getPassword(email)}. It will expire in 5 minutes.`,
    })
    return { status: Status.OK, message: 'Password sent.' }
  }

  validateCredentials(data: ValidateCredentials): Response {
    const { email, password } = data
    if (!email || !password) {
      return { status: Status.ERROR, message: 'Credentials not provided.' }
    }

    if (this.tempPassword.isPasswordValid(email, password)) {
      // TODO: generate and store proper token
      this.tempPassword.removePassword(email)
      return { status: Status.OK, data: { token: 'asd' } };
    } else {
      return { status: Status.ERROR, message: "Credentials don't match." }
    }
  }
}
