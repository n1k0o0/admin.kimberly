export const InternalUserTypes = {
  admin: 'admin',
  jury: 'jury',
}

export function getPrintableInternalUserTypes() {
  return {
    admin: 'Администратор',
    jury: 'Судья',
  }
}

export function getPrintableUserType(type) {
  const types = getPrintableInternalUserTypes()
  if (types.hasOwnProperty(type)) {
    return types[type]
  }

  return ''
}

export class InternalUser {
  constructor() {
    this.login = ''
    this.password = ''
    this.type = null
  }

  setPassword(password) {
    this.password = password

    return this
  }

  setLogin(login) {
    this.login = login

    return this
  }

  static fromFields(fields) {
    for (const field in fields) {
      this[field] = fields[field]
    }
  }
}
