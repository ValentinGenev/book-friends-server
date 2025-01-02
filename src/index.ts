import { Request, RequestAction } from "./0contracts/Request"
import { ActionFactory } from "./0actions/ActionFactory"

const actionFactory = new ActionFactory(
  CacheService.getScriptCache(),
  Utilities,
  MailApp.sendEmail)

function doGet(e) {
  const response = actionFactory.getAction(RequestAction.GET_ALL_BOOKS).execute()

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}

function doPost(e) {
  const request: Request = JSON.parse(e.postData.contents)
  const response = actionFactory.getAction(request.action).execute(request)

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}
