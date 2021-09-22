import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello!")
})


app.listen(port, () => {
    console.log(`Start api-dev v.1.0.0 in port ${port}`)
    return
})



