import { Action } from "../interfaces";
import { Status } from "../api-contracts/Response";
import { SendEmail } from "../../0infrastructure/interfaces";
import { Response } from "../api-contracts/Response";
import { Request, Login as ILogin } from "../api-contracts/Request";
import { TempPassword } from "../../0infrastructure/auth/TempPassword";
import { DEV_ENV_TOKEN, IS_DEV } from "../../env";

export class Login implements Action {
  constructor(
    private readonly tempPassword: TempPassword,
    private readonly sendEmail: SendEmail
  ) {}

  execute(request: Request): Response {
    const { email, devEnvToken } = request.data as ILogin
    if (!email) {
      return { status: Status.ERROR, message: 'Email not provided.' }
    }

    if (IS_DEV && devEnvToken === DEV_ENV_TOKEN) {
      return { status: Status.OK, message: this.tempPassword.getPassword(email) }
    }

    this.sendEmail({
      to: email,
      subject: 'Book Friends: Login',
      body: `Your password is code is ${this.tempPassword.getPassword(email)}. It will expire in 5 minutes.`,
    })
    return { status: Status.OK, message: 'Password sent.' }
  }
}
