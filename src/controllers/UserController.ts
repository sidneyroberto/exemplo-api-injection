import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import EmailValidator from 'email-validator'

import { IUserDAO } from '../daos/IUserDAO'
import { User } from '../domains/User'
import { validateEntity } from '../utils/validation'
import { TYPES } from '../injection/types'
import { IUserController } from './IUserController'

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.IUserDAO) private _userDAO: IUserDAO) {}

  async save(req: Request, res: Response) {
    const { email } = req.body

    let messages: string[] = []

    if (await this._userDAO.userAlreadyExists(email)) {
      messages.push('A user with this email already exists')
    }

    const user: User = new User(req.body)
    const errorMessages = await validateEntity(user)
    messages = [...messages, ...errorMessages]

    if (messages.length > 0) {
      return res.status(400).json({ messages })
    }

    const savedUser = await this._userDAO.registerUser(user)
    return res.status(201).json({ user: savedUser.clear() })
  }

  async findByEmail(req: Request, res: Response) {
    const { email } = req.params

    if (!EmailValidator.validate(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const user = await this._userDAO.findUserByEmail(email)
    if (user) {
      return res.status(200).json({ user: user.clear() })
    }

    return res.status(404).json({ message: 'User not found' })
  }
}
