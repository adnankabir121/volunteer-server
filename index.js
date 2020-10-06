var express = require('express')
var app = express()
const port = 7000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors());

app.get('/', function (req, res) {
  res.send('Data')
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster1.7p7ud.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerDB").collection("allworks");
  console.log("database connected")
  app.post('/addActivity', (req, res) => {
    const newActivity = req.body;
    console.log(newActivity);
    collection.insertOne(newActivity)
      .then(result => {
        //   res.send(result.insertedCount>0);
        console.log(result)
      })
  })
  app.get('/activities', (req, res) => {
    console.log("get")
    collection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  app.get('/activities1', (req, res) => {
    console.log("get")
    collection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })


});

app.listen(process.env.port||port)