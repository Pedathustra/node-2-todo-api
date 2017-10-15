const {ObjectId} = require ('mongodb'); //mongodb returns a lot of useful utility methods, for instance, can determine
            //if an id is valid: ObjectId.isValid

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo') ;
const {User} = require('./../server/models/user') ;



//var id = '59e377f709b0959440aff47e';
//var id = '69e377f709b0959440aff47e'; //in valid id b/c doesn't exist, just returns null if searching
//var id = '69e377f709b0959440aff47e7'; //in valid id b/c mal formatted, gives unhandled promise error


// begin challenge
var id1 = '59df83b5e752b9c01a10fa35' //valid
var id2 = '69df83b5e752b9c01a10fa35' //not referencing existing user
var id3 = '23359df83b5e752b9c01a10fa35' //malformed

if(!ObjectId.isValid(id1)){
  console.log('Id1 not valid');
} else {
  console.log('Id1 is valid');
  User.findById(id1).then((user)=>{
    console.log('user1: ')
    console.log(user);
  })
}

console.log('-----------------');
//**************************
//query works
User.findById(id2).then((user)=>{
  if(!user){
  console.log('user2 not found!')
} else {
    console.log('user2 not found ')
    console.log(user);
  }
})

//-----------------------------------
//query was found
if(!ObjectId.isValid(id2)){
  console.log('Id1 not valid');
} else {
  console.log('Id2 is valid');

}

console.log('-----------------');
//---------------------------------
//invalid
User.findById(id3).then((user)=>console.log(user))
.catch((e)=>{
  console.log(e);
})


// can pass in id and mongo will convert to new objectid
// Todo.find({_id: id}).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({_id: id}).then((todo)=>{
//   console.log('Todo', todo);
// });


// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e)=>console.log(e));

//findById
//
