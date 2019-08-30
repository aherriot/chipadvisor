const path = require('path')
const express = require('express')

const db = require('./db')
const api = require('./api')

const app = express()

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use(express.static(path.resolve(__dirname, '..', 'images')))

// app.get('/images/*', (req, res) => {
//   const imageName = req.url.substr(-1) === '/'
//   res.sendFile(path.resolve(__dirname, '..', 'images'))
// })

app.use('/api', api)

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

async function start() {
  await db.verifyConnection()
  console.log('DB connection verified')

  const PORT = process.env.PORT || 8000
  app.listen(PORT, () => {
    console.log(
      `Server succesfully started on port ${PORT} with NODE_ENV=${process.env.NODE_ENV}.`
    )
  })
}

start()
