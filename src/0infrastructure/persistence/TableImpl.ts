import { Table } from "../interfaces"
import { GenericColumns } from "./schemas"

export class TableImpl implements Table {
  constructor(private readonly table: GoogleAppsScript.Spreadsheet.Sheet) { }

  add(data: any[]) {
    this.table.appendRow(data)
  }

  update(id: string, data: any[]) {
    const rows = this.table.getDataRange().getValues()
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][GenericColumns.UUID] === id) {
        this.table.getRange(i, 1, 1, data.length).setValues([data])
        break
      }
    }
  }

  findById(id: string): any[] | undefined {
    const rows = this.table.getDataRange().getValues()
    return rows.find(row => row[GenericColumns.UUID] === id)
  }

  findAllById(id: string): any[][] {
    const rows = this.table.getDataRange().getValues()
    return rows.filter(row => row[GenericColumns.UUID] === id)
  }

  findByValue(value: string): any[] | undefined {
    const rows = this.table.getDataRange().getValues()
    return rows.find(row => row.includes(value))
  }

  getAll(): any[] {
    return this.table.getDataRange().getValues()
  }
}
