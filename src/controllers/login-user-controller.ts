import { Request, Response } from 'express'
import { LoginUserService } from '@/services'
export class LoginUserController {
  async handle(request: Request, response: Response) {
    try {
      const loginUserService = new LoginUserService()
      const token = await loginUserService.execute(request.body)
      return response.status(200).send(token)
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
