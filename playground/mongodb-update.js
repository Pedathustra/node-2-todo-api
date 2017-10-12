
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err){
      //the return just prevents the rest of the function from continuing
      return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

/*
db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('59de3190b8a686b21d929cd7')
},{
  $set: { // this is an update operator
    completed: true
    }
  },{
    returnOriginal:false
}).then((result)=>{
  console.log(result);
})
*/
db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('59d6c635d935ee461cee03ea')
},
  {
    $set: {  name: 'Behringer' }
     , $inc: {age:-11}
  },{
    returnOriginal:false
}).then((result)=>{
  console.log(result);
})
//    db.close();// this close the connection.
}); //
