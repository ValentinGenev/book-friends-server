import { Status, Response } from "../0contracts/Response"
import { Request } from "../0contracts/Request"
import { UsersBooksColumns } from "../0data/schemas"
import { Session } from "../0auth/Session"
import { Action, Table } from "../interfaces"

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
