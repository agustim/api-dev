import express from 'express'
import { tasksRouter } from './tasks/tasks.router'
//import proxy from './mailing'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/ping', (req, res) => {
  res.send({ data: 'pong' })
})

app.use('/api/tasks', tasksRouter)

// mailing proxy

// app.use('/maildev', proxy)

export default app
