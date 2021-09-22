import app from './server'
import { name, version } from '../package.json'
import * as dotenv from 'dotenv'

dotenv.config()
const port = parseInt(process.env.PORT as string, 10) || 3000

app.listen(port, () => {
  console.log(`Start ${name} v.${version} in port ${port}`)
  return
})
