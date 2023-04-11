const { User, Thought } = require("../models");

const thoughtController = {
  // This function retrieves all thoughts from the database
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: " -__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // This function retrieves a thought by its id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: " -__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: " No thought associated with that id." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // This function creates a new thought and associates it with a userId
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbuserData) => {
        if (!dbuserData) {
          return res.status(404).json({
            message: " Thought created no user associated with this id.",
          });
        }
        res.json({ message: " Successfully created a thought!" });
      })
      .catch((err) => res.json(err));
  },
  // This function updates a thought by its ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: " No thought associated with that id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // This function deletes a thought by its ID and updates the user's thoughts
  deletethought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: " No thought associated with that id." });
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbuserData) => {
        if (!dbuserData) {
          return res.status(404).json({
            message: "Thought was created but no user associated with this id.",
          });
        }
        res.json({ message: "Thought deleted successfully!" });
      })
      .catch((err) => res.json(err));
  },
  // This function adds a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: " No thought associated with that id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // This function removes a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
