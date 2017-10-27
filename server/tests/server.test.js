const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//const {Users} = require('./../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  complatedAt: 3336566
}];

const invalidToDoID  = new ObjectID();

//make sure database is a specific state
beforeEach((done) =>{
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text}) //es6
      .expect(200 )
      .expect((res) =>{
        expect(res.body.text).toBe(text );
        })
      .end((err,res)=>{//check MongoDB to see if it persisted
        if(err) {
          return done(err);
        }
        Todo.find({text}).then((todos)=>{ //using find operator in MongoDB
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });
  it('should not create todo with invalid body data', (done) =>{
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
          if(err){
            return done(err);
          }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      });
  });

  describe('GET /todos', ()=>{
    it ('should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });
});

describe('GET /todos/:id', ()=>{
  it('should get tody by id', (done)=>{
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
     .expect((res)=> {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
    });
    it('should return 404 if todo not found',(done)=>{
        //make sure you get a 404 back with
        request(app)
        .get(`/todos/` + invalidToDoID.toHexString)
        .expect(404)
        .end(done);
    });
    it('should return 404 for non-object ids',(done)=>{
      request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
    })
  });


describe('DELETE /todos/:id', ()=>{
  it('should remove a todo',(done)=>{
      var hexId=todos[1]._id.toHexString();
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
          console.log('*****');
          expect(res.body.todo._id).toBe(hexId);
      })
       .end((err,res)=>{
           if(err){
               return done(err);
           }
        Todo.findById(hexId).then((todo)=>{
         expect(todo).toNotExist();
         done();
        }).catch((e)=>done(e))
      });
    });
  it('should return 404 if todo not found',(done)=>{
    request(app)
    .get(`/todos/` + invalidToDoID.toHexString)
    .expect(404)
    .end(done);

  });
  it('should return 404 if objectid is invalid',(done)=>{
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update the todo', (done)=>{
      //grab id of first item
      var hexId=todos[0]._id.toHexString();
      //then make patch request, using url, and id, use send, with request body
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        "text": "Stop drinking wine",
        "completed":true
      })
      .expect(200)
      .expect((res)=>{
          expect(res.body.todo.completedAt).toBeA('number')
          expect(res.body.todo.text).toNotEqual(todos[0].text)
          done
      })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done)=>{
      //grab id of second to do item
      var hexId=todos[1]._id.toHexString();
      //update text to something different, set completed to false
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        "text": "Stop eating",
        "completed":false
      })
      .expect(200)
      .expect((res)=>{
          expect(res.body.todo.text).toNotEqual(todos[0].text)
          expect(res.body.todo.completed).toEqual(false)
          expect(res.body.todo.completedAt).toNotExist()
          done
        })
      .end(done);
    });
});
