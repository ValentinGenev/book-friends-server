import { Sheet } from "./Sheet"
import { Table } from "./Table"
import { TableOperations } from "./TableOperations"

export class TableFactory {
  private sheet: Sheet

  constructor (sheetId: string) {
    this.sheet = new Sheet(sheetId)
  }

  getTable(tableId: string): TableOperations {
    return new Table(this.sheet.getTable(tableId))
  }
}

