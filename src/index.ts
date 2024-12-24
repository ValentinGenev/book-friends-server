import { TableFactory } from "./data/TableFactory"

// WARNING: the following two constants should be changed if the sheet changes
// FIXME: find a viable solution for storing the constants
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
