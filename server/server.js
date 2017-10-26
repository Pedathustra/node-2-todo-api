//global vars
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require ('mongodb'); //mongodb returns a lot of useful utility methods, for instance, can determine


//local vars
var {mongoose} = require('./db/mongoose');
var {Users} = require('./models/user');
var {Todo} = require('./models/todo');
const port = process.env.PORT || 3000;


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

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
      res.send({todos});
  }), (e)=>{
    res.status(400).send(e);
  }
});

// GET /todos/1234 example: localhost:3000/todos/59e377f709b0959440aff47e
app.get('/todos/:id', (req,res)=>{
  var id= req.params.id;

  if(!ObjectId.isValid(id)){
      return res.status(404).send({text:'ID you provided was not valid'});
    }
  Todo.findById(id).then((todo)=>{
      if(todo){
        console.log('found!');
        res.send(todo);
      }else{
        console.log('not found!');
        res.status(400).send();
      }
  }), (e)=>{
    res.status(400).send();
  }
});


app.delete('/todos/:id',(req,res)=>{
    var id= req.params.id;

    //validate id. if not valid, return 404
    if(!ObjectId.isValid(id)){
        return res.status(404).send({text:'ID you provided was not valid'});
      }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo){// send 404
            return res.status(404).send();
          }
        //success
        res.status(200).send({todo});
      }).catch((e)=>{      //error. --> send back  400 with empty body
         res.status(400).send();
    });
});
app.listen(port, ()=>{
  console.log(`Started on port ${port}`)
});

module.exports ={app};
