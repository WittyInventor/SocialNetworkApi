const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        return (!v || !v.trim().length) || regex.test(v)
      },
      message: 'this email is incorrect'
    }
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  lastAccessed: { type: Date, default: Date.now },
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

// message:'' - means that this will show invalid message to the user when the user inputs something incorrect
// (!v) = means if there is no value in the v then it will return to a lead in an error
// v= means its the code for the users to input in the email
// !v.trim() = this means the code will trim the empty spaces in the beginning and the end of the string such as when the user is inputting an email or password. 


const User = mongoose.model('User', userSchema);
// this is where it officially exists in the database


module.exports = User;
