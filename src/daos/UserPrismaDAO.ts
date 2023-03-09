import { IUserDAO } from './IUserDAO'
import { User } from '../domains/User'
import { injectable } from 'inversify'
import { prismaClient } from '../configs/db'

@injectable()
export class UserPrismaDAO implements IUserDAO {
  async registerUser(user: User): Promise<User> {
    const { name, email, hash, salt } = user
    const savedUser = await prismaClient.user.create({
      data: { name, email, hash: hash || '', salt: salt || '' },
    })

    return new User(savedUser)
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    const count = await prismaClient.user.count({ where: { email: email } })
    return count > 0
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { email: email } })
    if (user) {
      return new User(user)
    }

    return user
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { id: id } })
    if (user) {
      return new User(user)
    }

    return user
  }

  async deleteUserByEmail(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email)
    if (user) {
      await prismaClient.user.delete({ where: { email: email } })
      return true
    }

    return false
  }
}
