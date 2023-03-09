import { User } from '../domains/User'

export interface IUserDAO {
  registerUser(user: User): Promise<User>
  userAlreadyExists(email: string): Promise<boolean>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  deleteUserByEmail(email: string): Promise<boolean>
}
