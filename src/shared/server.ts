import 'module-alias/register'
import 'reflect-metadata'
import 'dotenv/config'
import app from '@/shared/app'
const port = process.env.PORT
app.listen(port)
