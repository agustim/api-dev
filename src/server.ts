import express from 'express'
import { tasksRouter } from './tasks/tasks.router'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/ping', (req, res) => {
  res.send({ data: 'pong' })
})

app.use('/api/tasks', tasksRouter)

export default app
