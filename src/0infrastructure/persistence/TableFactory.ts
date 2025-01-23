import { Table } from "../interfaces"
import { Sheet } from "./Sheet"
import { TableImpl } from "./TableImpl"

export class TableFactory {
  private readonly sheet: Sheet
  // TODO: add object pool and transform the class to Flyweight

  constructor(sheetId: string) {
    this.sheet = new Sheet(sheetId)
  }

  getTable(name: string): Table {
    return new TableImpl(this.sheet.getTable(name))
  }
}

