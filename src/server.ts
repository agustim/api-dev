import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/test', (req, res) => {
  res.send({ test: 'test' })
})

export default app
