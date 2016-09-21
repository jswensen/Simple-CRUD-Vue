const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

let db;

app.use(bodyParser.urlencoded({extended: true}))

// app.listen(3000, () => { console.log('listening on port 3000')})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
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
