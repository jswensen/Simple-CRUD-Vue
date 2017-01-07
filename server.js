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
// app.use('/static/uuid', express.static(__dirname + '/node_modules/uuid'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let db;

app.get('/', (req, res) => {
   res.sendFile('index.html', {
     root: 'views'
   });
});

app.get('/items', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err)
    else {
      res.send(result);
    }
  })
})

app.post('/items', (req, res) => {
  req.body.id = uuid.v1();
  db.collection('items').save(req.body, (err, result) => {
    if (err) return console.log(err)

    res.send(result.ops[0])
    console.log('saved to database')
    console.log(result.ops[0]);
    //res.redirect('/')
  })
})

app.put('/items', (req, res) => {
  db.collection('items')
  .findOneAndUpdate(req.body.id, {
    $set: {
      item: req.body.item
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

app.put('/items/delete', (req, res) => {
  //console.log(req.body);
  db.collection('items')
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
