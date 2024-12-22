import { TableFactory } from "./data/TableFactory"
import { Environment, TableIDs } from "./env"

const tableFactory = new TableFactory(Environment.SHEET_ID)
const booksTable = tableFactory.getTable(TableIDs.BOOKS)

function doGet(e) {
  const books = booksTable.getAll().map(row => {
    const [id, title] = row
    return { id, title }
  })
  return ContentService.createTextOutput(JSON.stringify(books))
    .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  const content = e.postData.contents
  // TODO: finish this
  return ContentService.createTextOutput(JSON.stringify(content))
}
