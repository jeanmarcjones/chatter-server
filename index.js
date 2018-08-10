const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {

  // Broadcast when a user connects
  console.log('a user connected')
  socket.broadcast.emit('user status', { type: 'connect', msg: 'a user connected' })

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    console.log('a user disconnected')
    socket.broadcast.emit('user status', { type: 'disconnect', msg: 'a user disconnected' })
  })

  // Show messages from users
  socket.on('chat message', (msg) => io.emit('chat message', msg))
})

http.listen(port, () => console.log(`listening on *:${port}`))
