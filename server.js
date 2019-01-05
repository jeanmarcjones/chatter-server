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
    users[user.id] = {
      id: client.id,
      name: user.name
    }
    console.log('User %s connected', user.name)
    // Broadcasts when a user joins
    io.emit('update', `${user.name} has joined.`)
  })

  // Client disconnect event handler
  client.on('disconnect', () => {
    // check for saved users and store there object key
    let keys = Object.keys(users)
    if (keys.length) {
      // find the disconnecting clients data in users
      let user = keys.reduce((key) => {
        if (users[key].id === client.id)
          return users[key]
      })
      // Broadcast when a user disconnects
      io.emit('update', `${user.name} has disconnected.`)
    }
  })
})

server.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
