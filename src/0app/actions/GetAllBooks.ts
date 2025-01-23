import { Action } from "./interfaces";
import { Table } from "../../0infrastructure/interfaces";
import { Status } from "../../0infrastructure/api-contracts/Response";
import { Response } from "../../0infrastructure/api-contracts/Response";

export class GetAllBooks implements Action {
  constructor(private readonly booksTable: Table) { }

  execute(): Response {
    const books = this.booksTable.getAll()
    return { status: Status.OK, data: { books }}
  }
}
