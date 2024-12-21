import { Sheet } from "./Sheet"
import { Table } from "./Table"

export class TableFactory {
  private sheet: Sheet

  constructor (sheetId: string) {
    this.sheet = new Sheet(sheetId)
  }

  getTable(tableId: string) {
    return new Table(this.sheet.getTable(tableId))
  }
}

