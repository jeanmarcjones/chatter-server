const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000
const connectedUserMap = new Map()

const randomWords = require('random-words')

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/chat', (req, res) => res.sendFile(__dirname + '/chat.html'))

io.on('connection', (socket) => {

  // Set username
  const connectedUserId = socket.id

  // Set username's
  socket.on('user name', (name) => {
    connectedUserMap.set(socket.id, { status: 'online', name: name })
  })

  // Broadcast when a user connects
  console.log('a user connected')
  socket.broadcast.emit('user status', { type: 'connect', msg: 'a user connected' })

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    console.log('a user disconnected')
    socket.broadcast.emit('user status', { type: 'disconnect', msg: 'a user disconnected' })
  })

  // Show messages from users
  socket.on('chat message', (msg) => {
    const user = connectedUserMap.get(connectedUserId)
    io.emit('chat message', { msg: msg, name: user.name })
  })
})

http.listen(port, () => console.log(`listening on *:${port}`))
