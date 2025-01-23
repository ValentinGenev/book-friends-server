import { Session } from "../../0infrastructure/auth/Session";
import { Action } from "./interfaces";
import { Status } from "../../0infrastructure/api-contracts/Response";
import { Table } from "../../0infrastructure/interfaces";
import { Response } from "../../0infrastructure/api-contracts/Response";
import { Request } from "../../0infrastructure/api-contracts/Request";
import { UsersBooksColumns } from "../../0infrastructure/persistence/schemas";

export class GetBooksByUser implements Action {
  constructor(
    private readonly session: Session,
    private readonly booksTable: Table,
    private readonly userBooksTable: Table
  ) { }

  execute(request: Request): Response {
    const loginErrorMsg = { status: Status.ERROR, message: 'You must login first.' }
    if (!request.token) {
      return loginErrorMsg
    }
    const userId = this.session.getCurrentUserId(request.token)
    if (!userId) {
      return loginErrorMsg
    }

    const userBooks = this.userBooksTable.findAllById(userId)
    const books = userBooks
      .map(book => this.booksTable.findById(book[UsersBooksColumns.BOOK_ID]));
    return { status: Status.OK, data: { books } }
  }
}
