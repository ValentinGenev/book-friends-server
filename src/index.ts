import { Request, RequestAction, ValidateCredentials } from "./0contracts/Request"
import { Response, Status } from "./0contracts/Response"
import { TableFactory } from "./0data/TableFactory"
import { SHEET_ID } from "./env"
import { TempPassword } from "./0auth/TempPassword"
import { Session } from "./0auth/Session"
import { Users } from "./0services/Users"

const tableFactory = new TableFactory(SHEET_ID)
const booksTable = tableFactory.getTable('books')
const cacheService = CacheService.getScriptCache()
const tempPassword = new TempPassword(cacheService, Utilities)
const session = new Session(tempPassword, cacheService, Utilities)
const users = new Users(tableFactory.getTable('users'), Utilities, Logger)

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
      const { email } = request.data
      if (!email) {
        response = { status: Status.ERROR, message: 'Email not provided.' }
      }
      MailApp.sendEmail({
        to: email,
        subject: 'Book Friends: Login',
        body: `Your password is code is ${tempPassword.getPassword(email)}. It will expire in 5 minutes.`,
      })
      response = { status: Status.OK, message: 'Password sent.' }
      break;

    case RequestAction.VALIDATE_CREDENTIALS:
      response = session.validateCredentials(request.data as ValidateCredentials)
      if (response.status === Status.OK) {
        const { email } = request.data
        const userId = !users.hasUser(email) ? users.createUser(email) : users.findId(email) as string
        response = { status: Status.OK, data: { token: session.createSession(userId) } }
      }
      break;

    case RequestAction.GET_BOOKS:
      const notLoggedInResponse = { status: Status.ERROR, message: 'You must login first.' }
      if (!request.token) {
        response = notLoggedInResponse
        break
      }

      const user = session.getCurrentUserId(request.token)
      if (!user) {
        response = notLoggedInResponse
        break
      }
      response = { status: Status.OK, data: { token: user } } // FIXME: delete, this is only for testing
      break;

    default:
      response = { status: Status.ERROR, message: 'Action not supported.' }
      break;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}
