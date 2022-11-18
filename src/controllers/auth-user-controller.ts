import { Request, Response } from 'express'
import { AuthUserService } from '@/services'
export class AuthUserController {
  async handle(request: Request, response: Response) {
    try {
      const authUserService = new AuthUserService()
      const token = await authUserService.execute(request.body)
      return response.status(200).send({ token })
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
