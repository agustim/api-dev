import express from 'express'
import { name, version } from '../package.json'

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello!")
})


app.listen(port, () => {
    console.log(`Start ${name} v.${version} in port ${port}`)
    return
})



