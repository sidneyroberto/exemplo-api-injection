import { Router } from 'express'
import { container } from '../injection/container'
import { IUserController } from '../controllers/IUserController'
import { TYPES } from '../injection/types'

export const usersRouter = Router()
const userCtrl = container.get<IUserController>(TYPES.IUserController)

usersRouter.post('/', (req, res) => userCtrl.save(req, res))
usersRouter.get('/email/:email', (req, res) => userCtrl.findByEmail(req, res))
