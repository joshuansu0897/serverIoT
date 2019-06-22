const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { handleFatalError } = require('./util')

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('send-view', (view) => {
    console.log(view)
    io.sockets.emit('send-view-brodcast', view)
  })

  socket.on('send-data', (data) => {
    console.log(data)
    io.sockets.emit('send-data-brodcast', data)
  })
})

server.listen(8080, () => {
  console.log(`
  Servidor corriendo en http://localhost:8080
  `)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)