const Task = require('./models/Task.js');
const express = require('express')
const port = 8000
const bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
app.use(cors());

// create application/json parser
const jsonParser = bodyParser.json()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/tasks/saveAll', jsonParser, function(req, res) {
  Task.saveAll(req.body);
  res.send("ok");
});

app.post('/tasks/save/', jsonParser, function (req, res) {
  Task.save(req.body);
  res.send("ok");
});

app.get('/tasks/get/', function(req, res) {
  res.send(Task.findById(req.query.id));
});

app.get('/tasks/getAll/', function(req, res) {
  res.send(Task.findAll());
});

app.get('/tasks/delete/', function(req, res) {
  Task.delete(req.query.id);
  res.send("ok");
});