import app from './server'
import { name, version } from '../package.json'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Start ${name} v.${version} in port ${port}`)
  return
})
