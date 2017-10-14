var mongoose = require('mongoose');

//use promise with Mongoose
mongoose.Promise = global.Promise;
//Mongoose maintains connection over time
//if you save, mongoose will be ready with a connection waiting
//we're going to use Promise
mongoose.connect('mongodb://localhost:27017/TodoApp');