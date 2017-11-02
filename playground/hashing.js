const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')
;

var data = { // this simulates the id of the user in our system.
  id: 10
};
//two methods used jwt.sign (creates hash and returns token ). jwt.verify takes token and ensures it wasn't manipulated
var token = jwt.sign(data,'123abc'); // 123abc is the salt secret
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log(decoded);
//jwt.verify
/*
// THIS IS A JSON WEB TOKEN (JWT). It's a standard. There's a package for that already
var message = 'I am user number 3'
var hash = SHA256(message).toString();
console.log(`Message: ${message}`);
console.log(`Hast: ${hash}`);
 var data = { // this simulates the id of the user in our system.
   id: 4
 };

 var token = {  //hashed value of the data sent to the client. If we get the same value back, we know it wasn't manipulated
   data,
   hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //hashed value of the data
 }

//need to salt the hash as an extra step to prevent user from just changing id: 4 to 5 and then rehashing to send back.
//salting is just adding random characters
//somesecrete

//man in the middle, change id to 5
token.data.id = 5;
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
if (resultHash=== token.hash){
    console.log('Data was not changed.')
} else {
  console.log('Data was changed. Do NOT trust.')
}
*/
