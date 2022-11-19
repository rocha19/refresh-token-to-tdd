import { Router } from 'express'
import { AuthenticationUserController } from '@/controllers'
export const authenticationUser = Router()
const authenticationUserController = new AuthenticationUserController()
authenticationUser.post('/', authenticationUserController.handle)
