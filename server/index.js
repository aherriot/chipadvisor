const path = require('path')
const express = require('express')
const db = require('./db')

const app = express()

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      console.log(`Server succesfully started on port ${PORT}.`)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
