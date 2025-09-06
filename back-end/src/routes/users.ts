import express from 'express'
import { prisma } from '../app'

const usersRoute = express.Router()

usersRoute.get('/', async (_, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users)
})

usersRoute.post('/', async (req, res) => {
  const params = req.body
  console.log({ params })

  res.status(200).send('Log')
})

export default usersRoute
