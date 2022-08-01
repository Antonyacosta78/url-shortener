const database = {}

const save = (hash, url) => {
    database[hash] = url
}

const get = (hash) => {
    return database[hash]
}

module.exports = { get, save }
