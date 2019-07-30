'use strict'
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { handleFatalError } = require('./util')
const mysql = require('mysql')

app.use(express.static('public'))

var connection = mysql.createConnection({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'acl12345',
  database        : 'SENSORS'
  })

connection.connect(function(err){
  if(err)throw err
  console.log('Connected')
  })

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('send-view', (view) => {
    io.sockets.emit('send-view-brodcast', view)
  })

  socket.on('send-data', (data) => {
    console.log(data)
    io.sockets.emit('send-data-brodcast', data)
  })

  socket.on('send-metrics', (data) => {
    data = data.toString()

    let obj = null
    try {
      obj = JSON.parse(data)
    } catch (e) {
      return
    }

    var sql = "INSERT INTO DATA (FLS, FRS, RLS, RRS, STATE) VALUES (?, ?, ?, ?, ?)"

    connection.query(sql,
      [
        obj.FLS,
        obj.FRS,
        obj.RLS,
        obj.RRS,
        obj.STATE
      ],
      (err, results) => {
        if (err) {
          handleError(err)
          return
        }
      })
    console.log(data)
    io.sockets.emit('send-metrics-brodcast', data)
  })
})

server.listen(8080, () => {
  console.log(`
  Servidor corriendo en http://localhost:8080
  `)
})

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
