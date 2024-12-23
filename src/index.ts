import { TableFactory } from "./data/TableFactory"
import { SHEET_ID } from "./env"

const tableFactory = new TableFactory(SHEET_ID)
const booksTable = tableFactory.getTable('books')

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
    .setMimeType(ContentService.MimeType.JSON)
}
