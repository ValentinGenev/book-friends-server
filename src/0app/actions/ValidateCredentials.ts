import { Session } from "../../0infrastructure/auth/Session";
import { Action } from "../interfaces";
import { Status } from "../api-contracts/Response";
import { Response } from "../api-contracts/Response";
import { Request, ValidateCredentials as IValidateCredentials } from "../api-contracts/Request";
import { TempPassword } from "../../0infrastructure/auth/TempPassword";
import { Users } from "../../0model/services/Users";

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
