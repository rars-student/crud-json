// servidor/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

const userController = new UserController();

router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

module.exports = router;
