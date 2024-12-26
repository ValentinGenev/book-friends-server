interface Cache {
  put(key: string, value: string, expirationInSeconds: number): void
  get(key: string): string | null
  remove(key: string): void
}

export class TempPasswordService {
  private cache: Cache

  constructor(cache: Cache) {
    this.cache = cache
  }

  getPassword(email: string): string {
    const password = this.generatePassword(8);
    this.cache.put(email, password, 300)
    return password
  }

  generatePassword(length: number) {
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
    return password === cachedP
  }

  removePassword(email: string) {
    this.cache.remove(email)
  }
}
