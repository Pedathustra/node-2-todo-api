var mongoose = require('mongoose');
//next, create a model
//check here: http://mongoosejs.com/docs/validation.html
// and here: http://mongoosejs.com/docs/guide.html
// for info:
// need to store the _id of the user to ensure they have access to the todo
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, // value must exist.. if not set, you'll get a validation error
    minlength: 1,
    trim: true // removes any leading, trailing empty space.
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    requires: true
  }
});
module.exports = {Todo};
