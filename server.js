const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 3001
const users = {}

app.use(cors())

app.post('/post', bodyParser.json(), (req, res) => {
  console.log(req.body)
  res.end()
})

// Socket.io client connection
io.on('connection', (client) => {

  // client join event handler
  client.on('join', (user) => {
    // adds new user with its id as index
    users[user.id] = {
      name: user.name
    }
    console.log('User %s connected', user.name)
  })


})

server.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
