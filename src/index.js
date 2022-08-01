const express = require("express")
const bodyParser = require("body-parser")
const database = require("./database")

const app = express()

// TODO move to .env
const PORT = 3000
const URL_LENGTH = 8
const BASE_URL = "http://localhost:" + PORT + "/"

app.use(bodyParser.json())

app.post("/short", (req, res) => {
    const { url } = req.body
    const hash = Buffer.from((Math.random() * 1000).toString())
        .toString("base64").substring(0, URL_LENGTH)

    database.save(hash, url)

    return res.status(201).send(BASE_URL + hash).end() // HTTP_CREATED
})

app.get("/l/:hash", (req, res) => {
    const { hash } = req.params
    if(!hash) return res.sendStatus(400) // HTTP_BAD_REQUEST

    const record = database.get(hash)
    if(!record) return res.sendStatus(404) // HTTP_NOT_FOUND

    return res.status(301).redirect(BASE_URL + record) // HTTP_MOVED_PERMANENTLY
})

app.listen(PORT, () => {
    console.log("App listening to port " + PORT)
})
