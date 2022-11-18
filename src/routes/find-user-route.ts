import { Router } from 'express'
import { FindUserController } from '@/controllers'
export const findUser = Router()
const findUserController = new FindUserController()
findUser.get('/', findUserController.handle)
