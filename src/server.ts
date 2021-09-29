import express from 'express'
import { tasksRouter } from './tasks/tasks.router'
import { campaignsRouter } from './campaigns/campaigns.router'
import Helmet from 'helmet'
import morganMiddleware from './lib/morganMiddleware'

const app = express()

app.use(Helmet())
app.use(morganMiddleware)
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/ping', (req, res) => {
  res.send({ data: 'pong' })
})

app.use('/api/tasks', tasksRouter)
app.use('/api/campaigns', campaignsRouter)

export default app
