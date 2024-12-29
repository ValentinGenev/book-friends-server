import { UsersRow, UsersColumns } from "../0data/schemas"
import { TableOperations } from "../0data/TableOperations"
import { SALT } from "../env"
import { Logger, Utilities } from "../interfaces"

export class Users {
  constructor(
    private readonly usersTable: TableOperations,
    private readonly utils: Utilities,
    private readonly logger: Logger
  ) { }

  hasUser(email: string): boolean {
    const hashedEmail = this.hashEmail(email)
    return Boolean(this.usersTable.findByValue(hashedEmail))
  }

  createUser(email: string): string {
    this.logger.log(`User created: ${email}`)
    const user: UsersRow = [this.utils.getUuid(), this.hashEmail(email)]
    this.usersTable.add(user)
    return user[UsersColumns.UUID]
  }

  findId(email: string): string | undefined {
    const hashedEmail = this.hashEmail(email)
    return this.usersTable.findByValue(hashedEmail)?.at(UsersColumns.UUID)
  }

  private hashEmail(email: string): string {
    return this.utils.computeHmacSha256Signature(email, SALT)
      .map(function (chr) { return (chr + 256).toString(16).slice(-2) })
      .join('')
  }
}
