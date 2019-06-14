const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const server = express()

server.use(bodyParser.json())

server.use(bodyParser.urlencoded({ extended: true }))

server.use(cors())

const configureRoutes = require('./routes')

configureRoutes(server)

server.listen(8000, err => {
	if (err) throw err
	console.log('Server is running on port ' + 8000)
})
