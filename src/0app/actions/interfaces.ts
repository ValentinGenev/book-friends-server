import { Request } from "../../0infrastructure/api-contracts/Request"
import { Response } from "../../0infrastructure/api-contracts/Response"

export interface Action {
  execute(request?: Request): Response
}
