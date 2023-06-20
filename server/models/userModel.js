// servidor/models/userModel.js

const UserDTO = require("../dtos/userDTO");

class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toDTO() {
    return new UserDTO(this.id, this.name, this.email);
  }
}

module.exports = UserModel;
