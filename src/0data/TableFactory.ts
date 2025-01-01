import { Table } from "../interfaces"
import { Sheet } from "./Sheet"
import { TableImpl } from "./TableImpl"

export class TableFactory {
  private readonly sheet: Sheet

  constructor(sheetId: string) {
    this.sheet = new Sheet(sheetId)
  }

  getTable(name: string): Table {
    return new TableImpl(this.sheet.getTable(name))
  }
}

