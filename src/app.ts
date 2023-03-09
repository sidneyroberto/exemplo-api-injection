import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import 'reflect-metadata'

import { usersRouter } from './routes/users'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/users', usersRouter)
app.get('/', (req, res) => res.send('Blog API'))
