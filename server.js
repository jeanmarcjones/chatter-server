const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./users')

const port = process.env.PORT || 3001

app.use(cors())

app.post('/post', bodyParser.json(), (req, res) => {
  console.log(req.body)
  res.end()
})

// Socket.io client connection
io.on('connection', (client) => {

  // Client join event handler
  client.on('join', (user) => {
    // Adds new user with its id as index
    users.add(user.id, {
      sessionId: client.id,
      name: user.name,
      online: true
    })
    // Confirm authentication to client
    client.emit('joined')
    // Broadcasts when a user joins
    io.emit('update', `${user.name} has joined.`)
    console.log('User %s connected', user.name)
  })

  client.on('leave', (user) => {
    let userName = users.getByKey(user.id).name
    // Broadcast when a user leaves
    client.emit('disconnected')
    // Confirm disconnection to client
    io.emit('update', `${userName} has left.`)
    // Disconnect client
    client.disconnect()
  })

  // Client disconnect event handler
  client.on('disconnect', () => {
    // Checks for no registered users
    if (users.getKeys().length > 0) {
      let user = users.getBySession(client.id)
      users.update(user.key, {
        online: false
      })
      // Broadcast when a user disconnects
      io.emit('update', `${user.name} has disconnected.`)
      console.log('User %s disconnected', user.name)
    }
  })
})

server.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
