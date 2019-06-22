var socket = io('http://localhost:8080')

const arrowLeft = 37
const arrowUp = 38
const arrowRight = 39
const arrowDown = 40

socket.on('connect', function () {
  console.log('Hola')
})

socket.on('send-view-brodcast', function (data) {
  // aqui esta el video que manda el ras
  console.log(data)
})

socket.on('disconnect', function () {
  console.log('Adios')
})

// evento que pasa cuando precionas las flechas
window.addEventListener('keydown', onkeydown)
function onkeydown(ev) {
  if (ev.keyCode === arrowLeft) {
    socket.emit('send-data', 'left')
  }
  if (ev.keyCode === arrowUp) {
    socket.emit('send-data', 'up')
  }
  if (ev.keyCode === arrowRight) {
    socket.emit('send-data', 'right')
  }
  if (ev.keyCode === arrowDown) {
    socket.emit('send-data', 'down')
  }
}

// evento que pasa cuando dejas de precionar las flechas
window.addEventListener('keyup', keyup)
function keyup(ev) {
  if (ev.keyCode < arrowLeft || ev.keyCode > arrowDown) {
    return
  }
  socket.emit('send-data', 'stop')
}

