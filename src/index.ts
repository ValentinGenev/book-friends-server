import { TableFactory } from "./data/TableFactory"

const tableFactory = new TableFactory('SHEET_ID')
const booksTable = tableFactory.getTable('BOOKS_TABLE_ID')

function doGet() {
  const books = booksTable.getAll().map(row => row.join(' ')).join(', ')
  return HtmlService.createHtmlOutput(books)
}
