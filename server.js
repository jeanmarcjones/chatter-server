const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')
const cors = require('cors')

const users = require('./users')
const helpers = require('./utils/helpers')

const port = process.env.PORT || 3001

app.use(cors())

app.post('/post', bodyParser.json(), (req, res) => {
  console.log(req.body)
  res.end()
})

app.get('/users', (req, res) => {
  users.get()
    .then(
      (data) => res.send(data),
      (error) => {
        console.error(error)
        res.status(500).send({
          error: 'There was an error'
        })
      }
    )
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
    client.broadcast.emit('update', {
      id: helpers.uuid(),
      type: 'connect',
      text: `${user.name} has joined.`,
      name: 'Updates'
    })
    console.log('User %s connected', user.name)
  })

  client.on('leave', (user) => {
    let userName = users.getByKey(user.id).name
    // Broadcast when a user leaves
    client.emit('disconnected')
    // // Broadcast when a user logs out
    client.broadcast.emit('update', {
      id: helpers.uuid(),
      type: 'disconnect',
      text: `${userName} has left.`,
      name: 'Updates'
    })
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
      console.log('User %s disconnected', user.name)
    }
  })

  // Show messages from users
  client.on('postMessage', ({ message }) => {
    client.broadcast.emit('broadcastMessage', {
      ...message,
    })
  })
})

server.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
