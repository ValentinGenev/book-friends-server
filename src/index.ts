import { TableFactory } from "./data/TableFactory"
import { Environment } from "./env.ts"

const tableFactory = new TableFactory(Environment.sheetId)
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
}
