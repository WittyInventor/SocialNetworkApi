const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const reactionSubschema = new mongoose.Schema({
  reactionId: {
    type: Types.ObjectId,
    default: new Types.ObjectId,
  },
    reactionBody: {
      type: String,
    required: true,
    maxLength: 280,
    },
    username: {
      type: String,
    required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date)
    },

})

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => timeSince(date)
  },
  username: {
    type: String,
    required: true
  },
  reactions: {
    type: [reactionSubschema]
  },

  lastAccessed: { type: Date, default: Date.now }
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});


const Thought = mongoose.model('Thought', thoughtSchema);
// this is where it officially exists in the database


module.exports = Thought;
