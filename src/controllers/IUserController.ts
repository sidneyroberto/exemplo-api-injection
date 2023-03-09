import { Request, Response } from 'express'

export interface IUserController {
  save(req: Request, res: Response): Promise<Response>
  findByEmail(req: Request, res: Response): Promise<Response>
}
