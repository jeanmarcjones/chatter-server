const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001
const app = express()

app.use(express.static('public'))
app.use(cors())

app.post('/post', bodyParser.json(), (req, res) => {
  console.log(req.body)
  res.end()
})

app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
