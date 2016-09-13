const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');
const app = express()

let db;

app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, () => { console.log('listening on port 3000')})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')

  db.collection('quotes').find().toArray(function(err, results) {
    console.log(results)
    // send HTML file populated with quotes here
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

MongoClient.connect(`mongodb://${config.db_username}:${config.db_password}@ds019936.mlab.com:19936/movie-quotes`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
