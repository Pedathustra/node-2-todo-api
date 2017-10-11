
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err){
      //the return just prevents the rest of the function from continuing
      return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');
 //deleteMany
 // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
 //   console.log(result);
 // })
 // //deleteOne--works the same as deleteOne, but only deletes the first that mathces criteria
 // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result)=>{
 //   console.log(result);
 // })
 //findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
//    console.log(result);
// })


//** BEGIN CHALLENGE
// db.collection('Users').findOneAndDelete({name: 'Havey'}).then((result)=>{
//    console.log(result);
// })

//deleteOne--works the same as deleteOne, but only deletes the first that mathces criteria
// db.collection('Users').deleteOne({_id : 
//        new ObjectID('59de24f5b8a686b21d92997d')
// }).then((result)=>{
//    console.log(result);
//  })
//** END CHALLENGE
//    db.close();// this close the connection.
}); //
