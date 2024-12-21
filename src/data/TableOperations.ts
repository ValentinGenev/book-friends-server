export interface TableOperations {
  add(data: any[]): void
  update(id: string, data: any[]): void
  findById(id: string): any
  getAll(): any[]
}
