import { Router } from 'express'
import { LoginUserController } from '@/controllers'
export const loginUser = Router()
const loginUserController = new LoginUserController()
loginUser.post('/', loginUserController.handle)
