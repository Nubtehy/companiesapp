var express = require('express'),
    mysql      = require('mysql');
var cors = require('cors');
var objectAssign = require ('object-assign');
var app = express();
var config = require('./dbconfig.json');
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');

// Application initialization

var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.user,
  password : config.password,
});

connection.query('CREATE DATABASE IF NOT EXISTS '+config.db.name, function (err) {
  if (err) throw err;
  connection.query('USE '+config.db.name, function (err) {
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS companies('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'PRIMARY KEY(id),'
      + 'name VARCHAR(30),'
      + 'earnings VARCHAR(30),'
      + 'parent VARCHAR(30)'
      +  ')', function (err) {
      if (err) throw err;
    });
  });
});
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Allow requests from any origin
app.use(cors({ origin: '*' }));

// Main route sends our HTML file

app.get('/companies', function(req, res) {

  if (req.query.parent){
    connection.query("SELECT * FROM companies", function (err, result, fields) {
      if (err) throw err;
      res.send(result)
    });
  } else{
    connection.query("SELECT * FROM companies", function (err, result, fields) {
      if (err) throw err;
      // result.forEach((itemp) => {
      //   itemp.companies = result.filter((item) => item.parent == itemp.id)
      // })
      result.forEach((itemp) => {
        itemp.companies = result.filter((item) => item.parent == itemp.id);
      })
      let arrayForSend = result.filter((item) => item.parent == 0);

      arrayForSend.forEach((itemp) => {
        itemp.totalSum = itemp.companies ? getTotal( itemp.companies, parseInt(itemp.earnings)): parseInt(itemp.earnings)
      })

      res.send(arrayForSend)
    });
  }
});
function getTotal (o, sum) {
  var i;
  for (var k in o) {
    i = o[k];
    if (i.companies && i.companies.length > 0){
      i.totalSum = +(getTotal(i.companies, i.earnings));
    } else{
      i.totalSum = parseInt(i.earnings);
    }
    sum = parseInt(sum)+i.totalSum;
  }
  return sum;
}
app.post('/company', function (req, res) {
  var name = req.body.name,
    earnings = req.body.earnings,
    parent = req.body.parent,
    id = req.body.id

  var sql = "INSERT INTO companies (name, earnings,parent) VALUES ('"+name+"', "+earnings+","+parent+")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send('ok');
  });
});

app.put('/company', function (req, res) {
  var name = req.body.name,
      earnings = req.body.earnings,
      parent = req.body.parent,
      id = req.body.id
  var sql = "UPDATE companies SET name = '"+name+"', earnings = "+earnings+", parent="+parent+" WHERE id ="+id+" ";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send('ok');
  });
});

app.delete('/company/:id', function (req, res) {
  var sql = "DELETE FROM companies WHERE id = "+req.params.id+"";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    var sqlUpdate = "UPDATE companies SET parent = 0  WHERE parent ="+req.params.id+" ";
    connection.query(sqlUpdate, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send('ok');
    });
  });
});
app.get('/company/:id', function (req, res, next) {
  res.send('company');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
