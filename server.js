const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const config = require('./config.js')
const uuid = require('uuid');
const app = express()

app.use(express.static('public'))
app.use('/static/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/static/vue', express.static(__dirname + '/node_modules/vue/dist/'))
app.use('/static/vue-resource', express.static(__dirname + '/node_modules/vue-resource/dist/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let db;

app.get('/', (req, res) => {
   res.sendFile('index.html', {
     root: 'views'
   });
});

app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    else {
      res.send(result);
    }
  })
})

app.post('/quotes', (req, res) => {
  console.log(req.body);
  req.body.id = uuid.v1();
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    res.send(result)
    console.log('saved to database')
    console.log(result);
    //res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate(req.body.id, {
    $set: {
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err ) return res.send(err)
    res.send(result)
    console.log('modified record');
  })
})

app.put('/quotes/delete', (req, res) => {
  //console.log(req.body);
  db.collection('quotes')
  .findOneAndDelete({id: req.body.id},
  (err, result) => {
    if (err) return res.send(500, err)
    else res.send(result);
  })
})

MongoClient.connect(`mongodb://${config.db_username}:${config.db_password}@${config.db_addr}`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
