// servidor/controllers/userController.js

const UserService = require("../services/userService");
const UserDTO = require("../dtos/userDTO");

class UserController {
  constructor() {
    this.userService = new UserService("./database.json");
  }

  getUsers(req, res) {
    const users = this.userService.getUsers();
    res.json(users);
  }

  getUserById(req, res) {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }

  createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos." });
    }

    const user = this.userService.createUser(name, email, password);
    res.status(201).json(user);
  }

  updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Por favor, preencha todos os campos." });
    }

    const updatedUser = this.userService.updateUser(id, name, email, password);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }

  deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = this.userService.deleteUser(id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
}

module.exports = UserController;
