import { Request, Response } from 'express'
import { CreateUserService } from '@/services'
export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const createUserService = new CreateUserService()
      const { username, password } = request.body
      if (username.length < 3) {
        return response
          .status(400)
          .json({ missingParam: `${username} has less than 3 characters.` })
      }
      if (password.length < 8) {
        return response
          .status(400)
          .json({ missingParam: `${password} has less than 8 characters.` })
      }
      const user = createUserService.execute(request.body)
      return response.status(200).json({ user })
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
