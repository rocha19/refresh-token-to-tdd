import 'dotenv/config'
import { sign } from 'jsonwebtoken'
export class GenerateTokenProvider {
  async execute(userId: string) {
    const secret = process.env.SECRET
    if (!secret) throw new Error('Need a valid secret')
    const token = sign({}, secret, { subject: userId, expiresIn: '20s' })
    return token
  }
}
