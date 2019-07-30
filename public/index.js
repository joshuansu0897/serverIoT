'use strict'
const socket = io('http://localhost:8080')

const remote = document.getElementById('remote_video')

const arrowLeft = 37
const arrowUp = 38
const arrowRight = 39
const arrowDown = 40

socket.on('connect', () => {
  console.log('Connected')
})

socket.on('send-view-brodcast', (data) => {
  // Raspberry video streaming
  let base64String = btoa(String.fromCharCode(...new Uint8Array(data)))
  remote.src = 'data:image/jpeg;base64,' + base64String
})

socket.on('send-metrics-brodcast', (data) => {
  console.log(data)
})

socket.on('disconnect', () => {
  console.log('Disconnected')
})

// Button State
let buttonFlag = 0;

// Push Button State
window.addEventListener('keydown', onkeydown)
function onkeydown(ev) {
  if (buttonFlag != 0) {
    return
  }
  if (ev.keyCode === arrowLeft) {
    buttonFlag = arrowLeft
    socket.emit('send-data', 'left')
  }
  if (ev.keyCode === arrowUp) {
    buttonFlag = arrowUp
    socket.emit('send-data', 'up')
  }
  if (ev.keyCode === arrowRight) {
    buttonFlag = arrowRight
    socket.emit('send-data', 'right')
  }
  if (ev.keyCode === arrowDown) {
    buttonFlag = arrowDown
    socket.emit('send-data', 'down')
  }
}

// Release Button Event
window.addEventListener('keyup', keyup)
function keyup(ev) {
  if (ev.keyCode < arrowLeft || ev.keyCode > arrowDown) {
    return
  }

  if (botonAplastadoFlag !== ev.keyCode) {
    return
  }

  buttonFlag = 0
  socket.emit('send-data', 'stop')
}
