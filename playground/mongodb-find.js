
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err){
      //the return just prevents the rest of the function from continuing
      return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    //find creates a mongodb cursor that acts as a pointer to the rows. .find() has a ton of methods
    //turn that into an array with toArray();
    //in the .find() is how we query something specfic. Just set up name/value pair
    //so you can do completed: false
    //to find by _id, you have to create a new ObjectID as below
/*
    db.collection('Todos').find({
        _id: new ObjectID('59d6c5ab1539670c4c646499')
      }).toArray().then((docs)=>{
      console.log('Todos');
      console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
      console.log('Unable to fetch todos',err);
    }); // this returns a promise
*/
/*
// using count with Promise
    db.collection('Todos').find().count().then((count)=>{
      console.log(`Todos count: ${count}`);
    }, (err) => {
      console.log('Unable to fetch todos',err);
    }); // this returns a promise
*/

db.collection('Users').find({name: "Pebbles"}).toArray().then((docs)=>{
  console.log("Users");
  console.log(JSON.stringify(docs,undefined,2));
},  (err) =>{
  console.log('Unable to fetch users',err);
});

//    db.close();// this close the connection.
}); //
