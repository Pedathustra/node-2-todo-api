//global vars

require('./config/config');
const _ = require('lodash');
const express = require('express');
const  bodyParser = require('body-parser');
const {ObjectId} = require ('mongodb'); //mongodb returns a lot of useful utility methods, for instance, can determine

//local vars
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;

var app = express();
app.use(bodyParser.json());

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

app.get('/todos/:id', (req,res)=>{
  var id= req.params.id;

  if(!ObjectId.isValid(id)){
      return res.status(404).send({text:'ID you provided was not valid'});
    }
  Todo.findById(id).then((todo)=>{
      if(todo){
        res.send(todo);
      }else{
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

app.patch('/todos/:id', (req,res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
      }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime(); // returns int that's ms from 1/1/1970
    }else {
      body.completed = false;
      body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
        if(!todo){
          return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    })
});



//POST /users
//x-auth is a custom header
app.post('/users', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  //var user = new User({email: body.email, password:body.password});
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken(); //returns the promise that we can chain
  }).then((token)=>{
      res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});


//this is going to require authentication
//this will be our first private route
app.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`)
});

module.exports ={app};
