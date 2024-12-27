import { UsersTable } from "../0data/schemas"
import { TableOperations } from "../0data/TableOperations"
import { Logger, Utilities } from "../interfaces"

export class Users {
  constructor(
    private readonly usersTable: TableOperations,
    private readonly utils: Utilities,
    private readonly logger: Logger
  ) { }

  hasUser(email: string): boolean {
    return Boolean(this.usersTable.findByValue(email))
  }

  createUser(email: string): string {
    this.logger.log(`User created: ${email}`)
    // TODO: hash the email
    const userId = this.utils.getUuid()
    this.usersTable.add([userId, email])
    return userId
  }

  findId(email: string): string | undefined {
    return this.usersTable.findByValue(email)?.at(UsersTable.UUID)
  }
}
