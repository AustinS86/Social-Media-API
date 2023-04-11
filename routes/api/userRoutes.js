const router = require("express").Router();

// Imports the UserController functions
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/UserController");

// Sets up a route for getting all users and creating a new user
router.route("/").get(getAllUser).post(createUser);

// Sets up a route for getting, updating, and deleting a user by ID
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Sets up a route for adding and removing a friend from a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
