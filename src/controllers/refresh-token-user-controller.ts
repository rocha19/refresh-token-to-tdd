import { Request, Response } from 'express'
import { RefreshTokenUserService } from '@/services'
export class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body
    try {
      const refreshTokenUserService = new RefreshTokenUserService()
      const token = await refreshTokenUserService.execute(refresh_token)
      return response.status(200).send(token)
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
