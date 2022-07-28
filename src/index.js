const express = require("express")
const db = require("./database")

const app = express()

const PORT = 3000
const URL_LENGTH = 8

app.post("/short", (req, res) => {
    const { url } = req.body
    const hash = Buffer.from(Math.random() * 100)
        .toString("base64").substring(0, URL_LENGTH)

    database.save(hash, url)

    return res.sendStatus(201) // HTTP_CREATED
})

app.get("/l/:hash", (req, res) => {
    const { hash } = req.params
    const record = database.get(hash)
    
    if(!record) return res.sendStatus(404) // HTTP_NOT_FOUND

    return res.send(record)
})

app.listen(PORT, () => {
    console.log("app listening to port " + port)
})
