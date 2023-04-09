const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => newTypes.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    maxLength: 200,
  },

  username: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => dateFormat(timeStamp),
  },

  toJSON: {
    getters: true,
  },
  id: false,
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A thought is required.",
      minLength: 1,
      maxLength: 200,
    },

    createAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => dateFormat(timeStamp),
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model(" Thought", ThoughtSchema);

module.exports = Thought;
