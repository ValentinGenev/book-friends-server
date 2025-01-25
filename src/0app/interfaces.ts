import { Request } from "./api-contracts/Request"
import { Response } from "./api-contracts/Response"

export interface Action {
  execute(request?: Request): Response
}
