import { Request, AddBookToUser as IAddBookToUser } from "../0contracts/Request"
import { Response, Status } from "../0contracts/Response"
import { Session } from "../0auth/Session"
import { Action, Table, Utilities } from "../interfaces"
import { BooksColumns, BooksRow, UsersBooksRow } from "../0data/schemas"

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
      // TODO: if the user has the book don't book. Stop booking. Please. Come one, man...

      const userBookData = [userId, book[BooksColumns.UUID]] as UsersBooksRow
      this.usersBooksTable.add(userBookData)

      return { status: Status.OK }
  }
}
