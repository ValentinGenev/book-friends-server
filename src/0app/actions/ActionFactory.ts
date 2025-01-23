
import { GetBooksByUser } from "./getBooksByUser";
import { Login } from "./Login";
import { ValidateCredentials } from "./ValidateCredentials";
import { SHEET_ID } from "../../env";
import { GetAllBooks } from "./GetAllBooks";
import { AddBookToUser } from "./AddBookToUser";
import { TableFactory } from "../../0infrastructure/persistence/TableFactory";
import { TempPassword } from "../../0infrastructure/auth/TempPassword";
import { Session } from "../../0infrastructure/auth/Session";
import { Cache, Utilities, SendEmail } from "../../0infrastructure/interfaces";
import { RequestAction } from "../../0infrastructure/api-contracts/Request";
import { Action } from "./interfaces";
import { Status } from "../../0infrastructure/api-contracts/Response";
import { Users } from "../../0model/services/Users";

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

      case RequestAction.ADD_BOOK_TO_USER:
        return new AddBookToUser(
          this.session,
          this.tableFactory.getTable('books'),
          this.tableFactory.getTable('users_books'),
          this.utils);

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
