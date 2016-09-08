const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, () => { console.log('listening on port 3000')})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  console.log(req.body);
})

let db;

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@ds019936.mlab.com:19936/movie-quotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
