var mongoose = require('mongoose');

//use promise with Mongoose
mongoose.Promise = global.Promise;
//Mongoose maintains connection over time
//if you save, mongoose will be ready with a connection waiting
//we're going to use Promise
mongoose.connect(process.env.MONGODB_URI );

module.exports={mongoose};



/*
--> talked about in setting up test database lecture.
most hosting environments will offer this environment variable:
process.env.NODE_ENV

can set to:
process.env.NODE_ENV==="production"
process.env.NODE_ENV==="development"
process.env.NODE_ENV==="test"

*/
