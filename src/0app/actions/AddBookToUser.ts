import { Action } from "../interfaces";
import { Session } from "../../0infrastructure/auth/Session";
import { Table, Utilities } from "../../0infrastructure/interfaces";
import { Status } from "../api-contracts/Response";
import { Request, AddBookToUser as IAddBookToUser } from "../api-contracts/Request";
import { Response } from "../api-contracts/Response";
import { BooksColumns, BooksRow, UsersBooksColumns, UsersBooksRow } from "../../0infrastructure/persistence/schemas";


export class AddBookToUser implements Action {
  constructor(
    private readonly session: Session,
    private readonly booksTable: Table,
    private readonly usersBooksTable: Table,
    private readonly utils: Utilities
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

      // TODO: create a book service. Make sure that the book creation returns the book ID
      const { title } = request.data as IAddBookToUser
      let book = this.booksTable.findByValue(title) as BooksRow
      if (!book) {
        book = [this.utils.getUuid(), title]
        this.booksTable.add(book)
      }
      if (this.usersBooksTable.findByValue(book[UsersBooksColumns.USER_ID])) {
        return { status: Status.OK }
      }

      const userBookData = [userId, book[BooksColumns.UUID]] as UsersBooksRow
      this.usersBooksTable.add(userBookData)

      return { status: Status.OK }
  }
}
