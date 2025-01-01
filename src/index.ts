import { Login, Request, RequestAction, ValidateCredentials } from "./0contracts/Request"
import { Response, Status } from "./0contracts/Response"
import { TableFactory } from "./0data/TableFactory"
import { SHEET_ID } from "./env"
import { TempPassword } from "./0auth/TempPassword"
import { Session } from "./0auth/Session"
import { Users } from "./0services/Users"
import { UsersBooksColumns } from "./0data/schemas"

const tableFactory = new TableFactory(SHEET_ID)
const cache = CacheService.getScriptCache()

function doGet(e) {
  const booksTable = tableFactory.getTable('books')
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
      response = login(request.data as Login)
      break;

    case RequestAction.VALIDATE_CREDENTIALS:
      response = validateCredentials(request.data as ValidateCredentials)
      break;

    case RequestAction.GET_BOOKS_BY_USER:
      response = getBooksByUser(request)
      break;

    default:
      response = { status: Status.ERROR, message: 'Action not supported.' }
      break;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}

function login(data: Login): Response {
  const { email } = data
  if (!email) {
    return { status: Status.ERROR, message: 'Email not provided.' }
  }

  const tempPassword = new TempPassword(cache, Utilities)
  MailApp.sendEmail({
    to: email,
    subject: 'Book Friends: Login',
    body: `Your password is code is ${tempPassword.getPassword(email)}. It will expire in 5 minutes.`,
  })
  return { status: Status.OK, message: 'Password sent.' }
}

function validateCredentials(data: ValidateCredentials): Response {
  const { email, password } = data as ValidateCredentials

  // TODO: figure out if we can apply any design pattern so we don't have to provide a Session each time
  const tempPassword = new TempPassword(cache, Utilities)
  if (!email || !password) {
   return { status: Status.ERROR, message: 'Credentials not provided.' }
  } else if (!tempPassword.isPasswordValid(email, password)) {
    return { status: Status.ERROR, message: "Credentials don't match." }
  }
  tempPassword.removePassword(email)

  const session = new Session(cache, Utilities)
  const users = new Users(tableFactory.getTable('users'), Utilities)
  const userId = !users.hasUser(email) ? users.createUser(email) : users.findId(email) as string
  return { status: Status.OK, data: { token: session.createSession(userId) } }
}

function getBooksByUser(request: Request): Response {
  const loginErrorMsg = { status: Status.ERROR, message: 'You must login first.' }
  const session = new Session(cache, Utilities)
  if (!request.token) {
    return loginErrorMsg
  }
  const userId = session.getCurrentUserId(request.token)
  if (!userId) {
    return loginErrorMsg
  }

  const userBookTable = tableFactory.getTable('users_books')
  const userBooks = userBookTable.findAllById(userId)
  const booksTable = tableFactory.getTable('books')
  const books = userBooks
    .map(book => booksTable.findById(book[UsersBooksColumns.BOOK_ID]));
  return { status: Status.OK, data: { books } }
}
