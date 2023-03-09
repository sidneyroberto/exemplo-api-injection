import { Container } from 'inversify'

import { IUserDAO } from '../daos/IUserDAO'
import { UserPrismaDAO } from '../daos/UserPrismaDAO'
import { IUserController } from '../controllers/IUserController'
import { UserController } from '../controllers/UserController'
import { TYPES } from './types'

export const container = new Container()
container.bind<IUserDAO>(TYPES.IUserDAO).to(UserPrismaDAO)
container.bind<IUserController>(TYPES.IUserController).to(UserController)
