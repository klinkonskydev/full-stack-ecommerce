import express from 'express'
import type { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { PrismaClient } from './generated/prisma/client'
import usersRoute from './routes/users'

export const prisma = new PrismaClient()
const app: Express = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())

/* ====================== ROUTES ====================== */
app.use('/users', usersRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server')
})

app.listen(port, () => {
  console.log('Server is running at http://localhost:%s', port)
})
