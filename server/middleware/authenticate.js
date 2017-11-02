var {User} = require('./../models/user');

//middleware function on our routes to make them private.
//middleware functions  gets three arguments
var authenticate =(req,res,next) =>{
  var token = req.header('x-auth');

  User.findByToken(token).then((user)=>{
      if (!user){
          return Promise.reject();
      }
      //res.send(user);
      req.user = user;
      req.token = token;
      next(); // have to execute next
  }).catch((e)=>{
      res.status(401).send(); //
  });
};

module.exports = {authenticate};
