import { Router } from 'express'
import { AuthUserController } from '@/controllers'
export const authUser = Router()
const authUserController = new AuthUserController()
authUser.post('/', authUserController.handle)
