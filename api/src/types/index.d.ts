declare namespace Express {
  export interface User {
    get provider(): 'Google'
    get id(): string
    get name(): string
    get email(): string
    get localId(): number
    get isNewUser(): boolean
    get permissions(): ReadonlySet<string>
    hasPermission(key: string): boolean
  }
}
