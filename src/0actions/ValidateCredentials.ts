import { Request } from "../0contracts/Request";
import { Response, Status } from "../0contracts/Response";
import { Action } from "../interfaces";
import { ValidateCredentials as IValidateCredentials } from "../0contracts/Request";
import { TempPassword } from "../0auth/TempPassword";
import { Session } from "../0auth/Session";
import { Users } from "../0services/Users";

export class ValidateCredentials implements Action {
  constructor(
    private readonly tempPassword: TempPassword,
    private readonly session: Session,
    private readonly users: Users
  ) { }

  execute(request: Request): Response {
    const { email, password } = request.data as IValidateCredentials

    if (!email || !password) {
      return { status: Status.ERROR, message: 'Credentials not provided.' }
    } else if (!this.tempPassword.isPasswordValid(email, password)) {
      return { status: Status.ERROR, message: "Credentials don't match." }
    }
    this.tempPassword.removePassword(email)

    const userId = !this.users.hasUser(email)
      ? this.users.createUser(email)
      : this.users.findId(email) as string
    return { status: Status.OK, data: { token: this.session.createSession(userId) } }
  }
}
