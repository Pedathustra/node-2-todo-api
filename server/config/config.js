//setting up to run in one of three environments. 1. prod 2. dev 3. qa
// NODE_ENV doesn't exist locally w/o setting up in package.json
var env = process.env.NODE_ENV || 'development';
console.log('env ****',env)

if(env ==='development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env ==='test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
