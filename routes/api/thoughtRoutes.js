const router = require("express").Router();

// Imports the thoughtController functions
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deletethought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// Sets up a route for getting all thoughts and creating a new thought
router.route("/").get(getAllThought).post(createThought);

// Sets up a route for getting, updating, and deleting a thought by ID
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deletethought);

// Set up route for removing a reaction from a thought
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
