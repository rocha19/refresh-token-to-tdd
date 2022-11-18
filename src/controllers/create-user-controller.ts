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
      const upperCaseLetter = /[A-Z]+/.test(password)
        ? true
        : {
            missingParam: `Password does not contain uppercase letter.`
          }
      const oneDigit = /(?=.*?[0-9])/.test(password)
        ? true
        : { missingParam: `Password does not contain numbers.` }
      const oneNumber =
        password.length >= 8
          ? true
          : { missingParam: `Password has less than 8 characters.` }
      if (upperCaseLetter !== true) {
        return response.status(400).send(upperCaseLetter.valueOf())
      }
      if (oneDigit !== true) {
        return response.status(400).send(oneDigit.valueOf())
      }
      if (oneNumber !== true) {
        return response.status(400).send(oneNumber.valueOf())
      }
      const user = await createUserService.execute(request.body)
      return response.status(200).send(user)
    } catch (error: any) {
      return response.status(500).json({ message: error.message })
    }
  }
}
