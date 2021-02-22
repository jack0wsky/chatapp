import http from "http"
import express from "express"

const app = express()
const apiServer = http.Server(app)

const io = require("socket.io")(apiServer)

io.on('connection', socket => console.log(socket))

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apiServer;
