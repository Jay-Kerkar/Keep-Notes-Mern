const connectToMongoDB = require('./database')
const express = require('express')
const cors = require('cors')

connectToMongoDB()
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// The Available Routes Are : 
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`The keep-notes app is listening on port ${port}`)
})