//global vars
var express = require('express');
var bodyParser = require('body-parser');

//local vars
var {mongoose} = require('./db/mongoose');
var {Users} = require('./models/user');
var {Todo} = require('./models/todo');


var app = express();
app.use(bodyParser.json());

//create routes..this is to create todos
//this is what allows us to capture the request from the user to call the todo.js mongoose goodness
//to create the actual to do.
app.post('/todos',(req,res)=>{
  //console.log(req.body); // use this to verify we get the post request
  var todo = new Todo({
    text: req.body.text
  });

   todo.save().then((doc)=>{
    res.send(doc);
   }, (e)=>{
     res.status(400).send(e);
   })
});


app.listen(3000, ()=>{
  console.log('Started on port 3000')
});

module.exports ={app};
