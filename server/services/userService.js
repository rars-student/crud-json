// servidor/services/userService.js

const fs = require("fs");
const UserModel = require("../models/userModel");
const UserDTO = require("../dtos/userDTO");

class UserService {
  constructor(dbFile) {
    this.dbFile = dbFile;
    this.users = this.loadUsers();
  }

  loadUsers() {
    try {
      const data = fs.readFileSync(this.dbFile);
      return JSON.parse(data).map(
        user => new UserModel(user.id, user.name, user.email, user.password)
      );
    } catch (error) {
      return [];
    }
  }

  saveUsers() {
    fs.writeFileSync(
      this.dbFile,
      JSON.stringify(this.users.map(user => user.toDTO()))
    );
  }

  getUsers() {
    return this.users.map(user => user.toDTO());
  }

  getUserById(id) {
    const user = this.users.find(user => user.id === id);
    return user ? user.toDTO() : null;
  }

  createUser(name, email, password) {
    const id = Date.now().toString();
    const newUser = new UserModel(id, name, email, password);
    this.users.push(newUser);
    this.saveUsers();
    return newUser.toDTO();
  }

  updateUser(id, name, email, password) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      this.saveUsers();
      return user.toDTO();
    }
    return null;
  }

  deleteUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
      this.saveUsers();
      return deletedUser.toDTO();
    }
    return null;
  }
}

module.exports = UserService;
