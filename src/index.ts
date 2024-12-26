import { Request, RequestAction, ValidateCredentials } from "./contracts/Request"
import { Response, Status } from "./contracts/Response"
import { TableFactory } from "./data/TableFactory"
import { SHEET_ID } from "./env"
import { TempPassword } from "./auth/TempPassword"
import { Session } from "./auth/Session"

const tableFactory = new TableFactory(SHEET_ID)
const booksTable = tableFactory.getTable('books')
const tempPassword = new TempPassword(CacheService.getScriptCache())
const session = new Session(tempPassword, MailApp)

function doGet(e) {
  const books = booksTable.getAll().map(row => {
    const [id, title] = row
    return { id, title }
  })

  return ContentService.createTextOutput(JSON.stringify(books))
    .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  const request: Request = JSON.parse(e.postData.contents)
  let response: Response = { status: Status.ERROR }

  switch (request.action) {
    case RequestAction.LOGIN:
      response = session.login(request.data)
      break;

    case RequestAction.VALIDATE_CREDENTIALS:
      response = session.validateCredentials(request.data as ValidateCredentials)
      break;

    default:
      response = { status: Status.ERROR, message: 'Action not supported.' }
      break;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}
