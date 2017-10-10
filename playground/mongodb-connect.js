//const MongoClient = require('mongodb').MongoClient;
//object destruction: allows us to pull out properites from object and set to variable
//in this case, MongoClient, and ObjectID
//might even be useful to make objectid even if not using mongodb.
const {MongoClient, ObjectID} = require('mongodb');
//var obj = new ObjectID(obj);
//console.log(obj);

//object destruction...pull out properties from an object and set to a variable
// var user = {name: 'andrew', age:25};
// var {name} = user;
// console.log(name);
MongoClient.connect('mongodb://localhost:27017/Users', (err, db)=>{
    if (err){
      //the return just prevents the rest of the function from continuing
      return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //   text: 'Something to do',
    //   completed: false
    // },(err, result)=>{
    //   if (err){
    //     return console.log('Unable to insert to do.', err);
    //   }
    //   console.log(JSON.stringify(result.ops, undefined, 2));
    // })
    // db.collection('Users').insertOne({
    //   name: 'Larry',
    //   location: 'Boulder',
    //   age: 48
    // },(err, result)=>{
    //   if (err){
    //     return console.log('Unable to insert to do.', err);
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // })

    db.close();// this close the connection.
}); //
