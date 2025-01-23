import { Action } from "./interfaces";
import { Status } from "../../0infrastructure/api-contracts/Response";
import { SendEmail } from "../../0infrastructure/interfaces";
import { Response } from "../../0infrastructure/api-contracts/Response";
import { Request, Login as ILogin } from "../../0infrastructure/api-contracts/Request";
import { TempPassword } from "../../0infrastructure/auth/TempPassword";

export class Login implements Action {
  constructor(
    private readonly tempPassword: TempPassword,
    private readonly sendEmail: SendEmail
  ) {}

  execute(request: Request): Response {
    const { email } = request.data as ILogin
    if (!email) {
      return { status: Status.ERROR, message: 'Email not provided.' }
    }

    this.sendEmail({
      to: email,
      subject: 'Book Friends: Login',
      body: `Your password is code is ${this.tempPassword.getPassword(email)}. It will expire in 5 minutes.`,
    })
    return { status: Status.OK, message: 'Password sent.' }
  }
}
