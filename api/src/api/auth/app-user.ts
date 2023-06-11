export class AppUser implements Express.User {
  private _id: string
  private _name: string
  private _email: string
  private _localId?: number
  private _permissions: Set<string>

  constructor(id: string, name: string, email: string, localId: number | undefined, permissions: string[]) {
    this._id = id
    this._name = name
    this._email = email
    this._localId = localId
    this._permissions = new Set(permissions)
  }

  get provider(): 'Google' {
    return 'Google'
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get localId() {
    return this._localId
  }

  get isNewUser() {
    return !this._id
  }

  get permissions(): ReadonlySet<string> {
    return this._permissions
  }

  hasPermission(key: string) {
    return this._permissions.has(key)
  }
}
