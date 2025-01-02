import { Action, Cache, SendEmail, Utilities } from "../interfaces";
import { RequestAction } from "../0contracts/Request";
import { Status } from "../0contracts/Response";
import { Session } from "../0auth/Session";
import { TableFactory } from "../0data/TableFactory";
import { GetBooksByUser } from "./getBooksByUser";
import { Login } from "./Login";
import { TempPassword } from "../0auth/TempPassword";
import { ValidateCredentials } from "./ValidateCredentials";
import { Users } from "../0services/Users";
import { SHEET_ID } from "../env";
import { GetAllBooks } from "./GetAllBooks";

export class ActionFactory {
  private readonly tableFactory: TableFactory
  private readonly tempPassword: TempPassword
  private readonly session: Session

  constructor(
    cache: Cache,
    private readonly utils: Utilities,
    private readonly sendEmail: SendEmail
  ) {
    this.tableFactory = new TableFactory(SHEET_ID)
    this.tempPassword = new TempPassword(cache, utils)
    this.session = new Session(cache, utils)
  }

  getAction(action: RequestAction): Action {
    switch (action) {
      case RequestAction.GET_ALL_BOOKS:
        return new GetAllBooks(this.tableFactory.getTable('books'))

      case RequestAction.LOGIN:
        return new Login(this.tempPassword, this.sendEmail)

      case RequestAction.VALIDATE_CREDENTIALS:
        return new ValidateCredentials(
          this.tempPassword,
          this.session,
          new Users(this.tableFactory.getTable('users'), this.utils))

      case RequestAction.GET_BOOKS_BY_USER:
        return new GetBooksByUser(
          this.session,
          this.tableFactory.getTable('books'),
          this.tableFactory.getTable('users_books'))

      default:
        return {
          execute: () => ({ status: Status.ERROR, message: 'Action not supported.' })
        }
    }
  }
}
