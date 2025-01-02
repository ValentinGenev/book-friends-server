import { Response, Status } from "../0contracts/Response";
import { Action, Table } from "../interfaces";

export class GetAllBooks implements Action {
  constructor(private readonly booksTable: Table) { }

  execute(): Response {
    const books = this.booksTable.getAll()
    return { status: Status.OK, data: { books }}
  }
}
