export class Sheet {
  private properties: GoogleAppsScript.Properties.Properties
  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet

  constructor(id: string) {
    this.properties = PropertiesService.getScriptProperties()

    const spreadsheetId = this.properties.getProperty(id)
    if (spreadsheetId === null) throw new Error(`SpreadSheetId: ${id} is null`)

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
    if (spreadsheet === null) throw new Error(`SpreadSheet: ${spreadsheetId} is null`)
    this.spreadsheet = spreadsheet
  }

  getTable(sheetId: string) {
    const sheetName = this.properties.getProperty(sheetId)
    if (sheetName === null) throw new Error(`SheetName: ${sheetId} is null`)

    const sheet = this.spreadsheet.getSheetByName(sheetName)
    if (sheet === null) throw new Error(`Sheet: ${sheetName} is null`)
    return sheet
  }
}
