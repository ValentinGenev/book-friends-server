import { TempPassword } from "../0auth/TempPassword";
import { Request } from "../0contracts/Request";
import { Response, Status } from "../0contracts/Response";
import { Action, SendEmail } from "../interfaces";
import { Login as ILogin } from "../0contracts/Request";

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
