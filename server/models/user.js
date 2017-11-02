const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//using the mongoose.schema to tack on custom methods with UserSchema.methods (instance methods)
var UserSchema  = new mongoose.Schema({
    email:{
      type: String,
      minlength:1,
      trim: true,
      required: true,
      unique: true, // verifies unique across collection
      validate: {
          validator: validator.isEmail, // this is a shortcut to what I have below
            message: '{VALUE} is not a valid email'
          }
        },
      password: {
          type: String,
          required: true,
          minlength: 6
      },
      tokens:[{
          access: {
              type: String,
              required: true
          },
          token:{
            type: String,
            required: true
          }
      }]
});


//can override methods. Doing this to remove sending back pwd and tokens array
//this will determine exactly what is sent back when we
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id' , 'email']);
}


// creates custom method (instance method) // we need a "this" for methods b/c it stores indivual document
//which means we can say var user = this;
//need to create a token inside the user document. That's what this is doing
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    //allows us to push on a new object with new properties
    user.tokens.push({access, token});
    //at this point, we have changes made to user model.
    //now just need to persist
    return user.save().then(()=>{
      return token;
    }); // by returning this, we're returning a promise in a chain //this is passed as the success of the next then call
};

//this turns into a model method as opposed to instance method
UserSchema.statics.findByToken = function (token){
    var User = this;
    var decoded;

    try {
      decoded = jwt.verify(token, 'abc123');
    } catch(e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })
        return Promise.reject();
    }
    //User.findeOne returns a promise
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token, // nested object reference requires , which requires single quotes
      'tokens.access': 'auth'
    })
}

var User = mongoose.model('User', UserSchema);

module.exports= {User};


/*
validate{
    validator:(value)=>{
        return validator.isEmail(value);
    },
      message: '{VALUE} is not a valid email'
}
*/
