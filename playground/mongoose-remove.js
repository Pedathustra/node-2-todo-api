const {ObjectId} = require ('mongodb'); //mongodb returns a lot of useful utility methods, for instance, can determine
            //if an id is valid: ObjectId.isValid

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo') ;
const {User} = require('./../server/models/user') ;

// Todo.remove ({}).then((result) =>{
//   console.log(result);
//
// });

Todo.findOneAndRemove({id: '59eb7fc555ca8d491c5ddcaa'}).then((todo)=>{
  console.log(todo);
});;

Todo.findByIdAndRemove('59eb7fc555ca8d491c5ddcaa').then((todo)=>{
  console.log(todo);
});
