const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'lp@ped.com'  ,
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},{
  _id: userTwoId,
  email: 'lp2@ped.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId //just making _creator = userOneId tp ensure user has access
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  complatedAt: 3336566,
  _creator: userTwoId
}];


const populateTodos = (done) =>{
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos);
    }).then(()=>done());
};
 const populateUsers = (done)=>{
   User.remove({}).then(()=>{
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      return Promise.all([userOne,userTwo]); //this returns result of all promises so the outer then can handle
   }).then(()=>done());
 };
module.exports = {todos, populateTodos,users,populateUsers}
