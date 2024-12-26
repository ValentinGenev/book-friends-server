import { Request, RequestAction } from "./contracts/Request"
import { Response, Status } from "./contracts/Response"
import { TableFactory } from "./data/TableFactory"
import { SHEET_ID } from "./env"
import { TempPasswordService } from "./services/TempPasswordService"

const tableFactory = new TableFactory(SHEET_ID)
const booksTable = tableFactory.getTable('books')
const tempPasswordService = new TempPasswordService(CacheService.getScriptCache())

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
  let response: Response = { status: Status.OK }

  switch (request.action) {
    case RequestAction.LOGIN:
      // TODO: move to a service at some point
      const email = request.data?.email
      if (!email) {
        response = returnError('Email not provided.')
        break
      }

      MailApp.sendEmail({
        to: email,
        subject: 'Book Friends: Login',
        body: `Your password is code is ${tempPasswordService.getPassword(email)}. It will expire in 5 minutes.`,
      })
      response.message = 'Password sent.'
      break;

    default:
      response = returnError('Action not supported.')
      break;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}

function returnError(message: string): Response {
  return { status: Status.ERROR, message }
}
