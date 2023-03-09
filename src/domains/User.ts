import { Length, IsEmail, Validate } from 'class-validator'
import { BaseEntity } from './BaseEntity'
import { pbkdf2Sync, randomBytes } from 'crypto'
import { PasswordValidator } from '../validators/PasswordValidator'

export class User extends BaseEntity {
  @Length(5, 50, {
    message: 'User name must have between 5 and 50 characters',
  })
  name: string

  @IsEmail({}, { message: 'Invalid email' })
  email: string

  hash?: string = ''

  salt?: string = ''

  @Validate(PasswordValidator)
  password?: string

  constructor(obj: any) {
    super()
    const { id, name, email, password } = obj
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this._generatePassword()
  }

  isPasswordCorrect(password: string): boolean {
    const hash = pbkdf2Sync(
      password,
      this.salt || '',
      1000,
      64,
      'sha512'
    ).toString('hex')
    return hash == this.hash
  }

  clear(): User {
    const user = this
    delete user.hash
    delete user.salt
    return user
  }

  private _generatePassword() {
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(
      this.password || '',
      salt,
      1000,
      64,
      'sha512'
    ).toString('hex')
    this.salt = salt
    this.hash = hash
  }
}
