import { TableOperations } from "./TableOperations"

export class Table implements TableOperations {
  private table: GoogleAppsScript.Spreadsheet.Sheet

  constructor(table: GoogleAppsScript.Spreadsheet.Sheet) {
    this.table = table
  }

  add(data: any[]) {
    this.table.appendRow(data)
  }

  update(id: string, data: any[]) {
    const rows = this.table.getDataRange().getValues()
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id) {
        this.table.getRange(i, 1, 1, data.length).setValues([data])
        break
      }
    }
  }

  findById(id: string) {
    const rows = this.table.getDataRange().getValues()
    return rows.find(row => row[0] === id)
  }

  getAll(): any[] {
    return this.table.getDataRange().getValues()
  }
}
