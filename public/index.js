var socket = io('http://localhost:8080')

const remote = document.getElementById('remote_video')

const arrowLeft = 37
const arrowUp = 38
const arrowRight = 39
const arrowDown = 40

socket.on('connect', () => {
  console.log('Hola')
})

socket.on('send-view-brodcast', (data) => {
  // aqui esta el video que manda el ras
  let base64String = btoa(String.fromCharCode(...new Uint8Array(data)))
  remote.src = 'data:image/jpeg;base64,' + base64String
})

socket.on('disconnect', () => {
  console.log('Adios')
})

// no suelo hacer esto, pero en este caso fue necesario
let botonAplastadoFlag = false;

// evento que pasa cuando precionas las flechas
window.addEventListener('keydown', onkeydown)
function onkeydown(ev) {
  if (botonAplastadoFlag) {
    return
  }
  if (ev.keyCode === arrowLeft) {
    botonAplastadoFlag = true
    socket.emit('send-data', 'left')
  }
  if (ev.keyCode === arrowUp) {
    botonAplastadoFlag = true
    socket.emit('send-data', 'up')
  }
  if (ev.keyCode === arrowRight) {
    botonAplastadoFlag = true
    socket.emit('send-data', 'right')
  }
  if (ev.keyCode === arrowDown) {
    botonAplastadoFlag = true
    socket.emit('send-data', 'down')
  }
}

// evento que pasa cuando dejas de precionar las flechas
window.addEventListener('keyup', keyup)
function keyup(ev) {
  if (ev.keyCode < arrowLeft || ev.keyCode > arrowDown) {
    return
  }
  botonAplastadoFlag = false
  socket.emit('send-data', 'stop')
}

