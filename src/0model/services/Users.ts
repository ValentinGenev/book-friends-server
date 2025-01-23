import { Table, Utilities } from "../../0infrastructure/interfaces"
import { UsersColumns, UsersRow } from "../../0infrastructure/persistence/schemas"
import { SALT } from "../../env"

export class Users {
  constructor(
    private readonly usersTable: Table,
    private readonly utils: Utilities
  ) { }

  hasUser(email: string): boolean {
    const hashedEmail = this.hashEmail(email)
    return Boolean(this.usersTable.findByValue(hashedEmail))
  }

  createUser(email: string): string {
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
