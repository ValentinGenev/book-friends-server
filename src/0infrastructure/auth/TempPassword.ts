import { SALT } from "../../env";
import { Cache, Utilities } from "../interfaces"

// TODO: move towards normal password at some point?
export class TempPassword {
  constructor(
    private readonly cache: Cache,
    private readonly utils: Utilities
  ) { }

  getPassword(email: string): string {
    const password = this.generatePassword(8);
    this.cache.put(email, this.hashPassword(password), 300)
    return password
  }

  private generatePassword(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    }
    return result;
  }

  isPasswordValid(email: string, password: string): boolean {
    const cachedP = this.cache.get(email)
    if (cachedP === null) {
      return false;
    }
    return this.hashPassword(password) === cachedP
  }

  removePassword(email: string) {
    this.cache.remove(email)
  }

  private hashPassword(password: string): string {
    return this.utils.computeHmacSha256Signature(password, SALT)
      .map(function (chr) { return (chr + 256).toString(16).slice(-2) })
      .join('')
  }
}
