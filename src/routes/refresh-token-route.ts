import { Router } from 'express'
import { RefreshTokenUserController } from '@/controllers'
export const refreshTokenUser = Router()
const refreshTokenUserController = new RefreshTokenUserController()
refreshTokenUser.post('/', refreshTokenUserController.handle)
