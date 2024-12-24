export class Sheet {
  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet

  constructor(id: string) {
    const spreadsheet = SpreadsheetApp.openById(id)
    if (spreadsheet === null) throw new Error(`SpreadSheet: ${id} is null`)
    this.spreadsheet = spreadsheet
  }

  getTable(name: string) {
    const sheet = this.spreadsheet.getSheetByName(name)
    if (sheet === null) throw new Error(`Sheet: ${name} is null`)
    return sheet
  }
}
